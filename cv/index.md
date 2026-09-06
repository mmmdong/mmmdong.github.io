---
layout: page
title: CV
permalink: /cv/
excerpt: "경력 및 이력"
comments: false
---

## 경력

### Voyager Games — Eterna AI

**2025.12 ~ 2026.03** · 14명 (기획 1, 아트 4, 클라 4, 서버 5)

- 담당: 스팀 플랫폼 연동(로그인 · API) 및 결제 시스템(IAP) 구축, CI/CD 빌드 자동화
- 스택: C#, Steamworks SDK, Steam API, Unity IAP, LLM/BYOK, Speech(iOS), Groovy
- AI 대화형 라이프스타일 플랫폼 · AOS / iOS / Windows Steam 멀티플랫폼
- 서비스 런칭부터 종료(Sunsetting)까지 전 과정 대응

### 드림플레이 게임즈 (Game Crit Studio)

**2024.03 ~ 2025.04** · 캐주얼 RPG 3종 런칭 및 라이브 운영

- **미확인 용사단** (2025.01 ~ 2025.04, 7명) — 가챠/감정 시스템 설계, 실시간 채팅 및 UI 리팩터링 · ⭐ 3.3(AOS) / 4.3(iOS) · 📥 10K+
- **픽셀 영웅 전설** (2024.05 ~ 2024.11, 7명) — 전투 코어 로직 설계 및 PVP 시스템 구현, UI/채팅 시스템 개발 · ⭐ 4.6(AOS) / 4.0(iOS) · 📥 50K+
- **귀환병 전기** (2024.03 ~ 2024.05, 4명) — 월드보스 시스템 신규 개발 및 서비스 안정화 유지보수
- 스택: C#, UniRx(R3), UniTask, Azure PlayFab, 뒤끝 SDK, IAP, AppLovin MAX

### 먼데이오프 — 하이퍼캐주얼 3종

**2022.10 ~ 2023.12** · 1인 개발 (기획 · 클라이언트 전담)

- Dance Mob · Number Store · Sweep Coin Tower 글로벌 출시
- 대량 오브젝트 환경의 성능 최적화 — 오브젝트 풀링, 드로우콜 억제, 이벤트 기반 연산
- ⭐ 최고 4.4 · 📥 최대 500K+ · 🌎 Global
- 스택: C#, Firebase, Unity IAP, AppLovin MAX

## 기술 스택

{% for item in site.data.tech_stack %}- {{ item }}
{% endfor %}

## 개인 프로젝트

- Unity 입문기 개인 프로젝트 — MergeCube, Cubic Music
- C++ / WinAPI 모작 — HELLTAKER, River City Girls, The Witch's House
- 상세: [Side Projects]({{ site.baseurl }}/portfolio/side-projects/)
