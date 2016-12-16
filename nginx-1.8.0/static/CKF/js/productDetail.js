require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');

var header = require('./p_header.js');
var footer = require('./p_footer.js');
var topBar = require('./p_topBar.js');
var logo = require('./p_logo.js');
var ajaxLoading = require('./p_ajaxLoading.js');
var category = require('./p_category.js');
var searchInput = require('./p_searchInput.js');
var signModal = require('./p_signModal.js');
var socialSign = require('./p_socialSign.js');

var productRate = require('./p_productRate.js');
var pagination = require('./p_pagination.js');

var breadcrumbProduct = require('./p_breadcrumbProduct.js');
var proDetailComment = require('./p_proDetailComment.js');
var ckAd = require('./p_ckAd.js');

var proDetailBtn = require('./p_proDetailBtn.js');
var proDetailTotal = require('./p_proDetailTotal.js');
var proDetailPanel = require('./p_proDetailPanel.js');
var mImg = require('./p_proDetailMImg.js');
var proDetailSimg = require('./p_proDetailSimg.js');
var proDetailInfo = require('./p_proDetailInfo.js');
var verticalCarousel = require('./p_verticalCarousel.js');
var proDetailTab = require('./p_proDetailTab.js');
var proDetailFavorPro = require('./p_proDetailFavorPro.js');
var size = require('./p_proDetailSize.js');
var color = require('./p_proDetailColor.js');
var minusPlusGroup = require('./p_minusPlusGroup.js');
var rateAverage = require('./p_rateAverage.js');
var proDetailModal = require('./p_proDetailModal.js');
var shareModal = require('./p_shareModal.js');
var asideNav = require('./p_asideNav.js');
var product = require('./p_product.js');
var userCollection = require('./p_userCollection.js');



$(document).ready(function() {
    header.init();
    footer.init();
    topBar.init();
    logo.init();
    ajaxLoading.init();
    category.init();
    searchInput.init();
    signModal.init();
    socialSign.init();

    productRate.init();

    proDetailTab.init();
    proDetailTotal.init();
    proDetailBtn.init();
    mImg.init();
    verticalCarousel.init();
    proDetailSimg.init();
    proDetailPanel.init();
    proDetailInfo.init();
    proDetailFavorPro.init();
    color.init();
    size.init();
    minusPlusGroup.init();
    proDetailModal.init();
    proDetailComment.init();
    pagination.init();

    shareModal.init();
    rateAverage.init();
    asideNav.init();
    ckAd.init();
    userCollection.init();
    product.init()
});