var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'); 

require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');

$(document).ready(function() {
    $('.link-fresh-captcha').on('click', function(){
    	event.preventDefault();
    	$('#captchaImage').hide().attr('src', '/cooka-user-web/captchaImage.do?' + Math.floor(Math.random() * 100)).fadeIn();
    	event.cancelBubble = true;
    });

    $(function() {
        $('#captchaImage').click(function() {
            $(this).hide().attr('src', '/cooka-user-web/captchaImage.do?' + Math.floor(Math.random() * 100)).fadeIn();
            event.cancelBubble = true;
        });
    });

    var locationHref = window.location.href,
    	tailHref = locationHref.substring(locationHref.length-7, locationHref.length);
    
    if(tailHref === 'dologin'){
    	$('#login-form').find('.m-error').removeClass('hide');
    }
    // login form formvalidation
    $('#login-form')
    .formValidation({
        framework: 'bootstrap',
        verbose: false,
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        addOns: {
            i18n: {}
        },
        fields: {
            "email": {
                selector: '.f-email',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'Please enter your email',
                            zh_CN: '请输入你的邮箱地址'
                        }
                    },
                    emailAddress: {
                        message: {
                            en_US: 'The input is not a valid email address',
                            zh_CN: '输入的不是有效邮箱'
                        }
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: {
                            en_US: 'Email length more than 6 less than 30',
                            zh_CN: '邮箱长度大于6小于30'
                        }
                    },
                    callback: {
                        callback: function(value, validator, $field) {
                            $.get('/cooka-user-web/isNeedCaptcha.do', {
                                "email": value
                            }, function(data) {
                                if (data) {
                                    $('#captcha-block').removeClass('hide');
                                }
                            });
                            return true;
                        }
                    }

                }
            },
            "password": {
                selector: '.f-password',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'Please enter your password',
                            zh_CN: '请输入你的密码'
                        }
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: {
                            en_US: 'Password length more than 6 but less than 30',
                            zh_CN: '密码长度大于6但是小于30'
                        }
                    },
					regexp: {
						regexp: /^[^\s]*$/,
						message: {
							en_US: 'Password can not contain space',
							zh_CN: '密码不能含有空格'
						}
					}
                }
            },
            "captcha": {
                selector: '.f-captcha',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'Please input captcha',
                            zh_CN: '请输入验证码'
                        }
                    },
                    stringLength: {
                        min: 4,
                        max: 4,
                        message: {
                            en_US: 'The captcha length is required',
                            zh_US: '验证码长度限制'
                        }
                    }
                }
            }
        }
    }).on('err.validator.fv', function(e, data) {
        data.element
            .data('fv.messages')
            .find('.help-block[data-fv-for="' + data.field + '"]').hide()
            .filter('[data-fv-validator="' + data.validator + '"]').show();
    });
    $('#login-form').formValidation('setLocale', lang);
});