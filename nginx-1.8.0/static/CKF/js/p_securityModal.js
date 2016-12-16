var CKF = require('./CKF.js');
require('../less/security-modal.less');
// other dependencies ...
var getCookie = require('./getCookie.js');
var lang = getCookie('language');

// form validation
require('../css/formValidation.min.css');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');

require('../css/intlTelInput.css');
require('./libs/intl_tel/intlTelInput.min.js');

// bootstrap
require('bootstrap/js/transition.js');
require('bootstrap/js/modal.js');

module.exports = (function() {

	var moduleName = 'securityModal';
	var module = CKF.create(moduleName);

	var $pwdVer = module.find('#security-pwd-verification-form');
	var $setEmail = module.find('#security-email-bind-form');
	var $setMobile = module.find('#security-mobile-bind-form');
	var $setQuestion = module.find('#security-question-form');
	var $setSuccess = module.find('.security-modal-success');
	var $close = module.find('.close');

	function changeAction(cl) {
		switch (cl) {
			case 'icon-circle-mobile-o':
				$pwdVer.attr('action', 'toSetPhone');
				break;
			case 'icon-circle-shield-o':
				$pwdVer.attr('action', 'toSetSecurityAnswer');
		}
	}

	function updateCaptcha($form) {
		$form.find('.v-code-img').attr('src', '/cooka-user-web/captchaImage.do?' + new Date().getTime());
	}

	function changeTitle(title) {
		module.find('.security-modal-title').text(title);
	}

	function nextForm(cl) {
		switch (cl) {
			case 'icon-circle-evelope-o':
				$setEmail.slideDown('fast');
				break;

			case 'icon-circle-mobile-o':
				$setMobile.slideDown('fast');
				break;

			case 'icon-circle-shield-o':
				$setQuestion.slideDown('fast');
				break;
		}
	}

	function ModalInit() {
		module.find('form').find('input').val('');
		$pwdVer.show();
		$setEmail.hide();
		$setMobile.hide();
		$setQuestion.hide();
		$setSuccess.hide();
	}

	return {
		init: function() {

			CKF.listen({
				'next-form': nextForm,
				'change-action': changeAction,
				'change-title': changeTitle
			}, moduleName);


			module.on('click', '.security-modal-refresh, .v-code-img', function() {
				event.preventDefault();
				$(this).closest('form').find('.v-code-img').attr('src', '/cooka-user-web/captchaImage.do?' + new Date().getTime());
			});

			module.on('click', '.close', function() {
				event.preventDefault();

				CKF.notify({
					type: 'step-init',
					data: null
				});

				module.find('.v-code-img').attr('src', '/cooka-user-web/captchaImage.do?' + new Date().getTime());

				$setQuestion.data('formValidation').resetForm();
				$setEmail.data('formValidation').resetForm();
				$setMobile.data('formValidation').resetForm();

				ModalInit();

				$pwdVer.data('formValidation').resetForm();
			});

			//-------------------------------------------------------------------------------------------------

			// 密码身份认证验证：设置的公共认证表单
			$pwdVer.formValidation({
				framework: 'bootstrap',
				icon: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
				},
				fields: {
					"f-password": {
						selector: '#security-pwd-verification-form .f-password',
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
					"f-captcha": {
						selector: '#security-pwd-verification-form .f-captcha',
						validators: {
							notEmpty: {
								message: __('Please input verify code')
							},
							stringLength: {
								min: 4,
								max: 4,
								message: __('Wrong verify code length')
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

				$.ajax({
					url: $form[0].action,
					type: 'POST',
					data: $form.serialize(),
					success: function(result) {
						if (result == "success") {
							CKF.notify({
								type: 'next-active',
								data: null
							});

							$form.slideUp();

							CKF.notify({
								type: 'target-icon',
								data: null
							});
						} else if (result == "wrongPaswd") {
							fv
								.updateMessage('f-password', 'blank', __('Wrong password'))
								.updateStatus('f-password', 'INVALID', 'blank')
								.resetField('f-captcha');
							updateCaptcha($form);
						} else if (result == "wrongCaptcha") {
							fv
								.updateMessage('f-captcha', 'blank', __('Wrong verify code'))
								.updateStatus('f-captcha', 'INVALID', 'blank');
							updateCaptcha($form);
						} else if (result == "error") {
							alert(__("Unknown error"));
						}
					}
				});
			});

			//---------------------------------------------------------------------------------------

			var $emailNum;
			var $confirmCode; // 校验码：绑定手机或者邮箱用到

			module.find('.time-count').attr('disabled', true);

			// 邮箱设置
			$setEmail.formValidation({
				framework: 'bootstrap',
				icon: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
				},
				fields: {
					'f-email': {
						selector: '#security-email-bind-form .f-email',
						validators: {
							notEmpty: {
								message: __('Please enter your email')
							},
							emailAddress: {
								message: __('The input is not a valid email address')
							},
							stringLength: {
								min: 6,
								max: 30,
								message: __('Email length must be more than %s less than %s')
							},
							regexp: {
								regexp: /^[a-z0-9][-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
								message: __('Invalid Email')
							},
							remote: {
								url: "/cooka-user-web/isExistEmail",
								type: 'GET',
								delay: 1000,
								data: function(validator, $field, value) {
									return {
										email: validator.getFieldElements('f-email').val()
									};
								},
								message: __('Email is already exist')
							},
							blank: {
								message: '_'
							}
						}
					},
					'f-confirm-code': {
						selector: '#security-email-bind-form .f-confirm-code',
						validators: {
							notEmpty: {
								message: __('Please input verify code you got')
							},
							stringLength: {
								min: 4,
								max: 9,
								message: __('Wrong verify code length')
							},
							callback: {
								message: __('Please input verify code you got'),
								callback: function(value, validator, $field) {
									$confirmCode = value;
									if (value === '') {
										return false;
									}
									return true;
								}
							},
							blank: {
								message: '_'
							}
						}
					}
				}
			})
			.on('click', '.time-count', function() {
				var $this = $(this);
				$.ajax({
					url: "/cooka-user-web/center/sendEmailRandNum",
					type: 'POST',
					data: {
						'email': $setEmail.find('.f-email').val()
					},
					success: function(result) {
						if (result == "success") {
							CKF.notify({
								type: 'use-take-count',
								data: $this
							});
							$this.closest('.form-group').find('input').removeAttr('disabled');
						} else if (result == "frequently") {
							alert(__("Frequent Operation"));
						} else {
							alert(__("Send Failed"));
						}
					}
				});
			})
			.on('success.field.fv', function(e, data) {
				if (data.field === 'f-email') {
					$setEmail.find('.time-count').attr('disabled', false);
				}
	        })
	        .on('err.field.fv', function(e, data) {
				if (data.field === 'f-email') {
					$setEmail.find('.time-count').attr('disabled', true);
					data.fv.resetField('f-confirm-code');
				}
	        })
			.on('err.validator.fv', function(e, data) {
				data.element
					.data('fv.messages')
					.find('.help-block[data-fv-for="' + data.field + '"]').hide()
					.filter('[data-fv-validator="' + data.validator + '"]').show();
			}).on('success.form.fv', function(e) {
				e.preventDefault();

				var $form = $(e.target),
					fv = $(e.target).data('formValidation');
				//bound Email
				$.ajax({
					url: $form[0].action,
					type: 'POST',
					//Content-Type:text/html; charset=utf-8,
					data: {
						'account': $form.find('.f-email').val(),
						'randomNum': $form.find('.f-confirm-code').val()
					},
					success: function(result) {
						if (result == "success") {
							CKF.notify({
								type: 'next-active',
								data: null
							});

							$form.slideUp('fast');
							$setSuccess.slideDown('fast');
							$close.remove();
						} else if (result == "wrongCaptcha") {
							fv
								.updateMessage('f-confirm-code', 'blank', __('Wrong confirm code'))
								.updateStatus('f-confirm-code', 'INVALID', 'blank');
							updateCaptcha($form);
						} else {
							alert(__("Unknown error"));
						}
					}
				});
			});

			//---------------------------------------------------------------------------------------

			// 手机设置
			var $mobileNum;
			module.find('.time-count').attr('disabled', true);

			// Define new validator
			FormValidation.Validator.intPhoneNumber = {
				html5Attributes: {
					message: 'message',
					autoplaceholder: 'autoPlaceholder',
					preferredcountries: 'preferredCountries',
					utilsscript: 'utilsScript'
				},

				init: function(validator, $field, options) {
					// Determine the preferred countries
					var autoPlaceholder = options.autoPlaceholder === true || options.autoPlaceholder === 'true',
						preferredCountries = options.preferredCountries || 'us';
					if ('string' === typeof preferredCountries) {
						preferredCountries = preferredCountries.split(',');
					}

					// Attach the intlTelInput on field
					$field.intlTelInput({
						utilsScript: options.utilsScript || '',
						autoPlaceholder: autoPlaceholder,
						preferredCountries: preferredCountries
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

					validator.getForm().off('click.country.intphonenumber');
				},

				validate: function(validator, $field, options) {
					return $field.val() === '' || $field.intlTelInput('isValidNumber');
				}
			};

			$setMobile.formValidation({
				framework: 'bootstrap',
				icon: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
				},
				fields: {
					'f-phone': {
						selector: '#security-mobile-bind-form .f-phone',
						validators: {
							notEmpty: {
								message: __('Please input the mobile number you wanna to bind')
							},
							intPhoneNumber: {
								utilsScript: '/CKF/js/libs/intl_tel/utils.js',
								autoPlaceholder: true,
								preferredCountries: 'cn,us,vn',
								message: __('The phone number is not valid')
							},
							callback: {
								message: __('Please input the mobile number you wanna to bind'),
								callback: function(value, validator, $field) {
									$mobileNum = $field.intlTelInput("getNumber");
									if ($field.closest('.form-group').hasClass('has-error')) {
										$setMobile.find('.time-count').attr('disabled', true);
									} else {
										$setMobile.find('.time-count').attr('disabled', false);
									}
									if (value === '') {
										return false;
									}
									return true;
								}
							}
						}
					},
					'f-confirm-code': {
						selector: '#security-mobile-bind-form .f-confirm-code',
						validators: {
							notEmpty: {
								message: __('Please input verify code you got')
							},
							stringLength: {
								min: 4,
								max: 9,
								message: __('Wrong verify code length')
							},
							callback: {
								message: __('Please input verify code you got'),
								callback: function(value, validator, $field) {
									$confirmCode = value;
									if (value === '') {
										return false;
									}
									return true;
								}
							},
							blank: {
								message: '_'
							}
						}
					}
				}
			})
			.on('click', '.time-count', function() {
				var $this = $(this);
				$.ajax({
					url: "/cooka-user-web/center/sendPhoneRandNum",
					type: 'POST',
					data: {
						phone: $mobileNum
					},
					success: function(result) {
						if (result == "success") {
							CKF.notify({
								type: 'use-take-count',
								data: $this
							});
							$this.closest('.form-group').find('input').removeAttr('disabled');
						} else if (result == "frequently") {
							alert(__("Frequent Operation"));
						} else {
							alert(__("Send Failed"));
						}
					}
				});
			})
			.on('err.validator.fv', function(e, data) {
				data.element
					.data('fv.messages')
					.find('.help-block[data-fv-for="' + data.field + '"]').hide()
					.filter('[data-fv-validator="' + data.validator + '"]').show();
			}).on('success.form.fv', function(e) {
				e.preventDefault();

				var $form = $(e.target),
					fv = $(e.target).data('formValidation');
				var intlNumber = $form.find('.f-phone').intlTelInput("getNumber");
				//bound Phone
				$.ajax({
					url: $form[0].action,
					type: 'POST',
					//Content-Type:text/html; charset=utf-8,
					data: {
						account: $mobileNum,
						randomNum: $confirmCode
					},
					success: function(result) {
						if (result == "success") {
							CKF.notify({
								type: 'next-active',
								data: null
							});

							$form.slideUp('fast');
							$setSuccess.slideDown('fast');
							$close.remove();
						} else if (result == "wrongCaptcha") {
							fv
								.updateMessage('f-confirm-code', 'blank', __('Wrong confirm code'))
								.updateStatus('f-confirm-code', 'INVALID', 'blank');
							updateCaptcha($form);
						} else {
							alert(__("Unknown error"));
						}
					}
				});
			});


			//-------------------------------------------------------------------------------------

			// 密保设置
			module.find('.btn-check').on('click', function() {
				var $resetQuestionArea = module.find('.security-question-form-area');
				var $resetQuestionConfirm = module.find('.security-question-confirm');
				var $formSuccessField = $resetQuestionArea.find('.has-success');
				if ($formSuccessField.length === 6) {
					module.find('#validateButton').removeClass('disabled');
					module.find('#validateButton').attr('disabled', false);

					var $questionString = $resetQuestionArea.find("option:selected").text();
					var questionArray = $questionString.split("?");
					var $answerList = $resetQuestionArea.find('.f-answer');
					var answerArray = [];
					for (var i = 0; i < $answerList.length; i++) {
						answerArray[i] = $answerList[i].value;
					}

					var $tableQuestion = $resetQuestionConfirm.find('tbody tr').find('td:nth-child(even)');
					var $tableAnswer = $resetQuestionConfirm.find('tbody tr').find('td:nth-child(odd)');

					$tableQuestion.map(function(index, elem) {
						return $(elem).text(questionArray[index]);
					});

					$tableAnswer.map(function(index, elem) {
						return $(elem).text(answerArray[index]);
					});

					$resetQuestionArea.slideUp('fast');
					$resetQuestionConfirm.slideDown('fast');
				} else {
					alert(__('Please finish the form first'));
				}

				$('.btn-return').on('click', function() {
					$resetQuestionConfirm.slideUp('fast');
					$resetQuestionArea.slideDown('fast');
				});
			});

			var $nowSlected = []; // 记录现在的选择
			var $oldSelected = []; // 记录旧的选择
			var $selected = []; // 记录已经选择的选择

			function updateNowSel() {
				var $allSel = $setQuestion.find('select');
				$allSel.each(function(index, el) {
					$nowSlected[index] = this.selectedIndex;
				});
			}

			updateNowSel(); // 初始化现在的选择

			$setQuestion.formValidation({
					framework: 'bootstrap',
					icon: {
						valid: 'glyphicon glyphicon-ok',
						invalid: 'glyphicon glyphicon-remove',
						validating: 'glyphicon glyphicon-refresh'
					},
					fields: {
						'f-problem': {
							selector: '#security-question-form .f-problem',
							validators: {
								notEmpty: {
									message: __('Please select a question')
								},
								callback: {
									message: __('You had selected this question or you do not select the question'),
									callback: function(value, validator, $field) {
										var $new = $field[0].selectedIndex;

										if ($new === 0) {
											updateNowSel();
											return false;
										} else {
											if ($.inArray($new, $nowSlected) >= 0) {
												updateNowSel();
												return false;
											} else {
												updateNowSel();
												return true;
											}
										}
									}
								}
							}
						},
						'f-answer': {
							selector: '#security-question-form .f-answer',
							validators: {
								notEmpty: {
									message: __('Please answer the question')
								},
								stringLength: {
									max: 50,
									min: 3,
									message: __('The answer should no longer than %s,but more than %s')
								}
							}
						}
					}
				})
				.on('click', '.f-problem', function() {
					var $dataId = $(this).data('id');
					$oldSelected[$dataId] = this.selectedIndex;
				})
				.on('err.validator.fv', function(e, data) {
					data.element
						.data('fv.messages')
						.find('.help-block[data-fv-for="' + data.field + '"]').hide()
						.filter('[data-fv-validator="' + data.validator + '"]').show();
				})
				.on('success.form.fv', function(e) {
					e.preventDefault();

					var $form = $(e.target),
						fv = $(e.target).data('formValidation');

					$.ajax({
						url: $form[0].action,
						type: 'POST',
						//Content-Type:text/html; charset=utf-8,
						data: $form.serialize(),
						success: function(result) {
							if (result == "success") {
								CKF.notify({
									type: 'next-active',
									data: null
								});
								$form.slideUp('fast');
								$close.remove();
								$setSuccess.slideDown('fast');
							} else {
								alert(__("Unknown error"));
							}
						}
					});
				});

		}
	};
})();
