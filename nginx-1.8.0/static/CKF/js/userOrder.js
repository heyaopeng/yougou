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

var userSidebar = require('./p_userSidebar.js');
var userSearch = require('./p_userSearch.js');
var userOrder = require('./p_userOrder.js');
var pagination = require('./p_pagination.js');

var productRate = require('./p_productRate.js');
var userCommentModal = require('./p_userCommentModal.js');

$(document).ready(function() {
	header.init();
	footer.init();
	topBar.init();
	logo.init();
	ajaxLoading.init();
	category.init();

	userSidebar.init();
	userSearch.init();
	userOrder.init();
	pagination.init();
	searchInput.init();

	productRate.init();
	userCommentModal.init();
});
