var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'winrecord',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/WinRecord.js'));
				});
			}
		}
	]
	/*path: 'winrecord',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/WinRecord.js'));
		});
	}*/
};