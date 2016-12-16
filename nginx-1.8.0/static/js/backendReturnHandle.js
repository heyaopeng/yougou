var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'); 
var currencyConfig = require('./currencyConfig.js');
require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');

require('./p_btn_file.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

$(document).ready(function() {
	$('.f-isallow').on('change',function(){
			if($(this).val().toString()==='0'){
				$('.cost-group').addClass('hidden');
				$('.reason-group').removeClass('hidden');
			}else{
				$('.cost-group').removeClass('hidden');
				$('.reason-group').addClass('hidden');
			}
		});
	$('#up-img').change(function() {
		if (this.files && this.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$('#view-img').attr('src', e.target.result);
			};
			reader.readAsDataURL(this.files[0]);
		}
	});
	$('.refuse-refund').click(function() {
		$(this).addClass('hidden');
		$('#refuse-form').slideDown();
	});

	$('.btn-file').btnFile();
	$('#refuse-form').formValidation({
		icon : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		addOns : {
			i18n : {}
		},
		fields : {
			'f-abc' : {
				selector : '.f-reason',
				validators : {
					notEmpty : {
						message : ' '
					}
				}
			}
		}
	}).on(
		'err.validator.fv',
		function(e, data) {
			data.element.data('fv.messages').find('.help-block[data-fv-for="' + data.field + '"]')
					.hide().filter('[data-fv-validator="' + data.validator + '"]').show();
		});
	$('#refuse-form').formValidation('setLocale', lang);
	$('.close').click(function() {
		$('#refuse-form').data('formValidation').resetForm(true);
		$('#refuse-form').slideUp();
		$('.refuse-refund').removeClass('hidden');
	});

	$('.refuse-application-form').formValidation({
			icon : {
				valid : 'glyphicon glyphicon-ok',
				invalid : 'glyphicon glyphicon-remove',
				validating : 'glyphicon glyphicon-refresh'
			},
			addOns : {
				i18n : {}
			},
			fields : {
				'f-reason' : {
					selector : '.f-reason',
					validators : {
						notEmpty : {							
	                        message:{
	                            en_US: 'The content is required',
	                            zh_CN: '内容不能为空'
	                        }
						}
					}
				},
				'f-isallow' : {
					selector : '.f-isallow',
					validators : {
						notEmpty : {							
	                        message:{
	                            en_US: 'The content is required',
	                            zh_CN: '内容不能为空'
	                        }
						}
					}
				},
				'f-illustration': {
					selector: '.f-illustration',
	                validators: {
	                    stringLength: {
	                        	                            							
	                        message:{
	                            en_US: 'Can type 200 words',
	                            zh_CN: '最多200字符'
	                        },
	                        max: 200
	                    }
	                }
	            },
	            'f-money' : {
					selector : '.f-money',
					validators : {
						notEmpty : {							
	                        message:__('The content is required')
						},
						between : {
							min : 0,
							max : $('.f-money').data('max'),
							message : __('Please enter a valid amount')
						},
						regexp : {
							regexp: new RegExp("^[0-9]+(\.[0-9]{" + currencyConfig + "})?$"),
							message : __('Please enter a valid amount')
						}
					}
				}
			}
		}).on(
			'err.validator.fv',
			function(e, data) {
				data.element.data('fv.messages').find('.help-block[data-fv-for="' + data.field + '"]')
						.hide().filter('[data-fv-validator="' + data.validator + '"]').show();
			});

		$('.refuse-application-form').formValidation('setLocale', lang);
});