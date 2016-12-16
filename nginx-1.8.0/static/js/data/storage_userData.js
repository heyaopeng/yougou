$(document).ready(function() {
    var margin = {
            top: 80,
            right: 80,
            bottom: 30,
            left: 80
        },
        width = 900 - margin.left - margin.right,
        height = 580 - margin.top - margin.bottom;

    var dataset;    // 数据集

    var dataTime;   // 接收到的数据的时间

    var xDomainMin, xDmainMax;   // x输入最小和最大值
    var yDomainMin, yDmainMax;   // y输入最小和最大值

    var parseYear = d3.time.format("%Y").parse;
    var parseMonth = d3.time.format("%Y%m").parse;
    var parseDate = d3.time.format("%Y%m%d").parse;
    var parseHour = d3.time.format("%Y%m%d%H").parse;

    var bisectDate = d3.bisector(function(d) { return d.time; }).left;

    var formatC = function(d) {return "count:" + d; };
    var formatT = function(d) {
        d = moment(d).format('YYYY/MM/DD');
        return "date:" + d; 
    };

    var x = d3.time.scale()
    		.range([0, width]),
    	y = d3.scale.linear()
    		.range([height-margin.top, 0]);

    var xAxis, yAxis;   // x,y轴

    var lineGenerate = d3.svg.line() // 绑定数据
        .interpolate("linear")
        .x(function(d) {
            return x(d.time);
        })
        .y(function(d) {
            return y(d.count);
        });

    function renderXAxis(targetSVG){
    	xAxis = d3.svg.axis()
    			.scale(x)
    			.orient('bottom');

    	d3.select(targetSVG).append('g')
    		.attr('class', 'x-axis')
    		.attr('transform', function(){
    			return 'translate('+ margin.left + ','+ height + ')'; 
    		})
    		.call(xAxis);
    }

    function renderYAxis(targetSVG){
        yAxis = d3.svg.axis()
                .scale(y)
                .orient('left');

        d3.select(targetSVG).append('g')
            .attr('class', 'y-axis')
            .attr('transform', function(){
                return 'translate('+ margin.left + ','+ margin.top + ')'; 
            })
            .call(yAxis);
    }

    function rednderXGridLine() {
        var lines = d3.selectAll("g.x-axis g.tick")
                .select("line.grid-line")
                .remove();
                
        lines = d3.selectAll("g.x-axis g.tick")
                .append("line") 
                .classed("grid-line", true);

        lines.attr("x1", 0) 
                .attr("y1", 0)
                .attr("x2", 0)
                .attr("y2", - height + margin.top); 
    }

    function rednderYGridLine() {
        var lines = d3.selectAll("g.y-axis g.tick")
                .select("line.grid-line")
                .remove();
                
        lines = d3.selectAll("g.y-axis g.tick")
                .append("line")
                .classed("grid-line", true);

        lines.attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", width)
            .attr("y2", 0); 
    }

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

    var requestDate = {
        's':'',
        'e':''
    };

    

	$('.statistics-interval').find('li').on('click', function(){
		var $this = $(this);
        var dataId = $this.data('id');
		if (!$this.hasClass('active')) {
			var $dataId = parseInt($this.data('id'));

			$this.siblings('li').removeClass('active');
            $this.addClass('active');
		}
		var fillDate = {
	        'start': '',
	        'end': ''
	    };
		if (dataId === 0) {
			requestDate.s = '2015/08/25/00';
            requestDate.e = '2015/08/31/23';
		}
        if(dataId === 2) {

            requestDate.s = '2015/08/25/00';
            requestDate.e = '2015/08/31/23';

            fillDate.start = moment(requestDate.s, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');
            fillDate.end = moment(requestDate.e, 'YYYY/MM/DD/HH').format('YYYYMMDDHH');

            // ajax请求
            $.ajax({
                type: "get",
                url: "/cooka-backend-web/userStatic?staticType=registerUser&timeSpaceType=day&start="+ requestDate.s + "&end=" + requestDate.e,
                success: function(data) {
                    dataset = fillAuto(data, 'days', fillDate.start, fillDate.end);
                    dataset.forEach(function(d) {
                        if(d.longTime){
                            d.time = moment.unix(d.longTime).format('YYYY/MM/DD');
                        } else {
                            d.time = moment(d.time, 'YYYYMMDD').format('YYYY/MM/DD');
                        }
                    });

                    console.log(dataset);

                    var registerSVG = d3.select('.userData-analysis-register')
                                .append('svg')
                                .classed('registerSVG', true)
                                .attr('width', width + margin.left + margin.right)
                                .attr('height', height + margin.top + margin.bottom);

                    xDomainMin = dataset[0].time;
                    xDomainMax = dataset[dataset.length - 1].time;
                    console.log(xDomainMin);
                    console.log(xDomainMax);

                    x.domain([xDomainMin, xDomainMax]);

                    yDomainMax = d3.max(dataset, function(d){
                        return d.count;
                    });
                    y.domain([0, yDomainMax]);

                    renderXAxis('.registerSVG');
                    renderYAxis('.registerSVG');
                    rednderYGridLine();
                    rednderXGridLine();

                    registerSVG
                        .append("path")
                        .datum(dataset)
                        .attr('transform', 'translate('+ margin.left + ','+ margin.top + ')')
                        .attr("class", "target-line")
                        .attr("d", lineGenerate);

                    var focus = registerSVG.append("g")
                    .attr("class", "focus")
                    .style("display", "none");

                    focus.append("circle")
                        .attr("r", 4)
                        .style('fill', 'teal');

                    focus.append("text")
                        .classed('count', true)
                        .attr("x", 9)
                        .attr("dy", ".35em")
                        .attr('transform', 'translate('+ (-40) + ','+ (-20) + ')');

                    focus.append("text")
                        .classed('time', true)
                        .attr("x", 9)
                        .attr("dy", ".35em")
                        .attr('transform', 'translate('+ (-40) + ','+ (-40) + ')');

                    registerSVG.append("rect")
                        .attr("class", "overlay")
                        .attr('transform', 'translate('+ margin.left + ','+ margin.top + ')')
                        .attr("width", width)
                        .attr("height", height-margin.top)
                        .on("mouseover", function() { focus.style("display", null); })
                        .on("mouseout", function() { focus.style("display", "none"); })
                        .on("mousemove", mousemove);

                    function mousemove() {
                        var x0 = x.invert(d3.mouse(this)[0]),
                            i = bisectDate(dataset, x0, 1),
                            d0 = dataset[i - 1],
                            d1 = dataset[i],
                            d = x0 - d0.time > d1.time - x0 ? d1 : d0;
                        focus.attr("transform", "translate(" + (x(d.time)+margin.left) + "," + (y(d.count)+margin.top) + ")");
                        focus.select(".count").text(formatC(d.count));
                        focus.select(".time").text(formatT(d.time));
                    }
                }
            });
        }
    });
    
    $('li.week').trigger('click');

});