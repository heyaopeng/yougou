var CKF = require('./CKF.js');
var getCookie = require('./getCookie.js');
var lang = getCookie('language'); 

require('../less/refund-awb-form.less');
require('bootstrap/js/modal.js');

require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
// require('./libs/FV/i18n.min.js');

module.exports = (function() {
	var moduleName = 'refundAwbForm';
	var module = CKF.create(moduleName);

	return {
		init: function() {
			module
	        	.formValidation({
					icon : {
						valid : 'glyphicon glyphicon-ok',
						invalid : 'glyphicon glyphicon-remove',
						validating : 'glyphicon glyphicon-refresh'
					},
					// addOns : {
					// 	i18n : {}
					// },
					fields : {
						'f-company' : {
							selector : '.f-company',
							validators : {
								notEmpty : {							
			                        message: __('The content is required')
								}
							}
						},
						'f-awb' : {
							selector : '.f-awb',
							validators : {
								notEmpty : {
									message: __('The content is required')
								},
								regexp : {
									regexp : /^(\d+(?:\.\d{2})?)$/,
									message : __('Please enter a valid amount')
								}
							}
						},
						'file': {
							selector: '.f-file',
			                validators: {
			                    file: {
			                    	extension:'jpeg,jpg,png,gif,bmp',
			                        type: 'image/jpeg,image/png,image/gif,image/x-ms-bmp', 
			                        maxSize: 2000000,                   							
									message:__('The file must be images which is smaller than 2 MB in size'),
			                    }
			                }
			            },
						'f-illustration': {
							selector: '.f-illustration',
			                validators: {
			                    stringLength: {			                        	                            							
			                        message:__('Can type 200 words'),
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
				$('.js-validate-btn').on('click',function(){
					module.data('formValidation').validate();
					var $button = module.data('formValidation').getSubmitButton();
					if(module.data('formValidation').isValid()){
						$('#refund-awb-submit-modal').modal('show');
					}
				});
				$('.js-submit').on('click',function(){
					module[0].submit();
				});
			}

	};
})();