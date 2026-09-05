/*
 * TOC 스크롤스파이. 업스트림 the-mvm 은 Gumshoe 5.1.1 을 CDN 에서 받아 썼다.
 * 여기서는 두 가지 이유로 직접 구현한다.
 *
 * 1) Gumshoe 는 내부에서 document.querySelector(link.hash) 를 호출한다.
 *    kramdown auto_ids 가 한국어 제목에서 만드는 앵커는 '1-프로젝트-개요' 처럼
 *    숫자로 시작하고, CSS 식별자는 숫자로 시작할 수 없다. 그래서 '#1-…' 은
 *    잘못된 선택자이고 querySelector 가 SyntaxError 를 던져 스파이 전체가 죽는다.
 *    (이 저장소 기준 그런 앵커가 8개 글에 걸쳐 37개.) 속성 선택자 [id="1-…"] 는
 *    같은 값을 문제없이 찾는다.
 *
 * 2) post.html 은 본문을 두 번 렌더한다 — 검색용 사본이 <section class="hidden">
 *    안에 들어가고, 그게 <article> 보다 문서상 먼저 온다. 같은 id 가 두 번
 *    존재하므로 document 전역 조회는 보이지 않는 사본을 집는다. 조회 범위를
 *    <article> 로 한정해야 화면에 보이는 제목을 추적한다.
 *
 * 클래스 계약은 업스트림과 동일하다: 활성 항목의 li 에 'active'(.toc .active 가
 * 배경색), 해당 본문 제목에 'underline'.
 */
(function () {
  var nav = document.getElementById('toc-content');
  if (!nav) return;

  var scope = nav.closest ? nav.closest('article') : null;
  if (!scope) scope = document.querySelector('article') || document;

  var NAV_CLASS = 'active';
  var CONTENT_CLASS = 'underline';
  var OFFSET = 20;

  var items = [];
  var links = nav.querySelectorAll('a[href^="#"]');
  for (var i = 0; i < links.length; i++) {
    var raw = links[i].getAttribute('href').slice(1);
    if (!raw) continue;
    var id;
    try {
      id = decodeURIComponent(raw);
    } catch (e) {
      id = raw;
    }
    var target = scope.querySelector('[id="' + id.replace(/(["\\])/g, '\\$1') + '"]');
    if (target && links[i].parentElement) {
      items.push({ link: links[i], nav: links[i].parentElement, content: target, top: 0 });
    }
  }
  if (!items.length) return;

  var current = null;
  var ticking = false;

  function measure() {
    for (var i = 0; i < items.length; i++) {
      items[i].top = items[i].content.getBoundingClientRect().top + window.pageYOffset;
    }
    items.sort(function (a, b) { return a.top - b.top; });
  }

  function activate(item) {
    if (item === current) return;
    if (current) {
      current.nav.classList.remove(NAV_CLASS);
      current.content.classList.remove(CONTENT_CLASS);
    }
    if (item) {
      item.nav.classList.add(NAV_CLASS);
      item.content.classList.add(CONTENT_CLASS);
    }
    current = item;
  }

  function update() {
    ticking = false;
    var y = window.pageYOffset + OFFSET;
    var doc = document.documentElement;
    // 맨 아래에서는 마지막 항목을 활성으로 둔다. 마지막 절이 짧으면
    // 스크롤이 끝나도 offset 선을 넘지 못해 활성이 되지 않는다.
    if (window.innerHeight + window.pageYOffset >= doc.scrollHeight - 2) {
      activate(items[items.length - 1]);
      return;
    }
    var found = null;
    for (var i = 0; i < items.length; i++) {
      if (items[i].top <= y) found = items[i];
      else break;
    }
    activate(found);
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  function remeasure() {
    measure();
    update();
  }

  measure();
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', remeasure, { passive: true });
  // 이미지가 늦게 뜨면 제목 위치가 밀린다.
  window.addEventListener('load', remeasure);
})();
