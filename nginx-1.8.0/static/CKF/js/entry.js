require('../css/bootstrap.css');
require('../css/icons.css');

var rateAverage = require('./p_rateAverage.js');

$(document).ready(function () {
	rateAverage.init();
});