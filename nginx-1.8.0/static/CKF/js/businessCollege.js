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


var bCollege = require('./p_bCollege.js');
var productRate = require('./p_productRate.js');
var bCollegeSwitch = require('./p_bCollegeSwitch.js');

$(document).ready(function() {
	header.init();
	footer.init();
	topBar.init();
	logo.init();
	ajaxLoading.init();
	category.init();
	signModal.init();
	socialSign.init();

	searchInput.init();
	bCollege.init();
	productRate.init();
	bCollegeSwitch.init();
});
