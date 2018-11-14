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