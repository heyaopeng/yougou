var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'applicationResult',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/ApplicationResult.js'));
				});
			}
		}
	]
	/*path: 'applicationResult',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/ApplicationResult.js'));
		});
	}*/
};