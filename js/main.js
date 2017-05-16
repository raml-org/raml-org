(function($){
  $(document).ready(function(){
    var current_id;
    $('ul.nav-pills li a').click(function() {
    current_id = $(this).attr('href');
      pagination(current_id);
      var gethash = current_id.replace('#','');
      $("div"+current_id +" > .pagination-page-" + gethash).show();
  });
    pagination(current_id);


  });
})(jQuery);

function pagination(curentid) {
  if(curentid == undefined) {
    curentid = '#all';
  }
  console.log("pagination " + curentid);
  var replaceHash = curentid.replace('#','');
  var items = $("div"+curentid +" > div.projectblock");
  var numItems = items.length;
  var perPage = 5;
  items.slice(perPage).hide();
  $(".pagination-page-" + replaceHash).pagination({
    items: numItems,
    itemsOnPage: perPage,

    // This is the actual page changing functionality.
    onPageClick: function(pageNumber) {
      // We need to show and hide `tr`s appropriately.
      var showFrom = perPage * (pageNumber - 1);
      var showTo = showFrom + perPage;

      // We'll first hide everything...
      items.hide()
        // ... and then only show the appropriate rows.
        .slice(showFrom, showTo).show();
    }
  });
  function checkFragment() {
    // If there's no hash, treat it like page 1.
    var hash = window.location.hash || "#page-1";

    // We'll use a regular expression to check the hash string.
    hash = hash.match(/^#page-(\d+)$/);

    if(hash) {
      // The `selectPage` function is described in the documentation.
      // We've captured the page number in a regex group: `(\d+)`.
      $(".pagination-page-" + replaceHash).pagination("selectPage", parseInt(hash[1]));
    }
  }

  // We'll call this function whenever back/forward is pressed...
  $(window).bind("popstate", checkFragment);

  // ... and we'll also call it when the page has loaded
  // (which is right now).
  checkFragment();

}