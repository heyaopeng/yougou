require('../css/bootstrap.css');
require('../css/icons.css');
require('./common_require.js');

var header = require('./p_header.js');
var footer = require('./p_footer.js');
var topBar = require('./p_topBar.js');
var logo = require('./p_logo.js');
var ajaxLoading = require('./p_ajaxLoading.js');
var category = require('./p_category.js');
var searchInput = require('./p_searchInput.js');

var cartEmpty = require('./p_cartEmpty.js');
var productRate = require('./p_productRate.js');
var cartStore = require('./p_cartStore.js');
var cartPro = require('./p_cartPro.js');
var cartFooter = require('./p_cartFooter.js');
var cartMinusPlusGroup = require('./p_cartMinusPlusGroup.js');
var cart = require('./p_cart.js');
var product = require('./p_product.js');
var userCollection = require('./p_userCollection.js');

$(document).ready(function () {
    header.init();
    footer.init();
	topBar.init();
    logo.init();
    ajaxLoading.init();
    category.init();
    searchInput.init();

    cartEmpty.init();
    productRate.init();
    cartMinusPlusGroup.init();
    cartStore.init();
    cartFooter.init();
    cartPro.init();
    cart.init();

    product.init();
    userCollection.init();
    
});
// $(window).load(function(){
    // if(parseInt($('body').height()-$(window).scrollTop()-$('.cart-footer').height()-$(window).height())>=
    //     parseInt($('.footer').height()+$('.cart-footer').nextAll().height())+$('.cart-footer').height()-30){
    //     $('.cart-footer').addClass('cart-footer-fixed');
    // }
    // else{
    //     $('.cart-footer').removeClass('cart-footer-fixed');
    // }
// });