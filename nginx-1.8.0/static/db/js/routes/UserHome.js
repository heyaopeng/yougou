var A = require('../A.js');

module.exports = {
	/*onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'userhome',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/UserHome.js'));
				});
			}
		}
	]*/
	path: 'userhome',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/UserHome.js'));
		});
	}
};