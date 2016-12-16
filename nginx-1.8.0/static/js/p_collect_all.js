(function($) {
	$.fn.collectAll = function() {
		return this.each(function(index, element) {
			$favouritesGoods = $(element);
			$subSelect = $favouritesGoods.find('.p-sub-checkbox');
			$selectAll = $favouritesGoods.find('.p-select-all');
			/*全选*/
			$favouritesGoods.on('click', '.p-select-all', function() {
				$this = $(this);
				$subSelect.prop('checked', $this.prop('checked'));
			});
			$subSelect.click(function() {
				var thisState = $(this).prop('checked');
				if (!thisState) {
					$selectAll.prop('checked', false);
				}
				var allState = true;
				$.each($subSelect, function() {
					$this = $(this);
					var indexState = $this.prop('checked');
					if (!indexState) {
						allState = false;
						return false;
					}
				});
				if (allState)
					$selectAll.prop('checked', true);
			});
		});
	};
	})(jQuery);
