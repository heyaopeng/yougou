var CKF = require('./CKF.js');
require('../less/m-bas-sign.less');
// other dependencies ...
var getCookie = require('./getCookie.js');
var lang = getCookie('language');

// form validation
require('../css/formValidation.min.css');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');

require('../css/intlTelInput.css');
require('./libs/intl_tel/intlTelInput.min.js');

module.exports = (function() {
	var moduleName = 'mBasSign';
	var module = CKF.create(moduleName);

	function supportLocalStorage() {
		try {
			return 'localStorage' in window && window.localStorage !== null;
		} catch (e) {
			return false;
		}
	}

	function stringToCode(str) {
		var max = str.length;
		var codes = 'u';
		for (var i = 0; i < max; i++) {
			codes += str.charCodeAt(i);
		}
		return codes;
	}

	return {
		init: function() {

			module.on('click', '.sign-switch-tab-item', function() {
				var $this = $(this);
				if ($this.hasClass('active')) {
					return;
				}

				var sw = $this.data('switch');
				$this.addClass('active').siblings().removeClass('active');

				module.find('.sign-switch-target.active').removeClass('active').find('input[name="account"]').prop('disabled', true);
				module.find('#' + sw).addClass('active').find('input[name="account"]').prop('disabled', false);
			});

			FormValidation.Validator.intPhoneNumber = {
				init: function(validator, $field, options) {
					// Attach the intlTelInput on field
					$field.intlTelInput({
						utilsScript: '/CKF/js/libs/intl_tel/utils.js',
						autoPlaceholder: true,
						onlyCountries: ['cn', 'vn']
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

			$('#m-bas-sign-in-form').formValidation({
				framework: 'bootstrap',
				icon: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh spin'
				},
				fields: {
					"f-email": {
						selector: '#m-bas-sign-in-form .f-email',
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
						selector: '#m-bas-sign-in-form .f-mobile',
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
						selector: '#m-bas-sign-in-form .f-password',
						validators: {
							notEmpty: {
								message: __('Please enter your password')
							},
							stringLength: {
								max: 32,
								message: __('Password is too long')
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

				if (supportLocalStorage()) {
					localStorage.setItem('ucode', stringToCode($form.find('input[name="account"]').val()));
				}
				fv.defaultSubmit();
			});
		}
	};
})();