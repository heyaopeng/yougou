var CKF = require('./CKF.js');

module.exports = (function() {
	return {
		init: function() {
			CKF.notify({
				type: 'disable-ajax-loading',
				data: null
			});

			var $t = $('input[name="xToken"]');

			if ($t.length) {
				$.get('/cooka-user-web/get', function (data) {				
					$t.val(data);
					CKF.notify({
						type: 'enable-ajax-loading',
						data: null
					});
					CKF.notify({
						type: 'get-search-category',
						data: null
					});
				});
			}
			else {
				console.error('CKF: input[name="xToken"] dose not exist!!!');
			}
		}
	};
})();
