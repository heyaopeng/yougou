var CKF = require('./CKF.js');

require('../less/pro-detail-info-btn.less');

module.exports = (function() {
	var moduleName = 'proDetailBtn';

	var module = CKF.create(moduleName, true);

	function showBtn(singlePrice) {
		if (module !== null) {
			if (singlePrice <= 0) {
				module.find('.js-buy').prop('disabled', true);
				module.find('.js-cart').prop('disabled', true);
				module.closest('form').data('formValidation').disableSubmitButtons(true);
			} else {
				module.find('.js-buy').prop('disabled', false);
				module.find('.js-cart').prop('disabled', false);
				module.closest('form').data('formValidation').disableSubmitButtons(false);
			}
		}
	}

	return {
		init: function() {
			CKF.listen({
				'perform-btn': showBtn
			}, moduleName);
			if (module !== null) {
				var $buyNow = module.find('.js-buy');
				$buyNow.on('click', function(event) {
					var $thisBtn = $(this);
					$thisBtn.closest('form').attr('action', '/cooka-order-web/buynow');
					var totalPiece = 0;
					$thisBtn.closest('form').find('.js-quantity').each(function(idx, ele) {
						totalPiece += parseInt($(ele).val());
						// $('.pro-detail-info-messages small').addClass('hidden');
					});
					CKF.notify({
						type: 'perform-total',
						data: totalPiece
					});
					// $elem.('form').trigger('minusPlusGroup.iptChange');
					if (totalPiece>0) {
						event.preventDefault();
						$.ajax({
							url: "/duobao-user-web/isLogin",
							type: 'GET',
							success: function(result) {
								if (result === "false") {
									CKF.notify({
										type: 'show-sign-in',
										data: 'buynow'
									});
								} else {
									$buyNow.closest('form')[0].submit();
								}
							}
						});
					} else {
						$('.js-say-less').removeClass('hidden');
						event.preventDefault();
					}
				});

				var $cart = module.find('.js-cart');
				$cart.on('click', function(e) {
					e.preventDefault();
					var $this = $(this);
					var $form = $this.closest('form');
					var $inputSpin = $form.find('.js-minus-plus-group');
					var data = {};

					var totalPiece = 0;
					$this.closest('form').find('.js-quantity').each(function(idx, ele) {
						totalPiece += parseInt($(ele).val());
						// $('.pro-detail-info-messages small').addClass('hidden');
					});
					CKF.notify({
						type: 'perform-total',
						data: totalPiece
					});
					// $elem.('form').trigger('minusPlusGroup.iptChange');
					if (totalPiece>0) {
						$(this).closest('form').attr('action', '/cooka-productDetail-web/addToUserCart.do');
						data['storeId'] = $form.find('input[name="storeId"]').val();
						data['productId'] = $form.find('input[name="productId"]').val();
						data['combination'] = [];

						$inputSpin.each(function(index, elem) {
							var $elem = $(elem);
							var aComb = {};
							aComb['combinationId'] = $.trim($elem.find(
								'[name="combination[' + index + '].combinationId"]').val());
							aComb['getamount'] = $.trim($elem.find(
								'[name="combination[' + index + '].getamount"]').val());
							if (aComb['getamount'] !== '0') {
								data['combination'].push(aComb);
							}
						});

						$.ajax({
							type: "post",
							url: "/cooka-productDetail-web/addToUserCart.do",
							contentType: "application/json; charset=UTF-8",
							data: JSON.stringify(data),
							dataType: "html",
							async: true,
							success: function(data) {
								if (data == "success") {
									$('#cart-modal').modal('toggle');
								} else {
									if (data == "notPermission") {
										alert('notPermission');
									} else {
										CKF.notify({
											type: 'show-sign-in',
											data: 'cart'
										});
									}
								}
							}
						});
					} else {
						$('.js-say-less').removeClass('hidden');
						e.preventDefault();
					}

				});
			}
		}
	};
})();