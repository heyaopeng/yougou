var CKF = require('./CKF.js');
var getCookie = require('./getCookie.js');
var lang = getCookie('language');
var big = require('big.js/big');
var currencyConfig = require('./currencyConfig.js');
require('../less/order-list.less');

module.exports = (function() {
    var moduleName = 'orderList';
    var module = CKF.create(moduleName);

    var ts = 0;

    function setAddr(addrId) {
        var $getAddrId = addrId;
        module.find('#save-order-addr').val($getAddrId);
    }

    function setCouponSerialNum(num){
        var $getNum = num;
        module.find('#couponSerialNum').val($getNum);
    }

    function setAllowSegmentalDelivery (value) {
        var $getValue = value;
        module.find('#allowSegmentalDelivery').val($getValue);
    }

    function submitOrderFromOrderList () {
        event.preventDefault();
        var $id = module.find('#save-order-addr')[0].value;
        if ($id === '') {
            alert(__("Address can not be empty"));
        } else {
            module.find('form.cart-block').submit();
        }
    }

    return {
        init: function() {
            CKF.listen({
                'set-addr-id': setAddr,
                'set-couponSerialNum': setCouponSerialNum,
                'set-allowSegmentalDelivery': setAllowSegmentalDelivery,
                'submit-order-from-orderList': submitOrderFromOrderList
            }, moduleName);

            CKF.notify({
                type: 'active-address-id',
                data: module.find('#save-order-addr')
            });

            var qs = big(0);

            var arr = [];
            var arr1 = [];
            var $item = module.find('.order-list-pro').length;
            var $tableInner = module.find('.cart-block').find('.table-inner');
            var $settlement = module.find('.order-list-settlement');
            var $quantity = $settlement.find('.order-list-quantity');
            var $total = $settlement.find('.order-list-total');

            // 格式化数字
            // var unitPrice = $('.order-list-pro-info').find('.unit-price-order');
            // unitPrice.each(function(index, el) {
            //     var $this = $(this);
            //     $this.text(CKF.util.fixPrice(parseFloat($this.text()).toFixed(currencyConfig)));
            // });

            var $quantityV = $tableInner.find('.order-list-pro-spe').find('td:nth-child(2)');

            var $totalV = $tableInner.find('.order-list-pro-spe').find('.pro-amount-single');
            // $totalV.each(function(index, el) {
            //     var $this = $(this);
            //     $this.text(CKF.util.fixPrice(parseFloat($this.text()).toFixed(currencyConfig)));
            // });

            $quantityV.each(function() {
                var $this = $(this);
                arr.push(big($this.text()));
            });

            for (var i = 0; i < arr.length; i++) {
                qs = qs.plus(arr[i]);
            }

            CKF.notify({
                type: 'set-quantity',
                data: qs
            });

            CKF.notify({
                type: 'set-item',
                data: $item
            });

            ts = big(0);

            var num;

            $totalV.each(function() {
                var $this = $(this);
                ts = ts.plus(big($this.text()));
            });

            ts = ts.toFixed(currencyConfig);

            CKF.notify({
                type: 'set-total',
                data: ts
            });
        }
    };
})();
