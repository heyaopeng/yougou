var CKF = require('./CKF.js');
require('../less/home-scroll.less');
// other dependencies ...

module.exports = (function() {
	var moduleName = 'homeScroll';
	var module = CKF.create(moduleName);

	return {
		init: function() {
			var targetSelector = module.data('target');
			var MAX = module.find('.home-scroll-item').length - 2;

			$(window).on('scroll', function () {
				if (parseInt($(this).scrollTop()) > 500) {
					module.addClass('open');
				}
				else {
					module.removeClass('open');
				}
			}).trigger('scroll');

			module.on('click', '.home-scroll-item', function(e) {
				e.preventDefault();
				var $view = $('html, body'),
					$this = $(this),
					floorSelector,
					$floor,
					floorTop,
					$li;

				if ($this.hasClass('up')) {
					$floor = $(targetSelector + '.active').prev(targetSelector);
					floorSelector = $floor.prop('id');

					$li = $this.closest('li').siblings('li.active');
					if ($li.index() === 0) {
						return;
					}
					$li.prev().addClass('active').siblings('li').removeClass('active');

				} else if ($this.hasClass('down')) {
					$floor = $(targetSelector + '.active').next(targetSelector);
					floorSelector = $floor.prop('id');

					$li = $this.closest('li').siblings('li.active');

					if ($li.index() === MAX - 1) {
						return;
					}
					$li.next().addClass('active').siblings('li').removeClass('active');

				} else {
					floorSelector = $this.attr('href');
					$floor = $(floorSelector);

					$this.closest('li').addClass('active').siblings('li').removeClass('active');
				}

				floorTop = $floor.length ? $floor.offset().top : null;

				if (!$view.is(':animated') && floorTop !== null) {
					$view.animate({
						scrollTop: floorTop
					}, function() {
						$floor.siblings('.active').removeClass('active');
						$floor.addClass('active');
						window.location.hash = floorSelector;
					});
				}
			});
		}
	};
})();