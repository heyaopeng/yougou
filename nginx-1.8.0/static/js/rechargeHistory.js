var getCookie = require('./getCookie.js');
var lang = getCookie('language'); // 默认返回 en_US

//require('./js/libs/jquery-1.11.2.min.js') // you should not see me
require('./libs/bootstrap.min.js');
require('./libs/bootstrap-datepicker.min.js');

require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');


//=== 引入对应的国际化文件
require('./libs/datepicker_locales/bootstrap-datepicker.' + lang + '.min.js');
//=== 引入对应的国际化文件

require('./ck_page.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

/*recharge_record*/
$(document).ready(function() {
    $('#recharge-time-range').datepicker({
        format: "yyyy/mm/dd",
        orientation: "top right",
        // ========== 修改这里 ==========
        language: lang
            // ========== 修改这里 ==========
    })
    .on('changeDate', function () {
        $('#rech-history-form').formValidation('revalidateField', 'f-time');
    });
    $('.time-box').on('click', 'a', function(e) {
        e.preventDefault();

        if ($('.time-box').hasClass('desc')) {
            window.location.href = '/cooka-finance-web/rechargeHistory?orderBy=asce';
        } else {
            window.location.href = '/cooka-finance-web/rechargeHistory?orderBy=desc';
        }
    });
    $('#month-select').on('change', function() {
    	console.log($('#month-select').val());
    	window.location.href = '/cooka-finance-web/rechargeHistory?preMonth=' + $('#month-select').val();
    });
    
    $('#rech-history-form').formValidation({
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
});