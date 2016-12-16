var A = require('../A.js');

module.exports = {
	path: 'termReal',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/TermReal.js'));
		});
	}
};