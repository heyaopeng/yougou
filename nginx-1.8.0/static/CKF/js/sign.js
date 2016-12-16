require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');

var header = require('./p_header.js');
var footer = require('./p_footer.js');
var logo = require('./p_logo.js');
var ajaxLoading = require('./p_ajaxLoading.js');

var sign = require('./p_sign.js');
var socialSign = require('./p_socialSign.js');

$(document).ready(function() {
	header.init();
	footer.init();
	logo.init();
	ajaxLoading.init();

	sign.init();
	socialSign.init();
});
