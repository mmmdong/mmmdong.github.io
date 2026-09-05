---
layout: post
title: "픽셀 영웅 전설"
permalink: /portfolio/pixel-heroic-legend/
slug: pixel-heroic-legend
date: 2024-11-01
project: true
group: main
order: 2
tags: [Unity, CSharp, R3, UniTask, PlayFab, BackEnd-Chat]
excerpt: "방치형 파티 RPG. 인게임 프레임워크 리팩터링. R3 상태 제어 기반 전투 코어 엔진과 PVP 전 과정 구현."
toc: true
comments: false
feature: assets/img/portfolio/pixel-hero.jpg
---

<div class="pf-panel">
  <table>
    <tr><td><strong>프로젝트 유형</strong></td><td>상용 출시 · 팀 프로젝트</td></tr>
    <tr><td><strong>기간</strong></td><td>2024.05 ~ 2024.11 (7개월) · 2024.11 출시</td></tr>
    <tr><td><strong>팀 구성</strong></td><td>7명 (기획 1, 아트 4, 개발 2) — 중도 합류 및 교체 인원 포함</td></tr>
    <tr><td><strong>사용 소프트웨어</strong></td><td>Unity, Git, Trello</td></tr>
    <tr><td><strong>사용 언어 · 스택</strong></td><td>C#, R3(UniRx), UniTask, Azure PlayFab, 뒤끝 채팅, IAP</td></tr>
    <tr><td><strong>담당 역할</strong></td><td>전투 코어 로직 설계 및 PVP 시스템 구현, UI/채팅 시스템 개발</td></tr>
    <tr><td><strong>성과</strong></td><td>⭐ 4.6 (AOS) · 4.0 (iOS) &nbsp;|&nbsp; 📥 50K+ &nbsp;|&nbsp; 🌎 Global</td></tr>
    <tr><td><strong>링크</strong></td><td><a href="https://play.google.com/store/apps/details?id=com.dreamplay.pixelheroiclegend.google&hl=ko">Google Play Store</a></td></tr>
  </table>
</div>

## 1) 프로젝트 개요

### 장르 및 플랫폼

- 도트 그래픽 기반의 방치형 파티 RPG (AOS, iOS 출시)
- 도트 그래픽 연출 최적화 및 양대 마켓 런칭 프로세스 수행

### 핵심 컨셉

**다양한 직업군을 활용한 파티 빌딩** — 전사, 아처, 마법사, 힐러 총 4명의 영웅들과 함께
스테이지와 던전을 돌파하는 전략적 구조.

### 주요 특징

- **영웅 수집 및 시너지 로직:** 신화/동화 모티브 영웅들의 고유 스킬 및 파티 시너지가 발휘되는 전투 로직 구현
- **전투 연출 최적화:** 속도감 있는 전투 흐름과 타격감 있는 스킬 연출을 통해 방치형 본연의 재미 확보

---

## 2) 개발 과정

**Engine & Language** `Unity` `C#`

**Work Management** `Trello` — 칸반 보드를 활용하여 기획/아트/개발 간 실시간 태스크 공유 및 일정 관리

**Version Control** `Git` — Git-Flow 기반 브랜치 전략 활용 및 **코드 리뷰**를 통한 코드 품질 유지

---

## 3) 핵심 기술 구현

### 3-1. 메인 전투 로직 신규 개발

<div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
  <img src="/images/portfolio/pixel-hero-legend/state-idle.jpg" alt="대기 상태" style="flex:1; min-width:200px; border-radius:6px;"/>
  <img src="/images/portfolio/pixel-hero-legend/state-move.jpg" alt="이동 상태" style="flex:1; min-width:200px; border-radius:6px;"/>
  <img src="/images/portfolio/pixel-hero-legend/state-attack.jpg" alt="공격 상태" style="flex:1; min-width:200px; border-radius:6px;"/>
</div>

**개요**

- 다수의 캐릭터가 동시에 전투를 수행하는 환경에서, 각 유닛의 AI와 스킬 로직을 안정적으로 처리하는 **전투 코어 엔진 개발**
- `R3`를 이용한 이벤트 기반 상태 제어 및 `UniTask`를 활용한 비동기 전투 흐름 최적화

**문제 상황**

- 기존 프로젝트 대비 좌표계가 3D로 확장됨에 따라 이전의 전투 로직을 재사용하기 어려운 상황 발생
- 다수의 유닛이 복잡한 상태(이동, 공격, 스킬 등)를 동시 수행할 때 발생하는 연산 부하와 스파게티 코드 방지 필요

**해결 전략**

- **이벤트 기반 상태 제어:** 유닛의 상태를 `R3`의 `ReactiveProperty<Enum>`으로 정의하여,
  상태 전이 시 UI와 연출이 즉각 반응하는 디커플링(Decoupling) 아키텍처 설계
- **비동기 흐름 제어:** 기존 코루틴 방식의 한계를 극복하기 위해 `UniTask`를 적극 도입,
  비동기 로직의 가독성을 높이고 실행 효율성 최적화
- **오브젝트 풀링:** 빈번하게 생성/파괴되는 투사체 및 유닛 에셋에 **Object Pooling**을 적용해
  메모리 관리 및 프레임 안정성 확보

**결과**

- 수십 명의 유닛이 격돌하는 상황에서도 성능 저하 없는 안정적인 파티 플레이 환경 구현
- (개인적으로 느낀점) 향후 인터페이스 기반의 FSM(상태 패턴)으로 고도화하여 확장성을 더 높일 수 있다는
  아키텍처적 통찰 확보

#### 상태 전이 구조

![Unit 클래스 상태 전이](/images/diagrams/01-unit-state.svg)

<details markdown="1">

<summary>코드 — 상태 머신과 비동기 전이 (<code>Assets/Scripts/Unit/Unit.cs</code>)</summary>

```csharp
/// <summary>
/// 유닛 초기화 함수.
/// </summary>
public virtual void Init(int unitID = 0)
{
    ...
    stateSubject = state.TakeUntilDestroy(this).Subscribe(ChangeStateCallBack);
    ...
}

/// <summary>
/// 유닛의 상태가 변할 때 마다 호출 될 함수
/// </summary>
/// <param name="state">변경을 원하는 유닛의 상태</param>
private void ChangeStateCallBack(State state)
{
    switch (state)
    {
        case State.NONE:
            scaleCts?.Cancel();
            break;
        case State.IDLE:
            IdleAsync().Forget();
            break;
        case State.MOVE:
            MoveAsync().Forget();
            break;
        case State.ATTACK:
            AttackAsync().Forget();
            break;
        case State.DEAD:
            DeadAsync().Forget();
            break;
        case State.SKILL:
            SkillAsync(curSkillInfo).Forget();
            break;
    }
}

/// <summary>
/// 가만히 있을 때 비동기 함수
/// </summary>
public virtual async UniTask IdleAsync()
{
    cts = new CancellationTokenSource();
    idleCts = new CancellationTokenSource();

    unitAnim.AnimationState.SetAnimation(0, "Idle", true);

    if (BattleManager.Instance.battle is PVPBattle battle)
    {
        await UniTask.WaitUntil(() => battle.battleReady);
    }

    if (PlayerManager.Instance.currentCharacter == this)
    {
        await UniTask.WaitUntil(() => !isStickMove && state.Value != State.SKILL,
                                cancellationToken: idleCts.Token);
    }
}

/// <summary>
/// 움직일 때 비동기 함수
/// </summary>
protected virtual async UniTask MoveAsync()
{
    cts = new CancellationTokenSource();

    if (buffMgr.activeBuffEffectList.ContainsKey(1000003))
        unitAnim.AnimationState.SetAnimation(0, "Idle", true);
    else
        unitAnim.AnimationState.SetAnimation(0, "Move", true);

    var distance = 0f;
    var size = unitAnim.transform.localScale.y;

    // 타겟을 공격할 수 있는 최대 거리까지 이동
    while (true)
    {
        if (isStickMove)
            break;

        if (targetEnemy == null || targetEnemy.state.Value == State.DEAD
            || COMMON.Instance.CannotMoveCk(this))
        {
            ChangeState(State.IDLE);
            break;
        }

        MoveEffect(true);
        unitAnim.transform.localScale = rigid.position.x - targetEnemy.rigid.position.x < 0
            ? Vector3.one * size
            : Vector3.one * size + Vector3.left * size * 2f;

        var move = rigid.position
                 + (targetEnemy.rigid.position - rigid.position).normalized * unitSpeed * Time.deltaTime;

        // 이동속도에 따른 애니메이션 속도 조절
        unitAnim.timeScale = unitSpeed / oriSpeed;

        if (state.Value == State.DEAD)
            return;

        distance = (rigid.position - targetEnemy.rigid.position).magnitude;

        // 위에서 계산된 거리가 공격 사거리보다 짧으면 공격 시작
        if (distance <= attackRange)
        {
            ChangeState(State.ATTACK);
            break;
        }

        await UniTask.Delay(0, cancellationToken: cts.Token);
    }
}

/// <summary>
/// 공격 비동기 함수
/// </summary>
protected virtual async UniTask AttackAsync()
{
    cts = new CancellationTokenSource();

    while (true)
    {
        // 타겟이 없거나 죽었을 경우
        if (targetEnemy == null || targetEnemy.state.Value == State.DEAD
            || COMMON.Instance.CannotAttackCk(this))
        {
            ChangeState(State.IDLE);
            break;
        }

        var targetDistance = (rigid.position - targetEnemy.rigid.position).magnitude;

        if (targetDistance > attackRange)
        {
            ChangeState(State.MOVE);
            break;
        }

        if (targetEnemy.state.Value != State.DEAD)
        {
            var attackSpeed = data.Final_ASPD;
            unitAnim.timeScale = attackSpeed;

            if (attackType == AttackType.Ranged || attackType == AttackType.Magic)
                targetPos = targetEnemy.hitFollower.transform.position;

            StartAttackAnimation();

            // 애니메이션 재생 시간만큼 대기
            var sub = 1f;
            var duration = unitAnim.skeleton.Data.FindAnimation(unitAnim.AnimationName).Duration;

            if (attackSpeed > 0)
                sub = 1 / attackSpeed;

            await Delay((int)((duration * sub) * 1000f));

            if (targetEnemy == null || targetEnemy.state.Value == State.DEAD)
            {
                ChangeState(State.IDLE);
                break;
            }
            else if (this is Enemy)
            {
                unitAnim.AnimationState.SetAnimation(0, "Idle", true);
                await Delay((int)(attackRatio * 1000f / attackSpeed));
            }
        }

        await UniTask.Delay(0, cancellationToken: cts.Token);
    }
}

/// <summary>
/// 죽을 때 비동기 함수 — 구독 해제와 이펙트 정리를 한 곳에서 수행
/// </summary>
public virtual async UniTask DeadAsync()
{
    cts = new CancellationTokenSource();

    unitAnim.AnimationState.SetAnimation(0, "Dead", false);

    foreach (var item in buffMgr.activeAbilityEffectList)
        item.Value.RemoveEffect(this);
    foreach (var item in buffMgr.activeBuffEffectList)
        item.Value.RemoveEffect(this, BUFFACTIONTYPE.DEAD);
    buffMgr.StopAllBuff();

    mpSubject?.Dispose();
    hpSubject?.Dispose();
    stateSubject?.Dispose();
    disarraySubject?.Dispose();

    scaleCts?.Cancel();
    mpBar?.gameObject.SetActive(false);

    await UniTask.WaitUntil(() => hpBackBar.value <= 0f, cancellationToken: cts.Token);

    var effects = GetComponentsInChildren<Effect>(true);
    foreach (var effect in effects)
        effect.Destroy();

    hpBackBar.gameObject.SetActive(false);
}

/// <summary>
/// 스킬을 사용할 때 비동기 함수
/// </summary>
protected virtual async UniTask SkillAsync(DATA.Skill skillInfo)
{
    cts = new CancellationTokenSource();

    if (skillInfo == null)
        await UniTask.WaitUntil(() => skillInfo != null);

    curSkill = skillInfo;

    var delay = skillInfo.Duration * 1000f;
    await UniTask.Delay((int)delay, cancellationToken: cts.Token);

    if (state.Value != State.DEAD)
        ChangeState(State.IDLE);
}
```

</details>

---

### 3-2. PVP 시스템 개발

<div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
  <img src="/images/portfolio/pixel-hero-legend/pvp-lobby.jpg" alt="PVP 도전표" style="flex:1; min-width:200px; border-radius:6px;"/>
  <img src="/images/portfolio/pixel-hero-legend/pvp-ingame-1.jpg" alt="PVP 인게임" style="flex:1; min-width:200px; border-radius:6px;"/>
</div>

**개요**

- 유저 간 경쟁을 위한 **PVP 대전 시스템의 전 과정(데이터 동기화, 승패 판정, 랭킹 연동) 개발**
- `Azure PlayFab`을 활용한 서버리스 환경에서의 안정적인 리더보드 서비스 구축

**문제 상황**

- 서버리스(Non-server) 특성상 모든 데이터 처리가 Web API 호출로 이루어져,
  **빈번한 리더보드 호출 시 통신 부하 및 비효율적인 리소스 소모** 우려
- 상대 유저 데이터 패칭(Fetching) 시 불필요한 정보까지 수신되어 발생하는 오버헤드 관리 필요

**해결 전략**

- **호출 빈도 최적화:** PVP 대기 화면 진입 시마다 리스트를 갱신하는 대신,
  최초 오픈 시 PlayFab 데이터에 상대 리스트를 저장하여 불필요한 Web 호출을 최소화
- **갱신 트리거 설계:** 정해진 전투 횟수(4회) 완료 혹은 유저의 명시적 '새로고침' 시에만
  리더보드를 호출하도록 로직을 설계하여 네트워크 성능 확보
- **비동기 처리:** `UniTask`를 활용해 대전 데이터 로드 및 결과 반영 중에도 UI 흐름이 끊기지 않도록 비동기 환경 조성

**결과**

- 서버 비용 절감 및 네트워크 부하를 줄인 안정적인 실시간 경쟁 컨텐츠 구현
- (개인적으로 느낀점) PlayFab 데이터 관리 시 필요한 정보만 선별적으로 추출할 수 있는
  **데이터 직렬화 구조의 사전 설계**가 중요함을 체감했으며, 향후 MMR 기반의 정교한 매칭 알고리즘 도입을 고려하는 계기가 됨

<details markdown="1">

<summary>코드 — 리더보드 호출 최적화 (<code>Assets/Scripts/Managers/PlayFabManager.cs</code>)</summary>

```csharp
/// <summary>
/// PVP 랭킹 데이터 가져오기
/// </summary>
public async UniTask GetPVPRankingData()
{
    rankCts?.Cancel();
    rankCts = new CancellationTokenSource();

    var req = new GetLeaderboardAroundPlayerRequest()
    {
        StatisticName = "PVPRank",
        MaxResultsCount = 61, // 본인 포함 위로 30명 아래로 30명 호출
        ProfileConstraints = new PlayerProfileViewConstraints()
        {
            ShowLocations = true,
            ShowDisplayName = true,
        }
    };

    // 최초로 PVP 컨텐츠가 오픈 되었을 경우에만 리더보드를 호출한다
    if (DBManager.Instance.playerData._UserData.pvpInfo.pvpUIDList.Count <= 0)
    {
        var successCode = 0;
        PlayFabClientAPI.GetLeaderboardAroundPlayer(req, async result =>
        {
            pvpRankInfoList.Clear();
            var leaderBoard = result.Leaderboard.Where(x => x.StatValue >= 0).ToList();

            for (var i = 0; i < leaderBoard.Count; i++)
            {
                var rankData = new RankData
                {
                    NickName  = leaderBoard[i].DisplayName,
                    Ranking   = leaderBoard[i].Position,
                    UID       = leaderBoard[i].PlayFabId,
                    PVPScore  = leaderBoard[i].StatValue,
                    Index     = i
                };
                pvpRankInfoList.Add(i, rankData);
            }

            await SetPVPData();
            successCode = 1;
        }, error => { successCode = -1; });

        await UniTask.WaitUntil(() => successCode != 0, cancellationToken: rankCts.Token);
    }
    else
    {
        // 이미 저장된 상대 목록이 있으면 Web 호출 없이 캐시에서 구성한다
        foreach (var item in DBManager.Instance.playerData._UserData.pvpInfo.pvpUIDList)
        {
            await GetUserDataInfoInit(item);
            var rankData = await GetUserRankData("PVPRank", item);
            pvpRankDataList.Add(rankData);
        }
    }
}
```

</details>

<details markdown="1">

<summary>코드 — 난이도별 4슬롯 매칭 구성 (<code>Assets/Scripts/Managers/PlayFabManager.cs</code>)</summary>

```csharp
/// <summary>
/// 실제 PVP 데이터 세팅 함수
/// 상대가 부족하면 StageRank 리더보드에서 보충하고,
/// 난이도(어려움/보통/쉬움)별로 4개 슬롯을 채운다.
/// </summary>
private async UniTask SetPVPData()
{
    var myTempRankData = new RankData();

    #region 대전 상대가 부족하면 StageRank에서 더 가져온다.
    var req = new GetLeaderboardAroundPlayerRequest()
    {
        StatisticName = "StageRank",
        MaxResultsCount = 61,
        ProfileConstraints = new PlayerProfileViewConstraints()
        {
            ShowLocations = true,
            ShowDisplayName = true,
        }
    };

    var sucCode = 0;
    PlayFabClientAPI.GetLeaderboardAroundPlayer(req, result =>
    {
        sucCode = 1;
        var leaderBoard = result.Leaderboard.Where(x => x.StatValue > 0).ToList();
        tempRankInfoList = new Dictionary<int, RankData>();

        for (var i = 0; i < leaderBoard.Count; i++)
        {
            // StatValue를 챕터/스테이지로 분해해 하한선 미만 유저는 제외
            var stageValue = $"{leaderBoard[i].StatValue}";
            if (stageValue.Length < 8)
            {
                if (stageValue.Length <= 1) { sucCode = 2; break; }
                stageValue = $"0{leaderBoard[i].StatValue}";
            }

            var chapter = int.Parse($"{stageValue[0]}{stageValue[1]}");
            var stage   = int.Parse($"{stageValue[2]}{stageValue[3]}");

            if (chapter < 2) continue;
            if (chapter == 2 && stage < 25) continue;

            var rankData = new RankData
            {
                NickName = leaderBoard[i].DisplayName,
                Ranking  = leaderBoard[i].Position,
                UID      = leaderBoard[i].PlayFabId,
            };

            if (rankData.UID == DBManager.Instance.playerData._UserData.userInfo.UserUID)
                myTempRankData = rankData;
            else
            {
                rankData.Index = -1;
                tempRankInfoList.Add(i, rankData);
            }
        }
    }, error => { sucCode = -1; });

    await UniTask.WaitUntil(() => sucCode != 0, cancellationToken: rankCts.Token);
    #endregion

    if (sucCode == 2) return;

    // 내 랭킹과의 차이로 난이도 풀을 나눈다
    var myDBRankData = DBManager.Instance.playerData._UserData.pvpInfo.myRankData;

    var diffPvpList   = pvpRankInfoList.Values
        .Where(x => x.Ranking - myDBRankData.Ranking <= 3 && x.UID != myDBRankData.UID)
        .Select(x => x.UID).ToList();

    var norPvpList    = pvpRankInfoList.Values
        .Where(x => x.Ranking - myDBRankData.Ranking > 3 && x.Ranking - myDBRankData.Ranking <= 8)
        .Select(x => x.UID).ToList();

    var easyList      = tempRankInfoList.Values
        .Where(x => x.Ranking - myTempRankData.Ranking > 8)
        .Select(x => x.UID).ToList();

    // 1번 슬롯 = 어려움, 2·3번 = 보통, 4번 = 쉬움 순으로 채우고
    // 풀이 비면 StageRank 기반 풀에서 대체한다 (중복 방지)
    var rankList = new Dictionary<string, int>();
    // ... 슬롯별 선택 로직 ...

    pvpPlayerList.Clear();
    foreach (var item in rankList)
        await GetUserDataInfo(item.Key, item.Value);

    DataSave(true);
}
```

</details>

---

## 관련 공통 모듈

- [실시간 채팅 시스템](/portfolio/chat-system/) — 뒤끝 SDK 기반 채널별 메시징
- [광고 수익화 모듈](/portfolio/applovin/) — AppLovin MAX 보상형 광고
