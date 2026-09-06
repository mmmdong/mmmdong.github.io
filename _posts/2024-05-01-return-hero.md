---
layout: post
title: "귀환병 전기"
permalink: /portfolio/return-hero/
slug: return-hero
date: 2024-05-01
project: true
group: main
order: 3
icons:
  - {file: return-hero.png, alt: "귀환병 전기 앱 아이콘"}
tags: [Unity, CSharp, UniTask, PlayFab, CloudScript]
excerpt: "방치형 캐주얼 RPG. 랭킹 보상 정산 자동화와 월드보스 신규 컨텐츠."
toc: true
comments: false
feature: assets/img/portfolio/return-hero.jpg
---

<div class="pf-panel">
  <table>
    <tr><td><strong>프로젝트 유형</strong></td><td>상용 서비스 · 라이브 유지보수 및 신규 컨텐츠</td></tr>
    <tr><td><strong>기간</strong></td><td>2024.03 ~ 2024.05 (3개월)</td></tr>
    <tr><td><strong>팀 구성</strong></td><td>4명 (기획 1, 아트 1, 개발 2)</td></tr>
    <tr><td><strong>사용 소프트웨어</strong></td><td>Unity, Git</td></tr>
    <tr><td><strong>사용 언어 · 스택</strong></td><td>C#, UniTask, Azure PlayFab, IAP, AppLovin MAX</td></tr>
    <tr><td><strong>담당 역할</strong></td><td>월드보스 시스템 신규 개발 및 서비스 안정화 유지보수</td></tr>
    <tr><td><strong>성과</strong></td><td>⭐ 3.3 (AOS) · 4.1 (iOS) &nbsp;|&nbsp; 📥 10K+ &nbsp;|&nbsp; 🌎 Global<br/>인앱 매출 <strong>약 8% 상승</strong>(랭킹 보상 안정화) · <strong>약 5% 상승</strong>(월드보스)</td></tr>
    <tr><td><strong>링크</strong></td><td><a href="https://play.google.com/store/apps/details?id=com.dreamplay.returnhero.google&hl=ko">Google Play Store</a></td></tr>
    <tr><td><strong>코드</strong></td><td><a href="https://github.com/mmmdong/portfolio-code/tree/main/return-hero">GitHub</a> — 월드보스 · 랭킹 정산 (4개 파일)</td></tr>
  </table>
</div>

## 1) 프로젝트 개요

### 장르 및 플랫폼

- 2D 픽셀 아트 기반의 모바일 방치형 RPG (AOS / iOS)
- 레트로 감성의 고퀄리티 도트 그래픽 연출 및 시스템 구축

### 핵심 컨셉

**원정대원의 귀환과 분투기** — 마계 원정에서 생존해 돌아온 주인공이 다시 열린 마계의 문을 닫기 위해
펼치는 연대기 중심의 시나리오.

### 주요 특징

- **웨폰 마스터 시스템:** 단검, 장검, 활 등 무기 선택에 따른 직관적이고 차별화된 성장 로직 구현
- **수집 및 파밍 요소 극대화:** 수백 종의 장비와 카드 시스템, 도감 완성형 컨텐츠를 통한 지속적인 성장 동력 확보

---

## 2) 개발 과정

**Engine & Language** `Unity` `C#`

**Work Management** `Trello` — 칸반 보드를 활용한 기획/아트/개발 간 태스크 공유

**Version Control** `Git` — Git-Flow 기반 브랜치 전략 및 코드 리뷰

---

## 3) 클라이언트 버그 수정 및 안정화

### 3-1. 주간 보상 툴 관련 작업 완전 자동화

**개요**

- 라이브 서비스 중 발생하는 런타임 오류 및 저사양 기기 메모리 누수 문제를 추적하여 **서비스 안정화 수행**
- 컨텐츠별 랭킹 보상 시스템의 로직 결함을 파악하고, 비동기 처리 기반의 안정적인 **자동화 프로세스로 리팩터링**

**문제 상황**

- 인수인계 과정에서 랭킹 보상이 간헐적으로 누락되는 치명적인 이슈 발견
- **데이터 오염:** 리더보드 페이징 처리를 위한 변수가 전역(Global)으로 선언되어
  여러 컨텐츠 연산 시 데이터가 섞이는 현상 발생
- **비동기 불안정성:** 단순 Coroutine 지연(`WaitForSeconds`) 방식으로 결과 처리를 수행하여,
  네트워크 상태에 따른 성공/실패 여부를 보장하지 못함

**해결 전략**

- **데이터 독립성 확보:** 페이지 관리 변수를 지역(Local) 변수로 전환하여
  각 보상 로직의 독립적인 실행 환경 구축
- **비동기 구조 고도화:** `UniTask`를 도입해 GC 발생을 줄이고,
  콜백 결과에 따른 **재귀적 예외 처리** 로직을 설계하여 보상 지급 무결성 확보
- **규격화된 데이터 관리:** 보상 데이터 전송 시 `Enum` 및 컬렉션을 활용해 하드코딩을 방지하고 데이터 규격화

**결과**

- 보상 지급 시스템의 100% 자동화 및 안정화 달성
- 시스템 안정성 확보 이후 관련 컨텐츠 활성화로 **인앱 매출 약 8% 상승** 기여
- (개인적으로 느낀점) PlayFab 리더보드 통신 구조에 대한 깊은 이해를 바탕으로 팀 내 레거시 코드를 개선했으며,
  향후 인터페이스를 활용한 데이터 규격화의 중요성을 체감함

#### 보상 정산 흐름

![랭킹 보상 자동화 플로우](/images/diagrams/02-rank-reward-flow.svg)

<details markdown="1">

<summary>코드 — 리더보드 페이징과 시즌 정산 (<code>Assets/Script/Manager/PlayFabManager.cs</code>)</summary>

```csharp
/// <summary>
/// 리더보드를 페이지 별로 유저를 호출하는 함수 (1page당 100명)
/// currentPage 를 지역 변수로 두어 컨텐츠 간 데이터 오염을 차단한다.
/// </summary>
/// <param name="dungeonType">던전 타입</param>
private async UniTask GetLeaderboardPagesAsync(string dungeonType)
{
    var totalResults = 0;
    var currentPage = 0;
    var leaderBoardResult = new GetLeaderboardResult();

    while (totalResults < MAXRESULT)
    {
        if (currentPage != 0 && leaderBoardResult.Leaderboard.Count == 0) break;

        var leaderBoardCheck = false;

        PlayFabClientAPI.GetLeaderboard(new GetLeaderboardRequest
        {
            StartPosition   = currentPage * PAGESIZE,
            MaxResultsCount = PAGESIZE,
            StatisticName   = dungeonType
        }, result =>
        {
            leaderBoardResult = result;
            OnGetLeaderboardSuccess(result, dungeonType);
            leaderBoardCheck = true;
            currentPage++;
        }, OnGetLeaderboardError);

        // Coroutine 고정 지연이 아니라 콜백 완료를 확정 대기한다
        await UniTask.WaitUntil(() => leaderBoardCheck);
    }
}

/// <summary>
/// 전 컨텐츠 랭킹 수집 → 보상 우편 발송 → 시즌 넘버 증가까지의 정산 파이프라인
/// </summary>
async UniTask GetEntireUserListAsync()
{
    await GetLeaderboardPagesAsync("TreasureDgRank");
    await GetLeaderboardPagesAsync("RaidDgRank");
    await GetLeaderboardPagesAsync("DefenceDgRank");
    await GetLeaderboardPagesAsync("OffenceDgRank");
    await GetLeaderboardPagesAsync("SkillDgRank");
    await GetLeaderboardPagesAsync("PVPRank");

    await SendPVPRankScore();
    await WaitForSendRankUIDAsync(uidDIc);

    await Send_TreasureDRankingReward_PostAsync(TreasureDRankRewawrdInfo);
    await Send_RaidDRankingReward_PostAsync(RaidDRankRewawrdInfo);
    await Send_DefenceDRankingReward_PostAsync(DefenceDRankRewawrdInfo);
    await Send_OffenceDRankingReward_PostAsync(OffenceDRankRewawrdInfo);
    await Send_SkillDRankingReward_PostAsync(SkillDRankRewawrdInfo);
    await Send_PVPRankingReward_PostAsync(PVPRankRewawrdInfo);

    // 발송 완료 건수가 대상 건수에 도달할 때까지 프레임을 양보하며 대기
    while (true)
    {
        if (TreasureDRankRewawrdInfo.Count + RaidDRankRewawrdInfo.Count
          + OffenceDRankRewawrdInfo.Count + DefenceDRankRewawrdInfo.Count
          + SkillDRankRewawrdInfo.Count + PVPRankRewawrdInfo.Count <= PostSendCount)
        {
            var request = new PlayFab.AdminModels.SetTitleDataRequest
            {
                Key   = "DungeonSeason",
                Value = (DungeonSeasonNumber + 1).ToString()
            };
            PlayFabAdminAPI.SetTitleData(request, SetTitleData, SetDSeasonError);
            break;
        }
        else
        {
            await UniTask.Yield(PlayerLoopTiming.FixedUpdate);
        }
    }
}
```

</details>

---

### 3-2. 월드 보스 컨텐츠 구현

**개요**

- 전 유저가 협력하여 보스를 공략하는 **'월드 보스 레이드' 시스템의 설계 및 풀 스택 구현**
- 보스 패턴/페이즈 관리 구조 설계 및 대미지 기여도 기반의 실시간 보상 정산 시스템 개발

**문제 상황**

- 클라이언트 중심의 **논서버(Non-Server) 환경으로 인해, 모든 유저가 공유하는 보스의 실시간 체력 상태를
  동기화**하고 관리할 중앙 제어 장치 부재
- 특정 장비 착용 시 가중치가 부여되는 복잡한 대미지 연산 로직과 이에 따른 데이터 무결성 확보 필요

**해결 전략**

- **서버 대체 로직 구축:** `Azure PlayFab`의 **CloudScript**로 보스 체력 차감을 서버 측에서 처리해
  클라이언트가 직접 체력을 쓰지 못하게 하고, 일정 주기마다 데이터를 갱신/초기화하는 컨트롤러 로직 개발
- **데이터 구조 최적화:** 대미지 누적값을 `BigInteger`로 다루고 전송은 문자열로 직렬화해
  int 범위 초과와 REST 통신 횟수를 동시에 관리
- **확장성 있는 패턴 설계:** 보스의 공격 패턴과 페이즈 전환 로직을 모듈화하여,
  향후 신규 보스 추가 시 코드 수정 없이 데이터 설정만으로 대응 가능하도록 구현

**결과**

- 서버리스 환경의 한계를 극복한 대규모 협동 콘텐츠 성공적 런칭
- 특정 장비 시너지 효과로 인한 재화 소모 유도로 **인앱 매출 약 5% 상승** 기여
- (개인적으로 느낀점) 클라이언트-서버 간 데이터 통신 아키텍처를 직접 설계하며 백엔드 연동 흐름에 대한
  구조적 시야를 확보했으며, 향후 대규모 트래픽 처리를 위한 데이터 직렬화 최적화에 대한 통찰을 얻음

<details markdown="1">

<summary>코드 — CloudScript로 공유 보스 체력 차감 (<code>Assets/Script/UI/PopUp/WorldRaidResultPopUp.cs</code>)</summary>

```csharp
/// <summary>
/// PlayFab으로 내가 입힌 누적 대미지 전송.
/// 체력 차감은 클라이언트가 아니라 CloudScript(서버)에서 수행해
/// 모든 유저가 공유하는 보스 HP의 정합성을 확보한다.
/// </summary>
/// <param name="damage">내가 입힌 총 대미지</param>
private async UniTask SendDamage(BigInteger damage)
{
    var request = new PlayFab.ClientModels.ExecuteCloudScriptRequest
    {
        FunctionName = "WorldRaidBossHpCal",
        FunctionParameter = new
        {
            // BigInteger는 JSON 직렬화가 안 되므로 문자열로 전송
            dmg = $"{damage}",
        }
    };

    var sucCode = 0;

    PlayFab.PlayFabClientAPI.ExecuteCloudScript(request,
        result =>
        {
            var resultJsonData = Newtonsoft.Json.JsonConvert
                .DeserializeObject<Dictionary<string, object>>(result.FunctionResult.ToString());

            if (resultJsonData.ContainsKey("newHP"))
            {
                var remaingHp = resultJsonData["newHP"];
            }
            sucCode = 1;
        },
        error =>
        {
            Debug.LogError("에러");
            sucCode = -1;
        });

    await UniTask.WaitUntil(() => sucCode != 0);
}
```

</details>

---

## 관련 공통 모듈

- [광고 수익화 모듈](/portfolio/applovin/) — AppLovin MAX 보상형 광고
