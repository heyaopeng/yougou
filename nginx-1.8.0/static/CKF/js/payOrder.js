require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');

var header = require('./p_header.js');
var footer = require('./p_footer.js');
var topBar = require('./p_topBar.js');
var logo = require('./p_logo.js');
var ajaxLoading = require('./p_ajaxLoading.js');
var signModal = require('./p_signModal.js');
var socialSign = require('./p_socialSign.js');

var receiptMessage = require('./p_receiptMessage.js');
var orderListSettlement = require('./p_orderListSettlement.js');
var orderList = require('./p_orderList.js');
var infoEditModal = require('./p_infoEditModal.js');
var addressGroup = require('./p_addressGroup.js');
var payStep = require('./p_payStep.js');
var useCoupons = require('./p_useCoupons');

$(document).ready(function() {
	header.init();
	footer.init();
	topBar.init();
	logo.init();
	ajaxLoading.init();
	signModal.init();
	socialSign.init();

	useCoupons.init();
	infoEditModal.init();
	receiptMessage.init();
	orderListSettlement.init();
	orderList.init();
	addressGroup.init();
	payStep.init();
});
