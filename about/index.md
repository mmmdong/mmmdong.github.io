---
layout: page
title: About
permalink: /about/
excerpt: "Unity 3D/2D 게임 개발자 김동현 소개"
comments: false
---

안녕하십니까. 저는 '귀환병 전기', '픽셀 영웅 전설' 등 다수의 캐주얼 RPG를 런칭하고
라이브 서비스를 운영해 온 유니티 개발자입니다.
**UniRx(R3)** 와 **UniTask** 를 활용한 비동기 최적화 및 안정적인 아키텍처 설계에 강점이 있습니다.

**Web 기반의 네트워크 통신** 부터 **Spine Event** 를 활용한 정교한 액션 연출,
**멀티플랫폼(AOS · iOS · Steam) 대응** 까지 개발 전 과정을 직접 수행한 풀사이클 경험을 보유하고 있습니다.

최근에는 **Claude Code** 와 **Oh My Claude Code(OMC)** 를 개발 워크플로에 도입해
코드 리뷰 · 리팩터링 · 문서화 · 검증을 에이전트 기반으로 자동화하고 있습니다.
이 사이트 역시 해당 워크플로로 설계 · 구축했습니다.

## 기술 스택

{% for item in site.data.tech_stack %}- {{ item }}
{% endfor %}

## Contact

- **Email** · [{{ site.email }}](mailto:{{ site.email }})
- **Phone** · [{{ site.phone }}](tel:{{ site.phone | remove: '-' }})
- **GitHub** · [github.com/{{ site.github-url }}](https://github.com/{{ site.github-url }})
- **Notion** · [Unity Programmer &mdash; Kim Dong Hyun]({{ site.notion }})
- **코드 발췌** · [portfolio-code](https://github.com/{{ site.github-url }}/portfolio-code) &mdash; 각 프로젝트에서 직접 설계한 핵심 시스템 57개 파일
