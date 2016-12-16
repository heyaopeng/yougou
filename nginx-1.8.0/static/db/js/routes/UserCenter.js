var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'usercenter',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/UserCenter.js'));
				});
			}
		}
	]
	/*path: 'usercenter',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/UserCenter.js'));
		});
	}*/
};