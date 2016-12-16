require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');


var header = require('./p_header.js');
var footer = require('./p_footer.js');
var topBar = require('./p_topBar.js');
var logo = require('./p_logo.js');
var signModal = require('./p_signModal.js');
var socialSign = require('./p_socialSign.js');

var category = require('./p_category.js');
var searchInput = require('./p_searchInput.js');
var inFashion = require('./p_inFashion.js');

$(document).ready(function() {
    // common js
    header.init();
    footer.init();
    topBar.init();
    logo.init();
    category.init();
    searchInput.init();
    signModal.init();
    socialSign.init();

    // custom js
    inFashion.init();
});