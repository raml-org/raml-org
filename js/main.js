jQuery(function($) {

  var items = $("div#all > div.projectblock");

  var numItems = items.length;
  var perPage = 5;

  // Only show the first 2 (or first `per_page`) items initially.
  items.slice(perPage).hide();

  // Now setup the pagination using the `.pagination-page` div.
  $(".pagination-page").pagination({
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



  // EDIT: Let's cover URL fragments (i.e. #page-3 in the URL).
  // More thoroughly explained (including the regular expression) in:
  // https://github.com/bilalakil/bin/tree/master/simplepagination/page-fragment/index.html

  // We'll create a function to check the URL fragment
  // and trigger a change of page accordingly.
  function checkFragment() {
    // If there's no hash, treat it like page 1.
    var hash = window.location.hash || "#page-1";

    // We'll use a regular expression to check the hash string.
    hash = hash.match(/^#page-(\d+)$/);

    if(hash) {
      // The `selectPage` function is described in the documentation.
      // We've captured the page number in a regex group: `(\d+)`.
      $(".pagination-page").pagination("selectPage", parseInt(hash[1]));
    }
  }

  // We'll call this function whenever back/forward is pressed...
  $(window).bind("popstate", checkFragment);

  // ... and we'll also call it when the page has loaded
  // (which is right now).
  checkFragment();
});

jQuery(function($) {

  var items = $("div#design > div.projectblock");

  var numItems = items.length;
  var perPage = 5;

  // Only show the first 2 (or first `per_page`) items initially.
  items.slice(perPage).hide();

  // Now setup the pagination using the `.pagination-page` div.
  $(".pagination-page-design").pagination({
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



  // EDIT: Let's cover URL fragments (i.e. #page-3 in the URL).
  // More thoroughly explained (including the regular expression) in:
  // https://github.com/bilalakil/bin/tree/master/simplepagination/page-fragment/index.html

  // We'll create a function to check the URL fragment
  // and trigger a change of page accordingly.
  function checkFragment() {
    // If there's no hash, treat it like page 1.
    var hash = window.location.hash || "#page-1";

    // We'll use a regular expression to check the hash string.
    hash = hash.match(/^#page-(\d+)$/);

    if(hash) {
      // The `selectPage` function is described in the documentation.
      // We've captured the page number in a regex group: `(\d+)`.
      $(".pagination-page").pagination("selectPage", parseInt(hash[1]));
    }
  }

  // We'll call this function whenever back/forward is pressed...
  $(window).bind("popstate", checkFragment);

  // ... and we'll also call it when the page has loaded
  // (which is right now).
  checkFragment();
});

jQuery(function($) {

  var items = $("div#build > div.projectblock");

  var numItems = items.length;
  var perPage = 5;

  // Only show the first 2 (or first `per_page`) items initially.
  items.slice(perPage).hide();

  // Now setup the pagination using the `.pagination-page` div.
  $(".pagination-page-build").pagination({
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



  // EDIT: Let's cover URL fragments (i.e. #page-3 in the URL).
  // More thoroughly explained (including the regular expression) in:
  // https://github.com/bilalakil/bin/tree/master/simplepagination/page-fragment/index.html

  // We'll create a function to check the URL fragment
  // and trigger a change of page accordingly.
  function checkFragment() {
    // If there's no hash, treat it like page 1.
    var hash = window.location.hash || "#page-1";

    // We'll use a regular expression to check the hash string.
    hash = hash.match(/^#page-(\d+)$/);

    if(hash) {
      // The `selectPage` function is described in the documentation.
      // We've captured the page number in a regex group: `(\d+)`.
      $(".pagination-page").pagination("selectPage", parseInt(hash[1]));
    }
  }

  // We'll call this function whenever back/forward is pressed...
  $(window).bind("popstate", checkFragment);

  // ... and we'll also call it when the page has loaded
  // (which is right now).
  checkFragment();
});

jQuery(function($) {

  var items = $("div#test > div.projectblock");

  var numItems = items.length;
  var perPage = 5;

  // Only show the first 2 (or first `per_page`) items initially.
  items.slice(perPage).hide();

  // Now setup the pagination using the `.pagination-page` div.
  $(".pagination-page-test").pagination({
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



  // EDIT: Let's cover URL fragments (i.e. #page-3 in the URL).
  // More thoroughly explained (including the regular expression) in:
  // https://github.com/bilalakil/bin/tree/master/simplepagination/page-fragment/index.html

  // We'll create a function to check the URL fragment
  // and trigger a change of page accordingly.
  function checkFragment() {
    // If there's no hash, treat it like page 1.
    var hash = window.location.hash || "#page-1";

    // We'll use a regular expression to check the hash string.
    hash = hash.match(/^#page-(\d+)$/);

    if(hash) {
      // The `selectPage` function is described in the documentation.
      // We've captured the page number in a regex group: `(\d+)`.
      $(".pagination-page").pagination("selectPage", parseInt(hash[1]));
    }
  }

  // We'll call this function whenever back/forward is pressed...
  $(window).bind("popstate", checkFragment);

  // ... and we'll also call it when the page has loaded
  // (which is right now).
  checkFragment();
});

jQuery(function($) {

  var items = $("div#document > div.projectblock");

  var numItems = items.length;
  var perPage = 5;

  // Only show the first 2 (or first `per_page`) items initially.
  items.slice(perPage).hide();

  // Now setup the pagination using the `.pagination-page` div.
  $(".pagination-page-document").pagination({
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



  // EDIT: Let's cover URL fragments (i.e. #page-3 in the URL).
  // More thoroughly explained (including the regular expression) in:
  // https://github.com/bilalakil/bin/tree/master/simplepagination/page-fragment/index.html

  // We'll create a function to check the URL fragment
  // and trigger a change of page accordingly.
  function checkFragment() {
    // If there's no hash, treat it like page 1.
    var hash = window.location.hash || "#page-1";

    // We'll use a regular expression to check the hash string.
    hash = hash.match(/^#page-(\d+)$/);

    if(hash) {
      // The `selectPage` function is described in the documentation.
      // We've captured the page number in a regex group: `(\d+)`.
      $(".pagination-page").pagination("selectPage", parseInt(hash[1]));
    }
  }

  // We'll call this function whenever back/forward is pressed...
  $(window).bind("popstate", checkFragment);

  // ... and we'll also call it when the page has loaded
  // (which is right now).
  checkFragment();
});

jQuery(function($) {

  var items = $("div#parsers > div.projectblock");

  var numItems = items.length;
  var perPage = 5;

  // Only show the first 2 (or first `per_page`) items initially.
  items.slice(perPage).hide();

  // Now setup the pagination using the `.pagination-page` div.
  $(".pagination-page-parsers").pagination({
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



  // EDIT: Let's cover URL fragments (i.e. #page-3 in the URL).
  // More thoroughly explained (including the regular expression) in:
  // https://github.com/bilalakil/bin/tree/master/simplepagination/page-fragment/index.html

  // We'll create a function to check the URL fragment
  // and trigger a change of page accordingly.
  function checkFragment() {
    // If there's no hash, treat it like page 1.
    var hash = window.location.hash || "#page-1";

    // We'll use a regular expression to check the hash string.
    hash = hash.match(/^#page-(\d+)$/);

    if(hash) {
      // The `selectPage` function is described in the documentation.
      // We've captured the page number in a regex group: `(\d+)`.
      $(".pagination-page").pagination("selectPage", parseInt(hash[1]));
    }
  }

  // We'll call this function whenever back/forward is pressed...
  $(window).bind("popstate", checkFragment);

  // ... and we'll also call it when the page has loaded
  // (which is right now).
  checkFragment();
});

jQuery(function($) {

  var items = $("div#converters > div.projectblock");

  var numItems = items.length;
  var perPage = 5;

  // Only show the first 2 (or first `per_page`) items initially.
  items.slice(perPage).hide();

  // Now setup the pagination using the `.pagination-page` div.
  $(".pagination-page-converters").pagination({
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



  // EDIT: Let's cover URL fragments (i.e. #page-3 in the URL).
  // More thoroughly explained (including the regular expression) in:
  // https://github.com/bilalakil/bin/tree/master/simplepagination/page-fragment/index.html

  // We'll create a function to check the URL fragment
  // and trigger a change of page accordingly.
  function checkFragment() {
    // If there's no hash, treat it like page 1.
    var hash = window.location.hash || "#page-1";

    // We'll use a regular expression to check the hash string.
    hash = hash.match(/^#page-(\d+)$/);

    if(hash) {
      // The `selectPage` function is described in the documentation.
      // We've captured the page number in a regex group: `(\d+)`.
      $(".pagination-page").pagination("selectPage", parseInt(hash[1]));
    }
  }

  // We'll call this function whenever back/forward is pressed...
  $(window).bind("popstate", checkFragment);

  // ... and we'll also call it when the page has loaded
  // (which is right now).
  checkFragment();
});