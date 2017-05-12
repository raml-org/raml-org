(function($){
  $(document).ready(function(){
    $('#search').keyup(function() {
      var search_val = $(this).val();
      var active_text;
      var div_class;
      var active_div;
      $('ul.nav-pills li').each(function(i) {
        var active_tab = $(this).attr('class');
        if(active_tab == 'active') {
          active_text = $(this).find('a').text().toLowerCase();
        }
      });
       //console.log(search_val);

      //alert(search_val + active_text);
      $('div.tab-content > div.active').each(function(j) {
         var getid = $(this).attr('id');
         console.log(getid);
         $('div#'+ getid + '> div.projectblock').each(function(k) {
           var get_class = $(this).children('div.row').find('div.projname h3').text().toLowerCase();
           console.log(get_class + "-" + k);
           if(search_val != '' ){
             if(get_class.indexOf(search_val) != -1) {
               console.log('search found' + k);
               //$('div.projectblock:nth-child(' + k +')').show();
               //$(get_class).show();
               $('div.projectblock:nth-child(' + (k+1) +')').show();
             } else {
               // $(get_class).fadeOut();
               $('div.projectblock:nth-child(' + (k+1) +')').fadeOut();
               //console.log('search not found' + k + 'div.projectblock:nth-child(' + k +')' );
             }
           } else {
               $('div.projectblock:nth-child(' + (k+1) +')').show();
             //$('#'+getid).load('#'+getid);
               console.log('search string empty');
           }
         })

      });
    });

  });
})(jQuery);