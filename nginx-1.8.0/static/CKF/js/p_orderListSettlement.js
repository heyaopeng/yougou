var CKF = require('./CKF.js');
var getCookie = require('./getCookie.js');
var lang = getCookie('language');
var big = require('big.js/big');
var currencyConfig = require('./currencyConfig.js');
require('bootstrap/js/tooltip.js');
require('../less/order-list-settlement.less');

module.exports = (function () {
	var moduleName = 'orderListSettlement';

	var module = CKF.create(moduleName);

	function setSubtotal (sutotal) {
		module.find('.order-list-subtotal').find('strong').text(sutotal);
	}

	function setShipping (shipping) {
		module.find('.order-list-shipping').find('strong').text(shipping);
	}

	function setQuantity(quantity){
		module.find('.order-list-quantity').find('strong').text(quantity);
	}

	function setTotal (total) {
		module.find('.order-list-total').find('strong').text(total);
        module.find('.order-list-total').find('strong').attr("data-total",total);
	}

	function setItems (item) {
		module.find('.item-sub').text(item);
	}

    function releaseTheSubmitBtn () {
        module.find('.order-list-buy-now').removeClass('disabled');
    }

	function getUseCouponResult(couponSerialNum) {
        //console.log('run');
        var money = module.find('.order-list-total').find('strong').data('total');
        // money = CKF.util.fixPrice(big(money).toFixed(currencyConfig));

        //console.log(money);

        if (couponSerialNum !== "") {
            money = parseInt(money) * 1000;
            $.ajax({
                type: 'GET',
                contentType: 'application/json;charset=utf-8',
                url: "/cooka-order-web/useCoupon",
                data: {
                    couponSerialNum: couponSerialNum,
                    money: money
                },
                dataType: "html",
                success: function(ret) {
                    ret = CKF.util.fixPrice(big(ret).toFixed(currencyConfig));
                    //console.log(ret);
                    $('#final-result').text(ret);
                }
            });
        } else {
            $('#final-result').text(money);
        }
    }

	return {
		init: function () {
			CKF.listen({
                'set-subtotal': setSubtotal,
                'set-shipping': setShipping,
                'set-quantity': setQuantity,
                'set-total': setTotal,
                'set-item': setItems,
                'release-the-SubmitBtn': releaseTheSubmitBtn,
                'get-use-coupon-result': getUseCouponResult
            }, moduleName);

            if (parseInt($(window).scrollTop()) <=
                parseInt($('body').height() - $('.footer').height() - $(window).height())) {
                module.addClass('order-list-settlement-fixed');
            } else {
                module.removeClass('order-list-settlement-fixed');
            }
            $(window).on('scroll resize', function() {
                if (parseInt($(window).scrollTop()) <=
                parseInt($('body').height() - $('.footer').height() - $(window).height() + 30)) {
                    module.addClass('order-list-settlement-fixed');
                } else {
                    module.removeClass('order-list-settlement-fixed');
                }
            });

            module.on('change', '[name="couponSerialNum"]', function() {
                var v = $(this).val();
                getUseCouponResult(v);
                CKF.notify({
	                type: 'set-couponSerialNum',
	                data: v
	            });
            });

			// 协议相关
            // module.find('.order-list-buy-now').on('mouseover', function(event) {
            //     var $stop = $(this).hasClass('disabled');
            //     if ($stop) {
            //         module.find('.order-list-buy-now').tooltip('show');
            //     } else {
            //         module.find('.order-list-buy-now').tooltip('destroy');
            //     }
            //
            // });

            module.find('.order-list-buy-now').on('click', function() {
                var $stop = $(this).hasClass('disabled');
                if (!$stop) {
                	CKF.notify({
    	                type: 'submit-order-from-orderList',
    	                data: null
    	            });
                } else {
                    // console.log('gg');
                }
            });
		}
	};
})();
