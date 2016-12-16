require('../../less/cash-coupon-balance.less');
var Link = require('react-router').Link;
var React = require('react');
var Navi = require('./Navi.js');
var browserHistory = require('react-router').browserHistory;
var CashCouponBalanceUtil = require('../utils/CashCouponBalanceUtil.js');
var _ = require('lodash')
var ScrollLoad = require('./ScrollLoad.js');
var CenterTab = React.createClass({
	render: function()	{
		var props = this.props;
		return(
			<div className="cash-coupon-balance-money">
				<div className='cash-coupon-balance-money'>
					佣金明细
				</div>
				<div className='cash-coupon-balance-money-button'>
					邀请好友明细
				</div>
			</div>
		);
	},
});


var Meta = React.createClass({
	render : function(){
		return(
			<div className='cash-coupon-balance-meta'>
				<div className='cash-coupon-balance-meta-item'>
					时间
				</div>
				<div className='cash-coupon-balance-meta-item'>
					收入
				</div>
				<div className='cash-coupon-balance-meta-item'>
					余额
				</div>
			</div>
		);
	}
});

var Log = React.createClass({
	render : function(){

		var list = this.props.balanceLog.map(function(item,index){
			return (
				<tr key={index} className='cash-coupon-balance-log-table-body-col'>
					<td className='cash-coupon-balance-log-table-col-item'>
						{item.timeStr}
					</td>
					<td className='cash-coupon-balance-log-table-col-item money'>
						{item.money}
					</td>
					<td className='cash-coupon-balance-log-table-col-item'>
						{this.props.account.cashCoupon}
					</td>
				</tr>
			);
		}.bind(this));

		return(
			<table className='cash-coupon-balance-log-table'>
				<tbody className='cash-coupon-balance-log-table-body'>
					{list}
				</tbody>
			</table>
		);
	}
});

var MoneyData = React.createClass({
	render : function(){
		return(
			<div className='cash-coupon-balance-money'>
				<div className='cash-coupon-balance-money-block'>
					<div className='cash-coupon-balance-money-block-text'>
						<div className='cash-coupon-balance-money-block-text-item'>
							余额：<span className='red'>{this.props.account.cashCoupon}</span>
						</div>
					</div>
					<Link to="/couponWithdraw" className='cash-coupon-balance-money-block-button'>
						提现
					</Link>
				</div>
			</div>
		);
	}
});

var CashCouponBalance = React.createClass({
	getInitialState: function() {
		return {
			loading: false,
			hasNextPage: false,
			pageNum: -1,
			balanceLog: [],
			account:{}
		};
	},

	componentDidMount : function(){
		this.props.location.query.pageNum=1;
		var q = this.props.location.query;
		CashCouponBalanceUtil.getData(q,function(res){
			this.setState(res);
		}.bind(this));
	},

	componentWillReceiveProps: function(nextProps) {
		CashCouponBalanceUtil.getData(nextProps.location.query, function(res) {
			this.setState(res);
		}.bind(this));
	},

	render: function() {
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='cash-coupon-balance'>
						<MoneyData account={this.state.account}/>
						<Meta />
						<ScrollLoad
							containerHeight={window.innerHeight-139}
							loading={this.state.loading}
							onReachBottom={this._loadMore}>
							<div className='cash-coupon-balance-log'>
								<Log balanceLog={this.state.balanceLog} account={this.state.account}/>
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
			CashCouponBalanceUtil.getData(q, function(res) {
				var nState = _.assign({}, this.state);
				nState.balanceLog = nState.balanceLog.concat(res.balanceLog);
				this.setState({
					loading: false,
					hasNextPage: res.hasNextPage,
					balanceLog: nState.balanceLog,
					account:res.account,
					pageNum: res.pageNum
				});
			}.bind(this));
		}
	}
});

module.exports = CashCouponBalance;