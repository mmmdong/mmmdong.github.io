---
layout: post
title: "Side Projects"
permalink: /portfolio/side-projects/
slug: side-projects
date: 2021-12-01
project: true
group: side
order: 1
tags: [Unity, CSharp, UniRx, Cpp, WinAPI, FMOD]
excerpt: "Unity 입문기 개인 프로젝트와 C++ / WinAPI 모작 5건."
toc: true
comments: false
---

<div class="pf-hero">
Unity 입문 전 <strong>C++ / WinAPI</strong> 기반으로 진행한 모작 프로젝트와, <strong>Unity</strong>를 처음 배우며
완성한 개인 프로젝트를 정리했습니다. 기초적인 게임 구조 설계 능력과 자기주도적 문제 해결 과정을 담고 있습니다.
</div>

---

## 1. MergeCube

<img src="/images/portfolio/side-projects/mergecube.jpg" alt="MergeCube" style="width:100%; max-width:640px; border-radius:6px; margin-bottom:12px;"/>

| 항목 | 내용 | 항목 | 내용 |
|---|---|---|---|
| 분류 | 개인 포트폴리오 | 인원 | 1인 |
| 기간 | 1일 | 플랫폼 | PC |
| 사용 기술 | Unity, C# | 링크 | [GitHub](https://github.com/mmmdong/NumCube) |
| 담당 | 전체 개발 | | |

유니티 엔진의 핵심 컴포넌트 구조 및 **반응형 프로그래밍(UniRx)의 기초**를 학습하기 위한 퍼즐 게임 프로젝트.

**핵심 구현**

- **UI 컨트롤 및 인터랙션** — `UGUI Slider`의 Value로 인게임 큐브의 X축 위치를 정밀 제어.
  `IPointerDownHandler`, `IPointerUpHandler`, `IPointerDragHandler`를 구현해 드래그 앤 드롭 조작 구축
- **성능 최적화 (Object Pooling)** — `Destroy()` 호출에 따른 GC 부하를 방지하기 위해
  **Queue 자료구조 기반의 오브젝트 풀링** 시스템 구축. 선입선출로 큐브 리소스를 재사용
- **시각적 피드백 (Particle System)** — 2의 거듭제곱(최대 4096) 단계에 따른 12가지 색상 체계 정의.
  큐브 합성 시 해당 색상 파티클이 랜덤한 방향으로 산개하는 연출
- **반응형 게임 종료 로직 (UniRx)** — `Update()` 내 매 프레임 체크 대신 `BoolReactiveProperty`를 활용한
  **옵저버 패턴** 적용. 특정 구역(RedZone) 진입 시 이벤트를 발행해 불필요한 연산 제거

---

## 2. Cubic Music

<img src="/images/portfolio/side-projects/cubic-music.jpg" alt="Cubic Music" style="width:100%; max-width:640px; border-radius:6px; margin-bottom:12px;"/>

| 항목 | 내용 | 항목 | 내용 |
|---|---|---|---|
| 분류 | 개인 포트폴리오 | 인원 | 1인 |
| 기간 | 6일 | 플랫폼 | Mobile |
| 사용 기술 | Unity, C# | 링크 | [GitHub](https://github.com/mmmdong/CubicMusic) |
| 담당 | 전체 개발 | | |

노트 타이밍에 맞춘 입력과 캐릭터의 이동을 결합한 **모바일 리듬 게임 시스템 연구 프로젝트**.

**핵심 구현**

- **메모리 최적화** — 빈번하게 생성되는 노트를 `ObjectInfo` 클래스와 **Queue 기반 풀링**으로 관리.
  `Enqueue`/`Dequeue` 메커니즘으로 인스턴스화 오버헤드 제거 및 GC 발생 방지
- **물리 기반 플레이어 제어** — 이동 전 가상 큐브를 활용한 `Raycast`로 이동 가능한 플레이트 존재 여부를
  선제 확인. 코루틴으로 이동 속도를 가변 조절하며 `SqrMagnitude`로 거리 계산 최적화.
  이동 불가 지역 진입 시 `Rigidbody.useGravity`를 활성화해 물리 기반 추락 연출
- **정밀 노트 판정 시스템** — `List`로 판정 범위 내 노트를 실시간 추적. UGUI `localPosition` 기준으로
  Perfect / Cool / Good / Bad 4단계 판정 영역 세분화.
  판정 완료 후 즉시 풀로 반환하는 대신 비활성 상태를 유지해 노트 등장 간격의 일관성 확보

---

## 3. HELLTAKER (모작)

<img src="/images/portfolio/side-projects/helltaker.jpg" alt="HELLTAKER 모작" style="width:100%; max-width:640px; border-radius:6px; margin-bottom:12px;"/>

| 항목 | 내용 | 항목 | 내용 |
|---|---|---|---|
| 분류 | 개인 포트폴리오 | 인원 | 1인 |
| 기간 | 7일 | 플랫폼 | PC |
| 사용 기술 | C++, Visual Studio | 링크 | [GitHub](https://github.com/mmmdong/Helltaker1) · [영상](https://youtu.be/l4TEodZUKTA) |
| 담당 | 전체 개발 | | |

타일 기반 퍼즐 게임 'HELLTAKER'의 핵심 메커니즘을 **C++ 순수 로직으로 재구성**한 모작.
엔진의 도움 없이 입력 처리, 충돌 감지, 애니메이션 프레임 제어를 직접 설계·구현했습니다.

**핵심 구현**

- **입력 처리 및 이동** — 단순 좌표 이동이 아닌 마찰 가속도 로직을 적용해 조작의 부드러움 구현.
  이동 상태를 `bool`로 제어해 애니메이션 진행 중 중복 입력 차단.
  캐릭터 전방에 가상 렉트를 생성해 상자·장애물과의 충돌을 선제 감지
- **애니메이션 및 상태 관리** — `Enum`으로 캐릭터 상태를 정의하고 입력 상태와 렌더링 프레임을 분리.
  `setFPS()`를 자체 구현해 하드웨어 성능과 무관하게 일정한 애니메이션 재생 속도 유지
- **스테이지 아키텍처** — `StageBase` 헤더에 정보를 구조화하고 개별 스테이지가 이를 참조하는 객체지향 설계.
  Key 습득 여부에 따라 Box 통과를 결정하는 조건부 로직으로 전략적 난이도 조절

---

## 4. River City Girls (모작 · 팀)

<img src="/images/portfolio/side-projects/river-city-girls.jpg" alt="River City Girls 모작" style="width:100%; max-width:640px; border-radius:6px; margin-bottom:12px;"/>

| 항목 | 내용 | 항목 | 내용 |
|---|---|---|---|
| 분류 | 팀 포트폴리오 | 인원 | 5인 |
| 기간 | 7일 | 플랫폼 | PC |
| 사용 기술 | C++, Visual Studio | 링크 | [GitHub](https://github.com/R1G4/Z-order) · [영상](https://youtu.be/hQ6omqxO-3c) |
| 담당 | LoadScene, 옵션창, Stage 충돌처리 | | |

2D 벨트스크롤 액션 게임의 핵심 시스템을 C++로 재구성한 팀 프로젝트.
**사운드 시스템, 세이브/로드, 픽셀 충돌 시스템** 등 인게임 프레임워크 전반을 담당했습니다.

**핵심 구현**

- **싱글톤 기반 사운드 시스템** — 외부 라이브러리 `FMOD`를 통합하고 전역 접근 가능한 싱글톤 사운드 매니저 구현.
  `addSound()`, `Play()` 인터페이스로 효율적인 리소스 관리
- **상태 저장 및 옵션 시스템** — 'F1' 키로 현재 씬 상태 및 캐릭터 파라미터(HP 등)를 저장하고
  씬 전환 시 복구. WinAPI 좌표 연산으로 사각형/원형 렉트 간 상대 거리를 계산해 `setVolume()`과 연동한
  직관적인 볼륨 컨트롤러 구축
- **벨트스크롤 특화 충돌 처리** — 각 스테이지의 충돌 영역을 특정 색상 이미지(Color Map)로 정의하는
  **픽셀 충돌 기법**으로 타일 기반보다 정밀한 지형지물 판정 구현.
  플레이어가 기둥 뒤로 이동 시 알파값을 조절하는 반투명 연출, Y좌표 기준 **Z-order 실시간 재정렬**로
  횡스크롤 게임의 입체적 원근감 표현

---

## 5. The Witch's House (모작 · 팀)

<img src="/images/portfolio/side-projects/witchs-house.jpg" alt="The Witch's House 모작" style="width:100%; max-width:640px; border-radius:6px; margin-bottom:12px;"/>

| 항목 | 내용 | 항목 | 내용 |
|---|---|---|---|
| 분류 | 팀 포트폴리오 | 인원 | 5인 |
| 기간 | 14일 | 플랫폼 | PC |
| 사용 기술 | C++, Visual Studio | 링크 | [GitHub](https://github.com/R1G4/witch-s-house) · [영상](https://youtu.be/ZwuDELZ-pmE) |
| 담당 | 정원 씬 개발, Sound Stage 시스템 | | |

호러 퍼즐 어드벤처 '마녀의 집'의 핵심 시스템을 C++로 재구성한 팀 프로젝트.
**맵 툴 기반 충돌 시스템**과 **스테이지 상태 관리 매니저** 구현을 담당했습니다.

**핵심 구현**

- **맵 툴 연동 및 지형 충돌** — 자체 제작 맵 툴로 특정 좌표에 충돌 속성을 부여하고 캐릭터 이동 제한 로직 구현.
  오브젝트의 Y좌표와 레이어 속성을 계산해 나무·구조물 뒤로 이동할 때의 원근감을 Z-order로 표현.
  스테이지 이동 구간에 렉트를 배치해 충돌 시 씬을 전환하고, 이전 스테이지의 퇴장 상태에 따라
  다음 씬의 시작 지점을 동적 할당
- **싱글톤 기반 스테이지 상태 관리** — 씬 전환 시 로컬 변수가 초기화되는 한계를 극복하기 위해
  싱글톤 패턴의 `STAGEMEMORYMANAGER` 클래스를 설계해 스테이지 외적인 상태 저장소 구축.
  `Getter`/`Setter`로 퍼즐 클리어 여부와 이벤트 플래그를 안전하게 관리해 씬이 바뀌어도 진행 상황 유지.
  저장된 상태 값을 참조해 방별 다이얼로그와 선택지를 동적 생성
