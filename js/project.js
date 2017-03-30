fs_requestURL = 'https://api.raml.org/api.php?api=';
fs_prop = [];
fs_search = '';
fs_page = 1;
fs_cache = '';
fs_view = 'list';
fs_sort = 'popular';
projectsSearchCall = null;

function goToPage(value) {
  fs_page = value;
  getProjects();
}

function addSearch() {
  fs_page = 1;
  fs_search =  document.getElementById('search').value;

  clearTimeout (projectsSearchCall);
  projectsSearchCall = setTimeout(function(){
    getProjects();
  },500);
}

function doSort(sortBy) {
  fs_sort = sortBy;
  fs_page = 1;
  getProjects();
}

function doFilter(parent, type, value) {
  fs_page = 1;

  if (fs_prop[type] === undefined) {
    fs_prop[type] = [];
  }

  if (fs_prop[type][value] === undefined) {
    parent.className = 'tag selected';
    fs_prop[type][value] = value;
  } else {
    parent.className = 'tag';
    delete fs_prop[type][value];
  }

  getProjects();
}

function getProjects() {
  var url = fs_requestURL + 'listings&';
  if (fs_search != '') {
    var url = url + 'query=' + fs_search + '&';
  }

  for (var type in fs_prop) {
    var values = '';
    for (var value in fs_prop[type]) {
      var values = values + value + ',';
    }
    var url = url + type + '=' + values.substr(0,(values.length - 1)) + '&';
  }

  var url = url + 'page=' + fs_page + '&sort=' + fs_sort;

  // OK MAKE THE API CALL AND GET RESPONSES
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", url, false );
  xmlHttp.send( null );

  fs_cache = JSON.parse(xmlHttp.responseText);


  if (fs_view == 'list') {
    listLayout();
  } else {
    listLayout();
    fs_view = 'box';
    jQuery('.listing').addClass('tile');
  }

  showPages();
}

function getCategories() {
  var url = fs_requestURL + 'categories';
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", url, false );
  xmlHttp.send( null );

  var categories = JSON.parse(xmlHttp.responseText);
  var currentCat = '';

  for (i=0; i < categories.length; i++) {
    //alert(cat.category_type);
    if (currentCat != categories[i]['category_type']) {
      document.getElementById('categories').innerHTML += '<h4>'+ categories[i]['category_type'].substring(0, 1).toUpperCase() + categories[i]['category_type'].substring(1).toLowerCase(); +'</h4>';
      currentCat = categories[i]['category_type'];
    }
    document.getElementById('categories').innerHTML += '<a href="javascript:void(0);" onclick="doFilter(this, \'' + categories[i]['category_type'] + '\', \'' + categories[i]['category_id'] + '\');" class="tag">' + categories[i]['category_name']; + '</a>';
  }
}

function outClick(id) {
  var url = fs_requestURL + '&click=' + id;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", url, false );
  xmlHttp.send( null );
}


function showPages() {
  var pages_resp = '';
  for (i=1; i <= fs_cache['pages']; i++) {
    pages_resp += ' <a href="#top" onclick="gotoPage('+i+');" class="page" id="projectPage'+i+'">'+i+'</a>';
  }

  document.getElementById('projects_pages').innerHTML = pages_resp;
  document.getElementById('projectPage'+fs_page).className = 'page selectedPage';

}

function gotoPage(page) {
  document.getElementById('projectPage'+fs_page).className = 'page';
  fs_page = page;

  getProjects();
  document.getElementById('projectPage'+page).className = 'page selectedPage';
}

/* NOT USED!!!
 function boxLayout() {
 fs_view = 'box';

 document.getElementById('projects').innerHTML = '';
 // pull in fs_cache = json/ array and display as boxes

 for (i=0; i<fs_cache['listings'].length; i++) {
 var resp = '<div class="box" onMouseOver="getChildByClass(this, \'noHover\').style.display=\'none\'; getChildByClass(this, \'hover\').style.display=\'block\';" onMouseOut="getChildByClass(this, \'noHover\').style.display=\'block\'; getChildByClass(this, \'hover\').style.display=\'none\';"><div class="noHover">' +
 '<h3>' + fs_cache['listings'][i]['project_name'] + '</h3><p class="description">' + fs_cache['listings'][i]['project_description'] + '</p>';

 resp += '</div><div class="hover"><h3>' + fs_cache['listings'][i]['project_name'] + '</h3>Developed by ' + fs_cache['listings'][i]['contributor_name'] + '<br />License: ' +
 fs_cache['listings'][i]['project_license'] + '<br />' + fs_cache['listings'][i]['project_condition'] + '<br /><br /><br />';


 if (fs_cache['listings'][i]['project_url'] != '') {
 resp += '<a href="'+fs_cache['listings'][i]['project_url']+'" target="_blank" class="button website">Visit Site</a>';
 }

 if (fs_cache['listings'][i]['project_demo'] != '') {
 resp += '<a href="'+fs_cache['listings'][i]['project_demo']+'" target="_blank" class="button html">Try it Out</a>';
 }
 if (fs_cache['listings'][i]['project_github'] != '') {
 resp += '<a href="'+fs_cache['listings'][i]['project_github']+'" target="_blank" class="button github">View on GitHub</a>';
 }

 resp += '</div></div>';

 document.getElementById('projects').innerHTML += resp;
 }
 }
 */
function dump(obj) {
  var out = '';
  for (var i in obj) {
    out += i + ": " + obj[i] + "\n";
  }

  alert(out);
}

function listLayout() {
  fs_view = 'list';
  jQuery('.listing').removeClass('tile');

  document.getElementById('projects').innerHTML = '';

  for (i=0; i<fs_cache['listings'].length; i++) {

    var projectName = makeTag("h3", fs_cache['listings'][i]['project_name']),
      contributorName = makeTag("p", 'Developed by: ' + fs_cache['listings'][i]['contributor_name']),
      projectLicense = makeTag("p", 'License: ' + fs_cache['listings'][i]['project_license']),
      projectCondition = makeTag("p", 'Condition: ' + fs_cache['listings'][i]['project_condition']),
      projectDescription = makeTag("p", fs_cache['listings'][i]['project_description']);

    var resp = '<div class="listing"><div class="first-col"><div>' + projectName() + contributorName() +
      projectLicense() + projectCondition() + '<\/div>';

    if(fs_cache['listings'][i]['project_github_stars'] != '' || fs_cache['listings'][i]['project_github_forks'] != '') {
      resp += '<div style="margin-top: 6px; font-color: #626262;">';
      if (fs_cache['listings'][i]['project_github_stars'] != null) {
        resp += '<img src="http://raml.org/sites/default/files/github_stars.png" alt="GitHub Stars" align="absmiddle"> ' + fs_cache['listings'][i]['project_github_stars'] + '&nbsp; &nbsp;';
      }

      if (fs_cache['listings'][i]['project_github_forks'] != null) {
        resp += '<img src="http://raml.org/sites/default/files/github_fork.png" alt="GitHub Forks" align="absmiddle"> ' + fs_cache['listings'][i]['project_github_forks'];
      }

      resp += '<\/div>';
    }

    resp += '<\/div><div class="second-col">' + projectDescription() + '<\/div>' + '<div class="third-col">';

    if (fs_cache['listings'][i]['project_url'] != null && fs_cache['listings'][i]['project_url'] != '') {
      resp += '<a href="'+fs_cache['listings'][i]['project_url']+'" onclick="outClick('+fs_cache['listings'][i]['project_id']+');" target="_blank" class="button website">Visit Site</a>';
    }

    if (fs_cache['listings'][i]['project_demo'] != null && fs_cache['listings'][i]['project_demo'] != '') {
      resp += '<a href="'+fs_cache['listings'][i]['project_demo']+'" onclick="outClick('+fs_cache['listings'][i]['project_id']+');" target="_blank" class="button html">Try it Out</a>';
    }

    if (fs_cache['listings'][i]['project_github'] != null && fs_cache['listings'][i]['project_github'] != '') {
      resp += '<a href="'+fs_cache['listings'][i]['project_github']+'" onclick="outClick('+fs_cache['listings'][i]['project_id']+');" target="_blank" class="button github">View on GitHub</a>';
    }




    resp += '<\/div><\/div><\/div>';

    document.getElementById('projects').innerHTML += resp;
  }
}

function getChildByClass(parent, className) {
  for (var i = 0; i < parent.childNodes.length; i++) {
    if (parent.childNodes[i].className == className) {
      return parent.childNodes[i];
    }
  }
}

function makeTag(type, content) {
  function buildTag() {
    var tag = document.createElement(type);
    tag.appendChild(document.createTextNode(content));
    return tag.outerHTML;
  }
  return buildTag;
}
function boxLayoutOn() {
  jQuery('.listing').addClass('tile');
  fs_view = 'box';
  return false;
}

var projectsHash = window.location.hash;
if (projectsHash.match(/q:[a-z0-9\%]+/i)) {
  fs_search = projectsHash.replace('#q:', '');
  document.getElementById('search').value = fs_search;
}

getCategories();
getProjects();
showPages();