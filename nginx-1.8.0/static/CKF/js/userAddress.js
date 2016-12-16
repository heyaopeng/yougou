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
var userProfile = require('./p_userProfile.js');
var receiptMessage = require('./p_receiptMessage.js');
var infoEditModal = require('./p_infoEditModal.js');
var addressGroup = require('./p_addressGroup.js');

$(document).ready(function() {
    // common js
    header.init();
    topBar.init();
    footer.init();
    logo.init();
    ajaxLoading.init();
    category.init();
    searchInput.init();
    userSidebar.init();

    // custom js
    infoEditModal.init();
    userProfile.init();
    receiptMessage.init();
    addressGroup.init();
});