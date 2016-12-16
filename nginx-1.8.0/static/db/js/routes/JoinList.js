var A = require('../A.js');

module.exports = {
	path: 'joinlist',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/JoinList.js'));
		});
	}
};