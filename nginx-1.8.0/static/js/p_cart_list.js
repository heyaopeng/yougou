(function($) {

	$.fn.dropdownHover = function() {
		return this.each(function(idx, ele) {
			var $this = $(ele);
			var $cartListMain = $this.find('.dropdown-menu');
			$this.on('mouseenter', '.cart-list-title', function() {
				$cartListMain.show();
			});
			$this.on('mouseleave', function() {
				$cartListMain.hide();
			});
		});
	};

})(jQuery);