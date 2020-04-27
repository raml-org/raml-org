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

    var t=setInterval(function(){ 
      if($(".raml-editor .editor-block #container").find(".monaco-editor").length) {
        $(".sk-fading-circle").hide();
        clearInterval(t);
      }
    }, 1000);
  });

})(jQuery);

