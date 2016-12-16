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
var refundDetail = require('./p_refundDetail.js');
var refundDetailInfo = require('./p_refundDetailInfo.js');
var refundDetailProblem = require('./p_refundDetailProblem.js');
var refundDetailConditions = require('./p_refundDetailConditions.js');
// var refundDetailProgress = require('./p_refundDetailProgress.js');
// var refundDetailCountdown = require('./p_refundDetailCountdown.js');
var refundDetailChoose = require('./p_refundDetailChoose.js');

$(document).ready(function() {
	header.init();
	footer.init();
	topBar.init();
	logo.init();
	ajaxLoading.init();
	category.init();
	searchInput.init();

	userSidebar.init();
	refundDetail.init();
	refundDetailInfo.init();
	refundDetailProblem.init();
	// refundDetailCountdown.init();
	// refundDetailProgress.init();
	refundDetailChoose.init();
	refundDetailConditions.init();

});

