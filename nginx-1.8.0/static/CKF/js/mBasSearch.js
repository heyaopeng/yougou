require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');

var ajaxLoading = require('./p_ajaxLoading.js');
var mBasHeader = require('./p_mBasHeader.js');
var mBasSearch = require('./p_mBasSearch.js');

$(document).ready(function() {
	ajaxLoading.init();
	mBasHeader.init();

	mBasSearch.init();
});
