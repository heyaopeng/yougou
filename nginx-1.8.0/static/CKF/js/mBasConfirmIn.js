require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');

var ajaxLoading = require('./p_ajaxLoading.js');
var mBasHeader = require('./p_mBasHeader.js');

var mBasConfirmIn = require('./p_mBasConfirmIn.js');
var mBasFixed = require('./p_mBasFixed.js');

$(document).ready(function() {
	ajaxLoading.init();
	mBasHeader.init();
	
	mBasConfirmIn.init();
	mBasFixed.init();
});
