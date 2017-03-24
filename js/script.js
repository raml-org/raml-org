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

  });
})(jQuery);