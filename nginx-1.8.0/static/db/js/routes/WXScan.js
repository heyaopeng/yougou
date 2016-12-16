var A = require('../A.js');

module.exports = {
	path: 'wxscan',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/WXScan.js'));
		});
	}
};