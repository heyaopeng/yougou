module.exports = {
	path: 'wxsignin',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/WXSignIn.js'));
		});
	}
};
