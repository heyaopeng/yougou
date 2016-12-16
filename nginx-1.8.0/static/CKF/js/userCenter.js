require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');

var header = require('./p_header.js');
var footer = require('./p_footer.js');
var topBar = require('./p_topBar.js');
var logo = require('./p_logo.js');
var category = require('./p_category.js');
var searchInput = require('./p_searchInput.js');

var userSidebar = require('./p_userSidebar.js');
var userDashboard = require('./p_userDashboard.js');
var userCollection = require('./p_userCollection.js');
var userHelpLinks = require('./p_userHelpLinks.js');
var userAside = require('./p_userAside.js');
var product = require('./p_product.js');
var productRate = require('./p_productRate.js');
var ckAd = require('./p_ckAd.js');


$(document).ready(function() {
	header.init();
	footer.init();
	topBar.init();
	logo.init();
	category.init();

	searchInput.init();
	userSidebar.init();
	userDashboard.init();
	userCollection.init();
	userHelpLinks.init();
	userAside.init();
	product.init();
	productRate.init();
	ckAd.init();
});