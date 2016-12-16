require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');

var ajaxLoading = require('./p_ajaxLoading.js');
var pagination = require('./p_pagination.js');

var bas = require('./p_bas.js');
var basLang = require('./p_basLang.js');
var basMenu = require('./p_basMenu.js');

var basSettleModal = require('./p_basSettleModal.js');

$(document).ready(function() {
	ajaxLoading.init();
	pagination.init();
	bas.init();
	basLang.init();
	basMenu.init();
	
	basSettleModal.init();

});