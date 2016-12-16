var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'withdrawList',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/WithdrawList.js'));
				});
			}
		}
	]
	/*path: 'withdrawList',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/WithdrawList.js'));
		});
	}*/
};