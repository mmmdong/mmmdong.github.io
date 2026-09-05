---
layout: post
title: "미확인 용사단"
permalink: /portfolio/unknown-heroes/
slug: unknown-heroes
date: 2025-04-01
project: true
group: main
order: 1
tags: [Unity, CSharp, UniRx, UniTask, PlayFab, BackEnd-Chat]
excerpt: "하이브리드 방치형 RPG. UI 아키텍처 재구성 및 전체 관할. DFS 가챠 확률 산출, UniRx 반응형 UI 리팩터링, 슬롯머신 감정 시스템."
toc: true
comments: false
feature: assets/img/portfolio/miunhwa-heroes.jpg
---

<div class="pf-panel">
  <table>
    <tr><td><strong>프로젝트 유형</strong></td><td>상용 출시 · 팀 프로젝트</td></tr>
    <tr><td><strong>기간</strong></td><td>2025.01 ~ 2025.04 (4개월) · 2025.04 출시</td></tr>
    <tr><td><strong>팀 구성</strong></td><td>7명 (기획 1, 아트 3, 개발 3)</td></tr>
    <tr><td><strong>사용 소프트웨어</strong></td><td>Unity, Git, Trello</td></tr>
    <tr><td><strong>사용 언어 · 스택</strong></td><td>C#, UniRx(R3), UniTask, 뒤끝 SDK, Azure PlayFab, IAP, EnhancedScroller</td></tr>
    <tr><td><strong>담당 역할</strong></td><td>가챠/감정 시스템 설계, 실시간 채팅 및 UI 리팩터링</td></tr>
    <tr><td><strong>성과</strong></td><td>⭐ 3.3 (AOS) · 4.3 (iOS) &nbsp;|&nbsp; 📥 10K+ &nbsp;|&nbsp; 🌎 Global</td></tr>
    <tr><td><strong>링크</strong></td><td><a href="https://play.google.com/store/apps/details?id=com.dreamplay.hiddenheroes.google&hl=ko">Google Play Store</a></td></tr>
  </table>
</div>

## 1) 프로젝트 개요

### 장르 및 플랫폼

- 방치형 RPG (AOS / iOS 출시)
- 도트 그래픽 기반의 하이브리드 시스템 구축 및 양대 마켓 런칭

### 핵심 컨셉

**아이템 / 동료 감정 시스템** — 획득 시점뿐만 아니라 '감정' 시점에 등급이 결정되는 무작위 파밍 구조 설계.

### 주요 특징

- 유닛 조합 시너지를 고려한 전략적 파티 구성 및 성장 로직 구현
- 픽셀 아트를 활용한 스킬 연출 및 전투 타격감 최적화

---

## 2) 개발 과정

**Engine & Language** `Unity` `C#`

**Core Libraries** `UniRx(R3)` `UniTask` — 반응형 상태 관리 및 비동기 로직 구현으로 성능 최적화

**Work Management** `Trello` / **Version Control** `Git` (Git-Flow + 코드 리뷰)

---

## 3) 핵심 기술 구현

### 3-1. DFS 알고리즘을 활용한 데이터 처리 및 UX 최적화

#### 사례 1 — 실시간 가챠 확률 산출 시스템 최적화
<img src="/images/portfolio/hidden-heroes/summon-probability.png" alt="소환 확률표 팝업" style="width:100%; max-width:360px; border-radius:6px; margin:16px 0;"/>

**개요**

중첩된 뽑기 테이블(`LinkItem`)을 DFS 알고리즘으로 순회하여 최종 확률을 산출하는 가챠 코어 로직 개발.

**문제 상황**

유연한 테이블 업데이트를 위해 기획이 변경되었으나, 재귀적으로 섞인 데이터 구조로 인해
전개 연산 시 **프레임 드랍 발생**.

**해결 전략**

- 깊이 우선 탐색(DFS) 도입으로 모든 노드를 탐색하고, 아이템 ID를 Key로 가지는 `Dictionary`에
  확률을 누적 합산하는 방식으로 연산 최적화
- 복잡한 그룹 확률 데이터를 평탄화하여 UI 표기 무결성 확보

**결과**

연산 병목 해소로 프레임 드랍 없는 확률표 팝업 연출 및 데이터 관리 유연성 확보.

![소환 확률 DFS 탐색](/images/diagrams/03-gacha-dfs.svg)

<details markdown="1">

<summary>테이블 명세 — <code>TABLE.Summon</code> / <code>DATA.LinkItem</code></summary>

**TABLE.Summon**

| 항목 | 데이터 타입 | 설명 | 비고 |
|---|---|---|---|
| **ID** | `int` | 가챠 시스템 고유 ID 및 명칭 | 동료/카드/스킬 등 구분 |
| **Name** | `string` | 가챠 시스템 명칭 | |
| **GachaType** | `int` | 뽑기 카테고리 (1: 스킬, 2: 동료, 3: 카드) | |
| **Level** | `int` | 스킬 뽑기 등 레벨 시스템 적용 (1~20) | |
| **Cost Info** | `int` / `int` | 재화 ID(`GachaCostID`) 및 소모량(`GachaCostVal`) | |
| **DropIDs** | `List<int>` | **\[핵심\]** 해당 가챠에서 등장하는 아이템 그룹 ID | DFS 탐색 대상 |
| **DropPers** | `List<float>` | 각 그룹별 등장 확률 (0.4 ~ 0.0046 등) | 레벨별 가중치 적용 |

**DATA.LinkItem**

| 항목 | 데이터 타입 | 설명 | 비고 |
|---|---|---|---|
| **ID** | `int` | 테이블 고유 식별자 | 재귀 참조 시 호출되는 ID |
| **ITEM** | `int` | 아이템의 카테고리 분류 | (예: 9=가챠 그룹 등) |
| **Grade** | `int` | 아이템의 단계 및 등급 정보 | 밸런싱 및 정렬 기준 |
| **LinkItemID** | `List<int>` | **\[핵심\]** 하위 아이템 혹은 하위 LinkItem ID 리스트 | **DFS 재귀 탐색의 대상** |
| **LinkItemPer** | `List<float>` | 각 LinkItemID가 등장할 확률값 | 합계가 1(100%)이 되도록 설계 |

</details>

<details markdown="1">

<summary>코드 — 확률 평탄화 DFS (<code>Assets/Scripts/UI/Panel/Summon/Panel_SummonMainProbability.cs</code>)</summary>

```csharp
/// <summary>
/// UI를 현재 팝업에서 세팅한다.
/// </summary>
/// <param name="summonData">현재 선택된 뽑기 테이블 데이터(동료, 카드, 스킬)</param>
public virtual void SetData(TABLE.Summon summonData)
{
    var itemDict = new Dictionary<int, float>();
    this.summonData = summonData;

    for (var i = 0; i < tierDropProbabilityObjs.Length; i++)
    {
        if (summonData.DropPers[i] == 0f)
        {
            tierDropProbabilityObjs[i].SetActive(false);
            continue;
        }

        tierDropProbabilityObjs[i].SetActive(true);
        tierDropProbabilityTexts[i].text = $"{summonData.DropPers[i] * 100:N2}%";

        var dropPer = summonData.DropPers[i];
        GetDropId(summonData.DropIDs[i], itemDict, dropPer);
    }

    dropKeyValuePairList = itemDict.OrderByDescending(x => x.Key).ToList();
    scroller.ReloadData();
}

/// <summary>
/// 노드 마지막에서 확인하게 될 드랍확률을 세팅한다.
/// 그룹 노드면 재귀로 내려가며 확률을 곱하고, 말단이면 Dictionary에 누적 합산한다.
/// </summary>
/// <param name="ID">LinkItem의 ID</param>
/// <param name="dict">결과로 보여질 Dictionary</param>
/// <param name="dropPer">현재 ID까지 확인됐을 때의 확률</param>
private void GetDropId(int ID, Dictionary<int, float> dict, float dropPer)
{
    var linkItem = LinkItem.LinkItemMap[ID];

    for (var i = 0; i < linkItem.LinkItemID.Count; i++)
    {
        if (linkItem.LinkItemPer[i] == 0f)
            continue;

        var dropId = linkItem.LinkItemID[i];
        var tempDropPer = dropPer * linkItem.LinkItemPer[i];

        if (LinkItem.LinkItemMap.ContainsKey(dropId))
            GetDropId(dropId, dict, tempDropPer);   // 그룹 노드 → 재귀
        else
        {
            if (dict.ContainsKey(dropId))
                dict[dropId] += tempDropPer;        // 여러 경로로 도달 → 확률 합산
            else
                dict.Add(dropId, tempDropPer);
        }
    }
}
```

</details>

#### 사례 2 — 월드맵 드랍 아이템 가시성 개선
<img src="/images/portfolio/hidden-heroes/world-drop.jpg" alt="월드맵 드랍 아이템 리스트" style="width:100%; max-width:360px; border-radius:6px; margin:16px 0;"/>

**개요**

상자 아이콘으로 뭉뚱그려진 보상 표시를 실제 획득 가능한 전체 아이템 리스트로 노출하도록 시스템 개선.

**문제 상황**

`DropItemIndexMap`이 실제 아이템과 `LinkItem ID`를 함께 참조하고 있어,
중첩된 데이터 구조를 끝까지 순회하여 최종 아이템 ID를 추출해야 하는 과제 발생.

**해결 전략**

- `GetDropId()` 함수 내 **DFS 재귀 탐색**을 적용하여 최종 아이템 ID 도달 시까지 탐색 및 추출
- 추출된 데이터의 중복 방지를 위해 `HashSet`을 활용하고,
  `CostMap`(재화) 및 `EquipMap`(장비 등급) 기준의 정렬 로직 적용

**결과**

월드맵에서 보상 정보를 유저가 한눈에 확인할 수 있도록 UX를 개선하고,
복잡한 데이터 구조에서도 효율적인 리스트업이 가능함을 확인.

![월드맵 드랍 DFS 탐색](/images/diagrams/04-worldmap-drop-dfs.svg)

<details markdown="1">

<summary>테이블 명세 — <code>STAGE.StageDrop</code></summary>

| 항목 | 데이터 타입 | 설명 | 비고 |
|---|---|---|---|
| **ID / StageIndex** | `int` | 스테이지 고유 식별자 | 챕터 및 스테이지 정보 포함 |
| **diff / chapter** | `int` | 난이도 및 소속 챕터 구분 | 데이터 필터링 기준 |
| **GoldDrop** | `int` | 스테이지 클리어 시 기본 골드 보상 | |
| **DropIDs** | `List<int>` | **\[핵심\]** 드랍 가능한 LinkItem 혹은 아이템 ID | **DFS 탐색 시작점** |
| **DropRates** | `List<float>` | 각 DropID별 획득 확률 | |
| **DropMaxes** | `int` | 1회 플레이 시 획득 가능한 최대 개수 제한 | 밸런싱 파라미터 |

</details>

<details markdown="1">

<summary>코드 — 드랍 리스트 평탄화와 UX 정렬 (<code>Assets/Scripts/UI/PopUp/PopUp_WorldMap.cs</code>)</summary>

```csharp
/// <summary>
/// 스테이지 별 드랍 아이템 리스트 세팅
/// </summary>
private void SetDropItemList()
{
    dropItemList.Clear();
    var hashSet = new HashSet<int>();

    if (STAGE.StageDrop.DropItemIndexMap.TryGetValue(stageIndex, out var dropTable))
    {
        for (var i = 0; i < dropTable.DropRates.Count; i++)
        {
            if (dropTable.DropRates[i] <= 0)
                continue;

            GetDropId(dropTable.DropIDs[i], hashSet);
        }
    }

    DropItemListOrderBy(hashSet);
}

/// <summary>
/// UX에 맞게 정렬 — 재화를 앞에, 장비는 등급 내림차순으로
/// </summary>
private void DropItemListOrderBy(HashSet<int> hashSet)
{
    var costList  = hashSet.Where(x => TABLE.Cost.CostMap.ContainsKey(x));
    var equipList = hashSet.Where(x => DATA.Equip.EquipMap.ContainsKey(x))
                           .OrderByDescending(x => DATA.Equip.EquipMap[x].Grade);

    dropItemList.AddRange(costList);
    dropItemList.AddRange(equipList);

    itemCount     = dropItemList.Count;
    numberOfCells = Mathf.CeilToInt((float)itemCount / itemsPerRow);
}

/// <summary>
/// DFS 탐색 알고리즘 — HashSet이 중복을 자동 제거한다
/// </summary>
private void GetDropId(int ID, HashSet<int> hashSet)
{
    var dropId = ID;

    if (DATA.LinkItem.LinkItemMap.TryGetValue(dropId, out var value))
    {
        for (var i = 0; i < value.LinkItemPer.Count; i++)
        {
            if (value.LinkItemPer[i] <= 0)
                continue;

            GetDropId(value.LinkItemID[i], hashSet);
        }
    }
    else
        hashSet.Add(dropId);
}
```

</details>

---

### 3-2. UI 아키텍처 리팩터링 및 고도화
<div style="display:flex; gap:8px; flex-wrap:wrap; margin:16px 0;">
  <img src="/images/portfolio/hidden-heroes/ui-refactor-1.jpg" alt="UI 리팩터링 전후 1" style="flex:1; min-width:180px; max-width:320px; border-radius:6px;"/>
  <img src="/images/portfolio/hidden-heroes/ui-refactor-2.jpg" alt="UI 리팩터링 전후 2" style="flex:1; min-width:180px; max-width:320px; border-radius:6px;"/>
</div>

**개요**

UI 레이어 분리 및 모듈화를 통해 유지보수 비용을 절감하고, `UniRx` 기반의 반응형 업데이트 시스템 구축.

**문제 상황**

UI 패널 세팅 시마다 각 클래스에서 개별 함수를 중복 구현하여 개발 속도가 저하되고,
로직 파편화로 인한 디버깅 추적의 어려움 발생.

**해결 전략**

- 최상위 클래스에서 `IntReactiveProperty`로 카테고리 상태를 관리하여 데이터 변화에 따른 View 세팅 자동화
- 파편화된 UI 로직을 공통 모듈로 통합하여 상속 및 다형성을 활용한 구조적 개선

**결과**

- 중복 코드 제거 및 단일 함수를 통한 View 제어로 리팩터링 생산성 향상
- 로직 일원화를 통해 작업 공수가 컸던 `ShortCut` 기능을 간편하게 확장 가능하도록 구조 고도화

![UI 클래스 구조](/images/diagrams/05-ui-architecture.svg)

<details markdown="1">

<summary>코드 — 반응형 서브뷰 전환 (<code>Assets/Scripts/UI/Common/UI.cs</code>)</summary>

```csharp
using Cysharp.Threading.Tasks;
using System;
using System.Collections.Generic;
using UniRx;
using UnityEngine;

public class UI : GameEventHandler
{
    #region 변수
    [HideInInspector] public IntReactiveProperty curSubViewIdx = new IntReactiveProperty(0);
    [SerializeField] protected UI_SubView[] subViewArr;
    protected IDisposable subject; // UniRx 할당 해제 할 인터페이스
    #endregion

    #region 이벤트 등록 & 이벤트 콜 함수
    protected override List<GameEventType> EventList => new List<GameEventType>() { };
    public override void HandleGameEvent(GameEvent ge) { }
    #endregion

    /// <summary>
    /// 서브뷰 인덱스 강제로 변경
    /// </summary>
    public virtual void ForcedChangeSubView(int index)
    {
        curSubViewIdx.Value = index;
        SelectMenuInit(0);
    }

    public UI GetSubView()
    {
        if (subViewArr.Length > 0)
            return subViewArr[curSubViewIdx.Value];
        else
            return null;
    }

    protected override void OnDestroy()
    {
        base.OnDestroy();
        subject?.Dispose();     // 구독 누수 방지
    }

    virtual public void Initialize()
    {
        // 구독 1회로 이후 모든 서브뷰 전환이 자동 처리된다
        subject = curSubViewIdx.TakeUntilDestroy(this).Subscribe(OnChangeSubViewIndex);
    }

    protected virtual void OnChangeSubViewIndex(int index)
    {
        if (subViewArr == null || subViewArr.Length <= 0) { return; }

        for (var i = 0; i < subViewArr.Length; i++)
        {
            subViewArr[i].gameObject.SetActive(i == index);
        }
    }
}

/////////////////////// 파생 클래스 예시 ///////////////////////

/// <summary>
/// IntReactiveProperty 가 변경될 때마다 패널을 세팅한다.
/// </summary>
protected override void OnChangeSubViewIndex(int index)
{
    base.OnChangeSubViewIndex(index);
    RefreshUI();
}

/// <summary>
/// 보여질 패널 세팅
/// </summary>
public override void RefreshUI()
{
    base.RefreshUI();
    subViewArr[curSubViewIdx.Value].Setting();
}
```

</details>

---

### 3-3. '미확인 아이템 감정' 핵심 콘텐츠 개발
<img src="/images/portfolio/hidden-heroes/appraise.jpg" alt="미확인 아이템 감정 연출" style="width:100%; max-width:360px; border-radius:6px; margin:16px 0;"/>

**개요**

아이템 획득부터 감정 연출, 결과 도출까지의 전 과정을 전담하여 구현하고,
`Spine Event` 연동을 통해 시각적 완성도 확보.

**문제 상황**

`ScrollRect`의 기본 기능만으로는 슬롯머신 특유의 무한 스크롤, 단계별 감속 제어,
특정 결과 위치에서의 정밀한 스냅(Snap) 연출 구현에 한계 발생.

**해결 전략**

- `EnhancedScroller`를 활용하여 셀 기반 무한 스크롤 구조를 설계하고,
  결과 인덱스 확정 후 `UniTask`를 이용한 단계별 감속 로직 구현
- 감속 시점과 결과 위치를 동기화하여 목표 인덱스 근접 시 `Snap()` 기능을 통한 정밀 정지 연출
- 반복 플레이 피로도 감소를 위해 `JumpToDataIndex()`를 활용한 즉시 결과 확인(Skip) 기능 병행 구현

**결과**

자연스러운 감속 연출이 포함된 슬롯머신 방식의 감정 시스템 완성 및 유저 편의를 고려한 UX 최적화 완료.

<details markdown="1">

<summary>코드 — 슬롯머신 감속과 스냅 (<code>Assets/Scripts/UI/Panel/Unknown/Panel_UnknownResultSlot.cs</code>)</summary>

```csharp
/// <summary>
/// 슬롯머신 이펙트 시작
/// </summary>
private void PlaySlotMachine()
{
    scroller.SetScrollPositionImmediately(0);

    var speed = UnityEngine.Random.Range(-50f, -100f);
    AccelatingSlot(speed).Forget();

    if (!COMMON.GetSkipEffect("Appraise"))
        SetSlotEffect(true);

    GameEventSubject.SendGameEvent(GameEventType.EQUIPMENT_ACQUIRED);
}

/// <summary>
/// 슬롯머신의 감속 관리.
/// 결과 인덱스의 좌표까지 거리를 좁히며 감속하고, 임계 거리 안에 들면 Snap으로 정밀 정지한다.
/// </summary>
private async UniTask AccelatingSlot(float speed)
{
    resultEffect[(int)resultItem.openResult].Stop();

    if (!COMMON.GetSkipEffect("Appraise"))
    {
        while (speed < 0)
        {
            scroller.ScrollPosition += speed;

            if (speed < -5)
                speed += Time.timeScale;     // 1단계: 일정 비율로 감속
            else
            {
                SetSlotEffect(false);

                // 결과 값을 들고있는 노드의 y 좌표
                var dataPos = scroller.GetScrollPositionForDataIndex(
                    (int)resultItem.openResult, EnhancedScroller.CellViewPositionEnum.Before);

                // 타겟 위치와 현재 스크롤러 위치의 거리
                var mag = dataPos - scroller.ScrollPosition;

                if (mag < 60 && mag > 0)     // 2단계: 임계 거리 진입 시 정지
                {
                    speed = 0;
                    break;
                }
            }

            await UniTask.Delay(0);
        }
        scroller.Snap();
    }
    else
    {
        // 스킵: 연출 없이 결과 인덱스로 즉시 점프
        scroller.JumpToDataIndex((int)resultItem.openResult);
        scroller.Snap();
    }

    resultEffect[(int)resultItem.openResult].Play();
    GameEventSubject.SendGameEvent(GameEventType.ONCLICK_EQUIP_ITEM, -1);
}
```

</details>

---

## 관련 공통 모듈

- [실시간 채팅 시스템](/portfolio/chat-system/) — 뒤끝 SDK 기반 채널별 메시징
- [광고 수익화 모듈](/portfolio/applovin/) — AppLovin MAX 보상형 광고
