var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'accountcenter',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/AccountCenter.js'));
				});
			}
		}
	]
};