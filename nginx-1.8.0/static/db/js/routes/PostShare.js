var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'postShare',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/PostShare.js'));
				});
			}
		}
	]
	/*path: 'postShare',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/PostShare.js'));
		});
	}*/
};