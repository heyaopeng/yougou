var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'commission',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/Commission.js'));
				});
			}
		}
	]
	/*path: 'commission',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/Commission.js'));
		});
	}*/
};