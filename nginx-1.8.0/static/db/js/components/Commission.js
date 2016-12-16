require('../../less/commission.less');
var Link = require('react-router').Link;
var React = require('react');
var Navi = require('./Navi.js');
var browserHistory = require('react-router').browserHistory;
var CommissionUtil = require('../utils/CommissionUtil.js');
var _ = require('lodash')
var ScrollLoad = require('./ScrollLoad.js');
var CenterTab = React.createClass({
	render: function()	{
		var props = this.props;
		return(
			<div className="commission-tab">
				<Link to='/commission' className='commission-tab-item active'>
					佣金明细
				</Link>
				<Link to='/invitation' className='commission-tab-item'>
					邀请好友明细
				</Link>
			</div>
		);
	},
});


var Meta = React.createClass({
	render : function(){
		return(
			<div className='commission-meta'>
				<div className='commission-meta-item'>
					用户
				</div>
				<div className='commission-meta-item'>
					消费金额
				</div>
				<div className='commission-meta-item'>
					佣金
				</div>
				<div className='commission-meta-item'>
					时间
				</div>
			</div>
		);
	}
});

var Log = React.createClass({
	render : function(){

		var list = this.props.balanceLog.map(function(item,index){
			return (
				<tr key={index} className='commission-log-table-body-col'>
					{
						item.userProfile?
						<td className='commission-log-table-col-item'>
							{item.userProfile.name}
						</td>
						:<td className='commission-log-table-col-item'>
							抽奖红包
						</td>
					}
					{
						item.consumeMoney?
						<td className='commission-log-table-col-item money'>
							{item.consumeMoney}
						</td>
						:<td className='commission-log-table-col-item money'>
							{item.money}
						</td>
					}
					<td className='commission-log-table-col-item money'>
						{item.money}
					</td>
					<td className='commission-log-table-col-item'>
						{item.timeStr}
					</td>
				</tr>
			);
		}.bind(this));

		return(
			<table className='commission-log-table'>
				<tbody className='commission-log-table-body'>
					{list}
				</tbody>
			</table>
		);
	}
});

var Commission = React.createClass({
	getInitialState: function() {
		return {
			loading: false,
			hasNextPage: false,
			pageNum: -1,
			balanceLog: [],
		};
	},

	componentDidMount : function(){
		this.props.location.query.pageNum=1;
		var q = this.props.location.query;
		CommissionUtil.getData(q,function(res){
			this.setState(res);
		}.bind(this));
	},

	componentWillReceiveProps: function(nextProps) {
		CommissionUtil.getData(nextProps.location.query, function(res) {
			this.setState(res);
		}.bind(this));
	},

	render: function() {
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='commission'>
						<CenterTab />
						<Meta />
						<ScrollLoad
							containerHeight={window.innerHeight-130}
							loading={this.state.loading}
							onReachBottom={this._loadMore}>
							<div className='commission-log'>
								<Log balanceLog={this.state.balanceLog}/>
							</div>
							{
                                this.state.hasNextPage ?
                                null
                                :
                                <div className="text-center">
                                    已显示全部
                                </div>
                            }
						</ScrollLoad>
						<Navi />
					</div>
				</div>
			</div>
		)},
	_loadMore: function() {
		if (this.state.hasNextPage) {
			this.setState({
				loading: true
			});
			var q = _.assign({}, this.props.location.query)
			q.pageNum = this.state.pageNum + 1
			CommissionUtil.getData(q, function(res) {
				var nState = _.assign({}, this.state);
				nState.balanceLog = nState.balanceLog.concat(res.balanceLog);
				this.setState({
					loading: false,
					hasNextPage: res.hasNextPage,
					balanceLog: nState.balanceLog,
					pageNum: res.pageNum
				});
			}.bind(this));
		}
	}
});

module.exports = Commission;