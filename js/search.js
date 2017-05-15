(function($){
  $(document).ready(function(){
    var div_id;
    //console.log(div_id);
    //var get_idname = div_id.replace('#','');
    //$(div_id + ' > div.pagination-page-' + get_idname).hide();
    $('#search').keyup(function() {
      var search_val = $(this).val();
      var active_text;
      var div_length;
      var active_div;
      console.log("tab id " +div_id);
      if(div_id == undefined) {
        div_id = '#all';
      }

        $(div_id + '> div.projectblock').each(function(k) {
          var get_class = $(this).children('div.row').find('div.projname h3').text().toLowerCase();
          console.log(get_class + "-" + k);
          var get_idname = div_id.replace('#','');
          if(search_val != '' ){
            if(get_class.indexOf(search_val) != -1) {
              console.log('search found' + k);
              $('div.projectblock:nth-child(' + (k+1) +')').show();

              $(div_id + ' > div.pagination-page-' + get_idname).show();

            } else {
              // $(get_class).fadeOut();
              $('div.projectblock:nth-child(' + (k+1) +')').hide();
              $(div_id + ' > div.pagination-page-' + get_idname).hide();

            }
          } else {
            $('div.projectblock:nth-child(' + (k+1) +')').show();
            $(div_id + ' > div.pagination-page-' + get_idname).show();
            console.log('search string empty');
          }
        });
    });
    $('ul.nav-pills li a').click(function() {
      div_id = $(this).attr('href');
      $('#search').keyup();
      var get_idname = div_id.replace('#','');
      $(div_id + ' > div.pagination-page-' + get_idname).hide();

    });


  });
})(jQuery);