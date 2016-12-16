var A = require('../A.js');

module.exports = {
	path: 'shareIntro',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/ShareIntro.js'));
		});
	}
};