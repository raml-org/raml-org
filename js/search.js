(function($){
  $(document).ready(function(){
    var div_id;
    //$('div.nosearch').html('');
    $('#search').keyup(function() {
      var search_val = $(this).val().toLowerCase();
      if(div_id == undefined) {
        div_id = '#all';
      }

        $(div_id + ' > div.projectblock').each(function(k) {
          var get_class = $(this).children('div.row').find('div.projname h3').text().toLowerCase();
          var get_idname = div_id.replace('#','');
          if(search_val != '' ){
            if(get_class.indexOf(search_val) != -1) {
              $('div' + div_id + ' div.projectblock:eq('+ k +')').show();

              $(div_id + ' > div.pagination-page-' + get_idname).show();

            } else {
              $('div' + div_id + ' div.projectblock:eq('+ k +')').hide();
              $(div_id + ' > div.pagination-page-' + get_idname).hide();

            }
          } else {
            $('div.projectblock:eq('+ k +')').show();
            $(div_id + ' > div.pagination-page-' + get_idname).show();
          }
        });

      var counts;
      $(div_id).each(function(j) {
        var final_count = $('div.projectblock', $(this)).length;
        counts =  $('div.projectblock:hidden', $(this)).length;
        console.log(counts + 'count' + final_count);

        if(final_count == counts ) {
          $(div_id + '> div.nosearch').html('<h2>Sorry,no results for '+ search_val +'</h2>');
        } else {
          $(div_id + '> div.nosearch').html('');
        }
      });



    });
    $('ul.nav-pills li a').click(function() {
      div_id = $(this).attr('href');
      $('#search').keyup();
      $(div_id + '> div.nosearch').html('');
    });


  });
})(jQuery);