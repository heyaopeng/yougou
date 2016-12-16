require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');

var header = require('./p_header.js');
var footer = require('./p_footer.js');
var topBar = require('./p_topBar.js');
var logo = require('./p_logo.js');
var category = require('./p_category.js');
var ajaxLoading = require('./p_ajaxLoading.js');
var searchInput = require('./p_searchInput.js');
var userSidebar = require('./p_userSidebar.js');

var bulletinsBatchOpt = require('./p_bulletinsBatchOpt.js');
var bulletinsList = require('./p_bulletinsList.js');
var pagination = require('./p_pagination.js');
var bulletinsModule = require('./p_bulletinsModule.js');
var noMessage = require('./p_noMessage.js');

$(document).ready(function() {
    // common js
    header.init();
    topBar.init();
    logo.init();
    ajaxLoading.init();
    category.init();
    searchInput.init();
    userSidebar.init();

    noMessage.init();
    bulletinsBatchOpt.init();
    bulletinsList.init();
    pagination.init();
    bulletinsModule.init();
});