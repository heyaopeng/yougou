var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'announcement',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/Announcement.js'));
				});
			}
		}
	]
	/*path: 'announcement',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/Announcement.js'));
		});
	}*/
};