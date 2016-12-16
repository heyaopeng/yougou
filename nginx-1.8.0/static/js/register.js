var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'); 

require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

$(document).ready(function() {
	$('.link-fresh-captcha').on('click', function(){
    	event.preventDefault();
        $('#captchaImage').hide().attr('src', '/cooka-user-web/captchaImage.do?' + Math.floor(Math.random() * 100)).fadeIn();
        event.cancelBubble = true;
        return false;
    });

    $(function() {
        $('#captchaImage').click(function() {
            $(this).hide().attr('src', '/cooka-user-web/captchaImage.do?' + Math.floor(Math.random() * 100)).fadeIn();
            event.cancelBubble = true;
        });
    });
    
    $('.check-email').on('click', function() {
        var getEmailAddress = $('.verification-email').find('span:last-child').text();
        var getStringLength = getEmailAddress.length;
        var stringStart = getEmailAddress.indexOf('@'); //从0开始
        var emailSuffix = getEmailAddress.substring(stringStart + 1, getStringLength);
        var addToLink = function(string) {
            $('.appr-complete-tip').find('a').attr('href', string);
        };
        switch (emailSuffix) {
            case 'hotmail.com':
                addToLink('http://www.hotmail.com');
                break;
            case '163.com':
                addToLink('http://mail.163.com');
                break;
            case 'gmail.com':
                addToLink('http://www.gmail.google.com');
                break;
            case 'qq.com':
                addToLink('http://mail.qq.com');
                break;
            case '126.com':
                addToLink('http://mail.126.com');
                break;
            case 'yeah.net':
                addToLink('http://www.yeah.net');
                break;
            case 'sina.com':
                addToLink('http://mail.sina.com.cn');
                break;
            case 'vip.sina.com':
                addToLink('http://mail.sina.com.cn');
                break;
            case 'sohu.com':
                addToLink('http://mail.sohu.com');
                break;
            case '139.com':
                addToLink('http://mail.10086.cn');
                break;
            default:
                $('.email-link').popover();
        }
    });
	
	// register form formvalidation
    $('#register-form')
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
            "email": {
                selector: '.f-email',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'Please enter your email',
                            zh_CN: '请输入邮箱地址'
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
                    regexp: {
                        regexp: /^[a-z0-9][-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
                        message: {
                            en_US: 'Invalid Email',
                            zh_CN: '无效邮箱'
                        }
                    },
                    remote: {
                        message: {
                            en_US: 'Account is already exist',
                            zh_CN: '账号已经存在'
                        },
                        url: "/cooka-user-web/isExistEmail",
                        type: 'GET',
                        delay: 2000
                    }
                }
            },
            "password": {
                selector: '#register-form .f-password',
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
							en_US: 'Password length more than %s but less than %s',
							zh_CN: '密码长度必须大于 %s 且小于 %s'
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
            "repetpassword": {
                selector: '.f-repetpassword',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The confirm password is required and can not be empty',
                            zh_CN: '确认密码不能为空'
                        }
                    },
                    identical: {
                        field: 'password',
                        message: {
                            en_US: 'The password and its confirm are not the same',
                            zh_CN: '密码不一致'
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
                            zh_CN: '验证码长度限制'
                        }
                    }
                }
            },
            "agree": {
                selector: '.f-agree',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'You must agree the terms and conditions',
                            zh_CN: '你必须同意协议'
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
    $('#register-form').formValidation('setLocale', lang);
});