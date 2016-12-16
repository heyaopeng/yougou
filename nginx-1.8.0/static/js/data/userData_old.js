$(document).ready(function() {

    var dataset;    // 数据集

    var parseYear = d3.time.format("%Y").parse;
    var parseMonth = d3.time.format("%Y%m").parse;
    var parseDate = d3.time.format("%Y%m%d").parse;
    var parseHour = d3.time.format("%Y%m%d%H").parse;

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
        var nd = cloneObj(data);

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

        dataD.ds = moment.unix(buildOpt.d[0].longTime).format(buildOpt.f);
        dataD.de = moment.unix(buildOpt.d[buildOpt.d.length-1].longTime).format(buildOpt.f);
        dataD.ms = buildOpt.p(dataD.ds);
        dataD.me = buildOpt.p(dataD.de);
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

        var newData = cloneObj(data);

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

    // 请求数据的开始日期和结束日期
    var requestDate = {
        's':'',
        'e':''
    };

    // 填充到数据的开始日期和结束日期
    var fillDate = {
        'start': '',
        'end': ''
    };

    var registerSVG, registerChart, x, lines, now;

    requestDate.s = moment().subtract(6, 'days').hours(0).format('YYYY/MM/DD/HH');
    requestDate.e = moment().hours(23).format('YYYY/MM/DD/HH');

    fillDate.start = moment(requestDate.s, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');
    fillDate.end = moment(requestDate.e, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');

    now = moment(moment().format('YYYY/MM/DD'), 'YYYY/MM/DD').unix();
    // 注册默认请求
    $.ajax({
        type: "get",
        url: "/cooka-backend-web/userStatic?staticType=registerUser&timeSpaceType=day&start="+ requestDate.s + "&end=" + requestDate.e,
        success: function(data) {
        	// 当接收到的数据集为0时，自动补充当前时间，count为0；
            if(data.length === 0){
            	data.push({
            		'count': 0,
            		'longTime': now
            	});
            }
            dataset = fillAuto(data, 'days', fillDate.start, fillDate.end);
            dataset.forEach(function(d) {
                if(d.longTime){
                    d.time = moment.unix(d.longTime).format('YYYY/MM/DD');
                } else {
                    d.time = moment(d.time, 'YYYYMMDD').format('YYYY/MM/DD');
                }
            });

            registerSVG = dimple.newSvg('.userData-analysis-register', 900, 500);

            registerChart = new dimple.chart(registerSVG, dataset);
            registerChart.setBounds(60, 30, 800, 400);

            x = registerChart.addCategoryAxis('x', 'time');
            y = registerChart.addMeasureAxis('y', 'count');

            x.dateParseFormat = '%B %d';

            x.addOrderRule('time');

            registerChart.addColorAxis("count", ["green", "yellow", "red"]);

            lines = registerChart.addSeries(null, dimple.plot.line); 
            lines.lineWeight = 2;
            lines.lineMarkers = true;

            registerChart.ease = "linear";

            registerChart.draw();
        }
    });

	// 登录

	$('.statistics-interval').find('li').on('click', function(){
		var $this = $(this);
        var dataId = $this.data('id');
		if (!$this.hasClass('active')) {
			var $dataId = parseInt($this.data('id'));

			$this.siblings('li').removeClass('active');
            $this.addClass('active');
		}

		if (dataId === 0) {
			now = moment(moment().format('YYYY/MM/DD/HH'), 'YYYY/MM/DD/HH').unix();
			console.log(now);
			requestDate.s = moment().hours(0).format('YYYY/MM/DD/HH');
            requestDate.e = moment().hours(23).format('YYYY/MM/DD/HH');

            fillDate.start = moment(requestDate.s, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');
            fillDate.end = moment(requestDate.e, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');

            // ajax请求
            $.ajax({
                type: "get",
                url: "/cooka-backend-web/userStatic?staticType=registerUser&timeSpaceType=hour&start="+ requestDate.s + "&end=" + requestDate.e,
                success: function(data) {
                    console.log(data);
                    dataset = [];
                    // 当接收到的数据集为0时，自动补充当前时间，count为0；
                    if(data.length === 0){
                    	data.push({
                    		'count': 0,
                    		'longTime': now
                    	});
                    }
                    dataset = fillAuto(data, 'hours', fillDate.start, fillDate.end);

                    dataset.forEach(function(d) {
                        if(d.longTime){
                            d.time = moment.unix(d.longTime).format('HH:00');
                        } else {
                            d.time = moment(d.time, 'YYYYMMDDHH').format('HH:00');
                        }
                    });

                    console.log(dataset);

                    $('.userData-analysis-register').find('svg').remove();

                    registerSVG = dimple.newSvg('.userData-analysis-register', 900, 500);

		            registerChart = new dimple.chart(registerSVG, dataset);
		            registerChart.setBounds(60, 30, 800, 400);

		            x = registerChart.addCategoryAxis('x', 'time');
		            x.ticks = 12;
		            y = registerChart.addMeasureAxis('y', 'count');

		            x.addOrderRule('time');

		            registerChart.addColorAxis("count", ["green", "yellow", "red"]);

		            lines = registerChart.addSeries(null, dimple.plot.line); 
		            lines.lineWeight = 2;
		            lines.lineMarkers = true;

		            registerChart.draw();
                }
            });
		}
		if(dataId === 1) {
			now = moment(moment().subtract(1, 'days').format('YYYY/MM/DD/HH'), 'YYYY/MM/DD/HH').unix();
			requestDate.s = moment().subtract(1, 'days').hours(0).format('YYYY/MM/DD/HH');
            requestDate.e = moment().subtract(1, 'days').hours(23).format('YYYY/MM/DD/HH');

            fillDate.start = moment(requestDate.s, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');
            fillDate.end = moment(requestDate.e, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');

            // ajax请求
            $.ajax({
                type: "get",
                url: "/cooka-backend-web/userStatic?staticType=registerUser&timeSpaceType=hour&start="+ requestDate.s + "&end=" + requestDate.e,
                success: function(data) {
                    console.log(data);
                    dataset = [];
                    // 当接收到的数据集为0时，自动补充当前时间，count为0；
                    if(data.length === 0){
                    	data.push({
                    		'count': 0,
                    		'longTime': now
                    	});
                    }
                    dataset = fillAuto(data, 'hours', fillDate.start, fillDate.end);

                    dataset.forEach(function(d) {
                        if(d.longTime){
                            d.time = moment.unix(d.longTime).format('HH:00');
                        } else {
                            d.time = moment(d.time, 'YYYYMMDDHH').format('HH:00');
                        }
                    });

                    $('.userData-analysis-register').find('svg').remove();

                    registerSVG = dimple.newSvg('.userData-analysis-register', 900, 500);

		            registerChart = new dimple.chart(registerSVG, dataset);
		            registerChart.setBounds(60, 30, 800, 400);

		            x = registerChart.addCategoryAxis('x', 'time');
		            registerChart.addMeasureAxis('y', 'count');

		            x.addOrderRule('time');

		            registerChart.addColorAxis("count", ["green", "yellow", "red"]);

		            lines = registerChart.addSeries(null, dimple.plot.line); 
		            lines.lineWeight = 2;
		            lines.lineMarkers = true;

		            registerChart.draw();
                }
            });
		}
        if(dataId === 2) {
        	now = moment(moment().format('YYYY/MM/DD'), 'YYYY/MM/DD').unix();
            requestDate.s = moment().subtract(6, 'days').hours(0).format('YYYY/MM/DD/HH');
            requestDate.e = moment().hours(23).format('YYYY/MM/DD/HH');

            fillDate.start = moment(requestDate.s, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');
            fillDate.end = moment(requestDate.e, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');

            // ajax请求
            $.ajax({
                type: "get",
                url: "/cooka-backend-web/userStatic?staticType=registerUser&timeSpaceType=day&start="+ requestDate.s + "&end=" + requestDate.e,
                success: function(data) {
                	// 当接收到的数据集为0时，自动补充当前时间，count为0；
                    if(data.length === 0){
                    	data.push({
                    		'count': 0,
                    		'longTime': now
                    	});
                    }

                    dataset = fillAuto(data, 'days', fillDate.start, fillDate.end);
                    dataset.forEach(function(d) {
                        if(d.longTime){
                            d.time = moment.unix(d.longTime).format('YYYY/MM/DD');
                        } else {
                            d.time = moment(d.time, 'YYYYMMDD').format('YYYY/MM/DD');
                        }
                    });

                    $('.userData-analysis-register').find('svg').remove();

                    registerSVG = dimple.newSvg('.userData-analysis-register', 900, 500);

                    registerChart = new dimple.chart(registerSVG, dataset);
                    registerChart.setBounds(60, 30, 800, 400);

                    x = registerChart.addCategoryAxis('x', 'time');
                    y = registerChart.addMeasureAxis('y', 'count');

                    x.addOrderRule('time');

                    registerChart.addColorAxis("count", ["green", "yellow", "red"]);

                    lines = registerChart.addSeries(null, dimple.plot.line); 
                    lines.lineWeight = 2;
                    lines.lineMarkers = true;

                    registerChart.draw();
                }
            });
        }
        if(dataId === 3) {
        	now = moment(moment().format('YYYY/MM/DD'), 'YYYY/MM/DD').unix();
            requestDate.s = moment().subtract(30, 'days').hours(0).format('YYYY/MM/DD/HH');
            requestDate.e = moment().hours(23).format('YYYY/MM/DD/HH');

            fillDate.start = moment(requestDate.s, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');
            fillDate.end = moment(requestDate.e, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');

            // ajax请求
            $.ajax({
                type: "get",
                url: "/cooka-backend-web/userStatic?staticType=registerUser&timeSpaceType=day&start="+ requestDate.s + "&end=" + requestDate.e,
                success: function(data) {
                	// 当接收到的数据集为0时，自动补充当前时间，count为0；
                    if(data.length === 0){
                    	data.push({
                    		'count': 0,
                    		'longTime': now
                    	});
                    }

                    dataset = fillAuto(data, 'days', fillDate.start, fillDate.end);
                    dataset.forEach(function(d) {
                        if(d.longTime){
                            d.time = moment.unix(d.longTime).format('MMM DD');
                        } else {
                            d.time = moment(d.time, 'YYYYMMDD').format('MMM DD');
                        }
                    });

                    $('.userData-analysis-register').find('svg').remove();

                    registerSVG = dimple.newSvg('.userData-analysis-register', 900, 500);

                    registerChart = new dimple.chart(registerSVG, dataset);
                    registerChart.setBounds(60, 30, 800, 400);

                    x = registerChart.addCategoryAxis('x', 'time');
                    y = registerChart.addMeasureAxis('y', 'count');

                    x.addOrderRule('time');

                    registerChart.addColorAxis("count", ["green", "yellow", "red"]);

                    lines = registerChart.addSeries(null, dimple.plot.line); 
                    lines.lineWeight = 2;
                    lines.lineMarkers = true;

                    registerChart.draw();
                }
            });
        }
        if(dataId === 4) {
        	now = moment(moment().format('YYYY/MM/DD'), 'YYYY/MM/DD').unix();
            requestDate.s = moment().subtract(182, 'days').hours(0).format('YYYY/MM/DD/HH');
            requestDate.e = moment().hours(23).format('YYYY/MM/DD/HH');

            fillDate.start = moment(requestDate.s, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');
            fillDate.end = moment(requestDate.e, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');

            // ajax请求
            $.ajax({
                type: "get",
                url: "/cooka-backend-web/userStatic?staticType=registerUser&timeSpaceType=month&start="+ requestDate.s + "&end=" + requestDate.e,
                success: function(data) {
                	// 当接收到的数据集为0时，自动补充当前时间，count为0；
                    if(data.length === 0){
                    	data.push({
                    		'count': 0,
                    		'longTime': now
                    	});
                    }

                    dataset = fillAuto(data, 'months', fillDate.start, fillDate.end);
                    dataset.forEach(function(d) {
                        if(d.longTime){
                            d.time = moment.unix(d.longTime).format('YYYY MMM');
                        } else {
                            d.time = moment(d.time, 'YYYYMMDD').format('YYYY MMM');
                        }
                    });

                    $('.userData-analysis-register').find('svg').remove();

                    registerSVG = dimple.newSvg('.userData-analysis-register', 900, 500);

                    registerChart = new dimple.chart(registerSVG, dataset);
                    registerChart.setBounds(60, 30, 800, 400);

                    x = registerChart.addCategoryAxis('x', 'time');
                    y = registerChart.addMeasureAxis('y', 'count');

                    x.addOrderRule('time');
                    x.timePeriod = d3.time.days;
					x.timeInterval = 5;

                    registerChart.addColorAxis("count", ["green", "yellow", "red"]);

                    lines = registerChart.addSeries(null, dimple.plot.line); 
                    lines.lineWeight = 2;
                    lines.lineMarkers = true;

                    registerChart.draw();
                }
            });
        }
        if(dataId === 5) {
        	now = moment(moment().format('YYYY/MM'), 'YYYY/MM').unix();
            requestDate.s = moment().subtract(365, 'days').hours(0).format('YYYY/MM/DD/HH');
            requestDate.e = moment().hours(23).format('YYYY/MM/DD/HH');

            fillDate.start = moment(requestDate.s, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');
            fillDate.end = moment(requestDate.e, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');

            // ajax请求
            $.ajax({
                type: "get",
                url: "/cooka-backend-web/userStatic?staticType=registerUser&timeSpaceType=month&start="+ requestDate.s + "&end=" + requestDate.e,
                success: function(data) {
                	// 当接收到的数据集为0时，自动补充当前时间，count为0；
                    if(data.length === 0){
                    	data.push({
                    		'count': 0,
                    		'longTime': now
                    	});
                    }

                    dataset = fillAuto(data, 'months', fillDate.start, fillDate.end);
                    dataset.forEach(function(d) {
                        if(d.longTime){
                            d.time = moment.unix(d.longTime).format('YYYY MMM');
                        } else {
                            d.time = moment(d.time, 'YYYYMMDD').format('YYYY MMM');
                        }
                    });

                    $('.userData-analysis-register').find('svg').remove();

                    registerSVG = dimple.newSvg('.userData-analysis-register', 900, 500);

                    registerChart = new dimple.chart(registerSVG, dataset);
                    registerChart.setBounds(60, 30, 800, 400);

                    x = registerChart.addCategoryAxis('x', 'time');
                    y = registerChart.addMeasureAxis('y', 'count');

                    x.addOrderRule('time');
                    x.timePeriod = d3.time.days;
					x.timeInterval = 5;

                    registerChart.addColorAxis("count", ["green", "yellow", "red"]);

                    lines = registerChart.addSeries(null, dimple.plot.line); 
                    lines.lineWeight = 2;
                    lines.lineMarkers = true;

                    registerChart.draw();
                }
            });
        }
    });
});