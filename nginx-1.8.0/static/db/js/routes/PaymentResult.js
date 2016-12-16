var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'paymentResult',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/PaymentResult.js'));
				});
			}
		}
	]
	/*path: 'paymentResult',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/PaymentResult.js'));
		});
	}*/
};