require('../css/bootstrap.css');
require('../css/icons.css');

var header = require('./p_header.js');
var footer = require('./p_footer.js');
var logo = require('./p_logo.js');
var error = require('./p_error.js');

$(document).ready(function () {
    header.init();
    footer.init();
    logo.init();

    error.init();
});
