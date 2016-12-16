var CKF = require('./CKF.js');
require('../less/b-college-switch.less');

module.exports = (function() {
	var moduleName = 'bCollegeSwitch';
	var module = CKF.create(moduleName);

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	return {
		init: function() {
			var MAX_ITEM = module.find('.b-college-switch-item').length;
			var activeIndex = module.find('.b-college-switch-item.active').index();
			var newIndex = activeIndex;

			module.on('click', '.b-college-switch-trigger', function(e) {
				e.preventDefault();

				while (newIndex === activeIndex) {
					newIndex = getRandomInt(0, MAX_ITEM - 1);
				}

				activeIndex = newIndex;

				module.find('.b-college-switch-item.active').fadeOut(function () {
					$(this).removeClass('active').removeAttr('style');

					module.find('.b-college-switch-item:eq(' + newIndex +')').fadeOut(function () {
						$(this).addClass('active').removeAttr('style');
					});
				});

			});


		}
	};
})();