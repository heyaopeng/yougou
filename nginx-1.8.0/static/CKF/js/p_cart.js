var CKF = require('./CKF.js');
var getCookie = require('./getCookie.js');
var lang = getCookie('language');
var big = require('big.js/big');
require('../less/cart.less');

module.exports = (function() {
	var moduleName = 'cart';
	var module = CKF.create(moduleName, true);

	return {
		init: function() {
			CKF.listen({
				'get-cart-total': function() {
					var account = big(0);
					var selectItem = module.find('.js-cart-pro-comb-check:checked').length;
					var item = module.find('.js-cart-pro-comb-check').length;
					module.find('.js-cart-pro-comb-check:checked').each(function(idx, ele) {
						var nowCost = big($(ele).closest('tr').find('.js-cost').text());
						account = big(account.plus(nowCost));
					});
					var flagAll = true;
					module.find('.js-cart-pro-check').each(function(idx, ele) {
						if (!($(ele).is(':checked'))) {
							flagAll = false;
							return false;
						}
					});
					// CKF.notify({
					//     type: 'select-all',
					//     data: flagAll
					// });
					CKF.notify({
						type: 'cart-total-cost',
						data: {
							selectItem: selectItem,
							item: item,
							account: account,
							flagAll: flagAll
						}
					});
				}
			}, moduleName);
		}
	};
})();