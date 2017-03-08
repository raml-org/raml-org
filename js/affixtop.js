$(document).ready(function () {
    var distance = $('div.region-sidebar').offset().top;
    $(window).scroll(function() {
      if ( $(this).scrollTop() >= distance ) {
        $('div.region-sidebar').addClass('fixed');
      }
      else {
        $('div.region-sidebar').removeClass('fixed');
      }
    });

  });

