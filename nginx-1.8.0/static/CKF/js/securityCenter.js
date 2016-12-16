require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');

// 公共的require (一般所有页面都需要引入)
var header = require('./p_header.js');
var footer = require('./p_footer.js');
var topBar = require('./p_topBar.js');
var logo = require('./p_logo.js');
var category = require('./p_category.js');
var ajaxLoading = require('./p_ajaxLoading.js');
var searchInput = require('./p_searchInput.js');
var userSidebar = require('./p_userSidebar.js');
var timeCount = require('./p_timeCount.js');

var securityRate = require('./p_securityRate.js');
var securityTable = require('./p_securityTable.js');
var securityModal = require('./p_securityModal.js');
var uiStepModule = require('./p_uiStepModule.js');
var securitySelectModal = require('./p_securitySelectModal.js');
var securityModifyModal = require('./p_securityModifyModal.js');

$(document).ready(function() {
	ajaxLoading.init();
	header.init();
	footer.init();
	topBar.init();
	logo.init();
	category.init();
	searchInput.init();
	userSidebar.init();
	timeCount.init();

	securityRate.init();
	securityTable.init();
	securityModal.init();
	securitySelectModal.init();
	uiStepModule.init();
	securityModifyModal.init();
});
