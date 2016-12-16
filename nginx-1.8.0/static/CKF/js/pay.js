require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');


var header = require('./p_header.js');
var topBar = require('./p_topBar.js');
var logo = require('./p_logo.js');
var searchInput = require('./p_searchInput.js');
var ajaxLoading = require('./p_ajaxLoading.js');
var fetchXToken = require('./p_fetchXToken.js');

var payProcess = require('./p_payProcess.js');
var payStep = require('./p_payStep.js');
var cardFormModal = require('./p_cardFormModal.js');
var otherPay = require('./p_otherPay.js');


$(document).ready(function() {
    // common js
    header.init();
    topBar.init();
    logo.init();
    ajaxLoading.init();
    searchInput.init();
    fetchXToken.init();

    //custom js
    payProcess.init();
    payStep.init();
    cardFormModal.init();
    otherPay.init();
});