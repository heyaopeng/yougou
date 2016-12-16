require('../../less/detail-description.less');

var React = require('react');
var Navi = require('./Navi.js');

// var DetailUtil = require('../utils/DetailUtil.js')

var DetailChart = React.createClass({

	getInitialState: function() {
		return {
			html: ''
		}
	},

	componentDidMount: function() {
		this.setState({
			html: sessionStorage.getItem('d_d_url')
		})
	},

	render: function() {
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='detail-description'>
						<Navi />
						<div dangerouslySetInnerHTML={this._getMarkup()} />
					</div>
				</div>
			</div>
			);
	},

	_getMarkup: function() {
		return {
			__html: this.state.html
		}
	}
});

module.exports = DetailChart;