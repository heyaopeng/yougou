(function() {
	$.fn.priceInterval = function() {
		return this.each(function(index, elem) {
			var $table = $(elem);
			var rate = parseFloat($table.data('rate'));
			var recommend = parseFloat($table.data('recommend'));
			var currentLine = $table.find('.pi-row').length;
			var MAX_LINE = 3;
			var DEFAUTL_VALUE = '';
			var $singleRow = $('<tr class="pi-row">n' +
				'<td>\n' +
				'<input type="text" class="form-control pi-amount">\n' +
				'</td>\n' +
				'<td>\n' +
				'<input type="text" class="form-control pi-price pi-price1">\n' +
				'</td>\n' +
				'<td>\n' +
				'<button class="btn btn-danger pi-remove" type="button">\n' +
				'<span class="glyphicon glyphicon-minus"></span>\n' +
				'</button>\n' +
				'</td>\n' +
				'</tr>\n');
			var $msg = $table.find('.pi-msg');
			var MSG_MAX_LINE = '最多只能有三个价格梯度';
			var MSG_WRONG_AMOUNT = '前一个数量必须小于后一个';
			var MSG_WRONG_PRICE = '前一个价格必须大于后一个';

			function clearMsg() {
				$msg.empty();
			}

			function setMsg(m) {
				$msg.text(m);
			}

			function isAsce(arr) {
				var asce = true;
				if (arr.length <= 1) {
					return asce;
				}
				var a = arr[0];
				for (var i = 1; i < arr.length; i++) {
					if (a >= arr[i]) {
						asce = false;
						break;
					} else {
						a = arr[i];
					}
				}

				return asce;
			}

			function isDesc(arr) {
				var desc = true;
				if (arr.length <= 1) {
					return desc;
				}
				var a = arr[0];
				for (var i = 1; i < arr.length; i++) {
					if (a <= arr[i]) {
						desc = false;
						break;
					} else {
						a = arr[i];
					}
				}

				return desc;
			}

			function validateInput() {
				var aArr = [];
				$table.find('.pi-amount').each(function(index, elem) {
					aArr.push(parseInt($(elem).val()));
				});
				var pArr = [];
				$table.find('.pi-price1').each(function(index, elem) {
					pArr.push(parseFloat($(elem).val()));
				});

				// var p2Arr = [];
				// $table.find('.pi-price2').each(function(index, elem) {
				// 	p2Arr.push(parseFloat($(elem).val()));
				// });

				if (isAsce(aArr) && isDesc(pArr) /*&& isDesc(p2Arr)*/) {
					clearMsg();
					$table.removeClass('ck-error');
				} else {
					setMsg(MSG_WRONG_AMOUNT + '且' + MSG_WRONG_PRICE);
					$table.addClass('ck-error');
				}
			}

			function calcPrice(a, b) {
				return Math.ceil(a * b / 1000) * 1000;
			}


			$table.on('click', '.pi-add-row-btn', function(e) {
				e.preventDefault();
				if (currentLine < MAX_LINE) {

					var $r = $singleRow
								.clone()
								.find('input.pi-amount').attr('name', 'productPrice[\'' + currentLine + '\'].amountLimit').val(DEFAUTL_VALUE)
								// .end()
								// .find('input.pi-price1').attr('name', 'productPrice[\'' + currentLine + '\'].priceRMB')
								.end()
								.find('input.pi-price1').attr('name', 'productPrice[\'' + currentLine + '\'].price')
								.end();

					// if (recommend) {
					// 	$r.find('.pi-price2').after('<small class="pi-recommend">推荐：<span class="pi-recommend-val"></span></small>');
					// }

					$table.find('.pi-add-row').before($r);
					currentLine++;

					validateInput();
				} else {
					$msg.text(MSG_MAX_LINE);
				}
			});

			$table.on('click', '.pi-remove', function(e) {
				e.preventDefault();
				$(this).closest('tr.pi-row').remove();
				currentLine--;
				validateInput();
			});

			$table.on('keyup', '.pi-amount', function(e) {
				var $this = $(this);
				var v = $this.val().replace(/[^\d]/g, '');
				if (v === '') {
					v = '0';
				}
				$this.val(parseInt(v));

				validateInput();
			});

			$table.on('keyup', '.pi-price1', function(e) {
				var $this = $(this);
				var v = $this.val().replace(/[^\d.]/g, '');

				if (v === '' || /^\.+$/.test(v) || /^00+$/.test(v)) {
					v = '0';
				}

				// var vFloat = parseFloat(v);

				// if (rate) {
				// 	if (isNaN(vFloat)) {
				// 		$this.closest('tr').find('.pi-price2').val('');
				// 	} else {
				// 		$this.closest('tr').find('.pi-price2').val(calcPrice(vFloat, rate));
				// 	}

				// 	validateInput();
				// }

				// if (recommend) {
				// 	if (isNaN(vFloat)) {
				// 		$this.closest('tr').find('.pi-recommend-val').text('');
				// 	} else {
				// 		$this.closest('tr').find('.pi-recommend-val').text(calcPrice(vFloat, recommend));
				// 	}

				// 	validateInput();
				// }
			});

			$table.find('.pi-price1').trigger('keyup');

			$table.on('blur', '.pi-price', function() {
				var $this = $(this);
				var v = $this.val().replace(/[^\d.]/g, '');

				if (v === '' || /^\.+$/.test(v) || /^00+$/.test(v)) {
					v = '0';
				}

				$this.val(parseFloat(v.match(/\d*(\.\d{1,3})?/)[0]));

				validateInput();

				// if ($this.hasClass('pi-price1') && recommend) {
				// 	$this.closest('tr').find('.pi-recommend-val').text(calcPrice($this.val(), recommend));
				// }
			});
		});
	};
})(jQuery);