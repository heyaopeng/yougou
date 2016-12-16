var A = require('../A.js');

module.exports = {
	/*onEnter: A.requireAuth,
	childRoutes: [
		{
			path: 'recorddetail/:orderSerialNum',
			getComponent: function(location, cb) {
				require.ensure([], function(require) {
					cb(null, require('../components/RecordDetail.js'));
				});
			}
		}
	]*/
	path: 'recorddetail',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/RecordDetail.js'));
		});
	}
};