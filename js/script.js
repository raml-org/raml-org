(function($){
  $(document).ready(function(){
    $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      $(this).parent().siblings().removeClass('open');
      $(this).parent().toggleClass('open');
    });

    $('#build_desc, #test_desc, #document_desc, #share_desc').hide();
    $('#one_design_img').show();
    $('.map-container map area').mouseover(function(){
      var href_div = $(this).attr('href');
      var id = $(this).attr('id');
      $('#'+id+'_img').show().siblings(".hmapimg").hide();
      $(' '+ href_div +' ').show().siblings("section").hide();

    });
    var current = location.pathname;
    $('.nav li a').each(function(){
      var $this = $(this);
      // if the current path is like this link, make it active
      if($this.attr('href') == current){
        $this.addClass('active');
      }
    });
    
    $('[data-toggle="slide-collapse"]').on('click', function() {
      $navMenuCont = $($(this).data('target'));
      $navMenuCont.toggle('slide');
    });


    $('.over-lay').on('click',function(){
      if($(this).hasClass('overlay')){
        $(this).removeClass('overlay');
        $('.navbar-toggler').addClass('collapsed');
        $('.navbar-collapse.collapse').removeClass('show');
      }
    });

    $('.nav-item').on('mouseover',function(){
      $('.nav-item > a').css('opacity','0.5');
      $(this).find('a').css('opacity','1');
    });

    $('.navbar-nav').on('mouseout',function(){
      $('.nav-item a').css('opacity','1');
    });

    $('.homepage_icons a').on('mouseover',function(){
      $('.homepage_icons a').addClass('gray');
      $(this).removeClass('gray');
    });

    $('.homepage_icons').on('mouseout',function(){
      $('.homepage_icons a').removeClass('gray');
    });

    setTimeout(function(){ 
      if($(".raml-editor .editor-block #container").find(".monaco-editor").length) {
        $(".sk-fading-circle").hide();
      }
    }, 1000);
  });

})(jQuery);


// GDPR script
jQuery.gdprcookie.init({
  title: "",
  message: "We use cookies to make interactions with our websites and services easy and meaningful, to better understand how they are used and to tailor advertising. You can read more and make your cookie choices <a href='https://forum.raml.org/privacy'>here</a>. By continuing to use this site you are giving us your consent to do this.",
  submessage: "Please uncheck the cookies you don't like.",
  delay: 600,
  expires: 1,
  acceptBtnLabel: "X",
});

/*
  * Replace all SVG images with inline SVG
  */
$(function() {
  $('img.svg').each(function() {
    var $img = $(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    $.get(imgURL, function(data) {
      // Get the SVG tag, ignore the rest
      var $svg = $(data).find('svg');

      // Add replaced image's ID to the new SVG
      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');

      // Replace image with new SVG
      $img.replaceWith($svg);
    }, 'xml');
  });
})

