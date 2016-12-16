module.exports = {
	path: 'allproducts',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/AllProducts.js'));
		});
	}
};
