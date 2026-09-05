# mmmdong.github.io

Unity 3D/2D 게임 개발자 김동현 포트폴리오.

## 라이선스 및 출처

이 사이트는 **Adam Blog 2.0** Jekyll 테마를 기반으로 합니다.

- **Adam Blog 2.0** — [Armando Maynez](https://github.com/amaynez) ·
  [the-mvm/the-mvm.github.io](https://github.com/the-mvm/the-mvm.github.io)
- 상류 원작 **Adam Blog v1.0** — [Artem Sheludko](https://github.com/artemsheludko) ·
  [artemsheludko/adam-blog](https://github.com/artemsheludko/adam-blog)
- 라이선스: **GPL-3.0** (`LICENSE` 참조). 이 저장소도 GPL-3.0 을 따릅니다.

### 자체 구현으로 대체한 부분

- 목차 스크롤스파이: 업스트림은 [Gumshoe](https://github.com/cferdinandi/gumshoe) 를
  CDN 에서 불러왔으나, 한국어 제목에서 생성되는 숫자 시작 앵커(`#1-…`)에서
  `querySelector` 가 SyntaxError 를 내며 동작하지 않았다.
  `assets/js/toc-scrollspy.js` 로 직접 구현해 외부 CDN 의존을 제거했다.

## 빌드

```
docker compose up
```

GitHub Pages classic 으로 배포됩니다.
