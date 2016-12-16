var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'editInfo',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/EditInfo.js'));
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