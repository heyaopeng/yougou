var CKF = require('./CKF.js');
var getCookie = require('./getCookie.js');
var lang = getCookie('language');
var big = require('big.js/big');
var currencyConfig = require('./currencyConfig.js');
require('../less/pro-detail-info-total.less');

module.exports = (function() {
    var moduleName = 'proDetailTotal';

    var module = CKF.create(moduleName, true);

    function performTotal(totalPiece) {
        module.find('.js-piece').text(totalPiece);

        var rangeArr = module.data('range').toString().split(' ');
        var costArr = module.data('cost').toString().split(' ');
        var singlePrice = 0;
        for (var i = rangeArr.length - 1; i >= 0; i--) {
            if (totalPiece >= rangeArr[i]) {
                singlePrice = big(costArr[i]);
                break;
            }
        }

        if (singlePrice === 0) {
            module.find('.js-cost').text('0');
            // if (totalPiece > 0) {
                $('.js-say-less').removeClass('hidden');
            // } else {
            //     $('.js-say-less').addClass('hidden');
            // }
        } else if(module.data('limit')<totalPiece) {
            $('.js-say-more').removeClass('hidden');
        }
        else{
            // precise calculation
            $('.js-say-more').addClass('hidden');
            $('.js-say-less').addClass('hidden');
            var cost = big(singlePrice.times(totalPiece));
            module.find('.js-cost').text(CKF.util.fixPrice(cost.toFixed(currencyConfig)));
        }
        CKF.notify({
            type: 'perform-btn',
            data: singlePrice
        });
    }

    function buildEvent(data) {
        if (data) {
            module = CKF.rebuild(moduleName);
        }
    }

    return {
        init: function() {

            CKF.listen({
                'perform-total': performTotal,
                'rebuild-event': buildEvent
            }, moduleName);

        }
    };
})();