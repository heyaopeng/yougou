var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'editaddr',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/EditAddr.js'));
				});
			}
		}
	]
	/*path: 'editaddr(/:deliverAddrId)',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/EditAddr.js'));
		});
	}*/
};