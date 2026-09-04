---
title: "Hyper Casual Games (MondayOFF)"
excerpt: "1인 개발로 3종 글로벌 출시. 대량 오브젝트 환경에서의 성능 최적화가 핵심.<br/><img src='/images/portfolio/mondayoff.jpg'>"
collection: portfolio
---

<div class="pf-panel">
  <table>
    <tr><td><strong>프로젝트 유형</strong></td><td>상용 출시 · <strong>1인 개발</strong>(기획 및 클라이언트 전담) · 3종</td></tr>
    <tr><td><strong>기간</strong></td><td>2022.10 ~ 2023.12</td></tr>
    <tr><td><strong>사용 소프트웨어</strong></td><td>Unity, Git, Miro, Slack</td></tr>
    <tr><td><strong>사용 언어 · 스택</strong></td><td>C#, Firebase, Unity IAP, AppLovin MAX</td></tr>
    <tr><td><strong>담당 역할</strong></td><td>기획 · 클라이언트 개발 전담 (3종 모두)</td></tr>
    <tr><td><strong>성과</strong></td><td>⭐ 최고 4.4 &nbsp;|&nbsp; 📥 최대 500K+ &nbsp;|&nbsp; 🌎 Global &nbsp;|&nbsp; 🎮 3 Games</td></tr>
  </table>
</div>

세 작품 모두 **화면에 수백 개의 오브젝트가 동시에 존재하는 환경**이라는 공통 과제를 가졌습니다.
장르는 달랐지만 해결 축은 같았습니다 — 오브젝트 풀링, 드로우콜 억제, 그리고 매 프레임 연산의 제거.

---

## 1. Dance Mob — Clicker Game

<div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
  <img src="/images/portfolio/mondayoff/dance-mob-1.jpg" alt="Dance Mob 플레이 화면" style="flex:1; min-width:180px; border-radius:6px;"/>
  <img src="/images/portfolio/mondayoff/dance-mob-2.jpg" alt="Dance Mob 군중 연출" style="flex:1; min-width:180px; border-radius:6px;"/>
</div>

<div class="pf-sub">
  <strong>플랫폼</strong> iOS &nbsp;|&nbsp; <strong>성과</strong> ⭐ 3.0 (iOS) · 🌎 Global<br/>
  <strong>링크</strong> <a href="https://apps.apple.com/us/app/dance-mob-clicker-game/id6447021543">App Store</a>
</div>

### 개요

탭을 통해 댄스 군중 수를 늘리고, 캐릭터를 합쳐 더 높은 가치를 창출하는 **군중 증식과 합체(Merge)** 루프.
군중의 규모가 커짐에 따라 느껴지는 성장감이 핵심 재미입니다.

### 문제 상황

- **성능 병목:** 유닛 수가 급증할 때마다 발생하는 `Instantiate`/`Destroy` 오버헤드와
  가비지 컬렉션(GC)으로 인한 프레임 드랍
- **유지보수 효율 저하:** 스테이지가 진행됨에 따라 기하급수적으로 늘어나는 업그레이드 비용과 유닛 밸런스 수치를
  코드 내에서 관리할 경우, 반복적인 빌드와 테스트로 인한 개발 효율 저하 우려

### 해결 전략

- **메모리 및 연산 최적화 (Object Pooling):** 캐릭터, 재화 이펙트 등 빈번하게 생성되는 요소를
  풀링 시스템으로 관리하여 런타임 메모리 할당 부하 제거
- **드로우콜 감소 (Material Property Block):** 유닛이 합성(Merge)될 때 유닛의 Material이 Instance화되어
  Draw Call이 증가하는 현상을 방지
- **중앙 집중식 로직 처리:** 개별 유닛이 스스로 연산하는 방식 대신, 매니저 클래스에서 군중 전체의 상태를
  일괄 계산하는 방식을 채택하여 CPU 연산 낭비 최소화

### 결과

- 저사양 기기에서도 수백 명의 유닛이 끊김 없이 동작하는 **안정적인 60FPS 환경 확보**
- 밸런스 수정 시 빌드 없이 즉시 수치 적용이 가능해져 개발 및 테스트 사이클 획기적 단축

---

## 2. Number Store — Idle

<div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
  <img src="/images/portfolio/mondayoff/number-store-1.jpg" alt="Number Store 플레이 화면" style="flex:1; min-width:180px; border-radius:6px;"/>
  <img src="/images/portfolio/mondayoff/number-store-2.jpg" alt="Number Store 상점 성장" style="flex:1; min-width:180px; border-radius:6px;"/>
</div>

<div class="pf-sub">
  <strong>플랫폼</strong> AOS / iOS &nbsp;|&nbsp; <strong>성과</strong> ⭐ 2.7 (AOS) · 2.8 (iOS) · 📥 <strong>500K+</strong> · 🌎 Global<br/>
  <strong>링크</strong> <a href="https://play.google.com/store/apps/details?id=com.mondayoff.numberstoreidle&hl=ko-KR">Google Play</a> ·
  <a href="https://apps.apple.com/us/app/number-store-idle/id6458929630">App Store</a>
</div>

### 개요

숫자 블록 합산 메커니즘과 상점 성장 시스템의 결합. 단순한 조작으로 숫자 블록을 모으고
점진적으로 큰 숫자를 완성해 나가는 직관적인 방치형 성장 구조입니다.

### 문제 상황

- **연산 부하:** 게임이 진행될수록 블록의 개수와 합성 횟수가 기하급수적으로 늘어남에 따라,
  매 프레임 발생하는 체크 로직이 CPU에 부담
- **데이터 관리:** 숫자의 단위가 커짐에 따라 발생할 수 있는 데이터 오버플로우 방지 및 정밀한 밸런싱 수치 제어 필요

### 해결 전략

- **이벤트 기반 합성 시스템:** 매 프레임 업데이트 방식이 아닌, 블록이 생성되거나 이동이 완료된 시점에만
  합산 로직을 호출하는 **이벤트 기반 설계**로 불필요한 연산 낭비 제거
- **경량화된 데이터 구조:** 숫자 정보를 효율적으로 처리할 수 있는 구조를 채택하고,
  성장 곡선 데이터를 외부화하여 라이브 밸런싱 수정에 용이하도록 구성
- **UI 배칭(Batching) 최적화:** 합성 시 발생하는 수많은 숫자 텍스트와 이펙트가 드로우콜을
  과도하게 높이지 않도록 UI 캔버스 구조 최적화

### 결과

- 글로벌 **50만 명 이상**의 유저가 이용하는 환경에서도 치명적인 크래시 없는 안정적인 서비스 유지
- 저사양 기기에서도 합성 연출 및 상점 성장 연출이 끊김 없이 출력되는 고성능 환경 달성

---

## 3. Sweep Coin Tower

<div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
  <img src="/images/portfolio/mondayoff/sweep-coin-1.jpg" alt="Sweep Coin Tower 플레이 화면" style="flex:1; min-width:180px; border-radius:6px;"/>
  <img src="/images/portfolio/mondayoff/sweep-coin-2.jpg" alt="Sweep Coin Tower 코인 연출" style="flex:1; min-width:180px; border-radius:6px;"/>
</div>

<div class="pf-sub">
  <strong>플랫폼</strong> AOS / iOS &nbsp;|&nbsp; <strong>성과</strong> ⭐ 3.4 (AOS) · <strong>4.4 (iOS)</strong> · 📥 100K+ · 🌎 Global<br/>
  <strong>링크</strong> <a href="https://play.google.com/store/apps/details?id=com.mondayoff.cointower&hl=ko-KR">Google Play</a> ·
  <a href="https://apps.apple.com/us/app/sweep-coin-tower/id6446337932">App Store</a>
</div>

### 개요

동전 타워 낙하 기반의 재화 수집 및 저금통 업로드 시스템.
타워를 타고 내려오는 코인의 물리적 움직임이 성장 체감을 직관적으로 전달합니다.

### 문제 상황

- **물리 연산 과부하:** 많은 수의 코인이 좁은 타워 공간에서 물리 엔진(PhysX)으로 충돌 연산을 수행할 경우,
  모바일 기기 발열 및 프레임 드랍 유발
- **UI 갱신 동기화:** 재화가 기하급수적으로 늘어날 때, 매번 텍스트를 단순 갱신하면 발생하는
  UI 레이아웃 리빌드(Rebuild) 부하 관리 필요

### 해결 전략

- **물리 연산 효율화:** 코인 오브젝트의 충돌 레이어를 세분화하고, 화면 밖으로 벗어나거나 저금통에 도달한 코인은
  즉시 오브젝트 풀로 회수하여 활성 오브젝트 수 유지
- **비동기 데이터 바인딩:** 코인 수집 데이터의 변화를 관찰(Observer)하고, 일정 주기 또는 특정 임계치마다
  UI를 갱신하도록 설계하여 불필요한 드로우콜 최소화
- **고평점 유지를 위한 QA:** 다양한 기기 해상도 대응 및 예외 상황 테스트를 통해 iOS 별점 4.4 수준의
  기술적 완성도 달성

### 결과

- 대량의 코인 연출 상황에서도 안정적인 프레임 유지 및 **글로벌 10만 유저 대응**
- 유저 평점 4.4 확보를 통해 기술적 안정성과 게임성 동시 입증

---

## 관련 공통 모듈

- [광고 수익화 모듈](/portfolio/applovin/) — AppLovin MAX 보상형 광고
