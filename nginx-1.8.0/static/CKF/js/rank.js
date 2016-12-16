require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');

var fetchXToken = require('./p_fetchXToken.js');
var signInCheck = require('./p_signInCheck.js');
var header = require('./p_header.js');
var footer = require('./p_footer.js');
var topBar = require('./p_topBar.js');
var logo = require('./p_logo.js');
var category = require('./p_category.js');
var ajaxLoading = require('./p_ajaxLoading.js');
var searchInput = require('./p_searchInput.js');
var signModal = require('./p_signModal.js');
var socialSign = require('./p_socialSign.js');

var rankSidebar = require('./p_rankSidebar.js');
var breadcrumbProduct = require('./p_breadcrumbProduct.js');
var rankProduct = require('./p_rankProduct.js');
var productRate = require('./p_productRate.js');
var adBar = require('./p_adBar.js');
var panelOperation = require('./p_panelOperation.js');
var pagination = require('./p_pagination.js');
var ckAd = require('./p_ckAd.js');

$(document).ready(function() {
	ajaxLoading.init();
	fetchXToken.init();
	signInCheck.init();
    // common js
    header.init();
    footer.init();
    topBar.init();
    logo.init();
    category.init();
    searchInput.init();
    signModal.init();
    socialSign.init();

    // custom js
    rankSidebar.init();
    breadcrumbProduct.init();
    rankProduct.init();
    productRate.init();
    adBar.init();
    panelOperation.init();
    pagination.init();
    ckAd.init();
});