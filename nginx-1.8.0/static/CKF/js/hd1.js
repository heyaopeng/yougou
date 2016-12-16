require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');

var header = require('./p_header.js');
var footer = require('./p_footer.js');
var topBar = require('./p_topBar.js');
var logo = require('./p_logo.js');
var ajaxLoading = require('./p_ajaxLoading.js');
var searchInput = require('./p_searchInput.js');
var signModal = require('./p_signModal.js');
var socialSign = require('./p_socialSign.js');
var category = require('./p_category.js');
var fetchXToken = require('./p_fetchXToken.js');
var signInCheck = require('./p_signInCheck.js');

$(document).ready(function() {
	header.init();
	footer.init();
	topBar.init();
	logo.init();
	ajaxLoading.init();
	searchInput.init();
	signModal.init();
	socialSign.init();
	category.init();
	fetchXToken.init();
	signInCheck.init();
});
