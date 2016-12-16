require('../../less/cash-coupon.less');
var React = require('react');
var request = require('superagent');
var Navi = require('./Navi.js');
var CashCouponUtil = require('../utils/CashCouponUtil.js');
var browserHistory = require('react-router').browserHistory;
var CashCoupon = React.createClass({
	getInitialState: function() {
		return {
			number:'',
			money:0,
			in:0,
			isExisted:false,
			isActive:false
		};
	},

	componentDidMount: function() {
		CashCouponUtil.getData(this.props.location.query,function(res) {
			if(res.isExisted===false){
				alert("代金券不存在");
			}else if(res.isActive===false){
				alert("该代金券已被兑换");
			}
			this.setState(res);
		}.bind(this));
	},

	render: function() {
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='cash-coupon'>
						<img src="../../images/coupon/cashCoupon.png" className='cash-coupon-image'/>
						<div className='cash-coupon-money'><span className='money'>{this.state.money}</span>元代金券</div>
						<div className='cash-coupon-in'>兑换商家收入：<span className='money'>{this.state.in}</span>元</div>
						<div className='cash-coupon-number'><span className='cash-coupon-number-text'>券号:{this.state.number}</span></div>
						<div className='cash-coupon-button' onClick={this._clickHandler}>
							立即兑换
						</div>
						<Navi />
					</div>
				</div>
			</div>
		);
	},

	_clickHandler : function(){
		if(this.state.isExisted===false){
			alert("代金券不存在");
			return;
		}else if(this.state.isActive===false){
			alert("该代金券已被兑换");
			return;
		}
		var data = {};
		data.couponNumber=this.state.number;
		CashCouponUtil.submit(data,function(res){
			if(res.result==='success'){
				alert('兑换成功');
				browserHistory.push({
					pathname: '/commission'
				});
			}else if(res.result==='notExisted'){
				alert("代金券不存在");
				return;
			}else if(res.result==='error'){
				alert("网络繁忙请稍后再试");
				return;
			}else if(res.result==='disabled'){
				alert("该代金券已被兑换");
				return;
			}
		}.bind(this));
	}
});

module.exports = CashCoupon;