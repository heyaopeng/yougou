$(document).ready(function() {
    // mbostock 的 margin 约定
    var margin = {
            top: 20,
            right: 50,
            bottom: 30,
            left: 50
        },
        width = 900 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%Y%m%d").parse; // 格式化日期
    var parseDate1 = d3.time.format('%Y/%m/%d/%H').parse;
    var parseDate2 = d3.time.format('%Y/%m/%d').parse;
    var parseDate3 = d3.time.format('%Y/%m').parse;
    var bisectDate = d3.bisector(function(d) { return d.time; }).left;

    var formatCurrency = function(d) { return "count:" + d; };

    /**
     * [cloneObj 深度复制对象]
     * @param  {[Object]} obj [要复制的对象]
     * @return {[Object]}     [返回一个复制的对象]
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

    $('.vistor-trends-period-select').find('li').on('click', function() {
        var $this = $(this);
        if (!$this.hasClass('active')) {
            var dataset = []; // 新的数据集初始化
            var $d, // 作为dataset的元素 
                $start, // 搜索的开始日期
                $end; // 搜索的结束日期

            var $dataId = parseInt($this.data('id'));
            $this.siblings('li').removeClass('active');
            $this.addClass('active');


            // x和y的缩放
            var xScale = d3.time.scale()
                .range([0, width]);
            var yScale = d3.scale.linear()
                .range([height, 0]);

            var xAxis, yAxis;

            var $timeStart, // 搜索结果的第一个数据
                $timeEnd; // 搜索结果的最后一个数据

            /**
             * [buildChart 绘画svg]
             * @param  {[String]} clName [选择器名称]
             * @param  {[function]} xScale [x的缩放函数]
             * @param  {[function]} yScale [y的缩放函数]
             * @return {[html]}        [返回渲染结果svg]
             */
            var buildChart = function(clName) {
                $('.canvas1').remove();
                $('.canvas').append('<div class="canvas1"></div>');

                var line = d3.svg.line() // 绑定数据
                    .interpolate("linear")
                    .x(function(d) {
                        return xScale(d.time);
                    })
                    .y(function(d) {
                        return yScale(d.count);
                    });

                /**
                 * [svgRegister 创建SVG]
                 * @type {[Dom]}
                 */
                var svgRegister = d3.select('.canvas').select(clName).append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                // 添加x轴
                svgRegister
                    .append('g')
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                // 添加y轴
                svgRegister
                    .append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("注册人数 (人)");

                svgRegister
                    .append("path")
                    .datum(dataset)
                    .attr("class", "line")
                    .attr("d", line);

                var focus = svgRegister.append("g")
                    .attr("class", "focus")
                    .style("display", "none");

                focus.append("circle")
                    .attr("r", 4)
                    .style('fill', 'teal');

                focus.append("text")
                    .attr("x", 9)
                    .attr("dy", ".35em");

                svgRegister.append("rect")
                    .attr("class", "overlay")
                    .attr("width", width)
                    .attr("height", height)
                    .on("mouseover", function() { focus.style("display", null); })
                    .on("mouseout", function() { focus.style("display", "none"); })
                    .on("mousemove", mousemove);

                function mousemove() {
                    var x0 = xScale.invert(d3.mouse(this)[0]),
                        i = bisectDate(dataset, x0, 1),
                        d0 = dataset[i - 1],
                        d1 = dataset[i],
                        d = x0 - d0.time > d1.time - x0 ? d1 : d0;
                    focus.attr("transform", "translate(" + xScale(d.time) + "," + yScale(d.count) + ")");
                    focus.select("text").text(formatCurrency(d.count));
                }
            };

            /**
             * [formatD 格式化数据]
             * @param  {[Array]} dataset [要格式的数据集]
             * @return {[Array]}         [格式化后的数据不改变数据结构]
             */
            var formatD = function(dataset, parseF) {
                $.each(dataset, function(index, el) {
                    var $this = $(this);
                    $this[0].time = parseF($this[0].time);
                    $this[0].count = +parseInt($this[0].count);
                });
            };

            /**
             * [hoursBuild 以小时为单位绘制svg]
             * @param  {[string]} $start [搜索的开始时间]
             * @param  {[string]} $end   [搜索的结束时间]
             * @return {[html]}        [绘制结果]
             */
            var hoursBuild = function($start, $end) {
                $.ajax({
                    url: '/cooka-backend-web/userStatic?staticType=registerUser&timeSpaceType=hour&start=' + $start + '&end=' + $end,
                    type: 'Get',
                    data: '',
                    success: function(result) {
                        dataset = cloneObj(result);
                        if (dataset.length) {
                            $d = [];
                            var $c, $t;
                            $timeStart = moment(dataset[0].time, 'YYYY/MM/DD/HH').hours();
                            $timeEnd = moment(dataset[dataset.length - 1].time, 'YYYY/MM/DD/HH').hours();

                            for (var m = $timeStart - 1; m >= 0; m--) {
                                $c = 0;
                                $t = moment(dataset[0].time, 'YYYY/MM/DD/HH').hours(m).format('YYYY/MM/DD/HH');
                                $d[m] = {
                                    'count': $c,
                                    'time': $t
                                };
                                dataset.unshift($d[m]);
                            }
                            for (var n = $timeEnd + 1; n <= 23; n++) {
                                $c = 0;
                                $t = moment(dataset[dataset.length - 1].time, 'YYYY/MM/DD/HH').hours(n).format('YYYY/MM/DD/HH');
                                $d[n] = {
                                    'count': $c,
                                    'time': $t
                                };
                                dataset.push($d[n]);
                            }
                            $.each(dataset, function(index, el) {
                                var $this = $(this);
                                $this[0].time = parseDate1($this[0].time);
                                $this[0].count = +parseInt($this[0].count);
                            });

                            var ttt = d3.max(dataset, function(d) {
                                return d.count;
                            });

                            // x和y值的缩放
                            xScale.domain([dataset[0].time, dataset[dataset.length - 1].time]);

                            yScale.domain([0, d3.max(dataset, function(d) {
                                return d.count;
                            })]);

                            xAxis = d3.svg.axis()
                                .scale(xScale)
                                .orient("bottom"); // x轴

                            yAxis = d3.svg.axis()
                                .scale(yScale)
                                .orient("left"); // y轴

                            buildChart('.canvas1', xAxis, yAxis);

                        } else {
                            var $tem;
                            $d = [];
                            dataset = [];

                            for (var i = 0; i < 24; i++) {
                                $tem = moment($start, 'YYYY/MM/DD/HH').hours(i).format('YYYY/MM/DD/HH');
                                $d[i] = {
                                    'count': 0,
                                    'time': $tem
                                };
                                dataset.push($d[i]);
                            }

                            formatD(dataset, parseDate1);

                            // x和y值的缩放
                            xScale.domain([dataset[0].time, dataset[dataset.length - 1].time]);

                            yScale.domain([0, 10]);

                            xAxis = d3.svg.axis()
                                .scale(xScale)
                                .orient("bottom"); // x轴

                            yAxis = d3.svg.axis()
                                .scale(yScale)
                                .orient("left"); // y轴

                            console.log(dataset);

                            buildChart('.canvas1', xAxis, yAxis);
                        }
                    }
                });
            };

            var dateBuild = function($start, $end) {
                $.ajax({
                    url: '/cooka-backend-web/userStatic?staticType=registerUser&timeSpaceType=day&start=' + $start + '&end=' + $end,
                    type: 'Get',
                    data: '',
                    success: function(result) {
                        dataset = cloneObj(result);
                        if (dataset.length) {
                            $d = [];
                            var $c, $t;
                            // $timeStart = moment(dataset[0].time, 'YYYY/MM/DD/HH').date();
                            var $a, $b;

                            var diff = {}; // 搜索条件和返回结果的时间差
                            $a = parseDate1(moment($start, 'YYYY/MM/DD/HH').format('YYYY/MM/DD/HH'));
                            $b = parseDate1(moment(dataset[0].time, 'YYYY/MM/DD/HH').format('YYYY/MM/DD/HH'));
                            diff.before = moment($a).twix($b).count('days');
                            $a = parseDate1(moment($end, 'YYYY/MM/DD/HH').format('YYYY/MM/DD/HH'));
                            $b = parseDate1(moment(dataset[dataset.length - 1].time, 'YYYY/MM/DD/HH').format('YYYY/MM/DD/HH'));
                            diff.after = moment($b).twix($a).count('days');

                            if (diff.before) {
                                for (var m = 1; m < diff.before; m++) {
                                    $t = moment(dataset[0].time, 'YYYY/MM/DD/HH').subtract(1, 'd').format('YYYY/MM/DD');

                                    dataset.unshift({
                                        'count': 0,
                                        'time': $t
                                    });
                                }
                            }

                            if (diff.after) {
                                for (var n = 1; n < diff.after; n++) {
                                    $t = moment(dataset[dataset.length - 1].time, 'YYYY/MM/DD/HH').add(1, 'd').format('YYYY/MM/DD');

                                    dataset.push({
                                        'count': 0,
                                        'time': $t
                                    });
                                }
                            }

                            formatD(dataset, parseDate2);

                            // x和y值的缩放
                            xScale.domain([dataset[0].time, dataset[dataset.length - 1].time]);

                            yScale.domain([0, d3.max(dataset, function(d) {
                                return d.count;
                            })]);

                            xAxis = d3.svg.axis()
                                .scale(xScale)
                                .tickSize(-height)
                                .orient("bottom"); // x轴

                            yAxis = d3.svg.axis()
                                .scale(yScale)
                                .ticks(10)
                                .tickSize(-width)
                                .orient("left"); // y轴

                            console.log(dataset);

                            buildChart('.canvas1', xAxis, yAxis);

                        } else {
                            var $tem;
                            $d = [];
                            dataset = [];

                            for (var i = 0; i < 24; i++) {
                                $tem = moment($start, 'YYYY/MM/DD/HH').hours(i).format('YYYY/MM/DD/HH');
                                $d[i] = {
                                    'count': 0,
                                    'time': $tem
                                };
                                dataset.push($d[i]);
                            }

                            formatD(dataset, parseDate2);



                            // x和y值的缩放
                            xScale.domain([dataset[0].time, dataset[dataset.length - 1].time]);

                            yScale.domain([0, 10]);

                            xAxis = d3.svg.axis()
                                .scale(xScale)
                                .orient("bottom"); // x轴

                            yAxis = d3.svg.axis()
                                .scale(yScale)
                                .orient("left"); // y轴

                            buildChart('.canvas1', xAxis, yAxis);
                        }
                    }
                });
            };

            var monthBuild = function($start, $end) {
            	$.ajax({
                    url: '/cooka-backend-web/userStatic?staticType=registerUser&timeSpaceType=month&start=' + $start + '&end=' + $end,
                    type: 'Get',
                    data: '',
                    success: function(result) {
                        dataset = cloneObj(result);
                        if (dataset.length) {
                            $d = [];
                            var $c, $t;
                            // $timeStart = moment(dataset[0].time, 'YYYY/MM/DD/HH').date();
                            var $a, $b;

                            var diff = {}; // 搜索条件和返回结果的时间差
                            $a = parseDate1(moment($start, 'YYYY/MM/DD/HH').format('YYYY/MM/DD/HH'));
                            $b = parseDate1(moment(dataset[0].time, 'YYYY/MM/DD/HH').format('YYYY/MM/DD/HH'));
                            diff.before = moment($a).twix($b).count('months');
                            $a = parseDate1(moment($end, 'YYYY/MM/DD/HH').format('YYYY/MM/DD/HH'));
                            $b = parseDate1(moment(dataset[dataset.length - 1].time, 'YYYY/MM/DD/HH').format('YYYY/MM/DD/HH'));
                            diff.after = moment($b).twix($a).count('months');

                            if (diff.before) {
                                for (var m = 1; m < diff.before; m++) {
                                    $t = moment(dataset[0].time, 'YYYY/MM/DD/HH').subtract(1, 'M').format('YYYY/MM');

                                    dataset.unshift({
                                        'count': 0,
                                        'time': $t
                                    });
                                }
                            }

                            if (diff.after) {
                                for (var n = 1; n < diff.after; n++) {
                                    $t = moment(dataset[dataset.length - 1].time, 'YYYY/MM/DD/HH').add(1, 'M').format('YYYY/MM');

                                    dataset.push({
                                        'count': 0,
                                        'time': $t
                                    });
                                }
                            }

                            formatD(dataset, parseDate3);

                            // x和y值的缩放
                            xScale.domain([dataset[0].time, dataset[dataset.length - 1].time]);

                            yScale.domain([0, 10+d3.max(dataset, function(d) {
                                return d.count;
                            })]);

                            xAxis = d3.svg.axis()
                                .scale(xScale)
                                .ticks(12)
                                .tickSize(-height)
                                .orient("bottom"); // x轴

                            yAxis = d3.svg.axis()
                                .scale(yScale)
                                // .ticks(10)
                                .tickSize(-width)
                                .orient("left"); // y轴

                            console.log(dataset);

                            buildChart('.canvas1', xAxis, yAxis);

                        } else {
                            var $tem;
                            $d = [];
                            dataset = [];

                            for (var i = 0; i < 24; i++) {
                                $tem = moment($start, 'YYYY/MM/DD/HH').hours(i).format('YYYY/MM/DD/HH');
                                $d[i] = {
                                    'count': 0,
                                    'time': $tem
                                };
                                dataset.push($d[i]);
                            }

                            formatD(dataset, parseDate2);

                            // x和y值的缩放
                            xScale.domain([dataset[0].time, dataset[dataset.length - 1].time]);

                            yScale.domain([0, 10]);

                            xAxis = d3.svg.axis()
                                .scale(xScale)
                                .orient("bottom"); // x轴

                            yAxis = d3.svg.axis()
                                .scale(yScale)
                                .orient("left"); // y轴

                            buildChart('.canvas1', xAxis, yAxis);
                        }
                    }
                });
            };

            /**
             * [switch 对点击进行渲染]
             * @param  {[int]} $dataId [{
             * 0: 今日0时到23时，以小时为单位显示
             * 1: 昨天0时到23时，以小时为单位显示
             * 2: 最近七天 搜索当前日期和前6天日期读数据，以天为单位显示
             * 3: 最近一个月 搜索最近30天，以天为单位显示
             * 4: 最近半年 搜索最近183天， 以天为单位显示
             * 5: 最近一年  搜索当年的所有天，以月为单位显示
             * 6: 全部 搜索所有天，以月为单位显示
             * }]
             * @return {[html]}         [description]
             */
            switch ($dataId) {
                case 0:
                    $start = moment().hours(0).format('YYYY/MM/DD/HH');
                    $end = moment().hours(23).format('YYYY/MM/DD/HH');
                    hoursBuild($start, $end);
                    break;

                case 1:
                    $start = moment().subtract(1, 'd').hours(0).format('YYYY/MM/DD/HH');
                    $end = moment().subtract(1, 'd').hours(23).format('YYYY/MM/DD/HH');
                    hoursBuild($start, $end);
                    break;

                case 2:
                    $start = moment().subtract(6, 'd').hours(0).format('YYYY/MM/DD/HH');
                    $end = moment().format('YYYY/MM/DD/HH');
                    dateBuild($start, $end);
                    break;

                case 3:
                    $start = moment().subtract(29, 'd').hours(0).format('YYYY/MM/DD/HH');
                    $end = moment().format('YYYY/MM/DD/HH');
                    dateBuild($start, $end);
                    break;

                case 4:
                    $start = moment().subtract(182, 'd').hours(0).format('YYYY/MM/DD/HH');
                    $end = moment().format('YYYY/MM/DD/HH');
                    dateBuild($start, $end);
                    break;

                case 5:
                    $start = moment().subtract(11, 'M').format('YYYY/MM/DD/HH');
                    $end = moment().format('YYYY/MM/DD/HH');
                    monthBuild($start, $end);
                    break;

                case 6:
                    $start = '2015/08/01/00';
                    $end = '2015/10/31/00';
                    dateBuild($start, $end);
                    break;
            }

        }
    });

	$('.vistor-trends-period-select').find('.all').trigger('click');	//默认显示所有

});
