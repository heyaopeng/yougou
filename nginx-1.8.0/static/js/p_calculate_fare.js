(function($) {

	/*¼ÆËã×Ü¼Û*/
	$.fn.calculateFare = function() {
		return this.each(function(index, ele) {
			var $this = $(ele);
			var sum = Number(0);
			var $calculate = $this.find('.pro-specific').find('td:last');
			$.each($calculate, function() {
				sum += Number($(this).text());
			});
			sum += Number($this.find('.order-addr-foot .fare').text());
			$this.find('.order-addr-foot .number').html(sum);
		});
	};
})(jQuery);