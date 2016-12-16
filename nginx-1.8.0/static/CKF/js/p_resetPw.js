var CKF = require('./CKF.js');
require('../less/reset-pw.less');

var getCookie = require('./getCookie.js');
var lang = getCookie('language');

require('bootstrap/js/button.js');

// form validation
require('../css/formValidation.min.css');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');

require('../css/intlTelInput.css');
require('./libs/intl_tel/intlTelInput.min.js');


module.exports = (function() {
	var moduleName = 'resetPw';
	module = CKF.create(moduleName);

	var emailLinks = {
		'gmail.com': '//mail.google.com',
		'icloud.com': '//www.icloud.com/#mail',
		'live.com': '//login.live.com/',
		'outlook.com': '//login.live.com/',
		'yahoo.com': '//mail.yahoo.com/',
		'163.com': '//mail.163.com/',
		'qq.com': '//mail.qq.com'
	};
	var $email = module.find('#reset-pw-email');
	var $emailAlert = module.find('.reset-pw-alert');
	var $emailCheck = module.find('.reset-pw-btn');
	var $errors = module.find('.reset-pw-errors');

	function updateCaptcha($form) {
		$form.find('.v-code-img').attr('src', '/cooka-user-web/captchaImage.do?' + new Date().getTime());
	}

	return {
		init: function() {

			module.on('click', '.reset-pw-refresh', function(e) {
				e.preventDefault();
				updateCaptcha(module);
			});

			module.on('click', '.v-code-img', function(e) {
				$(this).attr('src', '/cooka-user-web/captchaImage.do?' + new Date().getTime());
			});

			if ($email.length) {
				var eText = $email.text();
				var suffix = eText.slice(eText.indexOf('@') + 1);

				if (emailLinks[suffix]) {
					$email.prop('href', emailLinks[suffix]);
					$emailCheck.prop('href', emailLinks[suffix]).removeClass('hide');
				} else {
					$emailAlert.removeClass('hide');
				}
			}

			if ($errors.length) {
				if ($errors.text().trim() !== '') {
					$errors.removeClass('hide');
				}
			}

			module.on('click', '.sign-send-code', function() {
				var $btn = $(this).button('loading');

				var p = $('#reset-pw-form').find('.f-mobile').intlTelInput('getNumber');
				$.post('/cooka-user-web/getPhoneCode', {
						phone: p
					},
					function(result) {
						if (result === 'success') {
							var MAX = 60;
							var int = setInterval(function() {
								if (MAX === 0) {
									clearInterval(int);
									$btn.button('reset');
								}
								$btn.text(MAX--);
							}, 1000);
							$('#reset-pw-form').find('.f-mcode').prop('disabled', false);
						} else if (result === 'frequently') {
							alert(__("Frequent Operation"));
							$btn.button('reset');
						} else {
							alert(__("Send Failed"));
							$btn.button('reset');
						}
					});
			});

			FormValidation.Validator.intPhoneNumber = {
				init: function(validator, $field, options) {
					// Attach the intlTelInput on field
					$field.intlTelInput({
						utilsScript: '/CKF/js/libs/intl_tel/utils.js',
						autoPlaceholder: true,
						preferredCountries: ['vn', 'cn'],
					});

					// Revalidate the field when changing the country
					var $form = validator.getForm(),
						fieldName = $field.attr('data-fv-field');
					$form.on('click.country.intphonenumber', '.country-list', function() {
						$form.formValidation('revalidateField', fieldName);
					});
				},

				destroy: function(validator, $field, options) {
					$field.intlTelInput('destroy');

					// Turn off the event
					validator.getForm().off('click.country.intphonenumber');
				},

				validate: function(validator, $field, options) {
					return $field.val() === '' || $field.intlTelInput('isValidNumber');
				}
			};

			$('#reset-pw-form').formValidation({
				framework: 'bootstrap',
				icon: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh spin'
				},
				fields: {
					"f-email": {
						selector: '#reset-pw-form .f-email',
						validators: {
							notEmpty: {
								message: __('Please enter your email')
							},
							emailAddress: {
								message: __('The input is not a valid email address')

							},
							stringLength: {
								max: 30,
								message: __('Email length too long')
							}
						}
					},
					"f-mobile": {
						selector: '#reset-pw-form .f-mobile',
						validators: {
							notEmpty: {
								message: __('Please enter your phone number')
							},
							intPhoneNumber: {
								message: __('Not a valid phone number')
							}
						}
					},
					"f-password": {
						selector: '#reset-pw-form .f-password',
						validators: {
							notEmpty: {
								message: __('Please enter your password')
							},
							stringLength: {
								min: 6,
								max: 30,
								message: __('Password length more than %s but less than %s')
							}
						}
					},
					"f-confirm-password": {
						selector: '#reset-pw-form .f-confirm-password',
						validators: {
							notEmpty: {
								message: __('The confirm password is required and can not be empty')
							},
							identical: {
								field: 'f-password',
								message: __('The password and its confirm are not the same')
							}
						}
					},
					"f-captcha": {
						selector: '#reset-pw-form .f-captcha',
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
			}).on('success.form.fv', function(e) {
				e.preventDefault();
				var $form = $(e.target);
				var fv = $form.data('formValidation');

				$form.find('.f-mobile').val($form.find('.f-mobile').intlTelInput('getNumber'));

				fv.defaultSubmit();
			});
		}
	};
})();