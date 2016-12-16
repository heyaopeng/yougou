require('../../less/withdraw.less');

var React = require('react');
var Navi = require('./Navi.js');

var Withdraw = React.createClass({

	componentDidMount: function() {
		MyUtil.getMyData(function() {
			this.setState({
				a: 'b'
			}); 
		}.bind(this));
	},


	render: function() {
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='withdraw'>

						<Navi />
					</div>
				</div>
			</div>
			);
	}
});

module.exports = Page;