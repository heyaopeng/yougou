require('../../less/application-result.less');
var Link = require('react-router').Link;
var React = require('react');
var Navi = require('./Navi.js');
var ApplicationResultUtil = require('../utils/ApplicationResultUtil.js');

var ApplicationResult = React.createClass({

	getInitialState: function(){
		return {
			status:'',
			isExisted:false
		};
	},

	componentDidMount : function(){
		var q = this.props.location.query;
		ApplicationResultUtil.getData(q,function(res){
			this.setState(res);
		}.bind(this));

	},

	render: function() {
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='application-result'>
						<div className='application-result-text'>
							<span className='application-result-text-row'>
								{
									this.state.isExisted===false?'查无申请记录':this.state.status==='processing'?'审核中':this.state.status==='reject'?'已拒绝':'已通过'

								}
							</span>
						</div>
						{
							this.state.isExisted===false?
							<Link to="/application" className='application-result-button'>
								点击申请
							</Link>
							:null
						}						
						<Navi />
					</div>
				</div>
			</div>
			);
	}
});

module.exports = ApplicationResult;