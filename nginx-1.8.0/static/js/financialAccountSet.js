var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'); // 默认返回 en_US
//require('./js/libs/jquery-1.11.2.min.js') // you should not see me
require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');
require('./p_pw_strength.js');
require('./ck_sidebar.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

$(document).ready(function () {
        $accountForm=$('#account-form ');
        $accountForm.find('.pw-in').pwStrength();
        $accountForm
                .formValidation({
                    framework: 'bootstrap',
                    addOns: {
                        i18n: {}
                    },
                    icon: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
                    fields: {
                        'f-payment-password': {
                            selector: '.f-payment-password',
                            validators: {
                                notEmpty: {
                                    message: {
                                        en_US: 'The password is required and cannot be empty' ,
                                        zh_CN: '密码不能为空'
                                    }
                                },
                                stringLength: {
                                    min: 6,
                                    max: 30,
                                    message:
                                    {
                                        en_US: 'Please enter value between %s and %s characters long',
                                        zh_CN: '请输入长度在%s到%s范围内的值'
                                    }
                                },
                                regexp: {
                                    regexp: /^(?:\d+|[a-zA-Z]+|[!@#$\[\]\|\/\+\=\\\~\`{}:;"'<>,.?%^&*()_-]+)+$/,
                                    message: {
                                        en_US: 'The password can only consist of alphabetical, number and Special character',
                                        zh_CN: '密码只能由字母,数字和特殊字符组成'
                                    }
                                }
                            }
                        },
                        'f-retype-password': {
                            selector: '.f-retype-password',
                            validators: {
                                notEmpty: {
                                    message: {
                                        en_US: 'The confirm password is required and cannot be empty',
                                        zh_CN: '确认密码不能为空'
                                    }
                                },
                                identical: {
                                    field: 'f-payment-password',
                                    message: {
                                        en_US: 'The password and its confirm are not the same',
                                        zh_CN: '密码和确认密码必须一致'
                                    }
                                }
                            }
                        },
                    }
                })
                .on('err.validator.fv', function(e, data) {
                    data.element
                            .data('fv.messages')
                            .find('.help-block[data-fv-for="' + data.field + '"]').hide()
                            .filter('[data-fv-validator="' + data.validator + '"]').show();
                });
        $accountForm.formValidation('setLocale', lang);
    });