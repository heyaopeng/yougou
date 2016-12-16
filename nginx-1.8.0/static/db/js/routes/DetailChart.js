module.exports = {
	path: 'detailchart',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/DetailChart.js'));
		});
	}
};
