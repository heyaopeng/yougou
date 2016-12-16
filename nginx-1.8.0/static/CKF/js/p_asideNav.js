var CKF = require('./CKF.js');
var getCookie = require('./getCookie.js');
var lang = getCookie('language');
var Big =  require('big.js');
var currencyConfig = require('./currencyConfig.js');
require('../less/aside-nav.less');
// other dependencies ...

module.exports = (function() {
    var moduleName = 'asideNav';
    var module = CKF.create(moduleName,true);

    return {
        init: function() {
            if(module!==null){
                var $cartbomb = module.find('.js-lgbomb-cart');
                var $favbomb = module.find('.js-lgbomb-fav');
                //go to top
                module.on('click', '.js-go-top', function() {
                    $(document.body).animate({
                        'scrollTop': 0
                    }, 1000);
                });

                CKF.listen({
                    'user-sign-in': login
                }, moduleName);

                //delete in cart
                $cartbomb.on('click', '.js-cart-delete', function() {
                    var $this = $(this);
                    var $par = $this.closest('.js-pro-item');
                    var id = $par.data('id');
                    if (confirm(__('Are you sure to delete?'))) {
                        $.post('/cooka-cart-web/delectComItem', 'comId=' + id, function(data) {
                            if (data === 'success') {
                                $par.remove();
                                calculateTotal();
                            } else {}
                        }, 'html');
                    }
                });
                //delete in favourite
                $favbomb.on('click', '.js-fav-delete', function() {
                    var $this = $(this);
                    var $par = $this.closest('.js-pro-item');
                    var id = $par.data('id');
                    if (confirm(__('Are you sure to delete?'))) {
                        $.post('/cooka-user-web/center/deletefavouriteProduct.do', 'proId=' + id, function(data) {
                            if (data === 'success') {
                                $par.remove();
                            } else {}
                        }, 'html');
                    }
                });

                //if login
                login();

                function login() {
                    $.ajax({
                        url: "/duobao-user-web/isLogin",
                        type: 'GET',
                        success: function(result) {
                            if (result === "false") {
                                module.addClass('hide');
                            } else {
                                module.removeClass('hide');
                                getCart();
                                getFav();
                            }
                        }
                    });
                }
                //get cart info

                function getPrice(amount, priceAttr) {
                    var i;

                    for (i = priceAttr.length - 1; i >= 0; i--) {

                        if (amount > priceAttr[i]) {
                            return i;
                            // break;
                        }
                    }
                    return -1;
                }


                function getCart() {
                    $.post('/cooka-cart-web/ajaxViewCart', function(attr) {
                        var itemHtml = '';

                        if(!attr.length) {
                            module.find('.js-cart-empty').removeClass('hide');
                            module.find('.js-cart-no-empty').addClass('hide');
                        }else {
                            module.find('.js-cart-empty').addClass('hide');
                            module.find('.js-cart-no-empty').removeClass('hide');

                             $.each(attr, function(key, val) {
                            var active = val.active;

                            var title = val.title;
                            var productImg = val.productImage;
                            var sepcification = val.specificationValue;
                            var itemId = val.itemId;
                            var proId = val.productId;

                            var amount = val.amount;
                            var singlePrice=0;

                            if(active===false){
                                amount = 0;
                                itemHtml = itemHtml + '<div class="aside-nav-list-item js-pro-item" data-id="'+itemId+'">' +
                                 '<div class="aside-nav-list-item-unable">' +
                                     '<div class="aside-nav-list-item-warning">' +
                                         '<span class="aside-nav-list-item-icon">'+
                                         '<span class="icon-warning-o">'+
                                         '</span>'+
                                         '</span>'+
                                         '<span class="aside-nav-list-item-text">'+
                                         __("Commodity prices have changed")+
                                         '</span>'+
                                         '<div class="text-right aside-nav-list-description-icon-unable">' +
                                         '<span class="icon-delete-o js-cart-delete aside-nav-list-description-delete" title='+__("delete")+'></span>' +
                                         '</div>' +
                                     '</div>' +
                                    '<div class="aside-nav-list-item-img">' +
                                    '<a href="/cooka-productDetail-web/productDetail?productId='+proId+'"><img src="' + productImg + '" alt="" width="67" height="100"/></a>' +
                                    '</div>' +
                                    '<div class="aside-nav-list-description">' +
                                        '<div class="aside-nav-list-description-title">' +
                                        '<a href="/cooka-productDetail-web/productDetail?productId='+proId+'">'+title +'</a>'+
                                        '</div>' +
                                        '<div><span class="js-single-price">' + CKF.util.fixPrice(singlePrice.toFixed(currencyConfig)) + '</span> VND<span class="pull-right">X<span class="js-num">' + amount + '</span></span></div>' +
                                    '<div>';
                                for (var key in sepcification) {

                                    if (sepcification.hasOwnProperty(key)) {
                                        itemHtml += '<span class="aside-nav-list-item-combination">' +  key + ': ' + sepcification[key] + '</span>';
                                    }
                                }
                                // <span class="aside-nav-list-item-combination"> color : ' + sepcification["颜色"] + '</span>
                                // <span class="aside-nav-list-item-space"></span>
                                // <span class="aside-nav-list-item-combination">size : <span>' + sepcification["尺码"] + '</span></span></div>' +
                                itemHtml += '</div>' +
                                '</div>' +
                                '</div>';
                            }
                            else {
                                 var productPrices = val.productPrices;
                                 var priceAttr = [];
                                 $.each(productPrices, function(key, val) {
                                     priceAttr.push(val.price);
                                 });
                                 var productPricesLength = priceAttr.length;
                                 if (productPricesLength === 1) {
                                     singlePrice = priceAttr[0];
                                 } else if(productPricesLength ===0){

                                 }
                                else {
                                 var i = getPrice(amount, priceAttr);
                                 if(i!==-1)
                                     singlePrice = productPrices[i].price;
                                }
                                 itemHtml = itemHtml + '<div class="aside-nav-list-item js-pro-item" data-id="'+itemId+'">' +
                                 '<div class="aside-nav-list-item-img">' +
                                 '<a href="/cooka-productDetail-web/productDetail?productId='+proId+'"><img src="' + productImg + '" alt="" width="67" height="100"/></a>' +
                                 '</div>' +
                                 '<div class="aside-nav-list-description">' +
                                 '<div class="aside-nav-list-description-title">' +
                                 '<a href="/cooka-productDetail-web/productDetail?productId='+proId+'">'+title +'</a>'+
                                 '</div>' +
                                 '<div><span class="js-single-price">' + CKF.util.fixPrice(singlePrice.toFixed(currencyConfig)) + '</span> VND<span class="pull-right">X<span class="js-num">' + amount + '</span></span></div>' +
                                 '<div>';
                                 for (var key in sepcification) {
                                    if (sepcification.hasOwnProperty(key)) {
                                        itemHtml += '<span class="aside-nav-list-item-combination">' +  key + ': ' + sepcification[key] + '</span>';
                                    }
                                }
                                /* <span class="aside-nav-list-item-combination"> color : ' + sepcification[0] + '</span>
                                 <span class="aside-nav-list-item-space"></span>
                                 <span class="aside-nav-list-item-combination">size :
                                  <span>' + sepcification[1] + '</span>
                                 </span>*/
                                 itemHtml +='</div>' +
                                 '<div class="text-right aside-nav-list-description-icon">' +
                                 '<span class="icon-delete-o js-cart-delete aside-nav-list-description-delete" title='+__('delete')+'></span>' +
                                 '</div>' +
                                 '</div>' +
                                 '</div>';
                            }
                        });
                        module.find('.js-cart-list').html(itemHtml);
                        calculateTotal();
                        }
                    });
                }


                function getFav() {
                    $.post('/cooka-user-web/center/ajaxViewfavourite', function(attr) {
                        var itemHtml = '';
                        if(!attr.length) {
                            module.find('.js-fav-empty').removeClass('hide');
                            module.find('.js-fav-no-empty').addClass('hide');
                        }else {
                            module.find('.js-fav-empty').addClass('hide');
                            module.find('.js-fav-no-empty').removeClass('hide');
                            $.each(attr, function(key, val) {
                                var title = val.title;
                                var productImg = val.imageUrl;
                                var singlePrice = val.price;
                                var itemId = val.productId;
                                var isActive = val.isActive;
                                if(isActive){
                                    itemHtml = itemHtml + '<div class="aside-nav-list-item js-pro-item" data-id="'+itemId+'">' +
                                    '<div class="aside-nav-list-item-img">'+
                                        '<a href="/cooka-productDetail-web/productDetail?productId='+itemId+'"><img src="'+productImg+'" alt="" width="67" height="100"/></a>'+
                                    '</div>'+
                                    '<div class="aside-nav-list-description">'+
                                        '<div class="aside-nav-list-description-title">'+
                                        '<a href="/cooka-productDetail-web/productDetail?productId='+itemId+'">'+title+'</a>'+
                                        '</div>'+
                                        '<div>'+CKF.util.fixPrice(singlePrice.toFixed(currencyConfig))+'</div>'+
                                        '<div class="text-right aside-nav-list-description-icon">'+
                                            '<span class="icon-delete-o js-fav-delete" title='+__('delete')+'></span>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>';
                                }
                                else {
                                    itemHtml = itemHtml + '<div class="aside-nav-list-item js-pro-item" data-id="'+itemId+'">' +
                                    '<div class="aside-nav-list-item-unable">' +
                                        '<div class="aside-nav-list-item-warning">'+
                                             '<span class="aside-nav-list-item-icon">'+
                                             '<span class="icon-warning-o">'+
                                             '</span>'+
                                             '</span>'+
                                             '<span class="aside-nav-list-item-text">'+
                                             __("Commodity have been under the shelf")+
                                             '</span>'+
                                             '<div class="text-right aside-nav-list-description-icon-unable">' +
                                             '<span class="icon-delete-o js-fav-delete aside-nav-list-description-delete" title='+__("delete")+'></span>' +
                                             '</div>' +
                                         '</div>' +
                                            '<div class="aside-nav-list-item-img">'+
                                                '<a href="/cooka-productDetail-web/productDetail?productId='+itemId+'"><img src="'+productImg+'" alt="" width="67" height="100"/></a>'+
                                            '</div>'+
                                            '<div class="aside-nav-list-description">'+
                                                '<div class="aside-nav-list-description-title">'+
                                                '<a href="/cooka-productDetail-web/productDetail?productId='+itemId+'">'+title+'</a>'+
                                                '</div>'+
                                                '<div>'+singlePrice+'</div>'+
                                            '</div>'+
                                        '</div>'+
                                '</div>';
                                }

                            });
                            module.find('.js-fav-list').html(itemHtml);
                        }
                    });
                }

                //calculate price
                function calculateTotal() {
                    var $proItemSet = $cartbomb.find('.js-pro-item');
                    var total = 0;
                    var number = 0;
                    $proItemSet.each(function() {
                        var $this = $(this);
                        var singlePrice = Number($this.find('.js-single-price').text());
                        var sum = Number($this.find('.js-num').text());
                        total = total + singlePrice * sum;
                        number = number + sum;
                    });
                    module.find('.js-total-sum').text(number).attr('title',number);
                    $cartbomb.find('.js-total-price').text(total.toFixed(currencyConfig));
                }
            }

        }
    };
})();