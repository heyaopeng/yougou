var CKF = require('./CKF.js');
var getCookie = require('./getCookie.js');
var lang = getCookie('language');
var big = require('big.js/big');
var currencyConfig = require('./currencyConfig.js');
require('../less/cart-footer.less');

module.exports = (function() {
    var moduleName = 'cartFooter';
    var module = CKF.create(moduleName, true);

    function cartFormSubmit() {
        if (module !== null) {
            var flag = true;
            $('.cart').find('.say-below').each(function(idx, ele) {
                if ($(ele).is(':visible')) {
                    flag = false;
                    return false;
                }
            });
            if (module.find('.cart-footer-cost').text() === '0') {
                flag = false;
            }
            if (flag) {
                module.find('.cart-submit').removeAttr('disabled');
            } else {
                module.find('.cart-submit').attr('disabled', 'disabled');
            }

            //Due to silly Guikai
            $('.cart').find('.js-cart-pro-comb-check:checked').each(function(idx, ele) {
                var most = $(ele).closest('.js-cart-pro-comb').data('most');
                if (parseInt(most) === 0) {
                    module.find('.cart-submit').attr('disabled', 'disabled');
                }
            });
            return flag;
        }

    }

    return {
        init: function() {
            if (module !== null) {
                var $accountArea = module.find('.cart-footer-cost');
                var $submitBtn = module.find('.cart-submit');

                if (parseInt($('body').height() - $(window).scrollTop() - $('.cart-footer').height() - $(window).height()) >=
                    parseInt($('.footer').height() + $('.cart-footer').nextAll().height()) + $('.cart-footer').height() - 30) {
                    $('.cart-footer').addClass('cart-footer-fixed');
                } else {
                    $('.cart-footer').removeClass('cart-footer-fixed');
                }
                $(window).on('scroll resize', function() {
                    if (parseInt($('body').height() - $(window).scrollTop() - module.height() - $(window).height()) >=
                        parseInt($('.footer').height() + module.nextAll().height()) - 30) {
                        module.addClass('cart-footer-fixed');
                    } else {
                        module.removeClass('cart-footer-fixed');
                    }
                });
                module.find('.js-select-all').on('change', function() {
                    var combCheck = $(this).prop('checked');
                    CKF.notify({
                        type: 'cart-pro-comb-check',
                        data: combCheck
                    });
                });
                $submitBtn.on('click', function(e) {
                    var flag = true;
                    $('.cart').find('.say-below').each(function(idx, ele) {
                        if ($(ele).is(':visible')) {
                            flag = false;
                            return false;
                        }
                    });
                    if (parseInt($.trim(module.find('.cart-footer-cost').text())) === 0) {
                        flag = false;
                        module.find('.js-zero').removeClass('hidden');
                    }
                    if (flag) {
                        module.find('.cart-submit').removeAttr('disabled');
                    } else {
                        module.find('.cart-submit').attr('disabled', 'disabled');
                    }
                    if (flag) {
                        $('.cart')[0].submit();
                    } else {
                        e.preventDefault();
                    }
                });
                module.find('.js-remove-all').on('click', function(e) {
                    e.preventDefault();
                    var selected = false;
                    if ($('.js-cart-pro-comb-check:checked').length > 0) {
                        selected = true;
                    }
                    if (!selected) {
                        alert(__('Please choose some item'));
                    } else {
                        conf = confirm(__('The product will be removed from Shopping Cart'));
                        if (conf) {
                            if (module.find('.js-select-all').is(':checked')) {
                                $.ajax({
                                    type: "post",
                                    url: "/cooka-cart-web/clearCart", //change
                                    data: "type=clear",
                                    dataType: "html",
                                    async: true,
                                    success: function(data) {
                                        $('.cart-group').remove();
                                        $('.cart-footer').remove();
                                        CKF.notify({
                                            type: 'cart-empty'
                                        });
                                    }
                                });
                            } else {
                                CKF.notify({
                                    type: 'remove-all',
                                    data: true
                                });
                            }
                        }
                    }
                });

                module.find('.js-collect-all').on('click', function(e) {
                    e.preventDefault();
                    CKF.notify({
                        type: 'collect-all',
                        data: true
                    });
                });

                module.find('.js-remove-disabled').on('click', function(e) {
                    e.preventDefault();
                    CKF.notify({
                        type: 'remove-disabled',
                        data: true
                    });
                });
            }

            CKF.listen({
                'cart-total-cost': function cartTotalCost(data) {
                    $accountArea.text(data.account.toFixed(currencyConfig));
                    if(data.account.toFixed(currencyConfig)>0){
                        module.find('.js-zero').addClass('hidden');
                    }
                    module.find('.js-select-item').text(data.selectItem + ' / ' + data.item);
                    module.find('.js-select-all').prop('checked', data.flagAll);
                },
                'cart-form-submit': cartFormSubmit
            }, moduleName);
        }
    };
})();