require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');

var ajaxLoading = require('./p_ajaxLoading.js');

var bas = require('./p_bas.js');
var basLang = require('./p_basLang.js');
var basMenu = require('./p_basMenu.js');

var financialAccount = require('./p_financialAccount.js');

$(document).ready(function() {
	ajaxLoading.init();
	bas.init();
	basLang.init();
	basMenu.init();

	financialAccount.init();
});