(function ($) {
	$.fn.mm = function () {
		return this.each(function (index, elem) {
			console.log('mm called');
			$(elem).css('color', 'orange');
		});
	};
})(jQuery);