$(function () {
	$('#iform').submit(function () {
		var hasInput = false;
		$('.interval-input').each(function () {
			if ($(this).val() !== '') {
				hasInput = true;
				return false;
			}
		});
		
		if (hasInput) {
			
			var lineArr = [];
			$('.interval-input').each(function () {
				if ($(this).val() !== '') {
					lineArr.push('1')
				}
				else {
					lineArr.push('0')
				}				
			});
						
			var j = lineArr.join('');
			console.log(j)

			if (!(j === '110000' || j === '111100' || j === '111111')) {
				alert('价格梯度填写错误');
				return false;
			}
			
			
			var $amount = $('.interval-amount');
			var $price = $('.interval-price');
			if (j === '111100') {
				if (!(parseInt($amount.eq(0).val()) < parseInt($amount.eq(1).val()) && parseFloat($price.eq(0).val()) > parseFloat($price.eq(1).val()))) {
					alert('价格梯度填写错误');
					return false;
				}
			}
			else if (j === '111111') {
				if (!(parseInt($amount.eq(0).val()) < parseInt($amount.eq(1).val()) &&
						parseInt($amount.eq(1).val()) < parseInt($amount.eq(2).val()) &&
						parseFloat($price.eq(0).val()) > parseFloat($price.eq(1).val()) &&
						parseFloat($price.eq(1).val()) > parseFloat($price.eq(2).val())
						)) {
					alert('价格梯度填写错误');
					return false;
				}
			}
						
			return true;
		}
		else {
			return true;
		}
	});
});