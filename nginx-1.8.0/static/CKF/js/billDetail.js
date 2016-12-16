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

var financialAccount = require('./p_financialAccount.js');
var securityRate = require('./p_securityRate.js');
var billDetailList = require('./p_billDetailList.js');
var pagination = require('./p_pagination.js');

$(document).ready(function() {
    // common js
    header.init();
    topBar.init();
    logo.init();
    ajaxLoading.init();
    category.init();
    searchInput.init();
    userSidebar.init();

    securityRate.init();
    financialAccount.init();
    billDetailList.init();
    pagination.init();
});