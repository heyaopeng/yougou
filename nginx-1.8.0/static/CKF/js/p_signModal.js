var CKF = require('./CKF.js');
require('../less/sign-modal.less');

// form validation
require('../css/formValidation.min.css');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');

require('../css/intlTelInput.css');
require('./libs/intl_tel/intlTelInput.min.js');

// bootstrap
require('bootstrap/js/transition.js');
require('bootstrap/js/modal.js');
require('bootstrap/js/button.js');

// other dependencies ...
require('ladda/dist/ladda-themeless.min.css');
var Ladda = require('ladda');

module.exports = (function() {
	var moduleName = 'signModal';
	var module = CKF.create(moduleName);
	var $signIn = module.find('.sign-modal-signin');
	var $signUp = module.find('.sign-modal-signup');
	var $signVerify = module.find('.sign-modal-verify');
	var $signVerifyM = module.find('.sign-modal-verify-m');
	var $emailLink = module.find('.sign-modal-email-link');
	var $verifyBtn = module.find('.sign-modal-verify-btn');

	var fromOther = '';

	function reset() {
		$signIn.find('.sign-modal-resend').addClass('sign-modal-hide');
		$signIn.find('.sign-modal-captcha').addClass('sign-modal-hide');
		$signVerify.addClass('sign-modal-hide');
		$signVerifyM.addClass('sign-modal-hide');

		$signIn.removeAttr('style');
		$signUp.removeAttr('style');
		$signVerify.removeAttr('style');
		$signVerifyM.removeAttr('style');
	}

	function showVerify(result) {
		var suffix = result.slice(result.indexOf('@') + 1);
		var emailLinks = {
			'gmail.com': '//mail.google.com',
			'icloud.com': '//www.icloud.com/#mail',
			'live.com': '//login.live.com/',
			'outlook.com': '//login.live.com/',
			'yahoo.com': '//mail.yahoo.com/',
			'163.com': '//mail.163.com/',
			'qq.com': '//mail.qq.com'
		};

		$emailLink.text(result);

		if (emailLinks[suffix]) {
			$emailLink.prop('href', emailLinks[suffix]).closest('.sign-modal-verify').find('.alert').remove();
			$verifyBtn.prop('href', emailLinks[suffix]).show();
		} else {
			var NOT_FOUND = '<div class="alert alert-warning">\n' +
				'<strong>' + __('Sorry') + '</strong>\n' +
				__('We can not resolve your email automatically, please check out your inbox manually.') +
				'\n</div>';
			$emailLink.prop('href', '#').after(NOT_FOUND);
			$verifyBtn.hide();
		}

		$signVerify.slideDown();
		$signUp.slideUp();
	}

	function showVerifyM() {
		$signVerifyM.slideDown();
		$signUp.slideUp();
	}

	function showSignIn(from) {
		reset();
		$signIn.removeClass('sign-modal-hide');
		$signUp.addClass('sign-modal-hide');
		updateCaptcha($signIn.find('form'));
		module.modal('show');
		module.one('shown.bs.modal', function() {
			CKF.notify({
				type: 'disable-ajax-loading',
				data: null
			});
		});

		if (from !== null) {
			// 'buynow' || 'cart'
			fromOther = from;
		} else {
			fromOther = '';
		}

	}

	function showSignUp() {

		$signUp.removeClass('sign-modal-hide');
		$signIn.addClass('sign-modal-hide');
		updateCaptcha($signUp.find('form'));
		module.modal('show');
		module.one('shown.bs.modal', function() {
			CKF.notify({
				type: 'disable-ajax-loading',
				data: null
			});
		}).trigger('shown.bs.modal');
	}

	function hideSignModal() {
		// may need to reset form
		module.modal('hide');
		module.one('hidden.bs.modal', function() {
			CKF.notify({
				type: 'enable-ajax-loading',
				data: null
			});
		});
	}

	function updateCaptcha($form) {
		$form.find('.v-code-img').attr('src', '/duobao-user-web/captchaImage.do?' + new Date().getTime());
	}

	function userSignIn(name) {
		if (fromOther !== '') {
			CKF.notify({
				type: 'pro-detail-' + fromOther,
				data: null
			});
		}

		// should notify all the time
		CKF.notify({
			type: 'user-sign-in',
			data: name
		});
	}

	return {
		init: function() {
			module.on('click', '.sign-send-code', function() {
				var $btn = $(this).button('loading');

				var p = $('#sign-up-form').find('.f-mobile').intlTelInput('getNumber');
				$.post('/duobao-user-web/getPhoneCode', {
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
							$('#sign-up-form').find('.f-mcode').prop('disabled', false);
						} else if (result === 'frequently') {
							alert(__("Frequent Operation"));
							$btn.button('reset');
						} else {
							alert(__("Send Failed"));
							$btn.button('reset');
						}
					});
			});

			module.on('click', '.sign-switch-tab-item', function() {
				var $this = $(this);
				if ($this.hasClass('active')) {
					return;
				}

				var sw = $this.data('switch');
				$this.addClass('active').siblings().removeClass('active');

				module.find('.sign-switch-target.active:visible').removeClass('active').find('input[name="account"]').prop('disabled', true);
				module.find('#' + sw).addClass('active').find('input[name="account"]').prop('disabled', false);
			});

			module.on('click', '.mobile-to-sign-in', function() {
				$signVerifyM.slideUp();
				$signIn.slideDown();
			});

			module.on('click', '.v-code-img', function(e) {
				$(this).attr('src', '/duoabo-user-web/captchaImage.do?' + new Date().getTime());
			});

			module.on('click', '[data-goto]', function(e) {
				e.preventDefault();
				var $goto = $(this);
				var target = $goto.data('goto');

				if (target === 'signin') {
					$signUp.slideUp('fast');
					$signIn.slideDown('fast');
				} else if (target === 'signup') {
					$signIn.slideUp('fast');
					$signUp.slideDown('fast');
				}
			});

			module.on('click', '.sign-modal-refresh', function() {
				$(this).closest('form').find('.v-code-img').attr('src', '/duobao-user-web/captchaImage.do?' + new Date().getTime());
			});

			CKF.listen({
				'show-sign-in': showSignIn,
				'show-sign-up': showSignUp,
				'hide-sign-modal': hideSignModal
			}, moduleName);

			var lSignInBtn = Ladda.create(document.querySelector('#sign-in-btn'));
			var lSignUpBtn = Ladda.create(document.querySelector('#sign-up-btn'));

			FormValidation.Validator.intPhoneNumber = {
				init: function(validator, $field, options) {
					// Attach the intlTelInput on field
					$field.intlTelInput({
						utilsScript: '/CKF/js/libs/intl_tel/utils.js',
						autoPlaceholder: true,
						preferredCountries: ['cn']
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

			$('#sign-in-form').formValidation({
				framework: 'bootstrap',
				icon: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh spin'
				},
				fields: {
					"f-email": {
						selector: '#sign-in-form .f-email',
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
							},
							blank: {
								message: '_'
							}
						}
					},
					"f-mobile": {
						selector: '#sign-in-form .f-mobile',
						validators: {
							notEmpty: {
								message: __('Please enter your phone number')
							},
							intPhoneNumber: {
								message: __('Not a valid phone number')
							},
							blank: {
								message: '_'
							}
						}
					},
					"f-password": {
						selector: '#sign-in-form .f-password',
						validators: {
							notEmpty: {
								message: __('Please enter your password')
							},
							stringLength: {
								min: 6,
								max: 32,
								message: __('Password length more than %s but less than %s')
							},
							blank: {
								message: '_'
							}
						}
					},
					"f-captcha": {
						selector: '#sign-in-form .f-captcha',
						validators: {
							notEmpty: {
								message: __('Please input verify code')
							},
							regexp: {
								regexp: /^[\d]{4}$/,
								message: __('Wrong veirfy code')
							},
							blank: {
								message: '_'
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

				var $form = $(e.target),
					fv = $(e.target).data('formValidation');

				lSignInBtn.start();
				var oldPhone = $form.find('.f-mobile').val();
				$form.find('.f-mobile').val($form.find('.f-mobile').intlTelInput('getNumber'));
				setTimeout(function() {
					$.ajax({
						url: "/duobao-user-web/ajaxLogin",
						type: 'POST',
						data: $form.serialize(),
						success: function(result) {
							lSignInBtn.stop();
							$form.find('.f-mobile').val(oldPhone);

							var usingEmail = $form.find('.f-email').is(':visible');

							if (result === 'wrongPassword') {
								fv
									.updateMessage('f-password', 'blank', __('Wrong password'))
									.updateStatus('f-password', 'INVALID', 'blank');

								var acc = null;
								if ($form.find('.f-email:visible').length) {
									acc = $form.find('.f-email').val();
								} else {
									acc = $form.find('.f-mobile').intlTelInput('getNumber');
								}

								$.get('/duobao-user-web/isNeedCaptcha.do', {
									"account": acc
								}, function(data) {
									if (data) {
										$form.find('.sign-modal-captcha').removeClass('sign-modal-hide');
										updateCaptcha($form);
									}
								});
							} else if (result === 'userNotExist') {
								if (usingEmail) {
									fv
										.updateMessage('f-email', 'blank', __('Email has not been registered'))
										.updateStatus('f-email', 'INVALID', 'blank');
								} else {
									fv
										.updateMessage('f-mobile', 'blank', __('Phone number has not been registered'))
										.updateStatus('f-mobile', 'INVALID', 'blank');
								}
								updateCaptcha($form);
							} else if (result === 'to_active') {
								fv
									.updateMessage('f-email', 'blank', __('Email has not been activated'))
									.updateStatus('f-email', 'INVALID', 'blank');

								updateCaptcha($form);
							} else if (result === 'not_active') {
								fv
									.updateMessage('f-email', 'blank', __('Email has not been activated'))
									.updateStatus('f-email', 'INVALID', 'blank');

								$form
									.find('.sign-modal-resend')
									.removeClass('sign-modal-hide')
									.find('.sign-modal-resend-link')
									.prop('href', '/duobao-user-web/active?email=' + $form.find('.f-email').val());

								updateCaptcha($form);
							} else if (result === 'wrongCaptcha') {
								$form.find('.sign-modal-captcha').removeClass('sign-modal-hide');
								fv
									.updateMessage('f-captcha', 'blank', __('Wrong verify code'))
									.updateStatus('f-captcha', 'INVALID', 'blank');

								updateCaptcha($form);
							} else if (result === 'isForbidden') {
								// bug id 228
								if (usingEmail) {
									fv
										.updateMessage('f-email', 'blank', __('Your account is forbidden, Please connect us'))
										.updateStatus('f-email', 'INVALID', 'blank');
								} else {
									fv
										.updateMessage('f-mobile', 'blank', __('Your account is forbidden, Please connect us'))
										.updateStatus('f-mobile', 'INVALID', 'blank');
								}

								updateCaptcha($form);
							} else {
								userSignIn(result);
							}
						}
					});
				}, 0);
			});

			$('#sign-up-form').formValidation({
				framework: 'bootstrap',
				icon: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh spin'
				},
				fields: {
					"f-email": {
						verbose: false,
						selector: '#sign-up-form .f-email',
						validators: {
							notEmpty: {
								message: __('Please enter your email')
							},
							emailAddress: {
								message: __('The input is not a valid email address')
							},
							stringLength: {
								min: 6,
								max: 32,
								message: __('Email length must be more than %s less than %s')
							},
							regexp: {
								regexp: /^[a-z0-9][-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
								message: __('Invalid Email')
							},
							remote: {
								url: "/duobao-user-web/isExistEmail",
								type: 'GET',
								delay: 1000,
								data: function(validator, $field, value) {
									return {
										email: validator.getFieldElements('f-email').val()
									};
								},
								message: __('Account is already exist'),
							},
							blank: {
								message: '_'
							}
						}
					},
					"f-mobile": {
						verbose: false,
						selector: '#sign-up-form .f-mobile',
						validators: {
							notEmpty: {
								message: __('Please enter your phone number')
							},
							intPhoneNumber: {
								message: __('Not a valid phone number')
							},
							remote: {
								url: "/duobao-user-web/isExistAccount",
								type: 'GET',
								delay: 1000,
								data: function(validator, $field, value) {
									return {
										account: validator.getFieldElements('f-mobile').intlTelInput('getNumber')
									};
								},
								message: __('Account is already exist')
							}
						}
					},
					"f-mcode": {
						selector: '#sign-up-form .f-mcode',
						validators: {
							notEmpty: {
								message: __('Please enter your phone number')
							},
							stringLength: {
								min: 6,
								max: 6,
								message: __('Wrong verify code length')
							},
							blank: {
								message: '_'
							}
						}
					},
					"f-password": {
						selector: '#sign-up-form .f-password',
						validators: {
							notEmpty: {
								message: __('Please enter your password')
							},
							stringLength: {
								min: 6,
								max: 32,
								message: __('Password length more than %s but less than %s')
							},
							regexp: {
								regexp: /^[^\s]*$/,
								message: __('Password can not contain space')
							}
						}
					},
					"f-confirm-password": {
						selector: '#sign-up-form .f-confirm-password',
						validators: {
							notEmpty: {
								message: __('The confirm password can not be empty')
							},
							identical: {
								field: 'f-password',
								message: __('The password and its confirm are not the same')
							}
						}
					},
					"f-captcha": {
						selector: '#sign-up-form .f-captcha',
						validators: {
							notEmpty: {
								message: __('Please input verify code')
							},
							regexp: {
								regexp: /^[\d]{4}$/,
								message: __('Wrong veirfy code')
							},
							blank: {
								message: '_'
							}
						}
					},
					"f-agree": {
						selector: '#sign-up-form .f-agree',
						validators: {
							notEmpty: {
								message: __('You must agree with the agreement')
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

				var $form = $(e.target),
					fv = $(e.target).data('formValidation');

				lSignUpBtn.start();

				var oldPhone = $form.find('.f-mobile').val();
				$form.find('.f-mobile').val($form.find('.f-mobile').intlTelInput('getNumber'));

				setTimeout(function() {
					$.ajax({
						url: "/duobao-user-web/ajaxRegister",
						type: 'POST',
						data: $form.serialize(),
						success: function(result) {
							lSignUpBtn.stop();
							$form.find('.f-mobile').val(oldPhone);
							if (result === 'wrong_captcha') {
								fv
									.updateMessage('f-captcha', 'blank', __('Wrong verify code'))
									.updateStatus('f-captcha', 'INVALID', 'blank');
								updateCaptcha($form);
							} else if (result === 'exist_account') {
								alert('exist_account');
							} else if (result === 'wrong_phone_code') {
								fv
									.updateMessage('f-mcode', 'blank', __('Wrong verify code'))
									.updateStatus('f-mcode', 'INVALID', 'blank');
								updateCaptcha($form);
							} else if (result === 'error_account') {
								fv
									.updateMessage('f-email', 'blank', __('Failed to send email'))
									.updateStatus('f-email', 'INVALID', 'blank');
								updateCaptcha($form);
							} else {

								if (/^\+[0-9]+/.test(result)) {
									showVerifyM();
								} else {
									showVerify(result);
								}

								$form.data('formValidation').resetForm();
								$form[0].reset();

							}
						}
					});
				}, 0);
			});
		}
	};
})();