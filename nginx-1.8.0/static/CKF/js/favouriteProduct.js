require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');


var header = require('./p_header.js');
var footer = require('./p_footer.js');
var topBar = require('./p_topBar.js');
var logo = require('./p_logo.js');
var category = require('./p_category.js');
var ajaxLoading = require('./p_ajaxLoading.js');
var searchInput = require('./p_searchInput.js');

var proDetailInfo = require('./p_proDetailInfo.js');
var proDetailSize = require('./p_proDetailSize.js');
var proDetailColor = require('./p_proDetailColor.js');
var minusPlusGroup = require('./p_minusPlusGroup.js');
var proDetailTotal = require('./p_proDetailTotal.js');
var userSidebar = require('./p_userSidebar.js');
var favouriteProduct = require('./p_favouriteProduct.js');
var pagination = require('./p_pagination.js');
var shoppingModal = require('./p_shoppingModal.js');
var shoppingModalBtn = require('./p_shoppingModalBtn.js');


$(document).ready(function() {
    // common js
    header.init();
    topBar.init();
    logo.init();
    ajaxLoading.init();
    category.init();
    searchInput.init();
    // custom js
    shoppingModal.init();
    proDetailTotal.init();
    proDetailInfo.init();
    proDetailColor.init();
    proDetailSize.init();
    minusPlusGroup.init();
    favouriteProduct.init();
 
    userSidebar.init();
    pagination.init();
    shoppingModalBtn.init();

});