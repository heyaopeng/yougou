(function($) {
	$.fn.btnFile = function() {
		return this.each(function(index, elem) {
			var $elem = $(elem);

			$elem.on('click', '.btn-file-trigger', function() {
				$elem.find('.btn-file-item').click();
			});
		});
	};
})(jQuery);