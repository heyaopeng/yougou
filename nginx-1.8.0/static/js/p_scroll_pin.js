(function ($) {
	$.fn.scrollPin = function () {
		return this.each(function (index, elem) {
			var $elem = $(elem);
			var elemTop = $elem.offset().top;

			$(window).on('scroll', function (e) {
				var $this = $(this);
				var winTop = $this.scrollTop();

				if (winTop > elemTop) {
					$elem.addClass('pined');
					$elem.trigger('elem.pined');
				}
				else {
					$elem.removeClass('pined');
					$elem.trigger('elem.unpined');
				}
			});			
		});
	};
})(jQuery);