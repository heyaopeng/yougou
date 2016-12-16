require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');

var ajaxLoading = require('./p_ajaxLoading.js');
var pagination = require('./p_pagination.js');

var bas = require('./p_bas.js');
var basLang = require('./p_basLang.js');
var basSearch = require('./p_basSearch.js');
var basMenu = require('./p_basMenu.js');

var basConfirmModal = require('./p_basConfirmModal.js');
var basConfirm = require('./p_basConfirm.js');

$(document).ready(function() {
	ajaxLoading.init();
	pagination.init();
	bas.init();
	basLang.init();
	basSearch.init();
	basMenu.init();
	basConfirmModal.init();
	basConfirm.init();
});