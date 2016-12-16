require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');

var ajaxLoading = require('./p_ajaxLoading.js');
var mBasSign = require('./p_mBasSign.js');

$(document).ready(function() {
	ajaxLoading.init();
	mBasSign.init();
});
