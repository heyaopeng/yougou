(function ($) {
	$.fn.starLoad = function () {
		return this.each(function (index, element) {
			var $ele = $(element);
			var scoresVal = $ele.find('.scores').text()/5;
			var percentage = Math.round(scoresVal * 10000) / 100.00 + "%";
			$ele.find('.score-progress').css('width',percentage);
		});
	};
})(jQuery);