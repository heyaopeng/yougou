var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'); 

require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');

require('./p_take_count.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

$(document).ready(function() {
    $('.time-count').on('click', function() {
        //var $mobileNumGet = "tele="+15626139118;
        var $mobileNumGet = "tele=" + $('.get-mobile-num').val();
        if ($mobileNumGet.length === 16) {
            $.ajax({
                type: "post",
                url: "/cooka-user-web/center/getNumToSet.do",
                data: $mobileNumGet,
                dataType: "html",
                async: true,
                success: function(data) {
                    if (data == "success") {
                        $('.time-count').takeCount();
                    } else {
                        alert(__("Frequent request"));
                    }

                }
            });
        } else {
            alert(__("The mobile number can not be empty"));
        }
    });

    // mobile input formvalidation
    $('#mobileInputForm')
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
            'password': {
                selector: '.f-password',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The password is required and cannot be empty',
                            zh_CN: '验证码不能为空'
                        }
                    },
                    stringLength: {
                        min: 6,
                        max: 36,
                        message: {
                            en_US: 'The password need more than 6 characters long but less than 30',
                            zh_CN: '密码长度要大于6但是要小于30'
                        }
                    }
                }
            }
        }
    })
    .on('success.field.fv', function(e, data) {
        if (data.fv.getInvalidFields().length > 0) { // There is invalid field
            data.fv.disableSubmitButtons(true);
        }
    })
    .on('err.validator.fv', function(e, data) {
        data.element
            .data('fv.messages')
            .find('.help-block[data-fv-for="' + data.field + '"]').hide()
            .filter('[data-fv-validator="' + data.validator + '"]').show();
    });
    $('#mobileInputForm').formValidation('setLocale', lang);

    // bound mobile form formvalidation
    $('#boundMobileForm')
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
            'phone': {
                selector: '.f-mobile',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The mobile number is required and cannot be empty',
                            zh_CN: '手机号码不能为空'
                        }
                    },
                    numeric: {
                        message: {
                            en_US: 'The mobile number must be the number',
                            zh_CN: '手机号码必须为数字'
                        }
                    },
                    stringLength: {
                        min: 11,
                        max: 11,
                        message: {
                            en_US: 'The input is not a valid mobile number',
                            zh_CN: '请输入正确的手机号码'
                        }
                    }

                }
            },
            'confirm_code': {
                selector: '.f-confirm_code',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The verification code is required and cannot be empty',
                            zh_CN: '校验码不能空'
                        }
                    },
                    stringLength: {
                        min: 6,
                        max: 6,
                        message: {
                            en_US: 'The verification code must be 6 characters long',
                            zh_CN: '验证码长度为6'
                        }
                    }
                }
            }
        }
    })
    .on('success.field.fv', function(e, data) {
        if (data.fv.getInvalidFields().length > 0) { // There is invalid field
            data.fv.disableSubmitButtons(true);
        }
    })
    .on('err.validator.fv', function(e, data) {
        data.element
            .data('fv.messages')
            .find('.help-block[data-fv-for="' + data.field + '"]').hide()
            .filter('[data-fv-validator="' + data.validator + '"]').show();
    });
    $('#boundMobileForm').formValidation('setLocale', lang);
});