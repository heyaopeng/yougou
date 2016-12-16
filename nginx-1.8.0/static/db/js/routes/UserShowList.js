var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'userShowlist',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/UserShowList.js'));
				});
			}
		}
	]
	/*path: 'userShowlist',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/UserShowList.js'));
		});
	}*/
};