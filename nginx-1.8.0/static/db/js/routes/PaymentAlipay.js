var A = require('../A.js');

module.exports = {
	path: 'seller/paymentAlipay',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/PaymentAlipay.js'));
		});
	}
};