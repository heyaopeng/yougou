(function ($) {
	$.fn.pageGroup = function (afterHide) {
		return this.each(function () {
			var root = this;
			var $pageGroup = $(this);

			$('.prev-page', $pageGroup).on('click', function (e) {
				e.preventDefault();
				var $pageSection = $pageGroup.find('.page-section.active');
				var $prevPage = $pageSection.prev('.page-section');
				if ($prevPage.length > 0) {
					$pageSection
					.addClass('hidding').slideUp(function () {
						$(this).removeClass('hidding').removeClass('active');
					});
					$prevPage.slideDown(function () {
						$(this).addClass('active');
						if (typeof afterHide === 'function') {
							afterHide.call(root);
						}
					});
				}
			});

			$('.next-page', $pageGroup).on('click', function (e) {
				e.preventDefault();
				var $pageSection = $pageGroup.find('.page-section.active');
				var $nextPage = $pageSection.next('.page-section');
				if ($nextPage.length > 0) {
					$pageSection
					.addClass('hidding').slideUp(function () {
						$(this).removeClass('hidding').removeClass('active');
					});
					$nextPage.slideDown(function () {
						$(this).addClass('active');
						if (typeof afterHide === 'function') {
							afterHide.call(root);
						}
					});
				}
			});
		});
	};
})(jQuery);