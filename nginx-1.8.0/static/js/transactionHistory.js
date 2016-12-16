var getCookie = require('./getCookie.js');
var lang = getCookie('language'); // 默认返回 en_US

require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');


require('./libs/bootstrap.min.js');
require('./libs/bootstrap-datepicker.min.js');

//=== 引入对应的国际化文件
require('./libs/datepicker_locales/bootstrap-datepicker.' + lang + '.min.js');
//=== 引入对应的国际化文件
require('./ck_page.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');
/*withdrawals records*/
$(document).ready(function() {
    $('#trans-time-range').datepicker({
        format: "yyyy/mm/dd",
        orientation: "top right",
        language: lang
    })
    .on('changeDate', function () {
        $('#history-form').formValidation('revalidateField', 'f-time');
    });
    $('.time-box').on('click', 'a', function(e) {
        e.preventDefault();

        if ($('.time-box').hasClass('desc')) {
            window.location.href = '/cooka-finance-web/transactionHistory?orderBy=asce';
        } else {
            window.location.href = '/cooka-finance-web/transactionHistory?orderBy=desc';
        }
    });
    $('#month-select').on('change', function() {
    	console.log($('#month-select').val());
    	window.location.href = '/cooka-finance-web/transactionHistory?preMonth=' + $('#month-select').val();
    });
    $('#history-form').formValidation({
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
            'f-time': {
                selector: '.f-time',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'Please choose a date',
                            zh_CN: '请选择日期'
                        }
                    },
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
});