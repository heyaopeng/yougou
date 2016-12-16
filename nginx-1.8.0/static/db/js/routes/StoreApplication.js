var A = require('../A.js');

module.exports = {
	/*onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'application',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/StoreApplication.js'));
				});
			}
		}
	]*/
	path: 'application',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/StoreApplication.js'));
		});
	}
};