var CKF = require('./CKF.js');
require('../less/product-rate.less');
// other dependencies ...

module.exports = (function() {
	var moduleName = 'productRate';
	var module = CKF.create(moduleName, true);

	function initial() {
		if (module !== null) {
			module.each(function(index, elem) {
				var $elem = $(elem);
				var v = $elem.data('score');
				var $value = $elem.find('.rate-value');
				var $stars = $elem.find('.product-rate-star');
				var initIndex;

				if (v) {
					$elem.find('.product-rate-star').eq(parseInt(v - 1)).addClass('active');
				} else {
					if ($elem.find('.active').length) {
						initIndex = $elem.find('.active').index();
						$value.val(initIndex + 1);
					} else {
						initIndex = -1;
						$value.val(5);
					}

					$elem.off().hover(
						function() {
							if (initIndex !== -1) {
								$elem.find('.active').removeClass('active');
							}
						},
						function() {
							if (initIndex !== -1) {
								$stars.eq(initIndex).addClass('active');
							}
						}
					);

					$stars.off().hover(function() {
						$(this).toggleClass('hovering');
					});

					$stars.off('click').on('click', function() {
						var $this = $(this);
						var index = $this.index();
						initIndex = index;
						$value.val(index + 1);
					});
				}
			});
		}
	}

	function rebuild() {
		module = CKF.rebuild(moduleName);
		initial();
	}

	return {
		init: function() {

			initial();

			CKF.listen({
				'rebuild-productRate': rebuild
			}, moduleName);
		}
	};
})();