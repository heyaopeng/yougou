require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');

var ajaxLoading = require('./p_ajaxLoading.js');
var bas = require('./p_bas.js');
var basLang = require('./p_basLang.js');
var basMenu = require('./p_basMenu.js');

var finance = require('./p_finance.js');
var bankCartModal = require('./p_bankCartModal.js');


$(document).ready(function() {
	// common js
	ajaxLoading.init();
	bas.init();
	basLang.init();
	basMenu.init();

	// custom js
	finance.init();
	bankCartModal.init();
});