(function($) {
	$.fn.settleCounts = function() {
		return this.each(function(index, ele) {
			var $this = $(ele);
			// 下列选择器在当前div块之外
			var $proItem = $this.closest('.pro-item');
			var $proTr = $proItem.find('tr');
			// 判断价格用到的变量
			var $priceBlock = $proItem.find('.pro-price');
			// 初始化price一栏的跨行高度
			$priceBlock.attr('rowspan', $proTr.length);
		});
	};

	/*计算总价*/
	$.fn.calculateFare = function() {
		return this.each(function(index, ele) {
			var $this = $(ele);
			var sum = Number(0);
			var $calculate = $this.find('.pro-specific').find('td:last');
			$.each($calculate, function() {
				sum += Number($(this).find('p').text());
			});
			sum += Number($this.find('.order-addr-foot .fare').text());
			$this.find('.order-addr-foot .number').html(sum);
		});
	};
})(jQuery);

(function($) {
	$.fn.chooseAddress = function() {
		return this.each(function(index, elem) {
			var $elem = $(elem);

			$elem.on('change', '.address-check', function(e) {
				$elem.find('.ship-address.active').removeClass('active');

				$(this).closest('.ship-address').addClass('active');
			});

			$elem.on('click', '.set-default', function () {
				$(this).closest('.ship-address').addClass('default-address')
				.siblings('.ship-address').removeClass('default-address');

				$elem.trigger('default.changed');
			});
		});
	};
})(jQuery);

Handlebars.registerHelper('ifEq', function(a, b, options) {
	if(a === b) {
		return options.fn(this);
	}
	return options.inverse(this);
});

Handlebars.registerHelper('json', function(obj) {
	return JSON.stringify(obj);
});