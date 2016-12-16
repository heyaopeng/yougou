var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'cashCoupon',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/CashCoupon.js'));
				});
			}
		}
	]
	/*path: 'cashCoupon',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/CashCoupon.js'));
		});
	}*/
};