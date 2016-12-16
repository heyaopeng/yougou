var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'couponWithdrawList',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/CouponWithdrawList.js'));
				});
			}
		}
	]
	/*path: 'couponWithdrawList',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/CouponWithdrawList.js'));
		});
	}*/
};