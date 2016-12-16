(function ($) {
	$.fn.inputSpinner = function () {
		return this.each(function () {
			var $this = $(this);
			var $num = $this.find('.spin-num');
			var $dec = $this.find('.spin-dec');
			var $inc = $this.find('.spin-inc');

			var min = parseInt($this.data('min'));
			var max = parseInt($this.data('max'));

			$dec.on('click', function (e) {
				e.preventDefault();
				var numVal = $num.val();
				var roundVal = null;
				if (!isNaN(numVal)) {
					roundVal = Math.round(numVal);
					if (roundVal > min) {
						$num.val(Math.round(numVal) - 1);
						$this.trigger('spin.change');
					}
				}
				else {
					$this.trigger('spin.wrong');
				}
			});

			$inc.on('click', function (e) {
				e.preventDefault();
				var numVal = $num.val();
				var roundVal = null;
				if (!isNaN(numVal)) {
					roundVal = Math.round(numVal);
					if (roundVal < max) {
						$num.val(Math.round(numVal) + 1);
						$this.trigger('spin.change');
					}
				}
				else {
					$this.trigger('spin.wrong');
				}
			});

			$num.on('blur', function () {
				var numVal = $num.val();
				var roundVal = null;
				if (!isNaN(numVal)) {
					roundVal = Math.round(numVal);
					if (roundVal > max) {
						$num.val(max);
						$this.trigger('spin.change');
					}
				}
				else {
					$this.trigger('spin.wrong');
				}
			});

			$num.on('change', function () {
				$this.trigger('spin.change');
			});
			
			$num.on('keydown', function (e) {
				if (e.which === 13 ) {
					e.preventDefault();
					return false;
				}
			});
		});
	};
})(jQuery);
			
