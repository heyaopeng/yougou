var A = require('../A.js');

module.exports = {
	path: 'helpcenter',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/HelpCenter.js'));
		});
	}
};