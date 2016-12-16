module.exports = {
	path: 'page',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/Page.js'));
		});
	}
};
