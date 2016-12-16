var A = require('../A.js');

module.exports = {
	path: 'commonRecorddetail',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/CommonRecordDetail.js'));
		});
	}
};