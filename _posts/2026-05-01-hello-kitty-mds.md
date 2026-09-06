---
layout: post
title: "헬로키티 마이 드림 스토어"
permalink: /portfolio/hello-kitty-mds/
slug: hello-kitty-mds
date: 2026-05-01
project: true
group: casual
order: 1
icons:
  - {file: hello-kitty-mds.png, alt: "헬로키티 마이 드림 스토어 앱 아이콘"}
tags: [Unity, CSharp, UniTask, DOTween, Spine, SocketIO, HybridCLR]
excerpt: "산리오 IP 머지 퍼즐. 이미 서비스 중인 타이틀에 라이브 이벤트 컨텐츠 5종을 얹었습니다. 본편 공용 코드를 건드리지 않는 additive 설계와, 서버 권위와 클라이언트 시뮬레이션의 경계 설계가 축이었습니다."
stats:
  - {k: 운영, v: "2026.05 ~ 재직 중"}
  - {k: 평점, v: "4.3 (AOS) · 4.1 (iOS)"}
  - {k: 다운로드, v: "100만+"}
  - {k: 플랫폼, v: "Android · iOS"}
stores:
  - {name: "Google Play", url: "https://play.google.com/store/apps/details?id=com.actgames.HelloKittyMDS&hl=ko"}
  - {name: "App Store", url: "https://apps.apple.com/kr/app/id6736896540"}
toc: true
comments: false
feature: assets/img/portfolio/hello-kitty-mds.jpg
---

<div class="pf-panel">
  <table>
    <tr><td><strong>프로젝트 유형</strong></td><td>상용 서비스 · 라이브 이벤트 컨텐츠 개발</td></tr>
    <tr><td><strong>기간</strong></td><td>2026.05 ~ 재직 중</td></tr>
    <tr><td><strong>사용 소프트웨어</strong></td><td>Unity, Git</td></tr>
    <tr><td><strong>사용 언어 · 스택</strong></td><td>C#, UniTask, DOTween, Spine, SocketIO, CSV TableManager, HybridCLR</td></tr>
    <tr><td><strong>담당 역할</strong></td><td>라이브 이벤트 컨텐츠 5종 클라이언트 구현 참여 (64개 파일 / 24,179 라인)</td></tr>
    <tr><td><strong>성과</strong></td><td>⭐ 4.3 (AOS) · 4.1 (iOS) &nbsp;|&nbsp; 📥 100만+ &nbsp;|&nbsp; 🌎 Global</td></tr>
    <tr><td><strong>링크</strong></td><td><a href="https://play.google.com/store/apps/details?id=com.actgames.HelloKittyMDS&hl=ko">Google Play Store</a> &middot; <a href="https://apps.apple.com/kr/app/id6736896540">App Store</a></td></tr>
    <tr><td><strong>코드</strong></td><td><a href="https://github.com/mmmdong/portfolio-code/tree/main/hello-kitty-mds">GitHub</a> — 라이브 이벤트 5종 (64개 파일)</td></tr>
  </table>
</div>

## 1) 프로젝트 개요

### 장르 및 플랫폼

- 산리오 IP 기반 머지(Merge) 퍼즐 · 상점 꾸미기 (AOS / iOS · 글로벌)
- 캐나다 소프트 론칭을 거쳐 중국 제외 글로벌 출시 · 2026.02 일본 양대 마켓 인기 1위
- Google Play 기준 **4.3★ · 리뷰 2.48만 · 100만+ 다운로드** (2026.09 확인)

### 핵심 컨셉

**머지로 되살리는 나만의 상점가** — 헬로키티 · 마이멜로디 · 쿠로미 · 시나모롤 등 산리오
캐릭터를 고용해 쇠퇴한 상점가를 복원해 나가는 구조.

### 담당 범위

이미 서비스 중인 타이틀에 **라이브 이벤트 컨텐츠를 얹는 작업**을 담당했습니다.
운영 중인 본편 공용 코드를 건드리지 않으면서 운영 주기에 맞춰 컨텐츠를 붙였다 떼는 것이
설계의 축이었습니다. 시즌 메타 시스템 · 경쟁형 이벤트 · 아케이드 미니게임 · 서브 컨텐츠
퍼즐 · 수집형 이벤트까지 성격이 다른 **5종**을 다뤘습니다.

| 컨텐츠 | 성격 | 파일 | 라인 |
|---|---|---:|---:|
| 트로피 챌린지 | 시즌제 도전과제 메타 시스템 | 19 | 3,512 |
| 드림 벌룬 페스티벌 | 경쟁형 라이브 이벤트 | 12 | 8,403 |
| 당근 수확 대소동 | 아케이드 미니게임 (두더지 잡기) | 13 | 4,517 |
| 생일 카페 — 풍선 게임 | 서브 컨텐츠형 퍼즐 미니게임 | 12 | 4,506 |
| 4 Drop Item | 머지판 연동 수집형 이벤트 | 8 | 3,241 |

---

## 2) 개발 과정

**Engine & Language** `Unity` `C#`

**Async** `UniTask` + `CancellationToken` 기반 수명 관리 — 팝업 종료 · 씬 전환 시 잔여 비동기 작업 안전 취소

**연출** `DOTween`, `Spine`(`SkeletonGraphic`)

**통신** SocketIO 실서버 + **FakeServer(Fs) 로컬 시뮬레이터 이중 경로** — 서버 미구현 구간에서도 클라이언트 단독 검증 가능

**데이터** CSV 테이블 → `TableManager` 조회. 수치 하드코딩 금지, 미발행 시 폴백 처리

**모듈 결합** 메시지 버스(`BaseMessage` / `Message.SendMessage`)로 컨텐츠 간 직접 참조 차단

**화면 전환** 어드레서블 기반 `UIManager` / **배포** `HybridCLR` 핫업데이트 대응

**Version Control** `Git` — 글로벌 브랜치를 스쿼시 머지로 받는 멀티 브랜치 운영 환경

**명세 대응** 기획 명세 → 설계 → 구현 → 라이브 대응. 명세가 서로 모순될 때는 추정으로 넘기지 않고
**CSV 전수 실측으로 규약을 검증**한 뒤 결론과 근거를 코드 주석에 남기는 방식으로 처리

---

## 3) 핵심 기술 구현

### 3-1. 4 Drop Item — 명세가 모순일 때 무엇을 상수로 박지 않을 것인가

<div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
  <img src="/images/portfolio/hello-kitty-mds/fdi-start.jpg" alt="4 Drop Item 이벤트 시작 팝업" style="flex:1; min-width:150px; border-radius:6px;"/>
  <img src="/images/portfolio/hello-kitty-mds/fdi-main.jpg" alt="머지판 — 블록 소환 및 잠금 해제" style="flex:1; min-width:150px; border-radius:6px;"/>
  <img src="/images/portfolio/hello-kitty-mds/fdi-book.jpg" alt="도감 화면" style="flex:1; min-width:150px; border-radius:6px;"/>
</div>

머지판에 블록을 소환해 도감을 채우는 수집형 이벤트. **설계부터 구현까지 전 과정을 단독 담당**했습니다
(8개 파일 68건 커밋 전부 단일 작성자).
라이브 중인 머지 본편의 공용 코드를 수정하지 않는 것을 전제로, 전용 헬퍼를 신설하고 기존 규약은
재사용만 하는 additive 구조로 설계했습니다.

**문제 상황**

- 기획서가 같은 수치("N단계")를 **두 절에서 서로 다르게** 적어 둔 모순 상태였습니다. 어느 쪽을 상수로 박아도 한쪽 명세를 위반합니다.
- 주기 판정 플래그 `cycleChk` 의 의미가 문서상 두 번 뒤집혀 있어, 원시값을 그대로 비교하면 정반대 동작을 하게 됩니다.

**해결 전략**

- **판정 축 전환** — 단계 수치를 상수화하는 대신 "더 이상 업그레이드가 없는 **최종 단계인가**"로만 판정하도록 바꿨습니다. 수치가 바뀌어도 CSV 행 수만 바뀝니다.
- **규약을 실측으로 검증** — `MergeEvent_Block_Main.csv` 의 `upBlockIdx` 가 자기참조가 아니라 '없음 = 0' 규약임을 전수 확인(dangling 참조 0건)하고, 이미 그 규약을 코드로 표현한 `FsEventBlockData.IsMaxLevel()` 을 재사용했습니다.
- **오해 재발 차단** — `cycleChk` 는 원시값 비교를 금지하고 상수 경유를 강제했으며, 확률 분포를 직접 계산해 잘못된 해석을 반증한 과정을 주석으로 보존했습니다.

**결과** — 본편 공용 코드 변경 0건으로 이벤트 추가 완료(이벤트 종료 시 롤백 리스크 제거).
명세 모순이 코드에 상수로 굳지 않아, 이후 수치 변경이 CSV 수정만으로 반영됩니다.

<details markdown="1">

<summary>코드 — 전용 헬퍼와 규약 상수 (<code>MergeEventFourDropItemHelper.cs</code>)</summary>

```csharp
/// <summary>
/// FourDropItem 전용 보조 헬퍼(활성화/방출 메커니즘 + 성장 블록 재화 배수).
/// 공용 헬퍼(MergeEventHelper)를 건드리지 않으려고 분리한 파일이라
/// FourDropItem 외 경로에서는 호출되지 않는다(additive).
///
/// 단계 수치를 상수로 박지 않는 이유: 기획서가 "N단계"의 N을 두 절에서 서로 다르게 적어 모순 상태다.
/// 그래서 "더 이상 업그레이드가 없는 최종 단계인가"로만 판정한다(수치가 바뀌어도 CSV 행 수만 바뀐다).
/// 최종 단계 규약은 CSV 실측으로 확인했다 — MergeEvent_Block_Main.csv 의 upBlockIdx 는 자기참조가 아니라
/// '없음 = 0' 규약이고(dangling 참조 0건), 그룹 내 최고 blockLevel 행이 0을 갖는다.
/// 이 규약을 이미 코드로 표현한 것이 FsEventBlockData.IsMaxLevel() 이라 그대로 재사용한다.
/// </summary>
public static class MergeEventFourDropItemHelper
{
    // MergeEvent_FourDropItemCycle.cycleChk 규약.
    // 원시값(0/1) 직접 비교 금지 — 문서상 의미가 두 번 뒤집혔던 플래그라 반드시 상수를 경유한다.
    public const int CYCLE_CHK_USE   = 1;
    public const int CYCLE_CHK_UNUSE = 0;

    // 확률은 만분율 정수로 다룬다(부동소수 누적오차 제거).
    public const int RARE_RATE_DENOMINATOR = 10000;
}
```

</details>

---

### 3-2. 드림 벌룬 페스티벌 — 좌석을 통신이 아니라 시각의 함수로

<div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
  <img src="/images/portfolio/hello-kitty-mds/balloon-start.jpg" alt="난이도 선택 시작 화면" style="flex:1; min-width:150px; border-radius:6px;"/>
  <img src="/images/portfolio/hello-kitty-mds/balloon-main.jpg" alt="드림 벌룬 페스티벌 진행 화면" style="flex:1; min-width:150px; border-radius:6px;"/>
  <img src="/images/portfolio/hello-kitty-mds/balloon-info.jpg" alt="드림 벌룬 페스티벌 이벤트 안내" style="flex:1; min-width:150px; border-radius:6px;"/>
</div>

난이도를 골라 참가하고, 줄어드는 좌석을 두고 AI와 경쟁하는 경쟁형 라이브 이벤트입니다.
**서버 권위(상태 · 라운드 · 코인)와 클라이언트 시뮬(좌석 감소 · 순위 · 성패 판정)의 경계**를
나누는 것이 설계의 핵심이었습니다.

**문제 상황**

- 좌석을 서버가 매번 내려주면 통신량이 커지고, 클라이언트가 타이머로 세면 **백그라운드 복귀 · 재접속 시 위상이 어긋납니다.**
- 난이도 값이 프리팹 → UI → 패킷 → 서버로 넘어가며 여러 번 변환되어, 잘못된 난이도의 보상 행이 정상값처럼 반환되는 **사일런트 버그** 위험이 있었습니다.

**해결 전략**

- **좌석을 시각의 함수로 정의** — 좌석 수를 서버 `roundStartAt` 이후 **경과 시간의 결정론적 함수**로 구현했습니다. 라운드별 시드(`eventSeq` · `round`)로 감소 간격 수열을 재현하므로, 언제 호출해도 같은 경과에 같은 값이 나옵니다 → 로컬 저장 불필요, 좌석 동기화 통신 0회.
- **판정과 연출 분리** — 성패 판정을 연출에서 떼어내 연출 스킵 · 강제 종료에도 데이터 무결성을 유지했습니다.
- **난이도 변환 0회 계약** — 난이도를 프리팹부터 서버까지 `const int` 로 관통시켜 변환을 없애고, **미지정(-1) 가드를 4곳에 도입**해 잘못된 값이 정상 경로로 흘러가지 못하게 막았습니다. *(난이도 인코딩 통일과 가드 도입은 직접 작업분입니다.)*

**결과** — 오프라인 진행 · 백그라운드 복귀 후에도 좌석 위상이 어긋나지 않는 재현 가능한 시뮬레이션 확보.
좌석 동기화용 서버 통신 제거로 라운드당 통신량 감소.

<details markdown="1">

<summary>코드 — 경과 시간으로 좌석 감소를 재현하는 결정론적 시뮬레이션</summary>

```csharp
/// <summary>
/// 경과 초(elapsedSec)까지 이미 발생한 좌석 감소 횟수를 결정론적으로 재현한다.
/// 라운드별 시드로 감소 간격 수열을 재생성하므로, 재접속·복귀로 언제 호출해도 같은 경과에 같은 횟수가 나온다.
/// 반환 후 decayRng 는 "다음 감소" 직전에 위치하며, out 으로 그 감소까지의 남은 대기 초를 돌려준다.
/// </summary>
private int SimulateElapsed(long elapsedSec, out double nextWaitSec)
{
    decayRng = new System.Random(ComputeSeed());

    long cumulative = 0;
    int decays = 0;
    while (decays < slotMax)
    {
        int interval = decayRng.Next(decayMinSec, decayMaxSec + 1);   // [min, max] 폐구간(상한 배타 → +1)
        if (cumulative + interval > elapsedSec)
        {
            nextWaitSec = (cumulative + interval) - elapsedSec;   // 현재 간격의 남은 부분만 대기(위상 정합)
            return decays;
        }

        cumulative += interval;
        decays++;
    }

    nextWaitSec = 0d;   // 모든 좌석 소진
    return decays;
}

// 라운드별 안정 시드 — eventSeq·round 로 결정(재접속 시 동일 수열 재현).
private int ComputeSeed()
{
    return unchecked((int)(eventSeq * 486187739L) + curRound);
}
```

</details>

---

### 3-3. 트로피 챌린지 — 메타 레이어가 컨텐츠를 모르게 하기

<div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
  <img src="/images/portfolio/hello-kitty-mds/trophy-main.jpg" alt="트로피 챌린지 메인 화면" style="flex:1; min-width:180px; border-radius:6px;"/>
  <img src="/images/portfolio/hello-kitty-mds/trophy-info.jpg" alt="트로피 챌린지 컨텐츠 정보" style="flex:1; min-width:180px; border-radius:6px;"/>
</div>

여러 라이브 이벤트의 플레이를 **하나의 시즌 도전과제로 묶어** 최종 보상을 주는 메타 레이어입니다.

**문제 상황**

- 메타 레이어가 각 이벤트를 알고, 각 이벤트도 메타를 알게 되면 **양방향 의존**이 생겨 이벤트를 추가 · 제거할 때마다 양쪽을 고쳐야 합니다.
- 시즌 기간 · 유저 참여 기간 · 개별 챌린지 기간이 서로 다른 축으로 움직여 상태 판정이 복잡해집니다.

**해결 전략**

- **DIP 3축 분리** — 매니저가 구현이 아닌 인터페이스에만 의존하도록 `IRepository`(저장) / `IStateEvaluator`(상태 판정) / `ISortPolicy`(정렬)로 책임을 갈랐습니다. 정렬 · UI · 레드닷은 평가 결과 타입에만 의존합니다.
- **역방향 의존 차단** — 다른 라이브 이벤트는 `OnProgressTrophyChallenge(조건타입, 값, 1)` 하나만 호출하고 트로피의 내부 구조를 전혀 모릅니다.
- **판정 로직의 순수화** — 상태 판정을 전부 `static` 순수 함수로 구현해 엔진 비의존 · 단위 테스트 가능하게 만들었습니다. 시즌 / 유저 / 챌린지 3축 기간을 독립적으로 판정합니다.
- **1회 노출 이중 가드** — 시작 팝업 중복 노출을 세션 가드(`HashSet`) + 영속 가드(`PlayerPrefs` 단일 키, `trophyId` 단조 증가 이용)로 이중화했습니다.

**결과** — 이벤트를 추가해도 메타 레이어 코드 변경 없이 진행도가 집계됩니다.
상태 판정이 엔진과 분리되어 재현 가능한 검증이 가능해졌습니다.

<details markdown="1">

<summary>코드 — 상태 판정 책임만 분리한 인터페이스</summary>

```csharp
namespace GameLogic.TrophyChallenge
{
    // 한 챌린지의 현재 상태를 결정하는 책임 (단일 책임).
    // 정렬 정책 / UI / 레드닷은 평가 결과(TrophyChallengeState)에만 의존한다.
    public interface ITrophyChallengeStateEvaluator
    {
        TrophyChallengeState Evaluate(
            TrophyMasterPacketData master,
            TrophyInfoPacketData info,
            TrophyChallengePacketData challenge,
            TrophyMissionGroupPacketData groupRow,
            int requiredCount,
            int currentLevel,
            long currentEpochSeconds);
    }
}
```

</details>

---

### 3-4. 당근 수확 대소동 — 엔진 없이 검증되는 확률과 점수

<div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
  <img src="/images/portfolio/hello-kitty-mds/carrot-main.jpg" alt="당근 수확 대소동 메인 화면" style="flex:1; min-width:130px; border-radius:6px;"/>
  <img src="/images/portfolio/hello-kitty-mds/carrot-ingame.jpg" alt="당근 수확 대소동 인게임 플레이" style="flex:1; min-width:130px; border-radius:6px;"/>
  <img src="/images/portfolio/hello-kitty-mds/carrot-info-1.jpg" alt="당근 수확 대소동 게임 안내 (1/2)" style="flex:1; min-width:130px; border-radius:6px;"/>
  <img src="/images/portfolio/hello-kitty-mds/carrot-info-2.jpg" alt="당근 수확 대소동 게임 안내 (2/2)" style="flex:1; min-width:130px; border-radius:6px;"/>
</div>

20초 동안 구멍에서 튀어나오는 당근을 터치하는 아케이드 미니게임입니다. 컨텐츠 구현에 참여했습니다.

**문제 상황**

- 미니게임 로직이 Unity 컴포넌트에 얽히면 확률 · 점수 같은 규칙을 엔진 없이 검증할 방법이 없습니다.
- 20초 내내 매 프레임 스폰과 판정이 돌아가는 구조라, 프레임마다 할당이 생기면 GC 가 세션 중간에 끊김을 만듭니다.
- 복귀 애니메이션이 돌고 있는 구멍을 "비어 있다"고 판단하면 같은 자리에 겹쳐 스폰됩니다.

**해결 전략**

- **모델과 뷰의 완전 분리** — 순수 C# 모델 3종(보드 상태머신 / 등장 추첨 / 점수 · 콤보)을 Unity 뷰에서 떼어내 `UnityEngine.Random` 외 엔진 의존을 없앴습니다 → 엔진 없이 재현 검증 가능.
- **확률 규칙의 정수화** — 가중치 랜덤 위에 **천장(pity)과 판당 최대치 제약**을 래핑하고, 확률은 만분율 **정수**로 계산해 부동소수 누적오차를 제거했습니다.
- **GC 할당 제거** — 매 프레임 `Tick` 이 새 컬렉션을 만들지 않고 **호출측 재사용 버퍼를 채우도록** 설계했습니다.
- **연출과 판정의 틈 제거** — 구멍 상태를 struct 배열로 관리하고 `Returning` 플래그로 복귀 애니메이션 중에도 점유를 유지했습니다.

**결과** — 20초 세션 내내 GC 유발 없는 안정적인 프레임 확보.
확률 · 점수 로직을 엔진 없이 단위 검증할 수 있는 구조.

<details markdown="1">

<summary>코드 — 천장·최대치 제약을 얹은 등장 추첨기 (<code>EventCarrotSpawnSelector.cs</code>)</summary>

```csharp
/// <summary>
/// 당근 수확 대소동 — 한 판(기본 20초) 동안 유지되는 당근 등장 추첨기.
///
/// 등장 "종류"(가중치 랜덤 + 천장/최대치 제약)와 등장 "위치"(빈 구멍 셔플)를 분리해 처리한다.
/// - 순수 가중치 랜덤만으로는 superMax(게임당 최대)·superPityCount(천장) 스펙을 충족하지 못하므로
///   기존 가중치 유틸 위에 제약 로직을 래핑한다.
/// - 가중치는 appearRate(만분율)를 정수 그대로 사용(부동소수 누적오차 방지).
/// </summary>
public sealed class EventCarrotSpawnSelector
{
    private const int TYPE_COUNT = 3;   // EventCarrotType 개수 (Normal/Rare/SuperRare)

    private readonly int[] baseWeights;     // appearRate(만분율) [일반, 레어, 슈퍼]
    private readonly int superPityCount;    // 슈퍼 레어 등장 천장 카운트
    private readonly int superMax;          // 한 판당 슈퍼 레어 최대 등장 수
    private readonly int[] effectiveWeights = new int[TYPE_COUNT];   // 매 스폰 재사용 버퍼

    private int pityCounter;        // 슈퍼 미등장 누적(일반/레어 등장마다 +1)
    private int superSpawnedCount;  // 이번 판 슈퍼 등장 수

    /// <summary>다음에 등장할 당근 종류를 추첨한다. 매 스폰 1회 호출.</summary>
    public EventCarrotType Next()
    {
        var superExhausted = superSpawnedCount >= superMax;

        // 천장 도달 시 슈퍼 강제 등장(아직 최대 등장 수에 여유가 있을 때만)
        if (!superExhausted && superPityCount > 0 && pityCounter >= superPityCount)
        {
            return MarkSpawn(EventCarrotType.SuperRare);
        }

        // 유효 가중치 구성 — 슈퍼가 소진되면 슈퍼 가중치를 0 으로 제외
        effectiveWeights[(int)EventCarrotType.Normal]    = baseWeights[(int)EventCarrotType.Normal];
        effectiveWeights[(int)EventCarrotType.Rare]      = baseWeights[(int)EventCarrotType.Rare];
        effectiveWeights[(int)EventCarrotType.SuperRare] = superExhausted ? 0 : baseWeights[(int)EventCarrotType.SuperRare];

        var idx = effectiveWeights.GetWeightedRandomIndex();   // 기존 가중치 랜덤 유틸 재사용
        var picked = idx >= 0 ? (EventCarrotType)idx : EventCarrotType.Normal;   // 합이 0 이면 일반으로 폴백
        return MarkSpawn(picked);
    }

    /// <summary>
    /// 비어 있는 구멍 후보에서 이번에 스폰할 위치를 count 개까지 선택한다.
    /// 가중치 랜덤이 아니라 부분 Fisher-Yates 셔플 후 앞에서 N 개 취득.
    /// result 는 호출측이 재사용하는 버퍼라 스폰마다 새 리스트를 만들지 않는다.
    /// </summary>
    public void PickSpawnPositions(List<int> freeHoles, int count, List<int> result)
    {
        result.Clear();
        if (freeHoles.IsNullOrEmpty() || count <= 0)
            return;

        freeHoles.ShuffleRandom();      // 기존 셔플 유틸 재사용
        var pick = Mathf.Min(count, freeHoles.Count);
        for (var i = 0; i < pick; i++)
            result.Add(freeHoles[i]);
    }
}
```

</details>

---

### 3-5. 생일 카페 풍선 게임 — 상속 대신 합성으로 서브 컨텐츠 붙이기

<div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
  <img src="/images/portfolio/hello-kitty-mds/cafe-balloon.jpg" alt="생일 카페 풍선 게임" style="flex:1; min-width:180px; border-radius:6px;"/>
  <img src="/images/portfolio/hello-kitty-mds/cafe-puzzle.jpg" alt="생일 카페 퍼즐 화면" style="flex:1; min-width:180px; border-radius:6px;"/>
</div>

카페 오브젝트에서 진입하는 그리드 풍선 터뜨리기 미니게임입니다. 산리오 캐릭터별 생일 이벤트의
서브 컨텐츠 네 종 중 하나로, 컨텐츠 구현에 참여했습니다.

**문제 상황**

- 서브 컨텐츠를 상속으로 붙이면 종류가 늘 때마다 메인 컨텐츠에 분기가 쌓이고, 서브가 메인을 다시 참조하면 **양방향 의존**이 생깁니다.
- 미니게임이 동적으로 만드는 오브젝트가 종료 시 남으면, 재진입을 반복할수록 누수가 쌓입니다.

**해결 전략**

- **상속 대신 합성** — `ICharacterCafeSubContent` 인터페이스로 서브 컨텐츠 4종을 메인 컨텐츠에 결합했습니다.
- `OnObjectInteractComplete` 를 전 서브에 fan-out 하고 각 서브가 자기 책임을 스스로 판정합니다 → 서브를 추가해도 메인에 분기가 늘지 않고, 서브는 메인 참조를 갖지 않습니다(양방향 의존 차단).
- 풍선 레이아웃은 클라이언트 생성 → 서버 저장 · 검증, 진행 상태는 서버 스냅샷을 권위로 둡니다.
- 동적 생성 오브젝트를 `ResourceScope` 단위로 일괄 해제해 누수를 구조적으로 차단했습니다.

**결과** — 서브 컨텐츠를 추가해도 메인 컨텐츠 코드가 늘지 않는 구조 확보.
재진입을 반복해도 누수가 쌓이지 않는 리소스 수명 관리.

<details markdown="1">

<summary>코드 — 서브 컨텐츠 공통 인터페이스와 구현부</summary>

```csharp
// 캐릭터 카페 서브 컨텐츠 공통 인터페이스.
// 메인 Content(ContentEventCharacterCafe)가 합성으로 들고 라이프사이클을 fan-out 한다.
// 각 서브는 자기 데이터 슬라이스(CharacterCafeData.PointData 등)만 읽고,
// 변경은 메인 Content 참조 없이 공통 플로우(EventCharacterCafeHelper.TryUpdateData)를
// 경유해 핸들러에 위임한다.
public interface ICharacterCafeSubContent
{
    // 데이터 바인딩 (메인 Initialize 시 1회)
    void Initialize(LiveEventData eventData);

    // 오브젝트 1개 상호작용 완료 알림. 각 서브가 자기 책임 여부를 판단
    void OnObjectInteractComplete(int objectIdx);

    // 데이터 동기화 후 UI 갱신
    void Refresh();

    void Release();
}

/////////////////////// 서브 구현 (풍선 미니게임) ///////////////////////

public void OnObjectInteractComplete(int objectIdx)
{
    // 미니게임은 오브젝트 상호작용 완료 타이밍에 처리할 로직 없음
    // — 메인은 이 사실을 몰라도 되고, 서브가 스스로 판단해 아무것도 하지 않는다.
}

// 라운드 시작 보장 — 진행 기록이 없으면(새 미니게임) 서버 권위로 레이아웃 생성 후 RoundReadyMsg 통지.
// 팝업 오픈 시 호출. 시작이 불필요한 복원 상황이면 데이터 변경 없이 RoundReadyMsg 만 통지한다.
public void RequestEnsureRoundStarted(int objectIdx)
    => RequestEnsureRoundStartedAsync(objectIdx).Forget();
```

</details>
