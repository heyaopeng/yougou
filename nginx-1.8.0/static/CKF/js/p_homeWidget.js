var CKF = require('./CKF.js');
require('../less/home-widget.less');

module.exports = (function () {
	var moduleName = 'homeWidget';
	var module = CKF.create(moduleName);

	function showWidget() {
		module.removeClass('hide');
	}

	return {
		init: function () {

			module.on('click', '.home-widget-sign', function(e) {
				e.preventDefault();
				CKF.notify({
					type: 'show-sign-up',
					data: null
				});
			});

			module.on('click', '.home-widget-remove', function() {
				$(this).closest('.home-widget').fadeOut('slow');
			});

			CKF.listen({
				'show-home-widget': showWidget
			}, moduleName);
		}
	};
})();