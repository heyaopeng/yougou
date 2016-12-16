var getCookie = require('./getCookie.js');
var lang = getCookie('language'); // 默认返回 en_US

require('./libs/bootstrap.min.js');
require('./libs/bootstrap-datepicker.min.js');

require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');

require('./libs/datepicker_locales/bootstrap-datepicker.' + lang + '.min.js');

require('./ck_page.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');
/*withdrawals records*/
$(document).ready(function() {
    $('#with-time-range').datepicker({
        format: "yyyy/mm/dd",
        orientation: "top right",
        language: lang
    })
    .on('changeDate', function () {
        $('#with-history-form').formValidation('revalidateField', 'f-time');
    });
    $('.time-box').on('click', 'a', function(e) {
        e.preventDefault();

        if ($('.time-box').hasClass('desc')) {
            window.location.href = '/cooka-finance-web/withdrawHistory?orderBy=asce';
        } else {
            window.location.href = '/cooka-finance-web/withdrawHistory?orderBy=desc';
        }
    });
    $('#month-select').on('change', function() {
    	console.log($('#month-select').val());
    	window.location.href = '/cooka-finance-web/withdrawHistory?preMonth=' + $('#month-select').val();
    });
    $('#with-history-form').formValidation({
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