$(document).ready(function() {

    // 返回一个moment的Data对象
    var parseYear = function(d) { return moment(d, 'YYYY');};
    var parseMonth = function(d) { return moment(d, 'YYYYMM');};
    var parseDate = function(d) { return moment(d, 'YYYYMMDD');};
    var parseHour = function(d) { return moment(d, 'YYYYMMDDHH');};

    /**
     * [cloneObj 深度克隆对象，修改一个对象，对克隆的对象无影响]
     * @param  {[Object]} obj [要克隆的对象]
     * @return {[Object]}     [返回一个克隆的对象]
     */
    function cloneObj(obj) {
        var o, i, j, k;
        if (typeof(obj) != "object" || obj === null) return obj;
        if (obj instanceof(Array)) {
            o = [];
            i = 0;
            j = obj.length;
            for (; i < j; i++) {
                if (typeof(obj[i]) == "object" && obj[i] !== null) {
                    o[i] = arguments.callee(obj[i]);
                } else {
                    o[i] = obj[i];
                }
            }
        } else {
            o = {};
            for (i in obj) {
                if (typeof(obj[i]) == "object" && obj[i] !== null) {
                    o[i] = arguments.callee(obj[i]);
                } else {
                    o[i] = obj[i];
                }
            }
        }
        return o;
    }

    /**
     * [buildArr 自动填充数组]
     * @param  {[Array]} data         [要填充的数组]
     * @param  {[String]} type         [填充类型]
     * @param  {[String]} start        [填充数组开始的日期]
     * @param  {[String]} end          [填充数组最后的日期]
     * @param  {[String]} formatString [格式字符]
     * @param  {[Function]} parseFunc    [日期格式函数]
     * @return {[Array]}              [填充后的数组]
     */
    function buildArr(data, type, start, end, formatString, parseFunc) {
        var nd = [];
        nd = cloneObj(data);
        console.log(nd);
        var buildOpt = {
            'd': data,
            't': type,
            's': start,
            'e': end,
            'f': formatString,
            'p': parseFunc
        };

        // [ds][de]: 字符串类型的日期
        // [ms][me]: moment对象的日期
        var dataD = {
            'ds': '',
            'de': '',
            'ms': '',
            'me': ''
        };

        // 新数组的开始时间和结束时间
        var arrSE = {
            's': '',    // eg: 2015010100 ==> 2015年01月01日00时
            'e': ''
        };

        // s和e不能变动
        arrSE.s = moment(buildOpt.s, 'YYYYMMDDHH').format(buildOpt.f);   // eg: 2015010100 ==> 2015年01月01日00时
        arrSE.e = moment(buildOpt.e, 'YYYYMMDDHH').format(buildOpt.f);
        console.log(arrSE.s);
        dataD.ds = moment.unix(buildOpt.d[0].longTime).format(buildOpt.f);
        console.log(dataD.ds);
        dataD.de = moment.unix(buildOpt.d[buildOpt.d.length-1].longTime).format(buildOpt.f);
        dataD.ms = buildOpt.p(dataD.ds);
        dataD.me = buildOpt.p(dataD.de);
        console.log('ok');
        while(arrSE.s !== dataD.ds){
            dataD.ms = moment(dataD.ms).subtract(1, buildOpt.t);
            dataD.ds = dataD.ms.format(buildOpt.f);
            nd.unshift({
                'count': 0,
                'time': dataD.ds
            });
        }
        while(arrSE.e !== dataD.de){
            dataD.me = moment(dataD.me).add(1, buildOpt.t);
            dataD.de = dataD.me.format(buildOpt.f);
            nd.push({
                'count': 0,
                'time': dataD.de
            });
        }
        return nd;
    }

    /**
     * [fillAuto 自动填充数据]
     * @param  {[Array]} data  [数据集]
     * @param  {[String]} type  [填充类型: hour/day/month/year]
     * @param  {[String]} start [开始填充的时间]
     * @param  {[String]} end   [结束填充的时间]
     * @return {[Array]}       [填充的数据集]
     */
    function fillAuto(data, type, start, end){
        console.log(data);
        var newData = [];
        newData = cloneObj(data);

        console.log(newData);

        switch(type){
            case 'hours':
                newData = buildArr(newData, type, start, end, 'YYYYMMDDHH', parseHour);
                return newData;

            case 'days':
                newData = buildArr(newData, type, start, end, 'YYYYMMDD', parseDate);
                return newData;

            case 'months':
                newData = buildArr(newData, type, start, end, 'YYYYMM', parseMonth);
                return newData;

            case 'years':
                return newData;

            default:
                console.error('The @param \'' + type + '\' you has entered is not exist.');
        }
    }

    // dataset = fillAuto([{'count': 0,'longTime': 1445616000}], 'hours', '2015102300', '2015102323');

    // 请求数据的开始日期和结束日期
    var requestDate = {
        's':'',
        'e':'',
        'type': ''
    };

    // 填充到数据的开始日期和结束日期
    var fillDate = {
        'start': '',
        'end': '',
        'type': ''
    };

    var defaultFill, datasetL, datasetR;

    var date, countL, countR;

    var momentFormatSring, dataFormatString;

    var renderChart = function(){

        // 注册默认请求
        $.ajax({
            type: "get",
            url: "/cooka-backend-web/userStatic?staticType=registerUser&timeSpaceType=" + requestDate.type + "&start=" + requestDate.s + "&end=" + requestDate.e,
            success: function(data1) {
                // 当接收到的数据集为0时，自动补充当前时间，count为0；
                if(data1.length === 0){
                    data1.push({
                        'count': 0,
                        'longTime': defaultFill
                    });
                }

                datasetR = []; date = []; countR = [];

                fillDate.type = requestDate.type + 's';

                datasetR = fillAuto(data1, fillDate.type, fillDate.start, fillDate.end);
                datasetR.forEach(function(d) {
                    if(d.longTime){
                        d.time = moment.unix(d.longTime).format('YYYY/MM/DD');
                    } else {
                        d.time = moment(d.time, 'YYYYMMDD').format('YYYY/MM/DD');
                    }
                });

                datasetR.forEach(function(d){
                    date.push(d.time);
                    countR.push(d.count);
                });

                console.log(datasetR);

                // 登录
                $.ajax({
                    type: "get",
                    url: "/cooka-backend-web/userStatic?staticType=loginCount&timeSpaceType="+ equestDate.type + "&start=" + requestDate.s + "&end=" + requestDate.e,
                    success: function(data2) {
                        // 当接收到的数据集为0时，自动补充当前时间，count为0；
                        if(data2.length === 0){
                            data2.push({
                                'count': 0,
                                'longTime': defaultFill
                            });
                        }

                        datasetL = []; countL = [];

                        datasetL = fillAuto(data2, fillDate.type, fillDate.start, fillDate.end);
                        datasetL.forEach(function(d) {
                            if(d.longTime){
                                d.time = moment.unix(d.longTime).format('YYYY/MM/DD');
                            } else {
                                d.time = moment(d.time, 'YYYYMMDD').format('YYYY/MM/DD');
                            }
                        });

                        datasetL.forEach(function(d){
                            countL.push(d.count);
                        });

                        console.log(datasetL);

                        $('#userData-analysis-chart').highcharts({
                            title: {
                                text: '会员动态分析',
                                x: -20 //center
                            },
                            subtitle: {
                                text: 'Source: Cookabuy.com',
                                x: -20
                            },
                            xAxis: {
                                categories: date
                            },
                            yAxis: {
                                title: {
                                    text: '注册/登录 人数 (人)'
                                },
                                plotLines: [{
                                    value: 0,
                                    width: 1,
                                    color: '#808080'
                                }]
                            },
                            tooltip: {
                                valueSuffix: '人'
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'middle',
                                borderWidth: 0
                            },
                            series: [{
                                name: '注册人数',
                                data: countR,
                                zones: [{
                                    value: 0,
                                    color: '#f7a35c'
                                }, {
                                    value: 10,
                                    color: '#7cb5ec'
                                }, {
                                    color: '#90ed7d'
                                }]
                            }, {
                                name: '登录人数',
                                data: countL,
                                zones: [{
                                    value: 0,
                                    color: '#f7a35c'
                                }, {
                                    value: 10,
                                    color: '#7cb5ec'
                                }, {
                                    color: '#90ed7d'
                                }]
                            }],
                            credits:{
                                 enabled:false // 禁用版权信息
                            }
                        });
                    }
                });
            }
        });
    };

    requestDate.s = moment().subtract(6, 'days').hours(0).format('YYYY/MM/DD/HH');
    requestDate.e = moment().hours(23).format('YYYY/MM/DD/HH');

    console.log(requestDate);

    fillDate.start = moment(requestDate.s, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');
    fillDate.end = moment(requestDate.e, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');

    defaultFill = moment(fillDate.start, 'YYYY/MM/DD').unix();

    // 注册默认请求
    $.ajax({
        type: "get",
        url: "/cooka-backend-web/userStatic?staticType=registerUser&timeSpaceType=day&start="+ requestDate.s + "&end=" + requestDate.e,
        success: function(data1) {
        	// 当接收到的数据集为0时，自动补充当前时间，count为0；
            if(data1.length === 0){
            	data1.push({
            		'count': 0,
            		'longTime': defaultFill
            	});
            }
            datasetR = []; date = []; countR = [];

            datasetR = fillAuto(data1, 'days', fillDate.start, fillDate.end);
            datasetR.forEach(function(d) {
                if(d.longTime){
                    d.time = moment.unix(d.longTime).format('YYYY/MM/DD');
                } else {
                    d.time = moment(d.time, 'YYYYMMDD').format('YYYY/MM/DD');
                }
            });

            datasetR.forEach(function(d){
                date.push(d.time);
                countR.push(d.count);
            });

            console.log(datasetR);

            // 登录
            $.ajax({
                type: "get",
                url: "/cooka-backend-web/userStatic?staticType=loginCount&timeSpaceType=day&start="+ requestDate.s + "&end=" + requestDate.e,
                success: function(data2) {
                    // 当接收到的数据集为0时，自动补充当前时间，count为0；
                    if(data2.length === 0){
                        data2.push({
                            'count': 0,
                            'longTime': defaultFill
                        });
                    }

                    datasetL = []; countL = [];

                    datasetL = fillAuto(data2, 'days', fillDate.start, fillDate.end);
                    datasetL.forEach(function(d) {
                        if(d.longTime){
                            d.time = moment.unix(d.longTime).format('YYYY/MM/DD');
                        } else {
                            d.time = moment(d.time, 'YYYYMMDD').format('YYYY/MM/DD');
                        }
                    });

                    datasetL.forEach(function(d){
                        countL.push(d.count);
                    });

                    console.log(datasetL);

                    $('#userData-analysis-chart').highcharts({
                        title: {
                            text: '会员动态分析',
                            x: -20 //center
                        },
                        subtitle: {
                            text: 'Source: Cookabuy.com',
                            x: -20
                        },
                        xAxis: {
                            categories: date
                        },
                        yAxis: {
                            title: {
                                text: '注册/登录 人数 (人)'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        },
                        tooltip: {
                            valueSuffix: '人'
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle',
                            borderWidth: 0
                        },
                        series: [{
                            name: '注册人数',
                            data: countR,
                            zones: [{
                                value: 0,
                                color: '#f7a35c'
                            }, {
                                value: 10,
                                color: '#7cb5ec'
                            }, {
                                color: '#90ed7d'
                            }]
                        }, {
                            name: '登录人数',
                            data: countL,
                            zones: [{
                                value: 0,
                                color: '#f7a35c'
                            }, {
                                value: 10,
                                color: '#7cb5ec'
                            }, {
                                color: '#90ed7d'
                            }]
                        }],
                        credits:{
                             enabled:false // 禁用版权信息
                        }
                    });
                }
            });
        }
    });


	$('.statistics-interval').find('li').on('click', function(){
		var $this = $(this);
        var dataId = $this.data('id');
		if (!$this.hasClass('active')) {
			var $dataId = parseInt($this.data('id'));

			$this.siblings('li').removeClass('active');
            $this.addClass('active');
		}

		if (dataId === 0) {
			requestDate.s = moment().hours(0).format('YYYY/MM/DD/HH');
            requestDate.e = moment().hours(23).format('YYYY/MM/DD/HH');

            fillDate.start = moment(requestDate.s, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');
            fillDate.end = moment(requestDate.e, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');

            defaultFill = moment(fillDate.start, 'YYYY/MM/DD/HH').unix();

            // 注册默认请求
            $.ajax({
                type: "get",
                url: "/cooka-backend-web/userStatic?staticType=registerUser&timeSpaceType=hour&start="+ requestDate.s + "&end=" + requestDate.e,
                success: function(data1) {
                    // 当接收到的数据集为0时，自动补充当前时间，count为0；
                    if(data1.length === 0){
                        data1.push({
                            'count': 0,
                            'longTime': defaultFill
                        });
                    }

                    console.log(data1);

                    datasetR = []; date = []; countR = [];

                    datasetR = fillAuto(data1, 'hours', fillDate.start, fillDate.end);
                    datasetR.forEach(function(d) {
                        if(d.longTime){
                            d.time = moment.unix(d.longTime).format('HH:00');
                        } else {
                            d.time = moment(d.time, 'YYYYMMDDHH').format('HH;00');
                        }
                    });

                    console.log(datasetR);

                    datasetR.forEach(function(d){
                        date.push(d.time);
                        countR.push(d.count);
                    });

                    console.log(datasetR);

                    // 登录
                    $.ajax({
                        type: "get",
                        url: "/cooka-backend-web/userStatic?staticType=loginCount&timeSpaceType=hour&start="+ requestDate.s + "&end=" + requestDate.e,
                        success: function(data2) {
                            // 当接收到的数据集为0时，自动补充当前时间，count为0；
                            if(data2.length === 0){
                                data2.push({
                                    'count': 0,
                                    'longTime': defaultFill
                                });
                            }

                            datasetL = []; countL = [];

                            datasetL = fillAuto(data2, 'hours', fillDate.start, fillDate.end);
                            datasetL.forEach(function(d) {
                                if(d.longTime){
                                    d.time = moment.unix(d.longTime).format('HH:00');
                                } else {
                                    d.time = moment(d.time, 'YYYYMMDDHH').format('HH;00');
                                }
                            });

                            datasetL.forEach(function(d){
                                countL.push(d.count);
                            });

                            console.log(datasetL);

                            $('#userData-analysis-chart').highcharts({
                                title: {
                                    text: '会员动态分析',
                                    x: -20 //center
                                },
                                subtitle: {
                                    text: 'Source: Cookabuy.com',
                                    x: -20
                                },
                                xAxis: {
                                    categories: date
                                },
                                yAxis: {
                                    title: {
                                        text: '注册/登录 人数 (人)'
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 1,
                                        color: '#808080'
                                    }]
                                },
                                tooltip: {
                                    valueSuffix: '人'
                                },
                                legend: {
                                    layout: 'vertical',
                                    align: 'right',
                                    verticalAlign: 'middle',
                                    borderWidth: 0
                                },
                                series: [{
                                    name: '注册人数',
                                    data: countR,
                                    zones: [{
                                        value: 0,
                                        color: '#f7a35c'
                                    }, {
                                        value: 10,
                                        color: '#7cb5ec'
                                    }, {
                                        color: '#90ed7d'
                                    }]
                                }, {
                                    name: '登录人数',
                                    data: countL,
                                    zones: [{
                                        value: 0,
                                        color: '#f7a35c'
                                    }, {
                                        value: 10,
                                        color: '#7cb5ec'
                                    }, {
                                        color: '#90ed7d'
                                    }]
                                }],
                                credits:{
                                     enabled:false // 禁用版权信息
                                }
                            });
                        }
                    });
                }
            });
		}
		if(dataId === 1) {
            
            requestDate.s = moment().subtract(1, 'days').hours(0).format('YYYY/MM/DD/HH');
            requestDate.e = moment().subtract(1, 'days').hours(23).format('YYYY/MM/DD/HH');

            fillDate.start = moment(requestDate.s, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');
            fillDate.end = moment(requestDate.e, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');

            defaultFill = moment(fillDate.start, 'YYYY/MM/DD/HH').unix();

            console.log(fillDate);

            // 注册默认请求
            $.ajax({
                type: "get",
                url: "/cooka-backend-web/userStatic?staticType=registerUser&timeSpaceType=hour&start="+ requestDate.s + "&end=" + requestDate.e,
                success: function(data1) {
                    // 当接收到的数据集为0时，自动补充当前时间，count为0；
                    if(data1.length === 0){
                        data1.push({
                            'count': 0,
                            'longTime': defaultFill
                        });
                    }

                    console.log(data1);

                    datasetR = []; date = []; countR = [];

                    datasetR = fillAuto(data1, 'hours', fillDate.start, fillDate.end);
                    datasetR.forEach(function(d) {
                        if(d.longTime){
                            d.time = moment.unix(d.longTime).format('HH:00');
                        } else {
                            d.time = moment(d.time, 'YYYYMMDDHH').format('HH:00');
                        }
                    });

                    console.log(datasetR);

                    datasetR.forEach(function(d){
                        date.push(d.time);
                        countR.push(d.count);
                    });

                    console.log(datasetR);

                    // 登录
                    $.ajax({
                        type: "get",
                        url: "/cooka-backend-web/userStatic?staticType=loginCount&timeSpaceType=hour&start="+ requestDate.s + "&end=" + requestDate.e,
                        success: function(data2) {
                            // 当接收到的数据集为0时，自动补充当前时间，count为0；
                            if(data2.length === 0){
                                data2.push({
                                    'count': 0,
                                    'longTime': defaultFill
                                });
                            }

                            datasetL = []; countL = [];

                            datasetL = fillAuto(data2, 'hours', fillDate.start, fillDate.end);
                            datasetL.forEach(function(d) {
                                if(d.longTime){
                                    d.time = moment.unix(d.longTime).format('HH:00');
                                } else {
                                    d.time = moment(d.time, 'YYYYMMDDHH').format('HH:00');
                                }
                            });

                            datasetL.forEach(function(d){
                                countL.push(d.count);
                            });

                            console.log(datasetL);

                            $('#userData-analysis-chart').highcharts({
                                title: {
                                    text: '会员动态分析',
                                    x: -20 //center
                                },
                                subtitle: {
                                    text: 'Source: Cookabuy.com',
                                    x: -20
                                },
                                xAxis: {
                                    categories: date
                                },
                                yAxis: {
                                    title: {
                                        text: '注册/登录 人数 (人)'
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 1,
                                        color: '#808080'
                                    }]
                                },
                                tooltip: {
                                    valueSuffix: '人'
                                },
                                legend: {
                                    layout: 'vertical',
                                    align: 'right',
                                    verticalAlign: 'middle',
                                    borderWidth: 0
                                },
                                series: [{
                                    name: '注册人数',
                                    data: countR,
                                    zones: [{
                                        value: 0,
                                        color: '#f7a35c'
                                    }, {
                                        value: 10,
                                        color: '#7cb5ec'
                                    }, {
                                        color: '#90ed7d'
                                    }]
                                }, {
                                    name: '登录人数',
                                    data: countL,
                                    zones: [{
                                        value: 0,
                                        color: '#f7a35c'
                                    }, {
                                        value: 10,
                                        color: '#7cb5ec'
                                    }, {
                                        color: '#90ed7d'
                                    }]
                                }],
                                credits:{
                                     enabled:false // 禁用版权信息
                                }
                            });
                        }
                    });
                }
            });
		}
        if(dataId === 2) {

            requestDate.s = moment().subtract(6, 'days').hours(0).format('YYYY/MM/DD/HH');
            requestDate.e = moment().hours(23).format('YYYY/MM/DD/HH');

            fillDate.start = moment(requestDate.s, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');
            fillDate.end = moment(requestDate.e, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');

            defaultFill = moment(fillDate.start, 'YYYY/MM/DD').unix();

            // 注册默认请求
            $.ajax({
                type: "get",
                url: "/cooka-backend-web/userStatic?staticType=registerUser&timeSpaceType=day&start="+ requestDate.s + "&end=" + requestDate.e,
                success: function(data1) {
                    // 当接收到的数据集为0时，自动补充当前时间，count为0；
                    if(data1.length === 0){
                        data1.push({
                            'count': 0,
                            'longTime': defaultFill
                        });
                    }
                    datasetR = []; date = []; countR = [];

                    datasetR = fillAuto(data1, 'days', fillDate.start, fillDate.end);
                    datasetR.forEach(function(d) {
                        if(d.longTime){
                            d.time = moment.unix(d.longTime).format('MM/DD');
                        } else {
                            d.time = moment(d.time, 'YYYYMMDD').format('MM/DD');
                        }
                    });

                    datasetR.forEach(function(d){
                        date.push(d.time);
                        countR.push(d.count);
                    });

                    console.log(datasetR);

                    // 登录
                    $.ajax({
                        type: "get",
                        url: "/cooka-backend-web/userStatic?staticType=loginCount&timeSpaceType=day&start="+ requestDate.s + "&end=" + requestDate.e,
                        success: function(data2) {
                            // 当接收到的数据集为0时，自动补充当前时间，count为0；
                            if(data2.length === 0){
                                data2.push({
                                    'count': 0,
                                    'longTime': defaultFill
                                });
                            }

                            datasetL = []; countL = [];

                            datasetL = fillAuto(data2, 'days', fillDate.start, fillDate.end);
                            datasetL.forEach(function(d) {
                                if(d.longTime){
                                    d.time = moment.unix(d.longTime).format('YYYY/MM/DD');
                                } else {
                                    d.time = moment(d.time, 'YYYYMMDD').format('YYYY/MM/DD');
                                }
                            });

                            datasetL.forEach(function(d){
                                countL.push(d.count);
                            });

                            console.log(datasetL);

                            $('#userData-analysis-chart').highcharts({
                                title: {
                                    text: '会员动态分析',
                                    x: -20 //center
                                },
                                subtitle: {
                                    text: 'Source: Cookabuy.com',
                                    x: -20
                                },
                                xAxis: {
                                    categories: date
                                },
                                yAxis: {
                                    title: {
                                        text: '注册/登录 人数 (人)'
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 1,
                                        color: '#808080'
                                    }]
                                },
                                tooltip: {
                                    valueSuffix: '人'
                                },
                                legend: {
                                    layout: 'vertical',
                                    align: 'right',
                                    verticalAlign: 'middle',
                                    borderWidth: 0
                                },
                                series: [{
                                    name: '注册人数',
                                    data: countR,
                                    zones: [{
                                        value: 0,
                                        color: '#f7a35c'
                                    }, {
                                        value: 10,
                                        color: '#7cb5ec'
                                    }, {
                                        color: '#90ed7d'
                                    }]
                                }, {
                                    name: '登录人数',
                                    data: countL,
                                    zones: [{
                                        value: 0,
                                        color: '#f7a35c'
                                    }, {
                                        value: 10,
                                        color: '#7cb5ec'
                                    }, {
                                        color: '#90ed7d'
                                    }]
                                }],
                                credits:{
                                     enabled:false // 禁用版权信息
                                }
                            });
                        }
                    });
                }
            });
        }
        if(dataId === 3) {
            requestDate.s = moment().subtract(29, 'days').hours(0).format('YYYY/MM/DD/HH');
            requestDate.e = moment().hours(23).format('YYYY/MM/DD/HH');

            fillDate.start = moment(requestDate.s, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');
            fillDate.end = moment(requestDate.e, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');

            defaultFill = moment(fillDate.start, 'YYYY/MM/DD').unix();

            // 注册默认请求
            $.ajax({
                type: "get",
                url: "/cooka-backend-web/userStatic?staticType=registerUser&timeSpaceType=day&start="+ requestDate.s + "&end=" + requestDate.e,
                success: function(data1) {
                    // 当接收到的数据集为0时，自动补充当前时间，count为0；
                    if(data1.length === 0){
                        data1.push({
                            'count': 0,
                            'longTime': defaultFill
                        });
                    }
                    datasetR = []; date = []; countR = [];

                    datasetR = fillAuto(data1, 'days', fillDate.start, fillDate.end);
                    datasetR.forEach(function(d) {
                        if(d.longTime){
                            d.time = moment.unix(d.longTime).format('MM/DD');
                        } else {
                            d.time = moment(d.time, 'YYYYMMDD').format('MM/DD');
                        }
                    });

                    datasetR.forEach(function(d){
                        date.push(d.time);
                        countR.push(d.count);
                    });

                    console.log(datasetR);

                    // 登录
                    $.ajax({
                        type: "get",
                        url: "/cooka-backend-web/userStatic?staticType=loginCount&timeSpaceType=day&start="+ requestDate.s + "&end=" + requestDate.e,
                        success: function(data2) {
                            // 当接收到的数据集为0时，自动补充当前时间，count为0；
                            if(data2.length === 0){
                                data2.push({
                                    'count': 0,
                                    'longTime': defaultFill
                                });
                            }

                            datasetL = []; countL = [];

                            datasetL = fillAuto(data2, 'days', fillDate.start, fillDate.end);
                            datasetL.forEach(function(d) {
                                if(d.longTime){
                                    d.time = moment.unix(d.longTime).format('MM/DD');
                                } else {
                                    d.time = moment(d.time, 'YYYYMMDD').format('MM/DD');
                                }
                            });

                            datasetL.forEach(function(d){
                                countL.push(d.count);
                            });

                            console.log(datasetL);

                            $('#userData-analysis-chart').highcharts({
                                title: {
                                    text: '会员动态分析',
                                    x: -20 //center
                                },
                                subtitle: {
                                    text: 'Source: Cookabuy.com',
                                    x: -20
                                },
                                xAxis: {
                                    categories: date
                                },
                                yAxis: {
                                    title: {
                                        text: '注册/登录 人数 (人)'
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 1,
                                        color: '#808080'
                                    }]
                                },
                                tooltip: {
                                    valueSuffix: '人'
                                },
                                legend: {
                                    layout: 'vertical',
                                    align: 'right',
                                    verticalAlign: 'middle',
                                    borderWidth: 0
                                },
                                series: [{
                                    name: '注册人数',
                                    data: countR,
                                    zones: [{
                                        value: 0,
                                        color: '#f7a35c'
                                    }, {
                                        value: 10,
                                        color: '#7cb5ec'
                                    }, {
                                        color: '#90ed7d'
                                    }]
                                }, {
                                    name: '登录人数',
                                    data: countL,
                                    zones: [{
                                        value: 0,
                                        color: '#f7a35c'
                                    }, {
                                        value: 10,
                                        color: '#7cb5ec'
                                    }, {
                                        color: '#90ed7d'
                                    }]
                                }],
                                credits:{
                                     enabled:false // 禁用版权信息
                                }
                            });
                        }
                    });
                }
            });
        }
        if(dataId === 4) {
            requestDate.s = moment().subtract(182, 'days').hours(0).format('YYYY/MM/DD/HH');
            requestDate.e = moment().hours(23).format('YYYY/MM/DD/HH');

            fillDate.start = moment(requestDate.s, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');
            fillDate.end = moment(requestDate.e, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');

            defaultFill = moment(fillDate.start, 'YYYY/MM').unix();

            // 注册默认请求
            $.ajax({
                type: "get",
                url: "/cooka-backend-web/userStatic?staticType=registerUser&timeSpaceType=month&start="+ requestDate.s + "&end=" + requestDate.e,
                success: function(data1) {
                    // 当接收到的数据集为0时，自动补充当前时间，count为0；
                    if(data1.length === 0){
                        data1.push({
                            'count': 0,
                            'longTime': defaultFill
                        });
                    }
                    datasetR = []; date = []; countR = [];

                    datasetR = fillAuto(data1, 'months', fillDate.start, fillDate.end);
                    datasetR.forEach(function(d) {
                        if(d.longTime){
                            d.time = moment.unix(d.longTime).format('YYYY/MM');
                        } else {
                            d.time = moment(d.time, 'YYYYMM').format('YYYY/MM');
                        }
                    });

                    datasetR.forEach(function(d){
                        date.push(d.time);
                        countR.push(d.count);
                    });

                    console.log(datasetR);

                    // 登录
                    $.ajax({
                        type: "get",
                        url: "/cooka-backend-web/userStatic?staticType=loginCount&timeSpaceType=month&start="+ requestDate.s + "&end=" + requestDate.e,
                        success: function(data2) {
                            // 当接收到的数据集为0时，自动补充当前时间，count为0；
                            if(data2.length === 0){
                                data2.push({
                                    'count': 0,
                                    'longTime': defaultFill
                                });
                            }

                            datasetL = []; countL = [];

                            datasetL = fillAuto(data2, 'months', fillDate.start, fillDate.end);
                            datasetL.forEach(function(d) {
                                if(d.longTime){
                                    d.time = moment.unix(d.longTime).format('YYYY/MM');
                                } else {
                                    d.time = moment(d.time, 'YYYYMM').format('YYYY/MM');
                                }
                            });

                            datasetL.forEach(function(d){
                                countL.push(d.count);
                            });

                            console.log(datasetL);

                            $('#userData-analysis-chart').highcharts({
                                title: {
                                    text: '会员动态分析',
                                    x: -20 //center
                                },
                                subtitle: {
                                    text: 'Source: Cookabuy.com',
                                    x: -20
                                },
                                xAxis: {
                                    categories: date
                                },
                                yAxis: {
                                    title: {
                                        text: '注册/登录 人数 (人)'
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 1,
                                        color: '#808080'
                                    }]
                                },
                                tooltip: {
                                    valueSuffix: '人'
                                },
                                legend: {
                                    layout: 'vertical',
                                    align: 'right',
                                    verticalAlign: 'middle',
                                    borderWidth: 0
                                },
                                series: [{
                                    name: '注册人数',
                                    data: countR,
                                    zones: [{
                                        value: 0,
                                        color: '#f7a35c'
                                    }, {
                                        value: 10,
                                        color: '#7cb5ec'
                                    }, {
                                        color: '#90ed7d'
                                    }]
                                }, {
                                    name: '登录人数',
                                    data: countL,
                                    zones: [{
                                        value: 0,
                                        color: '#f7a35c'
                                    }, {
                                        value: 10,
                                        color: '#7cb5ec'
                                    }, {
                                        color: '#90ed7d'
                                    }]
                                }],
                                credits:{
                                     enabled:false // 禁用版权信息
                                }
                            });
                        }
                    });
                }
            });
        }
        if(dataId === 5) {
            requestDate.s = moment().subtract(365, 'days').hours(0).format('YYYY/MM/DD/HH');
            requestDate.e = moment().hours(23).format('YYYY/MM/DD/HH');

            fillDate.start = moment(requestDate.s, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');
            fillDate.end = moment(requestDate.e, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');

            defaultFill = moment(fillDate.start, 'YYYY/MM').unix();

            // 注册默认请求
            $.ajax({
                type: "get",
                url: "/cooka-backend-web/userStatic?staticType=registerUser&timeSpaceType=month&start="+ requestDate.s + "&end=" + requestDate.e,
                success: function(data1) {
                    // 当接收到的数据集为0时，自动补充当前时间，count为0；
                    if(data1.length === 0){
                        data1.push({
                            'count': 0,
                            'longTime': defaultFill
                        });
                    }
                    datasetR = []; date = []; countR = [];

                    datasetR = fillAuto(data1, 'months', fillDate.start, fillDate.end);
                    datasetR.forEach(function(d) {
                        if(d.longTime){
                            d.time = moment.unix(d.longTime).format('YYYY/MM');
                        } else {
                            d.time = moment(d.time, 'YYYYMMDD').format('YYYY/MM');
                        }
                    });

                    datasetR.forEach(function(d){
                        date.push(d.time);
                        countR.push(d.count);
                    });

                    console.log(datasetR);

                    // 登录
                    $.ajax({
                        type: "get",
                        url: "/cooka-backend-web/userStatic?staticType=loginCount&timeSpaceType=month&start="+ requestDate.s + "&end=" + requestDate.e,
                        success: function(data2) {
                            // 当接收到的数据集为0时，自动补充当前时间，count为0；
                            if(data2.length === 0){
                                data2.push({
                                    'count': 0,
                                    'longTime': defaultFill
                                });
                            }

                            datasetL = []; countL = [];

                            datasetL = fillAuto(data2, 'months', fillDate.start, fillDate.end);
                            datasetL.forEach(function(d) {
                                if(d.longTime){
                                    d.time = moment.unix(d.longTime).format('YYYY/MM');
                                } else {
                                    d.time = moment(d.time, 'YYYYMMDD').format('YYYY/MM');
                                }
                            });

                            datasetL.forEach(function(d){
                                countL.push(d.count);
                            });

                            console.log(datasetL);

                            $('#userData-analysis-chart').highcharts({
                                title: {
                                    text: '会员动态分析',
                                    x: -20 //center
                                },
                                subtitle: {
                                    text: 'Source: Cookabuy.com',
                                    x: -20
                                },
                                xAxis: {
                                    categories: date
                                },
                                yAxis: {
                                    title: {
                                        text: '注册/登录 人数 (人)'
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 1,
                                        color: '#808080'
                                    }]
                                },
                                tooltip: {
                                    valueSuffix: '人'
                                },
                                legend: {
                                    layout: 'vertical',
                                    align: 'right',
                                    verticalAlign: 'middle',
                                    borderWidth: 0
                                },
                                series: [{
                                    name: '注册人数',
                                    data: countR,
                                    zones: [{
                                        value: 0,
                                        color: '#f7a35c'
                                    }, {
                                        value: 10,
                                        color: '#7cb5ec'
                                    }, {
                                        color: '#90ed7d'
                                    }]
                                }, {
                                    name: '登录人数',
                                    data: countL,
                                    zones: [{
                                        value: 0,
                                        color: '#f7a35c'
                                    }, {
                                        value: 10,
                                        color: '#7cb5ec'
                                    }, {
                                        color: '#90ed7d'
                                    }]
                                }],
                                credits:{
                                     enabled:false // 禁用版权信息
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});