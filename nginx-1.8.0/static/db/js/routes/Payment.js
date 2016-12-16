var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'seller/payment',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/Payment.js'));
				});
			}
		}
	]
	/*path: 'seller/payment',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/Payment.js'));
		});
	}*/
};