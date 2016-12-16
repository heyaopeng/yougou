var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'withdraw',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/Withdraw.js'));
				});
			}
		}
	]
	/*path: 'withdraw',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/Withdraw.js'));
		});
	}*/
};