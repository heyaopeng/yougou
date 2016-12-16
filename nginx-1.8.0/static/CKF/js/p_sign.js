var CKF = require('./CKF.js');
require('../less/sign.less');

require('bootstrap/js/button.js');
require('bootstrap/js/transition.js');
require('bootstrap/js/modal.js');

// form validation
require('../css/formValidation.min.css');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');

module.exports = (function() {
	var moduleName = 'sign';
	var module = CKF.create(moduleName);
	var $errors = module.find('.sign-errors');

	function updateCaptcha($form) {
		$form.find('.v-code-img').attr('src', '/duobao-user-web/captchaImage.do?' + new Date().getTime());
	}

	return {
		init: function() {

			module.on('click', '.sign-refresh', function(e) {
				e.preventDefault();
				updateCaptcha(module);
			});

			module.on('click', '.v-code-img', function() {
				$(this).attr('src', '/duobao-user-web/captchaImage.do?' + new Date().getTime());
			});

			if ($errors.length) {
				if ($errors.text().trim() !== '') {
					$errors.removeClass('hide');
				}
			}

			if ($('#sign-form-in').length) {
				$('#sign-form-in').on('init.form.fv', function(e) {
					CKF.notify({
						type: 'disable-ajax-loading',
						data: null
					});
					var $form = $(e.target);
					$(window).one('load', function() {

						var acc = null;
						if ($form.find('.f-email:visible').length) {
							acc = $form.find('.f-email').val();
						} else {
							acc = $form.find('.f-mobile').intlTelInput('getNumber');
						}

						$.get('/duobao-user-web/isNeedCaptcha.do', {
							'account': acc
						}, function(data) {
							if (data) {
								updateCaptcha($form);
								$form.find('.sign-captcha').removeClass('hide');
								CKF.notify({
									type: 'enable-ajax-loading',
									data: null
								});
							}
						});
					});

				}).formValidation({
					framework: 'bootstrap',
					icon: {
						valid: 'glyphicon glyphicon-ok',
						invalid: 'glyphicon glyphicon-remove',
						validating: 'glyphicon glyphicon-refresh spin'
					},
					fields: {
						'f-email': {
							selector: '#sign-form-in .f-email',
							validators: {
								notEmpty: {
									message: __('Please enter your email')
								},
								stringLength: {
									max: 30,
									message: __('Phone number or e-mail too long')
								},
								blank: {
									message: '_'
								}
							}
						},
						'f-password': {
							selector: '#sign-form-in .f-password',
							validators: {
								notEmpty: {
									message: __('Please enter your password')
								},
								stringLength: {
									max: 32,
									message: __('Password is too long')
								}
							}
						},
						'f-captcha': {
							selector: '#sign-form-in .f-captcha',
							validators: {
								notEmpty: {
									message: __('Please input verify code')
								},
								stringLength: {
									min: 4,
									max: 4,
									message: __('Wrong verify code length')
								}
							}
						}
					}
				}).on('err.validator.fv', function(e, data) {
					data.element
						.data('fv.messages')
						.find('.help-block[data-fv-for="' + data.field + '"]').hide()
						.filter('[data-fv-validator="' + data.validator + '"]').show();
				});
			}
		}
	};
})();