var CKF = require('./CKF.js');
var getCookie = require('./getCookie.js');
var lang = getCookie('language');
var big = require('big.js/big');
var currencyConfig = require('./currencyConfig.js');

require('../less/refund-apply-form.less');

require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
// require('./libs/FV/i18n.min.js');


module.exports = (function() {
	var moduleName = 'refundApplyForm';
	var module = CKF.create(moduleName);

	return {
		init: function() {
			module
				.formValidation({
					icon: {
						valid: 'glyphicon glyphicon-ok',
						invalid: 'glyphicon glyphicon-remove',
						validating: 'glyphicon glyphicon-refresh'
					},
					/*addOns : {
						i18n : {}
					},*/
					fields: {
						'f-reason': {
							selector: '.f-reason',
							validators: {
								notEmpty: {
									message: __('The content is required')
								}
							}
						},
						'f-money': {
							selector: '.f-money',
							validators: {
								notEmpty: {
									message: __('The content is required')
								},
								between: {
									min: 1,
									max: $('.f-money').data('max'),
									message: __('Please enter a valid amount')
								},
								regexp: {
									regexp: new RegExp("^[0-9]+(\.[0-9]{" + currencyConfig + "})?$"),
									message: __('Please enter a valid amount')
								}
							}
						},
						'file': {
							selector: '.f-file',
							validators: {
								file: {
									extension: 'jpeg,jpg,png,gif,bmp',
									type: 'image/jpeg,image/png,image/gif,image/x-ms-bmp',
									maxSize: 2000000,
									message: __('The file must be images which is smaller than 2 MB in size'),
								}
							}
						},
						'f-illustration': {
							selector: '.f-illustration',
							validators: {
								stringLength: {
									message: __('Can type 200 words'),
									max: 200
								}
							}
						}
					}
				})
				.on('err.validator.fv',
					function(e, data) {
						data.element.data('fv.messages').find('.help-block[data-fv-for="' + data.field + '"]')
							.hide().filter('[data-fv-validator="' + data.validator + '"]').show();
					});

			// module.formValidation('setLocale', lang);

		}
	};
})();