var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'); 

require('./sdk.js');
require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

$(document).ready(function() {
	$('.view-span').on('click',function(){
		$('#order-detail').toggleClass('hidden');
		$('.order-procedure').toggleClass('hidden');
	});
	var url = $('#checkout-href').attr('href');
	$('#mix-pay').on('change',function(){
		if ($(this).is(':checked')){
			console.log("1");
			$('#checkout-href').prop('href',url+'&type=mix');
		}else{
			$('#checkout-href').prop('href',url);
		}
	});
	
	$('#account-pay')
			.formValidation({
				icon: {
					valid: 'fa fa-check',
					invalid: 'fa fa-times',
					validating: 'fa fa-refresh'
				},
				addOns: {
					i18n: {}
				},
				button: {
				    selector: '[type="image"]',
				    disabled: ''
				},
				fields: {
					'psw': {
						selector: '.psw',
						validators: {
							notEmpty: {
								en_US: 'The password is required and can\'t be empty',
	                            zh_CN: '密码不能为空'
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
			});

	$('#account-pay').formValidation('setLocale', lang);

	$('#other-pay')
		.formValidation({
			icon: {
				valid: 'fa fa-check',
				invalid: 'fa fa-times',
				validating: 'fa fa-refresh'
			},				
			button: {
				selector: '[type="image"]',
			    disabled: ''
			}
		});
	
});