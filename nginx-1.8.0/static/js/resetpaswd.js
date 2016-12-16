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
    
    var locationHref = window.location.href,
	tailHref = locationHref.substring(locationHref.length-15, locationHref.length);

    if(tailHref === 'doresetpaswd.do'){
    	$('#resetPaswdForm').find('.m-error').removeClass('hide');
    }
    
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
    $('#resetPaswdForm')
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
                            zh_CN: '密码长度大于6小于30'
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
                            en_US: 'The captcha length is require',
                            zh_CN: '验证码长度限制'
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
