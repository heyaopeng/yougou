module.exports = {
	path: 'detaildescription',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/DetailDescription.js'));
		});
	}
};
