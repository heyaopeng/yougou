var getCookie = require('../getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE');

require('../libs/bootstrap.min.js');
require('../libs/FV/formValidation.min.js');
require('../libs/FV/bootstrap.min.js');
require('../libs/FV/i18n.min.js');
require('../libs/bootstrap-datetimepicker.min.js');

require('../libs/HC/highcharts.js');

var highchartRender = require('./highchartRender.js');

$(document).ready(function() {
    var now = moment().format('YYYY/MM/DD/HH');
    var chart, options;

    function setOPt(interval) {
        options.chart.renderTo = 'userData-chart';
        options.title.text = '注册登录分析图';
        options.yAxis.title = '注册/登录(人)';
        options.series[0].name = '注册';
        options.series[1].name = '登录';
        options.plotOptions.series.pointInterval = interval;
    }

    var requestData = {};

    requestData.type = [];

    function renderChart(requestData, yAxisName, opt) {
        $.ajax({
            type: "get",
            async: false,
            url: "/cooka-backend-web/userStatic?staticType=" + requestData.type[0] + "&timeSpaceType=" + requestData.space + "&start=" + requestData.s + "&end=" + requestData.e,
            success: function(data1) {
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/cooka-backend-web/userStatic?staticType=" + requestData.type[1] + "&timeSpaceType=" + requestData.space + "&start=" + requestData.s + "&end=" + requestData.e,
                    success: function(data2) {
                        options = highchartRender.doubleLine(data1, data2, yAxisName, opt, requestData.space);
                    }
                });
            }
        });
    }

    $('.period-select button').on('click', function() {
        var $this = $(this);
        var type = $this.data('type');

        now = moment().format('YYYY/MM/DD/HH');

        var $register = $this.parent('.period-select-register').length;

        if ($register) {
            requestData.type[0] = 'registerUser';
            requestData.type[1] = 'loginCount';
            if (type === 0) {
                requestData.s = moment(now, 'YYYY/MM/DD/HH').hours(0).format('YYYY/MM/DD/HH');
                requestData.e = moment(now, 'YYYY/MM/DD/HH').hours(23).format('YYYY/MM/DD/HH');
                requestData.space = 'hour';
                renderChart(requestData, 'count');
                options.plotOptions.series.pointInterval = 3600 * 1000;
            }
            if (type === 1) {
                requestData.s = moment(now, 'YYYY/MM/DD/HH').subtract(1, 'day').hours(0).format('YYYY/MM/DD/HH');
                requestData.e = moment(now, 'YYYY/MM/DD/HH').subtract(1, 'day').hours(23).format('YYYY/MM/DD/HH');
                requestData.space = 'hour';
                renderChart(requestData, 'count');
                options.plotOptions.series.pointInterval = 3600 * 1000;
            }
            if (type === 2) {
                requestData.s = moment(now, 'YYYY/MM/DD/HH').subtract(6, 'day').hours(0).format('YYYY/MM/DD/HH');
                requestData.e = moment(now, 'YYYY/MM/DD/HH').hours(23).format('YYYY/MM/DD/HH');
                requestData.space = 'day';
                renderChart(requestData, 'count');
                options.plotOptions.series.pointInterval = 3600 * 1000 * 24;
                options.xAxis.tickInterval = 24 * 3600 * 1000;
            }
            if (type === 3) {
                requestData.s = moment(now, 'YYYY/MM/DD/HH').subtract(29, 'day').hours(0).format('YYYY/MM/DD/HH');
                requestData.e = moment(now, 'YYYY/MM/DD/HH').hours(23).format('YYYY/MM/DD/HH');
                requestData.space = 'day';
                renderChart(requestData, 'count');
                options.plotOptions.series.pointInterval = 3600 * 1000 * 24;
            }
            if (type === 4) {
                requestData.s = moment(now, 'YYYY/MM/DD/HH').subtract(182, 'day').hours(0).format('YYYY/MM/DD/HH');
                requestData.e = moment(now, 'YYYY/MM/DD/HH').hours(23).format('YYYY/MM/DD/HH');
                requestData.space = 'day';
                renderChart(requestData, 'count');
                options.plotOptions.series.pointInterval = 3600 * 1000 * 24;
            }
            if (type === 5) {
                requestData.s = moment(now, 'YYYY/MM/DD/HH').subtract(364, 'day').hours(0).format('YYYY/MM/DD/HH');
                requestData.e = moment(now, 'YYYY/MM/DD/HH').hours(23).format('YYYY/MM/DD/HH');
                requestData.space = 'day';
                renderChart(requestData, 'count');
                options.plotOptions.series.pointInterval = 3600 * 1000 * 24;
            }
            options.chart.renderTo = 'userData-chart';
            options.title.text = '注册登录分析图';
            options.yAxis.title = '注册/登录(人)';
            options.series[0].name = '注册';
            options.series[1].name = '登录';
            chart = new Highcharts.Chart(options);
        }

    });
    $('.period-select button:nth-child(1)').trigger('click');

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
        $('#userData-search').formValidation('revalidateField', 'f-date');
        $('.user-search-range').val('');
    });
    $("#datetimepicker2").on("dp.change", function(e) {
        $('#datetimepicker1').data("DateTimePicker").maxDate(e.date);
        $('#userData-search').formValidation('revalidateField', 'f-date');
        $('.user-search-range').val('');
    });

    $('#userData-search').formValidation({
            framework: 'bootstrap',
            row: {
                selector: 'div.col-md-4'
            },
            addOns: {
                i18n: {}
            },
            fields: {
                "f-date": {
                    selector: '#userData-search .f-date',
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

            requestData.s = $form.find('#datetimepicker1')[0].value;
            requestData.e = $form.find('#datetimepicker2')[0].value;
            requestData.space = $form.find('.search-range')[0].value;

            renderChart(requestData, 'count');
            var interval;

            if(requestData.space === 'hour') {
            	console.log('1');
            	interval = 3600 * 1000;
            } else if(requestData === 'day'){
            	console.log('2');
            	interval = 3600 * 1000 * 24;
            } else {
            	console.log('3');
            	interval = 3600 * 1000 * 24 * 30;
            }

            setOPt(interval);

            chart = new Highcharts.Chart(options);
        });
    $('#userData-search').formValidation('setLocale', lang);

});
