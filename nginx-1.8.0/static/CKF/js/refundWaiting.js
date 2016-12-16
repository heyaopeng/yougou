require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');


var header = require('./p_header.js');
var topBar = require('./p_topBar.js');
var logo = require('./p_logo.js');
var category = require('./p_category.js');
var ajaxLoading = require('./p_ajaxLoading.js');
var searchInput = require('./p_searchInput.js');

var userSidebar = require('./p_userSidebar.js');
var refundProBar = require('./p_refundProBar.js');
// var refundProcessing = require('./p_refundProcessing.js');
// var refundAwbForm = require('./p_refundAwbForm.js');
var refundWaiting = require('./p_refundWaiting.js');
// var refundDetailCountdown = require('./p_refundDetailCountdown.js');
var applicantInfo = require('./p_applicantInfo.js');

$(document).ready(function() {
    // common js
    header.init();
    topBar.init();
    logo.init();
    ajaxLoading.init();
    category.init();
    searchInput.init();

    // custom js
    userSidebar.init();
    refundProBar.init();
    // refundProcessing.init();
    // refundAwbForm.init();
    // refundAwb.init();
    // refundDetailCountdown.init();
    applicantInfo.init();
    refundWaiting.init();
});