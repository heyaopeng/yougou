var getCookie = require('../getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE');

require('../ck_page.js');
require('../libs/bootstrap.min.js');
require('../libs/FV/formValidation.min.js');
require('../libs/FV/bootstrap.min.js');
require('../libs/FV/i18n.min.js');
require('../libs/bootstrap-datetimepicker.min.js');

$(document).ready(function() {

    var databaseCal = {
        'end': moment().hours(23),
        'start': moment('2015/08/26/00', 'YYYY/MM/DD/HH')
    };
    $('#datetimepicker1').datetimepicker({
        format: 'YYYY/MM/DD/HH',
        minDate: databaseCal.start,
        maxDate: databaseCal.end
    });
    $('#datetimepicker2').datetimepicker({
        useCurrent: false, //Important! See issue #1075
        format: 'YYYY/MM/DD/HH',
        minDate: databaseCal.start,
        maxDate: databaseCal.end
    });

    $("#datetimepicker1").on("dp.change", function(e) {
        $('#datetimepicker2').data("DateTimePicker").minDate(e.date);
        $('#rankingData-search').formValidation('revalidateField', 'f-date');
    });
    $("#datetimepicker2").on("dp.change", function(e) {
        $('#datetimepicker1').data("DateTimePicker").maxDate(e.date);
        $('#rankingData-search').formValidation('revalidateField', 'f-date');
    });

    $('#rankingData-search').find('.search-range').on('change', function(){
        $('#rankingData-search').formValidation('revalidateField', 'f-date');
    });

    var $rankingTable = $('.rankingData-table').find('table');
    var $pageT = $rankingTable.data('page');
    console.log($pageT);
    var $pageSizeT = $rankingTable.data('pagesize');
    console.log($pageSizeT);

    $rankingTable.find('tbody').find('tr > td:first-child').each(function(index, el) {
        var $this = $(this);
        $this.text(parseInt($this.text()) + ($pageT - 1) * $pageSizeT);    
    });


    $('#rankingData-search').formValidation({
        framework: 'bootstrap',
        row: {
            selector: 'div.col-md-4'
        },
        addOns: {
            i18n: {}
        },
        fields: {
            "f-date": {
                selector: '.f-date',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The date is required',
                            zh_CN: '日期不能为空'
                        }
                    },
                    date: {
                        format: 'YYYY/MM/DD/HH',
                        message: {
                            en_US: 'Not a valid date',
                            zh_CN: '不是有效日期'
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
    })
    .on('success.form.fv', function(e) {
        // Prevent form submission
        e.preventDefault();

        var $form = $(e.target),
            fv = $(e.target).data('formValidation');

        $form[0].submit();
    });

    $('#rankingData-search').formValidation('setLocale', lang);
});

require('./dataVisualInit.js');
