require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');

var header = require('./p_header.js');
var footer = require('./p_footer.js');
var logo = require('./p_logo.js');
var ajaxLoading = require('./p_ajaxLoading.js');
var resetPw = require('./p_resetPw.js');

$(document).ready(function() {
	header.init();
	footer.init();
	logo.init();
	ajaxLoading.init();
	resetPw.init();
});
