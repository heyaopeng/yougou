var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'); 

require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');

require('./p_pw_strength.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

$(document).ready(function() {
    // financial-resetPasswordForm (jiangyin)
    $('#financial-resetPasswordForm').find('.pw-in').pwStrength();
    $('#financial-resetPasswordForm').formValidation({
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
                            en_US: 'The password is required and cannot be empty',
                            zh_CN: '密码不能为空'
                        }
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: {
                            en_US: 'The password must be more than 6 and less than 30 characters long',
                            zh_CN: '密码长度要大于6并且小于30个'
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
            "confirmPassword": {
                selector: '.f-confirmPassword',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The confirm password is required and cannot be empty',
                            zh_CN: '重复密码不能为空'
                        }
                    },
                    identical: {
                        message: {
                            en_US: 'The password and its confirm are not the same',
                            zh_CN: '输入的密码要一致'
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
            }
        }
    })
    .on('err.validator.fv', function(e, data) {
        data.element
            .data('fv.messages')
            .find('.help-block[data-fv-for="' + data.field + '"]').hide()
            .filter('[data-fv-validator="' + data.validator + '"]').show();
    });
    $('#financial-resetPasswordForm').formValidation('setLocale', lang);
    
    // reset password form formvalidation
    $('#resetPasswordForm')
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
                            en_US: 'The password is required and cannot be empty',
                            zh_CN: '密码不能为空'
                        }
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: {
                            en_US: 'The password must be more than 6 and less than 30 characters long',
                            zh_CN: '密码长度要大于6并且小于30个'
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
            "confirmPassword": {
                selector: '.f-confirmPassword',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The confirm password is required and cannot be empty',
                            zh_CN: '重复密码不能为空'
                        }
                    },
                    identical: {
                        message: {
                            en_US: 'The password and its confirm are not the same',
                            zh_CN: '输入的密码要一致'
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
            }
        }
    }).on('err.validator.fv', function(e, data) {
        data.element
        .data('fv.messages')
        .find('.help-block[data-fv-for="' + data.field + '"]').hide()
        .filter('[data-fv-validator="' + data.validator + '"]').show();
});
    $('#resetPasswordForm').formValidation('setLocale', lang);
});
