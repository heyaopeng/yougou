var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'cashCouponBalance',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/CashCouponBalance.js'));
				});
			}
		}
	]
	/*path: 'cashCouponBalance',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/CashCouponBalance.js'));
		});
	}*/
};