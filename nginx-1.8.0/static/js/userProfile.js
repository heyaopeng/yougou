var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'); 

require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');

require('./ck_sidebar.js');
require('./p_take_count.js');
require('./p_address_group.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

$(document).ready(function() {	
    $('.time-count').on('click', function(){
    	$(this).attr('disabled', true);
    	$('.time-count').takeCount();
    	var $thisVal = $('.f-user-phone').val();
    	var $mobileNumGet = "tele=" + $thisVal;
		$.ajax({
            type: "post",
            url: "/cooka-user-web/center/getNumToSet.do",
            data: $mobileNumGet,
            dataType: "html",
            async: true,
            success: function(data) {
                if (data == "success") {
                	$('.f-captcha').attr('disabled',false);
                } else {
                	$('.f-captcha').attr('disabled',false);
                }
            }
        });
    });
    
    $('.address-group').addressGroup();

    $(".account-protect").find(".table ").find("tr > td.pass").find('span').addClass('passColor');

    var $getTel = $('.getTel').text();	// get telphone;
    
    // buyer Basic information edit
    $('.basic-message-edit').on('click', function() {
        $('.basic-message-preview').slideUp('fast');
        $('#basicMessageForm').slideDown('fast');
    });

    $('.b-basic-cancel').on('click', function() {
    	// 本地: 进行页面跳转
    	// window.location.href = 'http://localhost:8085/cooka-user-web/center/profile';
    	
    	// 远程: 进行页面跳转
    	window.location.href = '/cooka-user-web/center/profile';
    	
    	// 不进行页面跳转：
    	// $('#basicMessageForm')..data('formValidation').resetForm();
        // $('#basicMessageForm').slideUp('fast');
        // $('.basic-message-preview').slideDown('fast');
    });

    // buyer Basic information form formvalidation
    $('#basicMessageForm').formValidation({
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
            'f-user-name': {
                selector: '.f-user-name',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'You name is required',
                            zh_CN: '名字不能为空'
                        }
                    }
                }
            },
            'f-user-sex': {
                selector: '.f-user-sex',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'Sex is required',
                            zh_CN: '性别不能为空'
                        }
                    }
                }
            },
            'f-user-phone': {
            	enabled: false,
                selector: '.f-user-phone',
                validators: {
                    stringLength: {
                    	min: 11,
                    	max: 11,
                    	message: {
                    		en_US: 'The phone number length limit',
                    		zh_CN: '电话号码长度限制'
                    	}
                    },
                    regexp: {
                        message: {
                        	en_US: 'The phone number can only contain the digits, spaces, -, (, ), + and .',
                        	zh_CN: '请正确填写电话号码'
                        },
                        regexp: /^[0-9\s\-()+\.]+$/
                    }
                }
            },
            'captcha': {
            	enabled: false,
            	selector: '.f-captcha',
            	validators: {
                    stringLength: {
                    	max: 8,
                    	message: {
                    		en_US: 'The captcha length can not more than 8',
                    		zh_CN: '验证码长度不能超过8'
                    	}
                    },
                    remote: {
                    	message: {
                        	en_US: 'The captcha is wrong',
                        	zh_CN: '校验码错误'
                        },
                        url: '/cooka-user-web/center/isTrueCode.do',
                        type: 'POST',
                        delay: 2000
                    }
                }
            },
            'f-user-address': {
                selector: '.f-user-address',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The address detail is required',
                            zh_CN: '具体地址不能为空'
                        }
                    }
                }
            },
            'f-user-zipcode': {
                selector: '.f-user-zipcode',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'Zipcode is required',
                            zh_CN: '邮政编码不能为空'
                        }
                    },
                    stringLength: {
                        max: 15,
                        message: {
                            en_US: 'Zipcode is too loog',
                            zh_CN: '邮政编码太长'
                        }
                    }
                }
            },
            'f-country': {
                selector: '.f-country',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The country is required',
                            zh_CN: '国家不能为空'
                        }
                    }
                }
            },
            'f-state': {
                selector: '.f-state',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The state is required',
                            zh_CN: '州／省不能为空'
                        }
                    }
                }
            },
            'f-city': {
                selector: '.f-city',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The city is required',
                            zh_CN: '城市不能为空'
                        }
                    }
                }
            },
            'f-region': {
                selector: '.f-region',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The region is required',
                            zh_CN: '地区不能为空'
                        }
                    }
                }
            }
        }
    })
    .on('keyup', '.f-user-phone', function() {
        var isEmpty = $(this).val().length === 13;
        $('#basicMessageForm')
                .formValidation('enableFieldValidators', 'f-user-phone', !isEmpty)
                .formValidation('enableFieldValidators', 'captcha', !isEmpty);
        
        if(isEmpty) {
        	$('.captcha-block').hide('fast');
        }
        // Revalidate the field when user start typing in the field
        if ($(this).val().length == 1) {
            $('#basicMessageForm').formValidation('validateField', 'f-user-phone')
            					  .formValidation('validateField', 'captcha');
        }
    })
    .on('success.field.fv', function(e, data) {
    	if($('.f-user-phone').val().length === 11 && $('.f-user-phone').val() !== $getTel) {
    		if(data.field === "f-user-phone"){
        		$('.captcha-block').show('fast');
        	}
    	}
    	
        if (data.fv.getInvalidFields().length > 0) { // There is invalid field
            data.fv.disableSubmitButtons(true);
        }
    })
    .on('err.validator.fv', function(e, data) {
    	if (data.field === "f-user-phone") {
    		$('.captcha-block').hide('fast');
    	}
        data.element
            .data('fv.messages')
            .find('.help-block[data-fv-for="' + data.field + '"]').hide()
            .filter('[data-fv-validator="' + data.validator + '"]').show();
    });
    $('#basicMessageForm').formValidation('setLocale', lang);
});
