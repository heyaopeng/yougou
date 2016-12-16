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
var refundApply = require('./p_refundApply.js');
var refundApplyUpload = require('./p_refundApplyUpload.js');
var refundDetailInfo = require('./p_refundDetailInfo.js');
var refundApplyForm = require('./p_refundApplyForm.js');
var refundProBar = require('./p_refundProBar.js');

$(document).ready(function() {
	ajaxLoading.init();
	header.init();
	footer.init();
	topBar.init();
	logo.init();
	category.init();
	searchInput.init();

	userSidebar.init();
	refundApply.init();
	refundDetailInfo.init();
	refundApplyUpload.init();
	refundApplyForm.init();
	refundProBar.init();
});

