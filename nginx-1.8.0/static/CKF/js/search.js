// import common style
require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');

//require('../less/search.less');

// import common header
var fetchXToken = require('./p_fetchXToken.js');
var signInCheck = require('./p_signInCheck.js');
var header = require('./p_header.js');
var topBar = require('./p_topBar.js');
var logo = require('./p_logo.js');
var searchInput = require('./p_searchInput.js');
var category = require('./p_category.js');
var signModal = require('./p_signModal.js');
var socialSign = require('./p_socialSign.js');

var footer = require('./p_footer.js');
var ajaxLoading = require('./p_ajaxLoading.js');
var pagination = require('./p_pagination.js');
var ckAd = require('./p_ckAd.js');

var product = require('./p_product.js');
var productRate = require('./p_productRate.js');
var productBehavior = require('./p_productBehavior.js');
var range = require('./p_range.js');
var breadcrumbProduct = require('./p_breadcrumbProduct.js');
var panelOperation = require('./p_panelOperation.js');
var adBar = require('./p_adBar.js');
var selectBarProperty = require('./p_selectBarProperty.js');
var searchResult = require('./p_searchResult.js');
var rangeSelect = require('./p_rangeSelect.js');

// 产品详情
var proDetailInfo = require('./p_proDetailInfo.js');
var proDetailSize = require('./p_proDetailSize.js');
var proDetailColor = require('./p_proDetailColor.js');
var minusPlusGroup = require('./p_minusPlusGroup.js');
var proDetailTotal = require('./p_proDetailTotal.js');

// 收藏夹
var proDetailFavorPro = require('./p_proDetailFavorPro.js');
var proDetailModal = require('./p_proDetailModal.js');

// 立即购买
var shoppingModal = require('./p_shoppingModal.js');
var shoppingModalBtn = require('./p_shoppingModalBtn.js');
var cartBtnProDetail = require('./p_cartBtnProDetail.js');

var product = require('./p_product.js');
var userCollection = require('./p_userCollection.js');
var renderCategory = require('./p_renderCategory.js');

var breadcrumbSet = require('./p_breadcrumbSet.js');

$(document).ready(function() {
	ajaxLoading.init();
	fetchXToken.init();
	signInCheck.init();
	// run the common js init();
	header.init();
	topBar.init();
	logo.init();
	searchInput.init();
	category.init();
	footer.init();
	product.init();
	signModal.init();
	socialSign.init();

	productRate.init();
	pagination.init();

	// run custom js init();
	breadcrumbSet.init();
	renderCategory.init();

	range.init();
	breadcrumbProduct.init();
	productBehavior.init();
	panelOperation.init();
	adBar.init();
	selectBarProperty.init();
	searchResult.init();
	rangeSelect.init();
	ckAd.init();

	proDetailInfo.init();
	proDetailSize.init();
	proDetailColor.init();
	minusPlusGroup.init();
	proDetailTotal.init();

	proDetailFavorPro.init();
	proDetailModal.init();

	shoppingModal.init();
	shoppingModalBtn.init();
	cartBtnProDetail.init();

	product.init();
	userCollection.init();


	// 未定，暂不做处理
	/*$('.color-pick').each(function () {
		var $this = $(this);
		var $getColor = $this.data('color');
		$this.css('background', $getColor);
	});*/
});
