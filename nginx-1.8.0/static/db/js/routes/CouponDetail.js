var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'couponDetail',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/CouponDetail.js'));
				});
			}
		}
	]
	/*path: 'couponDetail',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/CouponDetail.js'));
		});
	}*/
};