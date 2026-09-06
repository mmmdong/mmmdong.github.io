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
{% endcomment %}

## 경력

### Voyager Games

**2025.12 ~ 2026.03** · 14명 (기획 1, 아트 4, 클라 4, 서버 5)

- **[Eterna AI]({{ site.baseurl }}/portfolio/eterna/)** — AI 대화형 라이프스타일 플랫폼 · AOS / iOS / Windows Steam 멀티플랫폼
{: .cv-project}

- 담당: 스팀 플랫폼 연동(로그인 · API) 및 결제 시스템(IAP) 구축, CI/CD 빌드 자동화
- 스택: C#, Steamworks SDK, Steam API, Unity IAP, LLM/BYOK, Speech(iOS), Groovy
- 서비스 런칭부터 종료(Sunsetting)까지 전 과정 대응

### 드림플레이 게임즈 (Game Crit Studio)

**2024.03 ~ 2025.04** · 캐주얼 RPG 3종 런칭 및 라이브 운영

- **[미확인 용사단]({{ site.baseurl }}/portfolio/unknown-heroes/)** (2025.01 ~ 2025.04, 7명) — 가챠/감정 시스템 설계, 실시간 채팅 및 UI 리팩터링 · ⭐ 3.3(AOS) / 4.3(iOS) · 📥 10K+
- **[픽셀 영웅 전설]({{ site.baseurl }}/portfolio/pixel-heroic-legend/)** (2024.05 ~ 2024.11, 7명) — 전투 코어 로직 설계 및 PVP 시스템 구현, UI/채팅 시스템 개발 · ⭐ 4.6(AOS) / 4.0(iOS) · 📥 50K+
- **[귀환병 전기]({{ site.baseurl }}/portfolio/return-hero/)** (2024.03 ~ 2024.05, 4명) — 월드보스 시스템 신규 개발 및 서비스 안정화 유지보수
{: .cv-project}

- 스택: C#, UniRx(R3), UniTask, Azure PlayFab, 뒤끝 SDK, IAP, AppLovin MAX

### 먼데이오프

**2022.10 ~ 2023.12** · 1인 개발 (기획 · 클라이언트 전담)

- **[Dance Mob]({{ site.baseurl }}/portfolio/hyper-casual/#1-dance-mob--clicker-game)** · **[Number Store]({{ site.baseurl }}/portfolio/hyper-casual/#2-number-store--idle)** · **[Sweep Coin Tower]({{ site.baseurl }}/portfolio/hyper-casual/#3-sweep-coin-tower)** — 하이퍼캐주얼 3종 글로벌 출시
{: .cv-project}

- 대량 오브젝트 환경의 성능 최적화 — 오브젝트 풀링, 드로우콜 억제, 이벤트 기반 연산
- ⭐ 최고 4.4 · 📥 최대 500K+ · 🌎 Global
- 스택: C#, Firebase, Unity IAP, AppLovin MAX

## 기술 스택

{% for item in site.data.tech_stack %}- {{ item }}
{% endfor %}

## 개인 프로젝트

- **[Side Projects]({{ site.baseurl }}/portfolio/side-projects/)** — Unity 습작과 C++ / WinAPI 모작
{: .cv-project}

- Unity 입문기 개인 프로젝트 — MergeCube, Cubic Music
- C++ / WinAPI 모작 — HELLTAKER, River City Girls, The Witch's House
