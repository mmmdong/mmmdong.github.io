// dl-menu options
$(function() {
  $( '#dl-menu' ).dlmenu({
    animationClasses : { classin : 'dl-animate-in', classout : 'dl-animate-out' }
  });
});
/*
 * 뒤로가기로 돌아왔을 때 빈 화면이 되는 것을 막는다.
 *
 * zoombtn 을 누르면 아래 핸들러가 .container / .wrapper 에 fadeOut 을 건다.
 * 이 둘은 페이지의 내용 전체를 감싸고 있고, .animated 에 걸린
 * animation-fill-mode: both 때문에 애니메이션이 끝난 opacity: 0 에서 멈춘다.
 * 즉 fadeOut 이 남아 있는 문서가 다시 화면에 올라오면 아무것도 보이지 않는다.
 *
 * 브라우저가 뒤로가기에서 문서를 bfcache 로 되살리면 DOM 이 그대로 돌아온다 —
 * fadeOut 클래스도 같이 돌아오고, $(document).ready 는 다시 뛰지 않는다.
 * 원본 테마는 여기에 window.onunload = function(){} 를 두고 있었는데, 그건
 * 고치는 코드가 아니라 unload 핸들러가 있으면 bfcache 를 쓰지 않는다는 성질을
 * 이용해 캐시 자체를 꺼버리는 우회였다. unload 는 폐기 절차를 밟는 중이고
 * (안드로이드 크롬은 이미 무시한다) 사파리도 같은 보장을 하지 않으므로,
 * 그 우회에 화면이 보이느냐가 걸려 있으면 안 된다.
 *
 * pageshow 는 최초 로드에도, bfcache 복원에도 반드시 발생한다. 복원 여부를
 * 따지지 않고 매번 되돌리면 두 경로가 같은 상태로 수렴한다.
 */
window.addEventListener('pageshow', function () {
    var hosts = document.querySelectorAll('.container, .wrapper');
    for (var i = 0; i < hosts.length; i++) {
        hosts[i].classList.remove('fadeOut');
        hosts[i].classList.add('fadeIn');
    }
});

// Add lightbox class to all image links
$("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

// FitVids options
$(function() {
  $(".content").fitVids();
});

// All others
$(document).ready(function() {
    // zoom in/zoom out animations
    if ($(".container").hasClass('fadeOut')) {
        $(".container").removeClass("fadeOut").addClass("fadeIn");
    }
    if ($(".wrapper").hasClass('fadeOut')) {
        $(".wrapper").removeClass("fadeOut").addClass("fadeIn");
    }
    $(".zoombtn").click(function() {
        $(".container").removeClass("fadeIn").addClass("fadeOut");
        $(".wrapper").removeClass("fadeIn").addClass("fadeOut");
    });
    // go up button
    $.goup({
        trigger: 500,
        bottomOffset: 10,
        locationOffset: 20,
        containerRadius: 0,
        containerColor: '#fff',
        arrowColor: '#000',
        goupSpeed: 'normal'
    });
	$('.image-popup').magnificPopup({
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 300, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open. 
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: 'mfp-fade'
  });
});
