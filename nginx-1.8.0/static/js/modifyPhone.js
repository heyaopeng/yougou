var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'); // 默认返回 en_US

//require('./js/libs/jquery-1.11.2.min.js') // you should not see me
require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

$(document).ready(function (){
    $('#updateJuriForm').formValidation({
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
            'f-juri-name': {
                selector: '.f-juri-name',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The permission name is required and can not be empty',
                            zh_CN: '不允许为空'
                        }
                    },
                    regexp: {
                        regexp: /^1[\d]{10}$/,
                        message: {
                            en_US: 'the phone number consists of 11 number and must start with 1',
                            zh_CN: '源手机号由以1开头的11位数字组成'
                        }
                    }
                }
            },
            'f-juri-string': {
                selector: '.f-juri-string',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The permission string is required and can not be empty',
                            zh_CN: '不允许为空'
                        }
                    },
                    regexp: {
                        regexp: /^1[\d]{10}$/,
                        message: {
                            en_US: 'the phone number consists of 11 number and must start with 1',
                            zh_CN: '目标手机号由以1开头的11位数字组成'
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
    }).on('success.form.fv', function(e) {
        // Prevent form submission
        e.preventDefault();
        var $form = $(e.target),
            fv = $form.data('formValidation');

        // Use Ajax to submit form data
        /*$.ajax({
            url: $form.attr('action'),
            type: 'POST',
            data: $form.serialize(),
            success: function(result) {
                // ... Process the result ...
            }
        });
*/
        // Then submit the form as usual
        fv.defaultSubmit();
    });

    $('#updateJuriForm').formValidation('setLocale', lang);
});