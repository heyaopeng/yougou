var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'share',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/Share.js'));
				});
			}
		}
	]
	/*path: 'share',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/Share.js'));
		});
	}*/
};
