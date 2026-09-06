# mmmdong.github.io

Unity 3D/2D 게임 개발자 김동현 포트폴리오.

## 라이선스 및 출처

이 사이트는 **Moon** Jekyll 테마를 기반으로 합니다.

- **Moon** — [Taylan Tatlı](https://github.com/TaylanTatli) ·
  [TolgaTatli/Moon](https://github.com/TolgaTatli/Moon)
- 라이선스: **MIT** (`LICENSE` 참조). 저작권 고지와 라이선스 전문을 그대로 유지합니다.
- `assets/css/main.scss` 상단의 디자이너 크레딧도 원본 그대로 둡니다.

### 번들 코드

- `_includes/toc.html` — [allejo/jekyll-toc](https://github.com/allejo/jekyll-toc) 포크, **MIT**.
  파일 헤더에 출처와 사용법이 있습니다.
- `assets/js/toc-scrollspy.js`, `assets/js/theme-toggle.js` — 자체 작성.

## 구조

| 경로 | 내용 |
|---|---|
| `/` | 랜딩 |
| `/about/` | 자기소개 · 기술 스택 · 연락처 |
| `/projects/` | 포트폴리오 목록 (`project: true` 인 글을 자동 나열) |
| `/portfolio/<slug>/` | 프로젝트 상세 8건 |
| `/cv/` | 이력 |
| `/tags/` | 태그 |

블로그 목록(`/posts/`)은 두지 않습니다. 이 사이트에 실리는 글은 전부
포트폴리오 프로젝트라 목록이 `/projects/` 와 겹쳤습니다.

## 빌드

```
docker compose up
```

GitHub Pages classic 으로 배포됩니다.

### 주의: Gemfile.lock

`Gemfile.lock` 은 `.gitignore` 대상이고 저장소에 없어야 합니다.
`Dockerfile` 은 `Gemfile` 만 복사해 이미지 안에서 젬을 해석하는데,
`docker compose` 는 저장소를 `/usr/src/app` 에 바인드 마운트하므로
호스트에 `Gemfile.lock` 이 있으면 그게 이미지의 해석 결과를 덮어씁니다.
버전이 어긋나면 `Bundler::GemNotFound` 로 기동이 실패합니다.
컨테이너 밖에서 `bundle install` 을 돌렸다면 생성된 `Gemfile.lock` 을 지우십시오.

`Gemfile` 은 테마가 제공하던 `jekyll ~> 3.2.1` 대신 `github-pages` 를 씁니다.
배포 대상이 GitHub Pages classic 이라 그쪽 젬 집합(Jekyll 3.10.0)에 맞춰야 합니다.

### 새 글을 추가할 때

`_config.yml` 의 `permalink: /:title/` 에서 `:title` 은 제목이 아니라
**파일명에서 날짜를 뺀 부분**입니다. 파일명을 한글로 두면 URL 에 한글이 그대로 들어갑니다.
둘 중 하나를 지킬 것:

- 파일명을 영문 슬러그로 (`2026-01-01-my-post.md`)
- 또는 front matter 에 `permalink:` 를 직접 지정

프로젝트 글은 front matter 에 `project: true` 를 넣으면 `/projects/` 목록에 잡힙니다.
**넣지 않으면 어느 목록에도 안 나옵니다** — 블로그 목록을 걷어냈기 때문입니다.
URL 로 직접 들어가야만 보이므로, 새 글에는 잊지 말고 넣으십시오.

`/projects/` 안에서의 위치는 `group`(`_data/project_groups.yml` 의 id)과 `order`
가 정합니다. 사전에 없는 `group` 값을 쓰면 목록 맨 아래 '기타' 로 떨어집니다 —
조용히 사라지지 않게 하려는 장치입니다.

### 레이아웃에서 링크를 쓸 때

`site.url` 뒤에는 반드시 슬래시를 붙입니다 (`{{ site.url }}/`).

로컬 미리보기 설정(`_config_docker.yml`)은 `url` 을 빈 문자열로 둡니다.
그래서 `href="{{site.url}}"` 는 `href=""` 로 렌더되는데, 빈 URL 은
현재 문서를 가리키므로(RFC 3986 5.4) 눌러도 같은 페이지가 다시 뜹니다 —
버튼이 죽은 것처럼 보입니다. 라이브에서는 `url` 이 절대주소라 우연히 동작해서
`/projects/` 의 Home 과 `/about/` · `/cv/` 의 되돌아가기가 로컬에서만
망가진 채 한동안 남아 있었습니다.

검증 스크립트가 산출물의 링크 대상을 직접 확인합니다: 빈 `href`, 자기 자신을
가리키는 되돌아가기 버튼, `_site` 에 실재하지 않는 내부 링크를 모두 잡습니다.

### 테마에서 걷어낸 것

- **Disqus** — 기본값이 원작자 계정(`disqus_shortname`)이라 그대로 두면
  방문자 브라우저에서 남의 댓글 서비스가 로드됩니다. 설정과 호출부를 모두 제거했습니다.
- **Google Analytics** 스니펫 — 쓰지 않습니다.
- **MathJax** — `post.html` · `page.html` 이 `cdn.mathjax.org` 를 부르고 있었습니다.
  그 호스트는 서비스가 종료됐습니다. `mathjax: false` 로 꺼두기만 하면 설정 한 줄로
  되살아나는 잠복 참조가 남으므로, 호출부와 설정 키를 모두 제거했습니다.

그 결과 배포 산출물에서 외부 서브리소스 요청이 0건입니다.
CSS · JS · 폰트(Fira Sans, Font Awesome)는 모두 저장소 안에서 제공됩니다.
