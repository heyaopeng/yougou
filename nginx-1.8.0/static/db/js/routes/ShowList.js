var A = require('../A.js');

module.exports = {
	/*onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'showlist',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/ShowList.js'));
				});
			}
		}
	]*/
	path: 'showlist',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/ShowList.js'));
		});
	}
};