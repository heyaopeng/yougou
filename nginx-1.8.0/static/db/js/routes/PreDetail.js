var A = require('../A.js');

module.exports = {
	path: 'preDetail',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/PreDetail.js'));
		});
	}
};