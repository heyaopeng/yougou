var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'); // 默认返回 en_US
//require('./js/libs/jquery-1.11.2.min.js') // you should not see me
require('./libs/bootstrap.min.js');


require('./libs/jquery.form.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');


require('./ck_lang.js');

/*withdrawals_index*/
$(document).ready(function() {
    $('#loan-return-form').formValidation({
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        addOns: {
            i18n: {}
        },
        fields: {
            'f-actual-return': {
                selector: '.f-actual-return',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The amount is required',
                            zh_CN: '金额不能为空'
                        }
                    },
                    regexp: {
                        regexp: /^\d{0,8}(\.\d{1,4})?$/,
                        message: {
                            en_US: 'Please enter the correct amount. eg. xxx or xxx.xx!',
                            zh_CN: '请输入正确的金额格式.例如.xxx或xxx.xx!'
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
    $('#loan-return-form').formValidation('setLocale', lang);
});
