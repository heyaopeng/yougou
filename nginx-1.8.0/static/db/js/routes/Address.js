var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'address',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/Address.js'));
				});
			}
		}
	]
	/*path: 'address',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/Address.js'));
		});
	}*/
};