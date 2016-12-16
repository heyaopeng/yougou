var A = require('../A.js');

module.exports = {
	path: 'luckylist',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/LuckyList.js'));
		});
	}
};