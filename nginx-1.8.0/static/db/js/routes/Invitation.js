var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'invitation',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/Invitation.js'));
				});
			}
		}
	]
	/*path: 'invitation',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/Invitation.js'));
		});
	}*/
};