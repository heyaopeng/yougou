var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'); // 默认返回 en_US
//require('./js/libs/jquery-1.11.2.min.js') // you should not see me
require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');
/*recharge_index*/
$(document).ready(function() {
    $('#tpayForm').formValidation({
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        addOns: {
            i18n: {}
        },
        button: {
            // The submit buttons selector
            selector: '[type="image"]',

            // The disabled class
            disabled: ''
        },
        fields: {
            'amount': {
                selector: '.amount',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The amount is required',
                            zh_CN: '金额不能为空'
                        }
                    },
                    regexp: {
                        regexp: /^\d{0,99}(\.\d{1,2})?$/,
                        message: {
                            en_US: 'Please enter the correct amount.',
                            zh_CN: '请输入正确的金额格式.'
                        }
                    }
                }
            },
            'country': {
                selector: '.country',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The country is required',
                            zh_CN: '必须选择国家'
                        }
                    }
                }
            }
        }
    }).on('err.validator.fv', function (e, data) {
        data.element
            .data('fv.messages')
            .find('.help-block[data-fv-for="' + data.field + '"]').hide()
            .filter('[data-fv-validator="' + data.validator + '"]').show();
    });
    $('#tpayForm').formValidation('setLocale', lang);
   
    /*$('#v-money').on('change',function(){
		var value = $('#v-money').val();
		$('#recharge-href').prop('href','/cooka-finance-web/rechargeHandler?money=' + value);
    });*/
});
