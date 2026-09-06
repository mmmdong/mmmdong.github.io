---
layout: page
title: CV
permalink: /cv/
page_class: cv
excerpt: "경력 및 이력"
comments: false
---

{% comment %}
프로젝트 제목은 상세 페이지로 건다. 링크는 site.baseurl 기준 루트 상대 경로로
적는다 — site.url 로 적으면 배포 설정에서 http 로 시작해 _includes/content.html
의 외부 링크 치환에 걸린다. 되돌리는 장치가 있긴 하지만 굳이 그 경로를 탈
이유가 없다.

프로젝트 줄에는 {: .cv-project} 를 붙인다. 회사 아래의 프로젝트와 그 아래의
설명은 마크다운에서 똑같은 '- ' 목록이라, 표시가 없으면 글자 크기로 층을
나눌 수가 없다. kramdown 은 이 표시를 항목이 아니라 목록 전체에 걸므로,
프로젝트와 설명 사이에는 빈 줄을 두어 목록을 갈라 놓아야 한다.

크기 사다리(대제목 > 문단 > 프로젝트 > 설명)와 구분선은 _sass/_theme.scss 의
.cv 블록에 있다. 그 클래스는 위 front matter 의 page_class 가 붙인다.

회사명·기간·성과는 제출 문서의 사실표(00_FACTS.md, 저장소 밖)를 따른다.
한때 이 페이지만 'Voyager Games' · 드림플레이 종료 '2025.04' 로 적혀 있었고
ACT Games 와 퍼플오션이 통째로 빠져 있었다 — 사이트와 이력서를 나란히 보는
채용담당에게는 그 차이가 가장 먼저 보인다. 회사·기간·수치를 고칠 때는
사실표를 먼저 고치고 제출 문서 3종과 이 페이지를 함께 맞춘다.

퍼플오션의 프로젝트에는 상세 페이지 링크가 없다. 포트폴리오를 만들기 전의
경력이라 사이트에 글이 없기 때문이고, structure.py 가 '페이지 없는 프로젝트'
목록으로 이 예외를 알고 있다. 그래서 새 프로젝트를 링크 없이 넣으면 그때 걸린다.
{% endcomment %}

## 경력

**총 4년 10개월** (2026.09 기준) · Unity 클라이언트 개발

### ACT Games (에이시티 게임즈)

**2026.05 ~ 재직 중** · 산리오 IP 기반 머지 게임 라이브 서비스

- **[헬로키티 마이 드림 스토어]({{ site.baseurl }}/portfolio/hello-kitty-mds/)** — 라이브 이벤트 컨텐츠 5종 · 64개 파일 / 24,179라인 · ⭐ 4.3(AOS) / 4.1(iOS) · 📥 100만+
{: .cv-project}

- 트로피 챌린지(시즌제 도전과제 메타) · 드림 벌룬 페스티벌(경쟁형 이벤트) · 당근 수확 대소동(아케이드) · 생일 카페 미니게임(퍼즐) · 4 Drop Item(머지판 연동 수집형)
- 서버 권위와 클라이언트 시뮬레이션의 경계 설계 — 초 단위 연출 수치를 시간의 결정론적 함수로 구현해 동기화 통신 제거
- 매니저가 구현체가 아닌 인터페이스에만 의존하는 DIP 분리로 컨텐츠 간 결합도 제거
- 운영 중인 본편 공용 코드를 수정하지 않는 additive 설계로 라이브 리스크 차단
- 스택: C#, UniTask, DOTween, Spine, SocketIO, CSV TableManager, HybridCLR

### Voyager Inc.

**2025.10 ~ 2026.03** · 14명 (기획 1, 아트 4, 클라 4, 서버 5) · 프로젝트 참여 2025.12 ~ 2026.03

- **[Eterna AI]({{ site.baseurl }}/portfolio/eterna/)** — AI 대화형 라이프스타일 플랫폼 · AOS / iOS / Windows Steam 멀티플랫폼
{: .cv-project}

- 담당: 스팀 플랫폼 연동(로그인 · API) 및 결제 시스템(IAP) 구축, CI/CD 빌드 자동화
- 플랫폼 추상화로 모바일의 문자열 인증과 Steam 의 비동기 티켓 인증을 하나로 흡수
- 스택: C#, Steamworks SDK, Steam API, Unity IAP, LLM/BYOK, Speech(iOS), Groovy
- 서비스 종료(Sunsetting) 프로세스 대응 및 유저 데이터 자산 보호

### 드림플레이 게임즈 (DP 스튜디오 · 게임크리 스튜디오)

**2024.03 ~ 2025.08** · 방치형 캐주얼 RPG 3종 출시 및 라이브 운영

- **[미확인 용사단]({{ site.baseurl }}/portfolio/unknown-heroes/)** (2025.01 ~ 2025.04, 7명) — 가챠/감정 시스템 설계, 실시간 채팅 및 UI 리팩터링 · ⭐ 3.3(AOS) / 4.3(iOS) · 📥 10K+
- **[픽셀 영웅 전설]({{ site.baseurl }}/portfolio/pixel-heroic-legend/)** (2024.05 ~ 2024.11, 7명) — 전투 코어 로직 설계 및 PVP 시스템 구현, UI/채팅 시스템 개발 · ⭐ 4.6(AOS) / 4.0(iOS) · 📥 50K+
- **[귀환병 전기]({{ site.baseurl }}/portfolio/return-hero/)** (2024.03 ~ 2024.05, 4명) — 월드보스 시스템 신규 개발 및 서비스 안정화 유지보수 · ⭐ 3.3(AOS) / 4.1(iOS) · 📥 10K+
{: .cv-project}

- 스택: C#, UniRx(R3), UniTask, Azure PlayFab, 뒤끝 SDK, IAP, AppLovin MAX

### 먼데이오프 유한책임회사

**2022.10 ~ 2023.12** · 하이퍼 · 하이브리드 캐주얼 4종 개발 / 3종 글로벌 출시 · 1인 개발 (기획 · 클라이언트 전담)

- **[Dance Mob]({{ site.baseurl }}/portfolio/hyper-casual/#1-dance-mob--clicker-game)** · **[Number Store]({{ site.baseurl }}/portfolio/hyper-casual/#2-number-store--idle)** · **[Sweep Coin Tower]({{ site.baseurl }}/portfolio/hyper-casual/#3-sweep-coin-tower)** — 하이퍼캐주얼 3종 글로벌 출시
{: .cv-project}

- 대량 오브젝트 환경의 성능 최적화 — 오브젝트 풀링, 드로우콜 억제, 이벤트 기반 연산
- Blow Up 3D 개발 및 라이브 서비스 대응
- ⭐ 최고 4.4 · 📥 최대 500K+ · 🌎 Global
- 스택: C#, Firebase, Unity IAP, AppLovin MAX

### ㈜퍼플오션

**2021.07 ~ 2022.08** · 미드코어 낚시 게임 라이브 서비스 및 TV App 이식

- **도시어부M** · **스마트 홈코치** · **Project De Fishing**
{: .cv-project}

- 도시어부M 을 SK Broadband TV App 으로 이식 및 출시 — 자이로스코프 기기 조작, SK Broadband API 이식, IAP 결제 API · 로그인 SDK 직접 연동
- 스마트 홈코치 콘솔 버전 단독 개발 — Web 방식 유저 데이터 관리 구조 설계 및 구현
- Project De Fishing — 도감 · 상점 · 인벤토리 등 인게임 UI 개발

## 개인 프로젝트

- **[Side Projects]({{ site.baseurl }}/portfolio/side-projects/)** — Unity 습작과 C++ / WinAPI 모작
{: .cv-project}

- Unity 입문기 개인 프로젝트 — MergeCube, Cubic Music
- C++ / WinAPI 모작 — HELLTAKER, River City Girls, The Witch's House
