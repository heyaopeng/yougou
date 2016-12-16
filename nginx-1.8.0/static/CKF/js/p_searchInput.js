var CKF = require('./CKF.js');
require('../less/search-input.less');
// other dependencies ...

module.exports = (function() {
	var moduleName = 'searchInput';
	var module = CKF.create(moduleName, true);
	return {
		init: function() {
			if (module !== null) {
				var selectedOpt;

				if (module.find('select').length) {
					module.find('select').on('change', function(event) {
						var $this = $(this);
						selectedOpt = $this[0].value;
						module.find('input').attr('name', selectedOpt);
					});
				}
				module.find('form').on('submit', function() {
					if (module.find('input').val().trim() === '') {
						return false;
					}
					return true;
				});

				if (module.hasClass('will-fixed')) {
					$(window).on('scroll', function() {

						var wTop = $(window).scrollTop();
						if (wTop > 150) {
							module.addClass('fixed');
						} else {
							module.removeClass('fixed');
						}
					});
				}
			}
		}
	};
})();
