var CKF = require('./CKF.js');
require('../less/cart-empty.less');

module.exports = (function () {
	var moduleName = 'cartEmpty';

	var module = CKF.create(moduleName,true);

	return {
		init: function () {
			CKF.listen({
				'cart-empty': function(){
					module.removeClass('hidden');
				}
			}, moduleName);
		}
	};
})();