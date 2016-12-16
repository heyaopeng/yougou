require('../../less/detail-chart.less');

var React = require('react');
var Chart = require('chart.js');
var Navi = require('./Navi.js');

var DetailChart = React.createClass({


	componentDidMount: function() {
		var query = this.props.location.query;
		var ts = JSON.parse(sessionStorage.getItem(`ts${query.termId}`))

		var termNumbers = ts.map(function(item) {
			return item.termNumber
		})
		var luckyRanks = ts.map(function(item) {
			return item.luckyRank
		})

		var chartData = {
			labels: termNumbers,
			datasets: [{
				label: '近十期走势',
				data: luckyRanks,
				backgroundColor: 'rgba(231, 76, 60, 0.3)',
				borderColor: 'rgba(231, 76, 60, 2.0)',
				borderWidth: 2
			}]
		}

		var opt = {
		    events: false,
		    tooltips: {
		        enabled: false
		    },
		    hover: {
		        animationDuration: 0
		    },
		    animation: {
		        duration: 1,
		        onComplete: function () {
		            var chartInstance = this.chart,
		                ctx = chartInstance.ctx;
		            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
		            ctx.textAlign = 'center';
		            ctx.textBaseline = 'bottom';

		            this.data.datasets.forEach(function (dataset, i) {
		                var meta = chartInstance.controller.getDatasetMeta(i);
		                meta.data.forEach(function (bar, index) {
		                    var data = dataset.data[index];                            
		                    ctx.fillText(data, bar._model.x, bar._model.y -12);
		                });
		            });
		        }
		    }
		};

		var ctx = document.getElementById('dc')
		new Chart(ctx, {
			type: 'line',
			data: chartData,
			options:opt

		})
	},

	render: function() {
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='detail-chart'>
						<Navi />
						<div className="detail-chart-inner">
							<canvas id="dc">
								设备不支持此功能
							</canvas>
						</div>
					</div>
				</div>
			</div>
			);
	}
});

module.exports = DetailChart;