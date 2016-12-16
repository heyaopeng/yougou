(function ($) {
	$.fn.categoryDrop = function () {
		return this.each(function (index, elem) {
			var $elem = $(elem);

			$elem.hover(function () {
				$(this).toggleClass('active');
			});
		});	
	};

	$.fn.searchDrop = function () {
		return this.each(function (index, elem) {
			var $elem = $(elem);
			var $searchSelect = $elem.find('.search-select');
			var $searchSave = $elem.find('.search-save');

			$elem.on('click', 'a[data-value]', function (e) {
				e.preventDefault();

				var $this = $(this);
				var sText = $this.text();
				var sVal = $this.data('value');
				$searchSelect.text(sText);
				$searchSave.val(sVal);
			});
		});
	};

	$.fn.brandCarousel = function () {
		return this.each(function (index, elem) {
			var $elem = $(elem);
			var $items = $elem.find('.bz-carousel-item');
			var MAX_LEN = $items.length - 1;
			var cur = 0;

			var DELAY = 5000;

			function scrollCarousel(left) {
				$items.eq(cur).removeClass('active');
				if (left) {
					cur--;
					if (cur < 0) {
						cur = MAX_LEN;
					}
				}
				else {
					cur++;
					if (cur > MAX_LEN) {
						cur = 0;
					}
				}
				$items.eq(cur).addClass('active');
			}

			$elem.on('click', '.bz-left', function () {
				scrollCarousel(true);
			});
			$elem.on('click', '.bz-right', function () {
				scrollCarousel(); 
			});

			setInterval(scrollCarousel, DELAY);
		});
	};

})(jQuery);


$(document).ready(function() {
	$('div.nv-title').dotdotdot();
	$('div.bs-dot').dotdotdot();

	$('.category-drop').categoryDrop();
	$('.search-drop').searchDrop();

	$('.bz-carousel').brandCarousel();

	$('.cart-list').dropdownHover();
});