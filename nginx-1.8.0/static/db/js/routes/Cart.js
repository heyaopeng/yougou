var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'cart',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/Cart.js'));
				});
			}
		}
	]
	/*path: 'cart',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/Cart.js'));
		});
	}*/
};