---
permalink: /
title: "Kim Dong Hyun"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

<div style="background:#e8f4f8; border-left:4px solid #3498db; padding:12px 16px; border-radius:4px; margin-bottom:24px;">
🎮 <strong>Unity 3D/2D 게임 개발자 김동현 포트폴리오</strong>
</div>

<div style="display:flex; gap:32px; margin-bottom:32px; flex-wrap:wrap;">
  <div style="flex:1; min-width:220px; text-align:center;">
    <img src="/images/profile.png" alt="profile" style="max-width:200px; border-radius:8px;"/>
    <h2>Contact</h2>
    <ul style="list-style:none; padding:0;">
      <li>📮 <strong>이메일</strong> : <a href="mailto:clxlzl1234@gmail.com">clxlzl1234@gmail.com</a></li>
      <li>📞 <strong>전화번호</strong> : 010-6299-6530</li>
      <li>📓 <strong>Notion</strong> : <a href="https://www.notion.so/mmmdong/Unity-Programmer-Kim-Dong-Hyun-33c08b60233e805f929ad17f7caf3207">포트폴리오 원문</a></li>
    </ul>
  </div>
  <div style="flex:2; min-width:280px;">
    <h2>About Me</h2>
    <p>
      안녕하십니까 저는 '귀환병 전기', '픽셀영웅전설' 등 다수의 캐주얼 RPG를 런칭하고 라이브 서비스를 운영해 온 유니티 개발자입니다. <strong>UniRx(R3)</strong>와 <strong>UniTask</strong>를 활용한 비동기 최적화 및 안정적인 아키텍처 설계에 강점이 있습니다.
    </p>
    <p>
      <strong>Web 기반의 네트워크 통신</strong>부터 <strong>Spine Event</strong>를 활용한 정교한 액션 연출, <strong>멀티플랫폼(AOS, iOS, Steam) 대응</strong>까지 개발 전 과정을 직접 수행한 풀사이클 경험을 보유하고 있습니다. 기술적 집요함과 원활한 소통을 바탕으로 프로젝트의 완성도를 책임지는 든든한 동료가 되겠습니다.
    </p>
    <p>
      최근에는 <strong>Claude Code</strong>와 <strong>Oh My Claude Code(OMC)</strong>를 실제 개발 워크플로에 도입해 코드 리뷰·리팩터링·문서화·검증을 에이전트 기반으로 자동화하고 있습니다. 이 포트폴리오 사이트 역시 해당 워크플로로 설계·구축했습니다.
    </p>
  </div>
</div>

<div style="background:#f5f5f5; border-left:4px solid #888; padding:16px 20px; border-radius:4px; margin-bottom:32px;">
  <h3 style="margin-top:0;">🧩 기술 스택</h3>
  <ul>
    <li>Unity(C#), JAVA, Jenkins, Git</li>
    <li>R3, UniTask 를 이용한 비동기 로직 및 상태 관리</li>
    <li>Web방식의 통신을 이용한 유저 데이터 관리</li>
    <li>싱글턴, 옵저버, MVC 등 다양한 디자인 패턴을 이용한 구조 설계</li>
    <li>뒤끝 SDK(Socket)를 활용한 채팅 구현</li>
    <li>Spine Event를 이용한 2D 전투 효과 구현</li>
    <li>모바일 IAP 구현</li>
    <li>Steamworks SDK 연동</li>
    <li>AppLovinMax SDK 를 이용한 광고 수익화 로직 구현</li>
    <li><strong>Claude Code · Oh My Claude Code(OMC)</strong> 기반 AI 에이전트 개발 워크플로 — 코드 리뷰 · 리팩터링 · 문서 자동화 · 검증 게이트</li>
  </ul>
</div>

---

## Projects

<p style="color:#666; font-size:.9em;">카드 또는 제목을 클릭하면 상세 페이지로 이동합니다. 각 상세 페이지에는 문제-해결-결과 서술과 실제 코드, 구조 다이어그램이 들어 있습니다.</p>

<div class="pf-block">

<div class="pf-section">
  <span class="pf-section-no">1</span>
  <h2>드림 플레이 게임즈</h2>
  <span class="pf-section-note">2024.03 ~ 2025.04 · Game Crit Studio · 캐주얼 RPG 3종 런칭 및 라이브 운영</span>
</div>

<div class="pf-list">

  <div class="pf-card">
    <div class="pf-thumb"><a href="/portfolio/unknown-heroes/"><img src="/images/portfolio/miunhwa-heroes.jpg" alt="미확인 용사단"/></a></div>
    <div class="pf-body">
      <h3><a href="/portfolio/unknown-heroes/">미확인 용사단</a></h3>
      <p class="pf-meta">2025.01 ~ 2025.04 · 하이브리드 방치형 RPG · AOS / iOS</p>
      <div class="pf-tags">
        <span class="pf-tag">Unity</span><span class="pf-tag">C#</span><span class="pf-tag">UniRx</span><span class="pf-tag">UniTask</span><span class="pf-tag">뒤끝채팅</span><span class="pf-tag">PlayFab</span>
        <span class="pf-tag is-key">⭐ 3.3 / 4.3</span><span class="pf-tag is-key">📥 10K+</span>
      </div>
      <ul>
        <li>DFS 기반 가챠 확률 산출 — 중첩 테이블 평탄화로 프레임 드랍 해소</li>
        <li>UniRx <code>IntReactiveProperty</code> 기반 반응형 UI 아키텍처 리팩터링</li>
        <li>슬롯머신 방식 아이템 감정 시스템 — 단계별 감속 · 정밀 스냅 연출</li>
      </ul>
    </div>
  </div>

  <div class="pf-card">
    <div class="pf-thumb"><a href="/portfolio/pixel-heroic-legend/"><img src="/images/portfolio/pixel-hero.jpg" alt="픽셀 영웅 전설"/></a></div>
    <div class="pf-body">
      <h3><a href="/portfolio/pixel-heroic-legend/">픽셀 영웅 전설</a></h3>
      <p class="pf-meta">2024.05 ~ 2024.11 · 방치형 파티 RPG · AOS / iOS</p>
      <div class="pf-tags">
        <span class="pf-tag">Unity</span><span class="pf-tag">C#</span><span class="pf-tag">R3</span><span class="pf-tag">UniTask</span><span class="pf-tag">뒤끝채팅</span><span class="pf-tag">PlayFab</span>
        <span class="pf-tag is-key">⭐ 4.6 / 4.0</span><span class="pf-tag is-key">📥 50K+</span>
      </div>
      <ul>
        <li>전투 코어 엔진 신규 개발 — R3 상태 제어 + UniTask 비동기 파이프라인</li>
        <li>PVP 전 과정 구현 — 리더보드 호출 최적화, 난이도별 매칭</li>
        <li>Spine Event 연동 타격 판정 및 전투 연출</li>
      </ul>
    </div>
  </div>

  <div class="pf-card">
    <div class="pf-thumb"><a href="/portfolio/return-hero/"><img src="/images/portfolio/return-hero.jpg" alt="귀환병 전기"/></a></div>
    <div class="pf-body">
      <h3><a href="/portfolio/return-hero/">귀환병 전기</a></h3>
      <p class="pf-meta">2024.03 ~ 2024.05 · 방치형 캐주얼 RPG · AOS / iOS</p>
      <div class="pf-tags">
        <span class="pf-tag">Unity</span><span class="pf-tag">C#</span><span class="pf-tag">UniTask</span><span class="pf-tag">PlayFab</span><span class="pf-tag">CloudScript</span>
        <span class="pf-tag is-key">⭐ 3.3 / 4.1</span><span class="pf-tag is-key">📥 10K+</span>
      </div>
      <ul>
        <li>랭킹 보상 정산 자동화 — 수기 정산 제거, 인앱 매출 약 8% 상승</li>
        <li>월드보스 신규 컨텐츠 설계·구현 — 인앱 매출 약 5% 상승</li>
        <li>PlayFab CloudScript 기반 서버 검증 로직</li>
      </ul>
    </div>
  </div>

</div>
</div>

---

<div class="pf-block">

<div class="pf-section">
  <span class="pf-section-no">2</span>
  <h2>먼데이오프</h2>
  <span class="pf-section-note">2022.10 ~ 2023.12 · 하이퍼캐주얼 3종 · 기획 및 클라이언트 1인 개발</span>
</div>

<div class="pf-list">

  <div class="pf-card">
    <div class="pf-thumb"><a href="/portfolio/hyper-casual/"><img src="/images/portfolio/mondayoff.jpg" alt="MondayOFF Hyper Casual"/></a></div>
    <div class="pf-body">
      <h3><a href="/portfolio/hyper-casual/">Hyper Casual Games</a></h3>
      <p class="pf-meta">Dance Mob · Number Store · Sweep Coin Tower · Global 출시</p>
      <div class="pf-tags">
        <span class="pf-tag">Unity</span><span class="pf-tag">C#</span><span class="pf-tag">Firebase</span><span class="pf-tag">IAP</span><span class="pf-tag">AppLovin MAX</span>
        <span class="pf-tag is-key">1인 개발</span><span class="pf-tag is-key">⭐ 최고 4.4</span><span class="pf-tag is-key">📥 최대 500K+</span>
      </div>
      <ul>
        <li>3종 모두 기획 · 클라이언트 개발 전담 후 글로벌 출시</li>
        <li>화면에 수백 개 오브젝트가 상주하는 환경의 성능 최적화</li>
        <li>오브젝트 풀링 · Material Property Block 배칭 · 이벤트 기반 연산으로 매 프레임 연산 제거</li>
      </ul>
    </div>
  </div>

</div>
</div>

---

<div class="pf-block">

<div class="pf-section">
  <span class="pf-section-no">3</span>
  <h2>Side Projects</h2>
  <span class="pf-section-note">Unity 입문기 개인 프로젝트 · C++ / WinAPI 모작</span>
</div>

<div class="pf-list">

  <div class="pf-card">
    <div class="pf-body">
      <h3><a href="/portfolio/side-projects/">개인 · 팀 포트폴리오 5건</a></h3>
      <p class="pf-meta">MergeCube · Cubic Music · HELLTAKER · River City Girls · The Witch&#39;s House</p>
      <div class="pf-tags">
        <span class="pf-tag">Unity</span><span class="pf-tag">C#</span><span class="pf-tag">UniRx</span><span class="pf-tag">C++</span><span class="pf-tag">WinAPI</span><span class="pf-tag">FMOD</span>
      </div>
      <ul>
        <li>MergeCube · Cubic Music — UniRx 옵저버 패턴, Queue 기반 오브젝트 풀링</li>
        <li>HELLTAKER — 엔진 없이 입력 · 충돌 · 애니메이션 프레임 제어를 직접 구현</li>
        <li>River City Girls · The Witch&#39;s House — 픽셀 충돌, Z-order 재정렬, 상태 관리 매니저</li>
      </ul>
    </div>
  </div>

</div>
</div>

---

<div class="pf-block">

<div class="pf-section">
  <span class="pf-section-no">4</span>
  <h2>Voyager Games</h2>
  <span class="pf-section-note">2025.11 ~ 2026.03 · AI 소셜 채팅 앱 · 멀티플랫폼 대응</span>
</div>

<div class="pf-list">

  <div class="pf-card">
    <div class="pf-thumb"><a href="/portfolio/eterna/"><img src="/images/portfolio/eterna-ai.jpg" alt="Eterna AI"/></a></div>
    <div class="pf-body">
      <h3><a href="/portfolio/eterna/">Eterna AI</a></h3>
      <p class="pf-meta">AOS / iOS / Steam · 플랫폼 통합 인증 및 결제</p>
      <div class="pf-tags">
        <span class="pf-tag">Unity</span><span class="pf-tag">C#</span><span class="pf-tag">Steamworks</span><span class="pf-tag">SteamAPI</span><span class="pf-tag">IAP</span><span class="pf-tag">Jenkins</span>
        <span class="pf-tag is-key">멀티플랫폼</span>
      </div>
      <ul>
        <li>Steam 로그인 · SDK 연동, 플랫폼 JWT 브릿지 설계</li>
        <li>Steam / Mobile 통합 IAP 파이프라인 구축</li>
        <li>Jenkins 5단계 빌드 · 배포 자동화</li>
      </ul>
    </div>
  </div>

</div>
</div>

---

<div class="pf-block">

<div class="pf-section">
  <span class="pf-section-no">5</span>
  <h2>공통 모듈</h2>
  <span class="pf-section-note">여러 프로젝트에 반복 이식한 모듈 · 설계 판단의 근거와 실제 코드</span>
</div>

<div class="pf-list">

  <div class="pf-card">
    <div class="pf-body">
      <h3><a href="/portfolio/chat-system/">실시간 채팅 시스템</a></h3>
      <p class="pf-meta">픽셀 영웅 전설 · 미확인 용사단에 이식</p>
      <div class="pf-tags">
        <span class="pf-tag">뒤끝 SDK</span><span class="pf-tag">Socket</span><span class="pf-tag">UniTask</span><span class="pf-tag">PlayFab</span>
      </div>
      <ul>
        <li>차단 목록을 PlayFab에 두어 서버 이원화 회피</li>
        <li>닉네임 Base64 인코딩으로 한글 깨짐 방지</li>
        <li>유저=JSON / 시스템=구분자+msgKey 로 포맷 분리 (로컬라이징 대응)</li>
      </ul>
    </div>
  </div>

  <div class="pf-card">
    <div class="pf-body">
      <h3><a href="/portfolio/applovin/">광고 수익화 모듈</a></h3>
      <p class="pf-meta">귀환병 전기 · 픽셀 영웅 전설 · 미확인 용사단에 이식</p>
      <div class="pf-tags">
        <span class="pf-tag">AppLovin MAX</span><span class="pf-tag">UniTask</span><span class="pf-tag">C#</span>
      </div>
      <ul>
        <li>호출부는 <code>ShowRewardedAD(보상함수)</code> 한 줄</li>
        <li><code>CancellationTokenSource</code> 가드로 중복 로드 차단</li>
        <li>로드 실패 · 재생 실패를 단일 경로로 수렴</li>
      </ul>
    </div>
  </div>

</div>
</div>
