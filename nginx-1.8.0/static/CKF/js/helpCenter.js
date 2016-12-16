require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');

var header = require('./p_header.js');
var topBar = require('./p_topBar.js');
var logo = require('./p_logo.js');
var ajaxLoading = require('./p_ajaxLoading.js');
var searchInput = require('./p_searchInput.js');
var signModal = require('./p_signModal.js');
var socialSign = require('./p_socialSign.js');

var helpSidebar = require('./p_helpSidebar.js');
var helpCenter = require('./p_helpCenter.js');

$(document).ready(function() {
    // common js
    header.init();
    topBar.init();
    logo.init();
    ajaxLoading.init();
    searchInput.init();
    signModal.init();
    socialSign.init();

    // custom js
    helpSidebar.init();
    helpCenter.init();

});