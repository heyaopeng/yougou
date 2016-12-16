var CKF = require('./CKF.js');
require('../less/finance.less');

// other dependencies ...
var getCookie = require('./getCookie.js');
var lang = getCookie('language');

var Big = require('big.js/big');
var currencyConfig = require('./currencyConfig.js');

// form validation
require('../css/formValidation.min.css');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('bootstrap/js/modal.js');
module.exports = (function() {

	var moduleName = 'finance';
	var module = CKF.create(moduleName);

	return {
		init: function() {
			//$rechargeForm
			var $rechargeForm = module.find("#recharge-form");
			$rechargeForm.formValidation({
				icon: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
				},
				fields: {
					'f-amount': {
						selector: '.f-amount',
						validators: {
							notEmpty: {
								message: __('The amount is required')
							},
							regexp: {
								regexp: /^\d{0,999}$/,
								message: __('Please enter the correct amount format')
							},
							greaterThan: {
								value: 1000,
								message: __('The amount must greater than or equal to %s')
							}
						}
					},
					'f-payment': {
						selector: '.f-payment',
						validators: {
							notEmpty: {
								message: __('payment is required')
							}
						}
					}
				}
			})
				.on('err.validator.fv', function(e, data) {
					data.element
						.data('fv.messages')
						.find('.help-block[data-fv-for="' + data.field + '"]').hide()
						.filter('[data-fv-validator="' + data.validator + '"]').show();
				})
				.on('success.field.fv', '.f-amount', function(e, data) {
					$('.js-get-amount').text($('.js-enter-amount').val());
					$('.js-get-money').val($('.js-enter-amount').val());
					$('.js-modal-btn').prop('disabled', false);
				})
				.on('err.field.fv', '.f-amount', function(e, data) {
					$('.js-modal-btn').prop('disabled', true);
				}).on('success.form.fv', function(e) {
					e.preventDefault();
           			$('#card-form-modal').modal('show');
        		});

			$('.js-modal-btn').on('click', function(e) {
				if (!$rechargeForm.data('formValidation').isValid()) {
					e.preventDefault();
					$rechargeForm.data('formValidation').validate();
				}
			});


			//withdrawForm
			var $withdrawForm = module.find('#withdraw-form');
			$withdrawForm.formValidation({
				icon: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
				},
				fields: {
					'f-cart': {
						selector: '.f-cart',
						validators: {
							notEmpty: {
								message: __('The Cart is required')
							}
						}
					},
					'f-with-amount': {
						selector: '.f-with-amount',
						validators: {
							notEmpty: {
								message: __('The amount is required')
							},
							greaterThan: {
								value: parseFloat(module.find('.at-least').data('value')),
								message: __('The amount must greater than or equal to %s')
							},
							lessThan: {
								value: parseFloat(module.find('.f-available-amount').text()),
								message: __('The amount can not be greater than %s')
							},
							regexp: {
								regexp: /^\d{0,12}(\.\d{1,4})?$/,
								message: __('Please enter the correct amount. eg. xxx or xxx.xx!')
							}
						}
					},
					'f-password': {
						selector: '.f-password',
						validators: {
							notEmpty: {
								message: __("The password is required and can\'t be empty")
							},
							stringLength: {
								min: 6,
								message: __('The password must be up to six digits')
							}
						}
					}
				}
			})
				.on('err.validator.fv', function(e, data) {
					data.element
						.data('fv.messages')
						.find('.help-block[data-fv-for="' + data.field + '"]').hide()
						.filter('[data-fv-validator="' + data.validator + '"]').show();
				}).on('success.field.fv', '.f-with-amount', function(e) {
				//计算手续费

				var $this = $(this);
				var amount = $this.val();
				var handlingCharge = $('.f-calculate-handling').data('value');

				var result = new Big(handlingCharge).times(new Big(amount));

				//var end = result.toFixed(currencyConfig);
				var end = 2.00;

				/* var end = Math.round(result * 10) / 10;*/
				$withdrawForm.find('.f-calculate-handling').text(end);
				//隐藏的input值
				$withdrawForm.find('.f-calculate-handling').next().val(end);
				//计算实际金额
				/*var rateValue = $withdrawForm.find('.f-ex-rate').text();*/

				var actual = new Big(amount).minus(new Big(end)); //.times(new Big(rateValue));

				var endActual = CKF.util.fixPrice(actual.toFixed(currencyConfig));
				/*var endActual = Math.round(actual * 100) / 100;*/
				$withdrawForm.find('.f-calculate-actual').text(endActual);
			});

			var $billWithdrawForm = module.find('#bill-withdraw-form');
			$billWithdrawForm.formValidation({
				icon: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
				},
				fields: {
					'f-cart': {
						selector: '.f-cart',
						validators: {
							notEmpty: {
								message: __('The Cart is required')
							}
						}
					},
					'f-with-amount': {
						selector: '.f-with-amount',
						validators: {
							notEmpty: {
								message: __('The amount is required')
							},
							greaterThan: {
								value: parseFloat(module.find('.at-least').data('value')),
								message: __('The amount must greater than or equal to %s')
							},
							lessThan: {
								value: parseFloat(module.find('.f-available-amount').text()),
								message: __('The amount can not be greater than %s')
							},
							regexp: {
								regexp: /^\d{0,12}(\.\d{1,4})?$/,
								message: __('Please enter the correct amount. eg. xxx or xxx.xx!')
							}
						}
					},
					'f-password': {
						selector: '.f-password',
						validators: {
							notEmpty: {
								message: __("The password is required and can\'t be empty")
							},
							stringLength: {
								min: 6,
								message: __('The password must be up to six digits')
							}
						}
					}
				}
			})
				.on('err.validator.fv', function(e, data) {
					data.element
						.data('fv.messages')
						.find('.help-block[data-fv-for="' + data.field + '"]').hide()
						.filter('[data-fv-validator="' + data.validator + '"]').show();
				}).on('success.field.fv', '.f-with-amount', function(e) {
				//计算手续费

				var $this = $(this);
				var amount = $this.val();
				var handlingCharge = $('.f-calculate-handling').data('value');

				var result = new Big(handlingCharge).times(new Big(amount));

				//var end = result.toFixed(currencyConfig);
				var end = 2.00;

				/* var end = Math.round(result * 10) / 10;*/
				$billWithdrawForm.find('.f-calculate-handling').text(end);
				//隐藏的input值
				$billWithdrawForm.find('.f-calculate-handling').next().val(end);
				//计算实际金额
				/*var rateValue = $withdrawForm.find('.f-ex-rate').text();*/

				var actual = new Big(amount).minus(new Big(end)); //.times(new Big(rateValue));
				$billWithdrawForm.find('.f-calculate-actual').text(actual);
			});
		}
	};
})();