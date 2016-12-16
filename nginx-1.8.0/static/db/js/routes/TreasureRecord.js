var A = require('../A.js');

module.exports = {
	onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'treasurerecord',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/TreasureRecord.js'));
				});
			}
		}
	]
/*	path: 'treasurerecord',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/TreasureRecord.js'));
		});
	}*/
};