/*
 * 목차 스크롤스파이. 스크롤 위치에 맞는 목차 항목을 활성 표시한다.
 *
 * 기성 라이브러리(Gumshoe 등)를 쓰지 않고 직접 구현한 이유가 두 가지 있다.
 *
 * 1) 그 계열은 대개 내부에서 document.querySelector(link.hash) 를 호출한다.
 *    kramdown 의 auto_ids 가 한국어 제목에서 만드는 앵커는 '1-프로젝트-개요'
 *    처럼 숫자로 시작하는데, CSS 식별자는 숫자로 시작할 수 없어 '#1-…' 은
 *    잘못된 선택자다. querySelector 가 SyntaxError 를 던지면 스파이 전체가
 *    죽는다. 속성 선택자 [id="1-…"] 는 같은 값을 문제없이 찾는다.
 *
 * 2) 외부 CDN 을 하나도 두지 않기 위해서다. 이 사이트는 모든 자산을
 *    저장소 안에서 제공한다.
 *
 * 조회 범위를 <article> 로 한정한다. 본문이 두 번 렌더되는 레이아웃에서
 * 같은 id 가 중복되면 전역 조회는 보이지 않는 쪽을 집을 수 있다.
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
