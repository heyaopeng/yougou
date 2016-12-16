var A = require('../A.js');

module.exports = {
	path: 'waitingOpen',
	getComponent: function(location, cb) {
		require.ensure([], function(require) {
			cb(null, require('../components/WaitingOpen.js'));
		});
	}
};