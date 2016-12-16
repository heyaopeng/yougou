var CKF = require('./CKF.js');

module.exports = (function() {
	var moduleName = 'signInCheck';
	// var module = CKF.create(moduleName, true);

	return {
		init: function() {
			CKF.notify({
				type: 'disable-ajax-loading',
				data: null
			});
			$.get('/duobao-user-web/isLogin', function(data) {
				// what if the user name is "false"?
				if (data !== 'false') {
					CKF.notify({
						type: 'user-sign-in',
						data: data
					});
				} else {
					CKF.notify({
						type: 'show-home-widget',
						data: null
					});
				}
				CKF.notify({
					type: 'enable-ajax-loading',
					data: null
				});
			});
		}
	};
})();