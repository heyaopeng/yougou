require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');


var header = require('./p_header.js');
var topBar = require('./p_topBar.js');
var logo = require('./p_logo.js');

var payProcess = require('./p_payProcess.js');
var paySuccessLine = require('./p_paySuccessLine.js');
var payStep = require('./p_payStep.js');


$(document).ready(function() {
    // common js
    header.init();
    topBar.init();
    logo.init();

    //custom js
    payProcess.init();
    paySuccessLine.init();
    payStep.init();
});