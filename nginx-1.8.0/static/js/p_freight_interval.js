(function ($) {
	$.fn.freightInterval = function () {
		return this.each(function () {
			var MAX_LINE = 3;
			var currentLine = $(this).find('.interval-line').length;

			var $this = $(this);
			var $firstLine = $this.find('tr.first-line');
			var $cloneLine = $this.find('tr.clone');
			var $addInterval = $this.find('.add-interval');
			var $intervalHelp = $this.find('.interval-help');

			var $intervalInput = $this.find('input.interval-input');
			var $intervalAmount = $this.find('input.interval-amount');
			var $intervalPrice = $this.find('input.interval-price');

			var hasFillError = false;

			function hasErrorInput ($ele) {
				if ($ele.find('.interval-line div.has-error').length) {
					return true;
				}
				return false;
			}

			function hasFillErrorInput ($ele) {
				var $curIntI = $ele.find('.interval-line');
				var $curIntA = $ele.find('.interval-line input.interval-amount');
				var $curIntP = $ele.find('.interval-line input.interval-price');

				if ($curIntI.length > 1) {
					var amounts = [];
					$curIntA.each(function (index, elem) {
						var $elem = $(elem);
						amounts.push(Number($elem.val()));
					});

					var isAsce = true;
					for (var i = amounts.length - 1; i >= 1; i--) {
						if (amounts[i] <= amounts[i - 1]) {
							isAsce = false;
							break;
						}
					}
					if (!isAsce) {
						$intervalHelp.text('后一个数量必须大于前一个数量');
						$this.addClass('ck-error');
						return true;
					}

					/*var prices = [];
					$curIntP.each(function (index, elem) {
						var $elem = $(elem);
						prices.push(Number($elem.val()));
					});

					var isDesc = true;
					for (var j = prices.length - 1; j >= 1; j--) {
						if (prices[j] >= prices[j - 1]) {
							isDesc = false;
							break;
						}
					}*/
					/*if (isDesc) {
						$intervalHelp.text('后一个价格必须大于前一个价格');
						$this.addClass('ck-error');
						return true;
					}*/
					else {
						$intervalHelp.empty();
						$this.removeClass('ck-error');
						return false;
					}
				}
				return false;
			}

			$addInterval.on('click', function (e) {
				e.preventDefault();
				// if (currentLine < MAX_LINE) {
					// $intervalHelp.empty();
					var hasEmpty = false;
					var $emptyInput = null;
					$this.find('.interval-line input.interval-input').each(function (index, elem) {
						if ($(elem).val() === '') {
							hasEmpty = true;
							$emptyInput = $(elem);
							return false;
						}
					});
					if (hasEmpty || hasErrorInput($this)) {
						$emptyInput.focus();
						// $intervalHelp.text('请先填写未完善的价格区间');
					}
					else if (hasFillError) {
						return;
					}
					else {
						var $newItem = $cloneLine
						.clone(true)
						.removeClass('clone').addClass('interval-line').addClass('is-more')
						.insertBefore($cloneLine);
						$newItem.find('input.interval-amount').addClass('f-range');
						$newItem.find('input.interval-price').addClass('f-price');
						
						$intervalHelp.text('');
						currentLine++;
						$this.closest('form').formValidation('addField', $newItem.find('.f-range'));
						$this.closest('form').formValidation('addField', $newItem.find('.f-price'));
				/*		$newItem.find('.f-range').attr('name', 'freight[\'' + currentLine + '\'].amountLimit');
						$newItem.find('.f-price').attr('name', 'freight[\'' + currentLine + '\'].price');*/
					}
				// }
				/*else {
					$intervalHelp.text('最多设置三个价格区间');
				}*/
			});

			$cloneLine.on('click', '.remove-interval', function () {
				$(this).closest('tr.interval-line').remove();
				hasFillError = hasFillErrorInput($this);
				// $intervalHelp.empty();
				// currentLine--;
			});

			$this.on('blur', '.interval-line input.interval-input', function () {
				var hasErr = false;

				setTimeout(function () {
					hasErr = hasErrorInput($this);
					if (hasErr) {
						// $intervalHelp.text('请先填写未完善的价格区间');
					}
					else {
						hasFillError = hasFillErrorInput($this);
					}
				}, 0); // setTimeout 0					
			});
		});
	};
})(jQuery);
