var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE');

require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

$(document).ready(function() {
    $('#change-pwd-form').formValidation({
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
            'f-oldPwd': {
                selector: '#change-pwd-form .f-oldPwd',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'Please enter your password',
                            zh_CN: '请输入你的密码'
                        }
                    },
                    blank: {
                    	message: '_'
                    }
                }
            },
            'f-newPwd': {
                selector: '#change-pwd-form .f-newPwd',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'Please enter your new password',
                            zh_CN: '请输入你的新密码'
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
					},
                    blank: {
                    	message: '_'
                    }
                }
            },
            'f-confirm-newPwd': {
                selector: '#change-pwd-form .f-confirm-newPwd',
                validators: {
                    identical: {
                        field: 'f-newPwd',
                        message: {
                            en_US: 'The password and its confirm are not the same',
                            zh_CN: '密码不一致'
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
    })
    .on('success.form.fv', function(e) {
        e.preventDefault();

        var $form = $(e.target),
            fv = $form.data('formValidation');

        // For demonstrating purpose, the url is generated randomly
        // to get different response each time
        // In fact, it should be /path/to/your/back-end/
        var url = 'doUpdateMyPwd';

        $.ajax({
            url: url,
            type: 'POST',
            data: $form.serialize(),
        }).success(function(data) {
            // If there is error returned from server
            if (data === 'success') {
                location.href = '/cooka-backend-web/admin';
            } else {
                fv
                    .updateMessage('f-oldPwd', 'blank', __("Old password is wrong"))
                    .updateStatus('f-oldPwd', 'INVALID', 'blank');
            }
        });
    });
    $('#change-pwd-form').formValidation('setLocale', lang);
});
