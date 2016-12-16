var CKF = require('./CKF.js');
require('../less/m-bas-header.less');

require('bootstrap/js/dropdown.js');

module.exports = (function() {
	var moduleName = 'mBasHeader';
	var module = CKF.create(moduleName, true);
	return {
		init: function() {
			if (module !== null) {
				module.on('click', '.m-bas-header-back', function(e) {
					e.preventDefault();
					history.back();
				});
			}

			$(document).on('click', 'a[data-lang]', function(e) {
				e.preventDefault();
				var lang = $(this).data('lang');
				CKF.util.setCookie('language', lang, Infinity);
				window.location.reload();
			});
		}
	};
})();