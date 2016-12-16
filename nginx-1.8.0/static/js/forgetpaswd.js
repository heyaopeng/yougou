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
	tailHref = locationHref.substring(locationHref.length-16, locationHref.length);

    if(tailHref === 'doforgetpaswd.do'){
    	$('#forgetPasswordForm').find('.m-error').removeClass('hide');
    }
    // jump to the email homepage the author register
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

    $('#forgetPasswordForm')
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
                validators: {
                    selector: '.f-email',
                    notEmpty: {
                        message: {
                            en_US: 'Please enter your email',
                            zh_CN: '请输入你的邮箱'
                        }
                    },
                    emailAddress: {
                        message: {
                            en_US: 'The input is not a valid email address',
                            zh_CN: '输入的不是一个合法的邮箱地址'
                        }
                    },
                    stringLength: {
                        min: 6,
                        max: 32,
                        message: {
                            en_US: 'Email length more than 6 less than 30',
                            zh_CN: '邮箱长度要大于6并且小于30'
                        }
                    }
                }
            },
            "captcha": {
                selector: '.f-captcha',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'Pleas input captcha',
                            zh_CN: '请输入验证码'
                        }
                    },
                    stringLength: {
                        min: 4,
                        max: 4,
                        message: {
                            en_US: 'The captcha length is require',
                            zh_CN: '验证码输入长度需求'
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
    $('#forgetPasswordForm').formValidation('setLocale', lang);
});
