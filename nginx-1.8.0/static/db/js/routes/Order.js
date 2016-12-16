var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'order',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/Order.js'));
				});
			}
		}
	]
	/*path: 'order',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/Order.js'));
		});
	}*/
};