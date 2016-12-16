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

        var $totalSale = $this.parent('.period-select-totalSale').length;

        var $totalOrderNum = $this.parent('.period-select-totalOrderNum').length;

        var $averageSales = $this.parent('.period-select-averageSales').length;

        if($totalSale) {
            opt = {
                chart: {
                    renderTo: 'totalSale-chart'
                },
                title: {
                    text: '订单总额趋势分析图'
                },
                yAxis: {
                    title: {
                        text: '(支付)订单总额'
                    },
                    min: 0
                }
            };
            switch (type) {
                case 0:
                    requestData.s = moment(now, 'YYYY/MM/DD/HH').hours(0).format('YYYY/MM/DD/HH');
                    requestData.e = moment(now, 'YYYY/MM/DD/HH').hours(23).format('YYYY/MM/DD/HH');
                    requestData.type[0] = 'totalSale';
                    requestData.type[1] = 'totalPaymentSale';
                    requestData.space = 'hour';
                    renderChart(requestData, 'sumAmount', opt);
                    options.series[0].name = '订单总额';
                    options.series[1].name = '支付订单总额';
                    options.plotOptions.series.pointInterval = 3600 * 1000;
                    chart = new Highcharts.Chart(options);
                    break;

                case 1:
                    requestData.s = moment(now, 'YYYY/MM/DD/HH').subtract(1, 'day').hours(0).format('YYYY/MM/DD/HH');
                    requestData.e = moment(now, 'YYYY/MM/DD/HH').subtract(1, 'day').hours(23).format('YYYY/MM/DD/HH');
                    requestData.type[0] = 'totalSale';
                    requestData.type[1] = 'totalPaymentSale';
                    requestData.space = 'hour';
                    renderChart(requestData, 'sumAmount', opt);
                    options.series[0].name = '订单总额';
                    options.series[1].name = '支付订单总额';
                    options.plotOptions.series.pointInterval = 3600 * 1000;
                    chart = new Highcharts.Chart(options);
                    break;

                case 2:
                    requestData.s = moment(now, 'YYYY/MM/DD/HH').subtract(6, 'day').hours(0).format('YYYY/MM/DD/HH');
                    requestData.e = moment(now, 'YYYY/MM/DD/HH').hours(23).format('YYYY/MM/DD/HH');
                    requestData.type[0] = 'totalSale';
                    requestData.type[1] = 'totalPaymentSale';
                    requestData.space = 'day';
                    renderChart(requestData, 'sumAmount', opt);
                    options.series[0].name = '订单总额';
                    options.series[1].name = '支付订单总额';
                    options.plotOptions.series.pointInterval = 3600 * 1000 * 24;
                    options.xAxis.tickInterval = 24 * 3600 * 1000;
                    chart = new Highcharts.Chart(options);
                    options.xAxis.tickInterval = 1;
                    break;

                case 3:
                    requestData.s = moment(now, 'YYYY/MM/DD/HH').subtract(29, 'day').hours(0).format('YYYY/MM/DD/HH');
                    requestData.e = moment(now, 'YYYY/MM/DD/HH').hours(23).format('YYYY/MM/DD/HH');
                    requestData.type[0] = 'totalSale';
                    requestData.type[1] = 'totalPaymentSale';
                    requestData.space = 'day';
                    renderChart(requestData, 'sumAmount', opt);
                    options.series[0].name = '订单总额';
                    options.series[1].name = '支付订单总额';
                    options.plotOptions.series.pointInterval = 3600 * 1000 * 24;
                    chart = new Highcharts.Chart(options);
                    break;

                case 4:
                    requestData.s = moment(now, 'YYYY/MM/DD/HH').subtract(182, 'day').hours(0).format('YYYY/MM/DD/HH');
                    requestData.e = moment(now, 'YYYY/MM/DD/HH').hours(23).format('YYYY/MM/DD/HH');
                    requestData.type[0] = 'totalSale';
                    requestData.type[1] = 'totalPaymentSale';
                    requestData.space = 'month';
                    renderChart(requestData, 'sumAmount', opt);
                    options.series[0].name = '订单总额';
                    options.series[1].name = '支付订单总额';
                    options.plotOptions.series.pointInterval = 3600 * 1000 * 24 * 30;
                    options.xAxis.tickInterval = 24 * 3600 * 1000 * 30;
                    chart = new Highcharts.Chart(options);
                    options.xAxis.tickInterval = 1;
                    break;

                case 5:
                    requestData.s = moment(now, 'YYYY/MM/DD/HH').subtract(364, 'day').hours(0).format('YYYY/MM/DD/HH');
                    requestData.e = moment(now, 'YYYY/MM/DD/HH').hours(23).format('YYYY/MM/DD/HH');
                    requestData.type[0] = 'totalSale';
                    requestData.type[1] = 'totalPaymentSale';
                    requestData.space = 'month';
                    renderChart(requestData, 'sumAmount', opt);
                    options.series[0].name = '订单总额';
                    options.series[1].name = '支付订单总额';
                    options.plotOptions.series.pointInterval = 3600 * 1000 * 24 * 30;
                    chart = new Highcharts.Chart(options);
                    break;

                default:
                    alert(__("UNKNOWN ERROR"));
            }

        }

        if($totalOrderNum) {
            opt = {
                chart: {
                    renderTo: 'totalOrderNum-chart'
                },
                title: {
                    text: '趋势分析图'
                },
                yAxis: {
                    title: {
                        text: '(支付)订单总数'
                    },
                    min: 0
                }
            };
            switch (type) {
                case 0:
                    requestData.s = moment(now, 'YYYY/MM/DD/HH').hours(0).format('YYYY/MM/DD/HH');
                    requestData.e = moment(now, 'YYYY/MM/DD/HH').hours(23).format('YYYY/MM/DD/HH');
                    requestData.type[0] = 'totalOrderNum';
                    requestData.type[1] = 'totalPaymentOrderNum';
                    requestData.space = 'hour';
                    renderChart(requestData, 'count', opt);
                    options.series[0].name = '订单总数';
                    options.series[1].name = '支付订单总数';
                    options.plotOptions.series.pointInterval = 3600 * 1000;
                    chart = new Highcharts.Chart(options);
                    break;

                case 1:
                    requestData.s = moment(now, 'YYYY/MM/DD/HH').subtract(1, 'day').hours(0).format('YYYY/MM/DD/HH');
                    requestData.e = moment(now, 'YYYY/MM/DD/HH').subtract(1, 'day').hours(23).format('YYYY/MM/DD/HH');
                    requestData.type[0] = 'totalOrderNum';
                    requestData.type[1] = 'totalPaymentOrderNum';
                    requestData.space = 'hour';
                    renderChart(requestData, 'count', opt);
                    options.series[0].name = '订单总数';
                    options.series[1].name = '支付订单总数';
                    options.plotOptions.series.pointInterval = 3600 * 1000;
                    chart = new Highcharts.Chart(options);
                    break;

                case 2:
                    requestData.s = moment(now, 'YYYY/MM/DD/HH').subtract(6, 'day').hours(0).format('YYYY/MM/DD/HH');
                    requestData.e = moment(now, 'YYYY/MM/DD/HH').hours(23).format('YYYY/MM/DD/HH');
                    requestData.type[0] = 'totalOrderNum';
                    requestData.type[1] = 'totalPaymentOrderNum';
                    requestData.space = 'day';
                    renderChart(requestData, 'count', opt);
                    options.series[0].name = '订单总数';
                    options.series[1].name = '支付订单总数';
                    options.plotOptions.series.pointInterval = 3600 * 1000 * 24;
                    options.xAxis.tickInterval = 24 * 3600 * 1000;
                    chart = new Highcharts.Chart(options);
                    options.xAxis.tickInterval = 1;
                    break;

                case 3:
                    requestData.s = moment(now, 'YYYY/MM/DD/HH').subtract(29, 'day').hours(0).format('YYYY/MM/DD/HH');
                    requestData.e = moment(now, 'YYYY/MM/DD/HH').hours(23).format('YYYY/MM/DD/HH');
                    requestData.type[0] = 'totalOrderNum';
                    requestData.type[1] = 'totalPaymentOrderNum';
                    requestData.space = 'day';
                    renderChart(requestData, 'count', opt);
                    options.series[0].name = '订单总数';
                    options.series[1].name = '支付订单总数';
                    options.plotOptions.series.pointInterval = 3600 * 1000 * 24;
                    chart = new Highcharts.Chart(options);
                    break;

                case 4:
                    requestData.s = moment(now, 'YYYY/MM/DD/HH').subtract(182, 'day').hours(0).format('YYYY/MM/DD/HH');
                    requestData.e = moment(now, 'YYYY/MM/DD/HH').hours(23).format('YYYY/MM/DD/HH');
                    requestData.type[0] = 'totalOrderNum';
                    requestData.type[1] = 'totalPaymentOrderNum';
                    requestData.space = 'month';
                    renderChart(requestData, 'count', opt);
                    options.series[0].name = '订单总数';
                    options.series[1].name = '支付订单总数';
                    options.plotOptions.series.pointInterval = 3600 * 1000 * 24 * 30;
                    chart = new Highcharts.Chart(options);
                    break;

                case 5:
                    requestData.s = moment(now, 'YYYY/MM/DD/HH').subtract(364, 'day').hours(0).format('YYYY/MM/DD/HH');
                    requestData.e = moment(now, 'YYYY/MM/DD/HH').hours(23).format('YYYY/MM/DD/HH');
                    requestData.type[0] = 'totalOrderNum';
                    requestData.type[1] = 'totalPaymentOrderNum';
                    requestData.space = 'month';
                    renderChart(requestData, 'count', opt);
                    options.series[0].name = '订单总数';
                    options.series[1].name = '支付订单总数';
                    options.plotOptions.series.pointInterval = 3600 * 1000 * 24 * 30;
                    chart = new Highcharts.Chart(options);
                    break;

                default:
                    alert(__("UNKNOWN ERROR"));

            }
        }

        if($averageSales) {
            opt = {
                chart: {
                    renderTo: 'averageSales-chart'
                },
                title: {
                    text: '客单价趋势分析图'
                },
                yAxis: {
                    title: {
                        text: '(支付)客单价'
                    },
                    min: 0
                }
            };
            if (type === 0) {
                requestData.s = moment(now, 'YYYY/MM/DD/HH').hours(0).format('YYYY/MM/DD/HH');
                requestData.e = moment(now, 'YYYY/MM/DD/HH').hours(23).format('YYYY/MM/DD/HH');
                requestData.type[0] = 'averageSales';
                requestData.type[1] = 'averagePaymentSales';
                requestData.space = 'hour';
                renderChart(requestData, 'sumAmount', opt);
                options.series[0].name = '客单价';
                options.series[1].name = '支付客单价';
                options.plotOptions.series.pointInterval = 3600 * 1000;
                chart = new Highcharts.Chart(options);
            }
            if(type === 1) {
                requestData.s = moment(now, 'YYYY/MM/DD/HH').subtract(1, 'day').hours(0).format('YYYY/MM/DD/HH');
                requestData.e = moment(now, 'YYYY/MM/DD/HH').subtract(1, 'day').hours(23).format('YYYY/MM/DD/HH');
                requestData.type[0] = 'averageSales';
                requestData.type[1] = 'averagePaymentSales';
                requestData.space = 'hour';
                renderChart(requestData, 'sumAmount', opt);
                options.series[0].name = '客单价';
                options.series[1].name = '支付客单价';
                options.plotOptions.series.pointInterval = 3600 * 1000;
                chart = new Highcharts.Chart(options);
            }
            if(type === 2) {
                requestData.s = moment(now, 'YYYY/MM/DD/HH').subtract(6, 'day').hours(0).format('YYYY/MM/DD/HH');
                requestData.e = moment(now, 'YYYY/MM/DD/HH').hours(23).format('YYYY/MM/DD/HH');
                requestData.type[0] = 'averageSales';
                requestData.type[1] = 'averagePaymentSales';
                requestData.space = 'day';
                renderChart(requestData, 'sumAmount', opt);
                options.series[0].name = '客单价';
                options.series[1].name = '支付客单价';
                options.plotOptions.series.pointInterval = 3600 * 1000 * 24;
                options.xAxis.tickInterval = 24 * 3600 * 1000;
                chart = new Highcharts.Chart(options);
                options.xAxis.tickInterval = 1;
            }
            if(type === 3) {
                requestData.s = moment(now, 'YYYY/MM/DD/HH').subtract(29, 'day').hours(0).format('YYYY/MM/DD/HH');
                requestData.e = moment(now, 'YYYY/MM/DD/HH').hours(23).format('YYYY/MM/DD/HH');
                requestData.type[0] = 'averageSales';
                requestData.type[1] = 'averagePaymentSales';
                requestData.space = 'day';
                renderChart(requestData, 'sumAmount', opt);
                options.series[0].name = '客单价';
                options.series[1].name = '支付客单价';
                options.plotOptions.series.pointInterval = 3600 * 1000 * 24;
                chart = new Highcharts.Chart(options);
            }
            if(type === 4) {
                requestData.s = moment(now, 'YYYY/MM/DD/HH').subtract(182, 'day').hours(0).format('YYYY/MM/DD/HH');
                requestData.e = moment(now, 'YYYY/MM/DD/HH').hours(23).format('YYYY/MM/DD/HH');
                requestData.type[0] = 'averageSales';
                requestData.type[1] = 'averagePaymentSales';
                requestData.space = 'month';
                renderChart(requestData, 'sumAmount', opt);
                options.series[0].name = '客单价';
                options.series[1].name = '支付客单价';
                options.plotOptions.series.pointInterval = 3600 * 1000 * 24 * 30;
                options.xAxis.tickInterval = 24 * 3600 * 1000 * 30;
                chart = new Highcharts.Chart(options);
                options.xAxis.tickInterval = 1;
            }
            if(type === 5) {
                requestData.s = moment(now, 'YYYY/MM/DD/HH').subtract(364, 'day').hours(0).format('YYYY/MM/DD/HH');
                requestData.e = moment(now, 'YYYY/MM/DD/HH').hours(23).format('YYYY/MM/DD/HH');
                requestData.type[0] = 'averageSales';
                requestData.type[1] = 'averagePaymentSales';
                requestData.space = 'month';
                renderChart(requestData, 'sumAmount', opt);
                options.series[0].name = '客单价';
                options.series[1].name = '支付客单价';
                options.plotOptions.series.pointInterval = 3600 * 1000 * 24 * 30;
                chart = new Highcharts.Chart(options);
            }
        }
    });

    var databaseCal = {
        'end': moment().hours(23),
        'start': moment('2015/08/26/00', 'YYYY/MM/DD/HH')
    };

    function setTotalSaleOPt(interval) {
        options.chart.renderTo = 'totalSale-chart';
        options.title.text = '订单总额趋势分析图';
        options.yAxis.title.text = '(支付)订单总额';
        options.series[0].name = '订单总额';
        options.series[1].name = '支付订单总额';
        options.plotOptions.series.pointInterval = interval;
    }

    // 订单总额
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
        $('#totalSale-search').formValidation('revalidateField', 'f-date');
    });
    $("#datetimepicker2").on("dp.change", function(e) {
        $('#datetimepicker1').data("DateTimePicker").maxDate(e.date);
        $('#totalSale-search').formValidation('revalidateField', 'f-date');
    });
    $('#totalSale-search').find('.search-range').on('change', function(){
        $('#totalSale-search').formValidation('revalidateField', 'f-date');
    });

    $('#totalSale-search').formValidation({
            framework: 'bootstrap',
            row: {
                selector: 'div.col-md-4'
            },
            addOns: {
                i18n: {}
            },
            fields: {
                "f-date": {
                    selector: '#totalSale-search .f-date',
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
            requestData.type[0] = 'totalSale';
            requestData.type[1] = 'totalPaymentSale';

            renderChart(requestData, 'sumAmount');

            var interval;

            if(requestData.space === 'hour') {
                console.log('1');
                interval = 3600 * 1000;
            } else if(requestData.space === 'day'){
                console.log('2');
                interval = 3600 * 1000 * 24;
            } else {
                console.log('3');
                interval = 3600 * 1000 * 24 * 30;
            }

            setTotalSaleOPt(interval);

            chart = new Highcharts.Chart(options);
        });
    $('#totalSale-search').formValidation('setLocale', lang);

    //-------------------------------------------------------------------------------
    
    // 订单总数
    function settotalOrderNumOPt(interval) {
        options.chart.renderTo = 'totalOrderNum-chart';
        options.title.text = '订单总数趋势分析图';
        options.yAxis.title.text = '(支付)订单总数';
        options.series[0].name = '订单总数';
        options.series[1].name = '支付订单总数';
        options.plotOptions.series.pointInterval = interval;
    }

    // 订单总额
    $('#datetimepicker3').datetimepicker({
        format: 'YYYY/MM/DD/HH',
        minDate: databaseCal.start,
        maxDate: databaseCal.end
    });
    $('#datetimepicker4').datetimepicker({
        useCurrent: false, //Important! See issue #1075
        format: 'YYYY/MM/DD/HH',
        minDate: databaseCal.start,
        maxDate: databaseCal.end
    });

    $("#datetimepicker3").on("dp.change", function(e) {
        $('#datetimepicker4').data("DateTimePicker").minDate(e.date);
        $('#totalOrderNum-search').formValidation('revalidateField', 'f-date');
    });
    $("#datetimepicker4").on("dp.change", function(e) {
        $('#datetimepicker3').data("DateTimePicker").maxDate(e.date);
        $('#totalOrderNum-search').formValidation('revalidateField', 'f-date');
    });
    $('#totalOrderNum-search').find('.search-range').on('change', function(){
        $('#totalOrderNum-search').formValidation('revalidateField', 'f-date');
    });

    $('#totalOrderNum-search').formValidation({
            framework: 'bootstrap',
            row: {
                selector: 'div.col-md-4'
            },
            addOns: {
                i18n: {}
            },
            fields: {
                "f-date": {
                    selector: '#totalOrderNum-search .f-date',
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

            requestData.s = $form.find('#datetimepicker3')[0].value;
            requestData.e = $form.find('#datetimepicker4')[0].value;
            requestData.space = $form.find('.search-range')[0].value;
            requestData.type[0] = 'totalOrderNum';
            requestData.type[1] = 'totalPaymentOrderNum';

            renderChart(requestData, 'count');

            var interval;

            if(requestData.space === 'hour') {
                interval = 3600 * 1000;
            } else if(requestData.space === 'day'){
                interval = 3600 * 1000 * 24;
            } else {
                interval = 3600 * 1000 * 24 * 30;
            }

            settotalOrderNumOPt(interval);

            chart = new Highcharts.Chart(options);
        });
    $('#totalOrderNum-search').formValidation('setLocale', lang);

    //-------------------------------------------------------------------------------
    
    // 客单数
    function setaverageSalesOPt(interval) {
        options.chart.renderTo = 'averageSales-chart';
        options.title.text = '客单数趋势分析图';
        options.yAxis.title.text = '(支付)客单价';
        options.series[0].name = '客单价';
        options.series[1].name = '支付客单价';
        options.plotOptions.series.pointInterval = interval;
    }

    $('#datetimepicker5').datetimepicker({
        format: 'YYYY/MM/DD/HH',
        minDate: databaseCal.start,
        maxDate: databaseCal.end
    });
    $('#datetimepicker6').datetimepicker({
        useCurrent: false, //Important! See issue #1075
        format: 'YYYY/MM/DD/HH',
        minDate: databaseCal.start,
        maxDate: databaseCal.end
    });

    $("#datetimepicker5").on("dp.change", function(e) {
        $('#datetimepicker6').data("DateTimePicker").minDate(e.date);
        $('#averageSales-search').formValidation('revalidateField', 'f-date');
    });
    $("#datetimepicker6").on("dp.change", function(e) {
        $('#datetimepicker5').data("DateTimePicker").maxDate(e.date);
        $('#averageSales-search').formValidation('revalidateField', 'f-date');
    });
    $('#averageSales-search').find('.search-range').on('change', function(){
        $('#averageSales-search').formValidation('revalidateField', 'f-date');
    });

    $('#averageSales-search').formValidation({
            framework: 'bootstrap',
            row: {
                selector: 'div.col-md-4'
            },
            addOns: {
                i18n: {}
            },
            fields: {
                "f-date": {
                    selector: '#averageSales-search .f-date',
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

            requestData.s = $form.find('#datetimepicker5')[0].value;
            requestData.e = $form.find('#datetimepicker6')[0].value;
            requestData.space = $form.find('.search-range')[0].value;
            requestData.type[0] = 'averageSales';
            requestData.type[1] = 'averagePaymentSales';

            renderChart(requestData, 'sumAmount');

            var interval;

            if(requestData.space === 'hour') {
                interval = 3600 * 1000;
            } else if(requestData.space === 'day'){
                interval = 3600 * 1000 * 24;
            } else {
                interval = 3600 * 1000 * 24 * 30;
            }

            setaverageSalesOPt(interval);

            chart = new Highcharts.Chart(options);
        });
    $('#averageSales-search').formValidation('setLocale', lang);
});
require('./dataVisualInit.js');
