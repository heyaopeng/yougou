var A = require('../A.js');

module.exports = {
	path: 'helpCenterContent',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/HelpCenterContent.js'));
		});
	}
};