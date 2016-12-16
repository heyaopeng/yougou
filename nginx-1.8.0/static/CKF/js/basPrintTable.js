require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');

var bas = require('./p_bas.js');
var basPrint = require('./p_basPrint.js');

$(document).ready(function() {
	bas.init();
	basPrint.init();
});