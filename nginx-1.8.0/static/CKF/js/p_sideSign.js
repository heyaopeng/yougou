var CKF = require('./CKF.js');

module.exports = (function () {
	var moduleName = 'sideSign';
	var module = CKF.create(moduleName);

	return {
		init: function () {
			module.on('click', '[data-target]', function(e) {
				e.preventDefault();
				var t = $(this).data('target');
				if (t === 'in') {
					CKF.notify({
						type: 'show-sign-in',
						data: null
					});
				}
				else if (t === 'up') {
					CKF.notify({
						type: 'show-sign-up',
						data: null
					});
				}
			});
		}
	};
})();