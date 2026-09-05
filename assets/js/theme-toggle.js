/*
 * 다크/라이트 토글.
 *
 * 기본값은 다크이고, 레이아웃의 <html> 이 data-theme="dark" 를 서버 렌더한다.
 * head 의 인라인 스크립트가 스타일시트보다 먼저 저장값을 읽어 라이트면 속성을
 * 걷어낸다 — 그래야 라이트를 고른 방문자에게 첫 페인트에서 다크가 번쩍이지 않는다.
 * 이 파일은 그 뒤에 실행되어 버튼만 붙인다.
 *
 * 저장소 계약: sessionStorage 키 'theme', 값 {"nightShift": true|false}.
 * head 인라인과 반드시 같은 키·같은 형식을 써야 한다.
 */
(function () {
  var root = document.documentElement;

  function isDark() {
    return root.getAttribute('data-theme') === 'dark';
  }

  function save(dark) {
    try {
      sessionStorage.setItem('theme', JSON.stringify({ nightShift: dark }));
    } catch (e) {
      /* 프라이빗 모드 등에서 던진다. 저장만 못 할 뿐 토글은 동작해야 한다. */
    }
  }

  function apply(dark) {
    if (dark) root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    save(dark);
    render();
  }

  var btn = document.createElement('button');
  btn.className = 'theme-toggle';
  btn.type = 'button';

  function render() {
    var dark = isDark();
    // 버튼은 '누르면 무엇이 되는가' 를 보여준다
    btn.innerHTML = dark ? '&#9788;' : '&#9789;';   // ☀ / ☾
    btn.setAttribute('aria-label', dark ? '라이트 모드로 전환' : '다크 모드로 전환');
    btn.setAttribute('title', btn.getAttribute('aria-label'));
    btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
  }

  btn.addEventListener('click', function () {
    apply(!isDark());
  });

  render();
  document.body.appendChild(btn);
})();
