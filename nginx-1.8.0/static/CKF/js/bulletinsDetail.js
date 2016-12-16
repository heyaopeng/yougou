require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');

var header = require('./p_header.js');
var topBar = require('./p_topBar.js');
var footer = require('./p_footer.js');
var logo = require('./p_logo.js');
var category = require('./p_category.js');
var ajaxLoading = require('./p_ajaxLoading.js');
var searchInput = require('./p_searchInput.js');
var userSidebar = require('./p_userSidebar.js');

var bulletinsDetailOpt = require('./p_bulletinsDetailOpt.js');
var pBulletinsDetail = require('./p_pBulletinsDetail.js');

$(document).ready(function() {
    // common js
    header.init();
    topBar.init();
    logo.init();
    category.init();
    ajaxLoading.init();
    searchInput.init();
    userSidebar.init();
    bulletinsDetailOpt.init();
    pBulletinsDetail.init();
});