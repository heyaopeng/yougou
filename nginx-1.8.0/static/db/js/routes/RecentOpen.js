var A = require('../A.js');

module.exports = {
	path: 'recentOpen',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/RecentOpen.js'));
		});
	}
};