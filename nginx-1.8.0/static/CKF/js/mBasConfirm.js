require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');

var ajaxLoading = require('./p_ajaxLoading.js');
var mBasHeader = require('./p_mBasHeader.js');
var mBasTab = require('./p_mBasTab.js');

var mBasConfirm = require('./p_mBasConfirm.js');

$(document).ready(function() {
	ajaxLoading.init();
	mBasHeader.init();
	mBasTab.init();
	
	mBasConfirm.init();
});
