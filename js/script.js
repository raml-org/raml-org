(function($){
  $(document).ready(function(){
    $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      $(this).parent().siblings().removeClass('open');
      $(this).parent().toggleClass('open');
    });

    $('#build_desc, #test_desc, #document_desc, #share_desc').hide();
    $('.map-container map area').mouseover(function(){
      var href_div = $(this).attr('href');
      $(' '+ href_div +' ').show().siblings("section").hide();

    });
  });
})(jQuery);