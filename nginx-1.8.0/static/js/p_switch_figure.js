(function ($) {
	$.fn.swithFigure = function () {
		return this.each(function () {
			var $this = $(this);

			var $siwtchMain = $this.find('.switch-main');
			var $switchItem = $this.find('.switch-item');
			var $zoom = $this.find('.zoom-place');

			$switchItem.on('click', function () {
				var itemSrc = $(this).attr('src');
				$siwtchMain.attr('src', itemSrc);

				if ($zoom.length) {
					$zoom.find('.zoomImg').attr('src', itemSrc);
				}
			});

		});
	};
})(jQuery);