---
layout: post
title: "실시간 채팅 시스템"
permalink: /portfolio/chat-system/
slug: chat-system
date: 2025-04-01
project: true
group: common
order: 1
icons:
  - {file: backnd.png, alt: "Backnd (뒤끝)"}
tags: [BackEnd-SDK, Socket, UniTask, PlayFab, CSharp]
excerpt: "공통 모듈. 뒤끝 SDK 기반 채널별 실시간 메시징."
toc: true
comments: false
---

<div class="pf-panel">
  <table>
    <tr><td><strong>모듈 성격</strong></td><td>공통 모듈 — 픽셀 영웅 전설 · 미확인 용사단에 적용</td></tr>
    <tr><td><strong>사용 스택</strong></td><td>뒤끝 SDK(Socket), UniTask, Azure PlayFab, C#</td></tr>
    <tr><td><strong>출처</strong></td><td><code>Assets/Scripts/Managers/ChattingManager.cs</code>, <code>Common/COMMON.Chat.cs</code>, <code>Common/COMMON.Reward.cs</code></td></tr>
    <tr><td><strong>코드</strong></td><td><a href="https://github.com/mmmdong/portfolio-code/tree/main/common-modules/chat-system">GitHub</a> — 채팅 매니저 · 채널 UI (8개 파일)</td></tr>
  </table>
</div>

## 개요

뒤끝 채팅 SDK 기반의 실시간 채팅 기능입니다.
유저 간 일반 채팅과 아이템 획득·업적 등의 시스템 알림을 **채널 구조로 관리**합니다.

## 아키텍처

| 구분 | 클래스 | 역할 |
|---|---|---|
| 매니저 | `ChattingManager` | 채팅 클라이언트 싱글턴 관리, 메시지 송수신 |
| 아이템 | `Item_ChatMsg_User` | 유저 채팅 메시지 표시 |
| 아이템 | `Item_ChatMsg_System` | 시스템 알림 메시지 표시 |
| 데이터 | `ChattingInfo` | 채팅 토큰, 차단 목록 저장 |
| 인터페이스 | `IChatClientListener` | 채팅 이벤트 콜백 정의 |

![채팅 메시지 흐름](/images/diagrams/06-chat-sequence.svg)

---

## 설계 판단 3가지

### 1. 차단 기능을 PlayFab에 둔 이유 — 서버 이원화 회피

채팅이 연동된 프로젝트는 유저 데이터를 **Azure PlayFab**에 저장합니다.
차단 기능을 뒤끝 서버에 구현하면 **채팅 유저 데이터는 뒤끝, 일반 유저 데이터는 PlayFab**으로 갈려
관리가 어려워집니다. 그래서 차단 목록을 PlayFab 유저 데이터에 두고, 수신 시점에 클라이언트가 대조합니다.
결과적으로 서버 호출 비용도 절감됐습니다.

### 2. 닉네임을 Base64로 인코딩한 이유 — 한글 깨짐 방지

SDK가 토큰을 byte로 변환해 송수신하는 과정에서 **한글 닉네임이 깨지는 현상**이 있었습니다.
닉네임만 Base64로 인코딩해 전송하고 표시 시점에 디코딩합니다.

### 3. 유저 메시지는 JSON, 시스템 메시지는 구분자 — 포맷을 나눈 이유

| | 유저 채팅 | 시스템 메시지 |
|---|---|---|
| 포맷 | **JSON 직렬화** | **쉼표 구분자** |
| 이유 | 랭킹·각성등급·UID까지 함께 실어야 UI(테두리 변화, 차단 판정)를 구성할 수 있음 | 본문만 보이면 되므로 클래스 직렬화가 불필요 |
| 로컬라이징 | 불필요 (유저 입력 그대로) | **`msgKey`로 전송** — 모든 채널에 뿌려지므로 국가별 번역 필요 |

시스템 메시지 포맷: `SYSTEM,msgKey,rank,nickName,itemID,dropType,identifyType`

운영자가 보내는 공지·알림도 뒤끝 채팅 대시보드에서 직접 전송하되,
로컬라이징을 고려해 동일하게 `msgKey` 값을 던지도록 구성했습니다.

---

<details markdown="1">

<summary>코드 — 채팅 로그인 (<code>Assets/Scripts/Managers/ChattingManager.cs</code>)</summary>

```csharp
/// <summary>
/// 채팅 로그인
/// </summary>
public async UniTask InitChattingToken()
{
    if (ChatClient != null)
    {
        ReDirectionOpenChannel();
        return;
    }

    await UniTask.WaitUntil(() => COMMON.GetUserUID() != null);

    chattingToken = DBManager.Instance.playerData._UserData.chattingInfo.chattingToken;

    if (string.IsNullOrEmpty(chattingToken.nickname))
    {
        await UniTask.WaitUntil(() => !string.IsNullOrEmpty(COMMON.GetUserNickName()));

        // 기본적으로 byte로 변환하여 송수신 시 한글이 깨지는 현상이 있어
        // 닉네임은 Base64 인코딩 하여 전송
        DBManager.Instance.playerData._UserData.chattingInfo.chattingToken.nickname
            = Crypto.Base64Encode(COMMON.GetUserNickName());
        DBManager.Instance.playerData._UserData.chattingInfo.chattingToken.uid
            = COMMON.GetUserUID();

        COMMON.Save();
    }

    // 본격적인 로그인 요청
    ChatClient = new ChatClient(this, new ChatClientArguments
    {
        UUID              = Define.CHATTING_UUID,
        Avatar            = Define.CHATTING_AVATAR,
        CustomAccessToken = JsonUtility.ToJson(chattingToken)
    });
}
```

</details>

<details markdown="1">

<summary>코드 — 유저 메시지 송신 (JSON) (<code>Assets/Scripts/Common/COMMON.Chat.cs</code>)</summary>

```csharp
/// <summary>
/// 일반 채팅 메세지.
/// UI가 랭킹·각성등급·차단 판정을 하려면 본문 외 데이터가 필요하므로 JSON으로 실어 보낸다.
/// </summary>
public void SendChatMSG(string chatMsg)
{
    try
    {
        if (!chattingReady)
        {
            COMMON.OnPopUpToast("CHATTING_REDIRECTION_TXT");
            return;
        }

        if (chatMsg == string.Empty) return;
        if (ChatClient == null) return;
        if (CurrentChannelName == string.Empty) return;

        // 채널 3중 조회 — 하나라도 없으면 전송하지 않는다
        if (!ChannelList.ContainsKey(CurrentChannelGroup)) return;
        if (!ChannelList[CurrentChannelGroup].ContainsKey(CurrentChannelName)) return;
        if (!ChannelList[CurrentChannelGroup][CurrentChannelName].ContainsKey(CurrentChannelNumber)) return;

        ChannelInfo channelInfo =
            ChannelList[CurrentChannelGroup][CurrentChannelName][CurrentChannelNumber];
        if (channelInfo == null) return;

        var rankData = PlayFabManager.Instance.stageRankInfoList
            .FirstOrDefault(x => x.Value.UID
                == DBManager.Instance.playerData._UserData.chattingInfo.chattingToken.uid);
        if (rankData.Value == null) return;

        var msgClass = new SendMsgClass()
        {
            nickName    = DBManager.Instance.playerData._UserData.userInfo.NickName,
            ranking     = rankData.Value.Ranking + 1,
            chatMsg     = chatMsg,
            awakenGrade = COMMON.GetUserAwakenLevel(),
            uid         = chattingToken.uid
        };

        var msg = JsonUtility.ToJson(msgClass);

        ChatClient.SendChatMessage(channelInfo.ChannelGroup,
                                   channelInfo.ChannelName,
                                   channelInfo.ChannelNumber, msg);
    }
    catch (Exception e)
    {
        COMMON.Chat_LogError(e);
    }
}
```

</details>

<details markdown="1">

<summary>코드 — 시스템 메시지 송신 (구분자 + msgKey) (<code>Assets/Scripts/Common/COMMON.Reward.cs</code>)</summary>

```csharp
/// <summary>
/// 시스템 메세지.
/// 모든 채팅 서버에 뿌려지므로 국가별 번역이 필요하다.
/// 완성된 문장이 아니라 msgKey 와 인자만 보내 수신 측에서 로컬라이징한다.
/// 포맷: SYSTEM,msgKey,rank,nickName,itemID,dropType,identifyType
/// </summary>
public void SendSystemMSG(string msgIndex, params object[] args)
{
    try
    {
        if (msgIndex == string.Empty) return;
        if (ChatClient == null) return;
        if (CurrentChannelName == string.Empty) return;

        if (!ChannelList.ContainsKey(CurrentChannelGroup)) return;
        if (!ChannelList[CurrentChannelGroup].ContainsKey(CurrentChannelName)) return;
        if (!ChannelList[CurrentChannelGroup][CurrentChannelName].ContainsKey(CurrentChannelNumber)) return;

        ChannelInfo channelInfo =
            ChannelList[CurrentChannelGroup][CurrentChannelName][CurrentChannelNumber];
        if (channelInfo == null) return;

        var rankData = PlayFabManager.Instance.stageRankInfoList
            .FirstOrDefault(x => x.Value.UID
                == DBManager.Instance.playerData._UserData.chattingInfo.chattingToken.uid);
        if (rankData.Value == null) return;

        var ranking      = rankData.Value.Ranking + 1;
        var nickName     = COMMON.GetUserNickName();
        var itemIndex    = (int)args[0];
        var dropType     = (Define.eDataType)args[1];
        var identifyType = args.Length <= 2 ? 0 : (Define.eUnidentifiedOpenResult)args[2];

        var msg = string.Format("{0},{1},{2},{3},{4},{5},{6}",
            "SYSTEM", msgIndex, ranking, nickName, itemIndex, (int)dropType, (int)identifyType);

        ChatClient.SendChatMessage(channelInfo.ChannelGroup,
                                   channelInfo.ChannelName,
                                   channelInfo.ChannelNumber, msg);
    }
    catch (Exception e)
    {
        COMMON.Chat_LogError(e);
    }
}
```

</details>

<details markdown="1">

<summary>코드 — 메시지 수신과 차단 처리 (<code>Assets/Scripts/Managers/ChattingManager.cs</code>)</summary>

```csharp
/// <summary>
/// 메세지 수신 됐을 때.
/// SYSTEM / 유저 메시지를 분기하고, 유저 메시지는 PlayFab 차단 목록과 대조한다.
/// 리스트는 각각 50건 상한으로 유지해 메모리 증가를 막는다.
/// </summary>
public void OnChatMessage(MessageInfo messageInfo)
{
    if (!ChannelList.ContainsKey(messageInfo.ChannelGroup)) return;
    if (!ChannelList[messageInfo.ChannelGroup].ContainsKey(messageInfo.ChannelName)) return;
    if (!ChannelList[messageInfo.ChannelGroup][messageInfo.ChannelName]
            .ContainsKey(messageInfo.ChannelNumber)) return;

    ChannelInfo channelInfo = ChannelList[messageInfo.ChannelGroup]
                                        [messageInfo.ChannelName]
                                        [messageInfo.ChannelNumber];
    if (channelInfo == null) return;

    channelInfo.Messages.Add(messageInfo);

    if (CurrentChannelGroup  == messageInfo.ChannelGroup &&
        CurrentChannelName   == messageInfo.ChannelName  &&
        CurrentChannelNumber == messageInfo.ChannelNumber)
    {
        var msgSplit = messageInfo.Message.Split(',');
        var msgData  = new MsgData();
        var msg      = "";

        // 콘솔에서 날린 시스템 메세지 혹은 유저가 날린 시스템 메세지(아이템 획득 등)
        if (messageInfo.GamerName == "SYSTEM" || msgSplit[0] == "SYSTEM")
        {
            if (chatSystemMsgInfoList.Count > 50)
                chatSystemMsgInfoList.Remove(chatSystemMsgInfoList[0]);

            msgData.cellType = CellType.SystemText;
            msgData.cellSize = 130;
            msgData.msgInfo  = messageInfo;
            chatSystemMsgInfoList.Add(msgData);

            if (messageInfo.GamerName == "SYSTEM")
            {
                consoleSystemMsgInfoList.Add(msgData);
                isAlarm = true;
                GameEventSubject.SendGameEvent(GameEventType.SYSTEM_MSG_ALARM);

                msgSplit = msgData.msgInfo.Message.Split('#');
                msg = msgSplit.Length > 1 ? msgSplit[1]
                                          : COMMON.GetText(msgData.msgInfo.Message);

                GameEventSubject.SendGameEvent(GameEventType.SYSTEM_CHAT_NOTI, true);
            }
        }
        else
        {
            if (chatUserMsgInfoList.Count > 50)
                chatUserMsgInfoList.Remove(chatUserMsgInfoList[0]);

            msgData.cellType = CellType.ChatText;
            msgData.cellSize = 180;
            msgData.msgInfo  = messageInfo;

            var msgClass = JsonUtility.FromJson<SendMsgClass>(msgData.msgInfo.Message);

            // 다른 유저가 날린 메세지를 판단하여, 차단 목록에서 UID 확인
            if (msgClass.uid != chattingToken.uid)
            {
                if (COMMON.GetIgnoreList().Count(x => x.uid == msgClass.uid) > 0)
                    return;     // 차단된 유저 → 표시하지 않음
            }

            chatUserMsgInfoList.Add(msgData);
            msg = msgClass.chatMsg;
        }

        mainView.SetLastChattingMsg(msgData);

        var chattingPopup = ViewManager.Instance.GetPopUp(Define.ePopup.PopUp_Chatting);
        if (chattingPopup == null || !chattingPopup.gameObject.activeSelf)
            return;

        chattingPopup.RefreshUI();
    }
}
```

</details>

---

## 실제 사용 예 — 고등급 장비 감정 시 전체 알림

미확인 용사단의 감정 시스템과 연동해, **신화(SS) 등급 이상**이 나왔을 때만
전체 채널에 시스템 메시지를 보냅니다.

<details markdown="1">

<summary>코드 — 감정 결과 알림 연동</summary>

```csharp
private void SendSystemMessage(GameEvent ge)
{
    var uid = ge.ReadInt;
    resultItem = COMMON.GetEquipItem(uid);
    beforeItem = resultItem.Clone();
    resultItem.OpenUnidentified();

    // 장비 감정 신화 장비 이상일 경우 시스템 메세지 전달
    if (resultItem.equipData.Grade >= (int)Define.eGrade.SS)
    {
        ChattingManager.Instance.SendSystemMSG(
            "CHAT_GAINITEM_IDENTIFIED_TXT",   // 로컬라이징 텍스트 키
            resultItem.id,                     // 감정 결과 아이템 ID
            Define.eDataType.Equip,            // 아이템 타입
            resultItem.openResult);            // 감정 결과 (노말 / 대박 / 초대박)
    }

    PlaySlotMachine();
}
```

</details>

## 결과

동시 접속자가 많은 환경에서도 프레임 드랍 없는 채팅 환경을 구현했습니다.
메시지 리스트를 50건 상한으로 유지하고, 차단 판정을 수신 시점에 클라이언트에서 처리해
서버 왕복을 추가하지 않았습니다.
