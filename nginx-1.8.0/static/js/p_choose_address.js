(function($) {
	$.fn.chooseAddress = function() {
		return this.each(function(index, elem) {
			var $elem = $(elem);
			$elem.on('change', '.address-check', function(e) {
				$elem.find('.ship-address.active').removeClass('active');
				$(this).closest('.ship-address').addClass('active');
			});
			$elem.on('click', '.set-default', function() {
				$(this).closest('.ship-address').addClass('default-address')
					.siblings('.ship-address').removeClass('default-address');
				$elem.trigger('default.changed');
			});
		});
	};
})(jQuery);