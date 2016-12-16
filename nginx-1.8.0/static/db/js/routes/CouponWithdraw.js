var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'couponWithdraw',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/CouponWithdraw.js'));
				});
			}
		}
	]
	/*path: 'couponWithdraw',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/CouponWithdraw.js'));
		});
	}*/
};