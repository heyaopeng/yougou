var __hooks = {};

function utcFormat(unixTime, type) {
    var _time = new Date(unixTime * 1000);
    var _startDate = {};
    _startDate.year = _time.getFullYear();
    _startDate.month = _time.getMonth();
    _startDate.date = _time.getDate();
    _startDate.hour = _time.getHours();
    if (type === 'hour') {
        return Date.UTC(_startDate.year, _startDate.month, _startDate.date, _startDate.hour);
    } else {
        return Date.UTC(_startDate.year, _startDate.month, _startDate.date);
    }
}

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

function formatData(data, yName) {
    var _dataset = cloneObj(data);

    var yDate = [];

    _dataset.forEach(function(d) {
        yDate.push(d[yName]);
    });

    return yDate;
}

function simpleLine(data, yName, opt, space) {
    var _data = cloneObj(data);

    var timeStart;

    if(_data.length === 0) {
        timeStart = 0;
    } else {
        timeStart = _data[0].longTime;
    }

    var _yDate = formatData(_data, yName);

    var _defaults = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            // renderTo: 'userData-chart'
        },
        title: {
            // text: '趋势分析图'
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        subtitle: {
            text: 'source:cookabuy.com'
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: null
            }
        },
        yAxis: {
            title: {
                // text: '注册/登录(人)'
            },
            labels: {
                formatter: function() {
                    return this.value;
                }
            },
            min: 0
        },
        plotOptions: {
            line: {
                lineWidth: 2,
                marker: {
                    enabled: false
                },
                states: {
                    hover: {
                        lineWidth: 2
                    }
                }
            },
            series: {
                pointStart: utcFormat(timeStart, space)
            }
        },

        series: [{
            data: _yDate
        }],

        credits: {
            enabled: false // 禁用版权信息
        }
    };

    var options = $.extend({}, _defaults, opt);

    return options;
}

function doubleLine(data1, data2, yName, opt, space) {
    var _data1 = cloneObj(data1);
    var _data2 = cloneObj(data2);

    var timeStart, temp;

    if (_data1.length > data2.length) {
        temp = cloneObj(data1);
    } else {
        temp = cloneObj(data2);
    }
    if (temp.length === 0) {
        temp[0] = {};
        temp[0].longTime = 0;
    }

    timeStart = temp[0].longTime;

    var _yDate1 = formatData(_data1, yName);
    var _yDate2 = formatData(_data2, yName);

    var _defaults = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            // renderTo: 'userData-chart'
        },
        title: {
            // text: '趋势分析图'
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        subtitle: {
            text: 'source:cookabuy.com'
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: null
            }
        },
        yAxis: {
            title: {
                // text: '注册/登录(人)'
            },
            labels: {
                formatter: function() {
                    return this.value;
                }
            },
            min: 0
        },
        plotOptions: {
            line: {
                lineWidth: 2,
                marker: {
                    enabled: false
                },
                states: {
                    hover: {
                        lineWidth: 2
                    }
                }
            },

            series: {
                pointStart: utcFormat(timeStart, space)
            }
        },

        series: [{
            data: _yDate1
        }, {
            data: _yDate2
        }],

        credits: {
            enabled: false // 禁用版权信息
        }
    };

    var options = $.extend({}, _defaults, opt);

    return options;
}

__hooks.utcFormat = utcFormat;
__hooks.cloneObj = cloneObj;
__hooks.formatData = formatData;
__hooks.doubleLine = doubleLine;
__hooks.simpleLine = simpleLine;

var chartRender = __hooks;

module.exports = chartRender;
