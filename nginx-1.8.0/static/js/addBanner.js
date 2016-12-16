var getCookie = require('./getCookie.js');
var lang = getCookie('language');

require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');

require('./p_btn_file.js');
require('./p_checkbox_group.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

$(document).ready(function() {

	$('#up').change(function() {
		if (this.files && this.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$('#view-img').attr('src', e.target.result);
			};
			reader.readAsDataURL(this.files[0]);
		}
	});

	$('.btn-file').btnFile();
	$('#banner-edit')
		.formValidation({
			framework: 'bootstrap',
			icon: {
				valid: 'glyphicon glyphicon-ok',
				invalid: 'glyphicon glyphicon-remove',
				validating: 'glyphicon glyphicon-refresh'
			},
			addOns: {
				i18n: {}
			},
			fields: {
				'title': {
					selector: '.title',
					validators: {						
						notEmpty: {
							message:{
	                            en_US: 'The content is required',
	                            zh_CN: '标题不能为空'
                        	}
						},
						stringLength: {
							max: 255,
							message: {
	                            en_US: 'The length of the title exceeds the limit',
	                            zh_CN: '标题长度超过限制'
                        	}
						}
					}
				},

				'position': {
					selector: '.position',
					validators: {
						notEmpty: {							
							message:{
	                            en_US: 'The content is required',
	                            zh_CN: '位置不能为空'
                        	}
						},
						between: {
							min: 0,
                			max: 65535,                    							
							message: {
	                            en_US: 'The content must be %s to %s characters',
	                            zh_CN: '位置必须在%s到%s之间'
                        	}
                		},
	                    integer: {	                    							
							message:{
	                            en_US: 'Please enter a valid number',
	                            zh_CN: '请输入有效数字'
                        	}
	                    }
					}
				},
				'file': {
					selector: '.btn-file-item',
	                validators: {
	                    file: {
	                    	extension:'jpeg,jpg,png,gif,bmp',
	                        type: 'image/jpeg,image/png,image/gif,image/x-ms-bmp',                    							
							message:{
	                            en_US: 'The file must be jpeg,jpg,png,gif or bmp',
	                            zh_CN: '图片不能为空'
                        	}
	                    },
	                    notEmpty: {	                    							
							message:{
	                            en_US: 'The content is required',
	                            zh_CN: '图片不能为空'
                        	}
	                    }
	                },
	                onError:function(){
	                	$('#up').val('');
	                }
	            },
				'url': {
					selector: '.url',
					validators: {
						uri: {							                   							
							message:{
	                            en_US: 'Please enter a valid URL',
	                            zh_CN: '请输入有效链接'
                        	}
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
	$('#banner-edit').formValidation('setLocale',lang);
});