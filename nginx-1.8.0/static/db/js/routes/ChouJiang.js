var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'choujiang',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/Choujiang.js'));
				});
			}
		}
	]
};