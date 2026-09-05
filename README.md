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

### 새 글을 추가할 때

`_config.yml` 의 `permalink: ':title:output_ext'` 에서 `:title` 은 제목이 아니라
**파일명에서 날짜를 뺀 부분**이다. 파일명을 한글로 두면 URL 에 한글이 그대로 들어간다.
둘 중 하나를 지킬 것:

- 파일명을 영문 슬러그로 (`2026-01-01-my-post.md`)
- 또는 front matter 에 `permalink:` 를 직접 지정

현재 프로젝트 8건은 전부 `permalink:` 를 명시하고 있어 이 영향을 받지 않는다.
블로그 글은 `category: blog` 를 지정하면 `/blog/` 목록에 잡힌다.
`/portfolio/` 는 슬러그 8건을 명시 조회하므로 새 글이 섞이지 않는다.

### 주의: Gemfile.lock

`Gemfile.lock` 은 `.gitignore` 대상이고 저장소에 없어야 합니다.
`Dockerfile` 은 `Gemfile` 만 복사해 이미지 안에서 젬을 해석하는데,
`docker compose` 는 저장소를 `/usr/src/app` 에 바인드 마운트하므로
호스트에 `Gemfile.lock` 이 있으면 그게 이미지의 해석 결과를 덮어씁니다.
버전이 어긋나면 `Bundler::GemNotFound` 로 기동이 실패합니다.
컨테이너 밖에서 `bundle install` 을 돌렸다면 생성된 `Gemfile.lock` 을 지우십시오.
