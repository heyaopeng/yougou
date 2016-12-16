(function ($) {
	$.fn.checkAll = function () {
		return this.each(function () {
			var $this = $(this);
			var $checkAll = $this.find('input[type="checkbox"].check-all');
			var $checkItems = $this.find('input[type="checkbox"].check-item');

			$checkAll.on('change', function (e) {
				var checkState = $(this).prop('checked');
				$this.find('input[type="checkbox"].check-item').prop('checked', checkState);
			});

			$checkItems.on('change', function () {
				var $uncheckItem = $this.find('input[type="checkbox"].check-item:not(:checked)');
				// 存在未勾选
				if ($uncheckItem.length) {
					$checkAll.prop('checked', false);
				}
				else {
					$checkAll.prop('checked', true);
				}
			});
		});
	};
})(jQuery);