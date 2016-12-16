require('../../less/payment-alipay.less');

var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Navi = require('./Navi.js');
var PaymentAlipayUtil = require('../utils/PaymentAlipayUtil.js');
var _ = require('lodash')
var ScrollLoad = require('./ScrollLoad.js');
var CountDown = require('./CountDown.js');

var CountDownBlock = React.createClass({
	render : function(){
		return(
			<div className='payment-alipay-countdown'>
				<div className='payment-alipay-countdown-title'>订单已提交</div>
				<CountDown time={this.props.timeCountDown} onComplete={this._onCounwDownComplete}/>
				<div className='payment-alipay-countdown-remind'>（请在规定时间内完成支付）</div>
			</div>
		);
	},
	_onCounwDownComplete : function(){
		console.log("超时了");
	}
});

var PaymentAlipay = React.createClass({
	getInitialState: function() {
		return {
			timeCountDown:0,
			paymentSerialNum:this.props.location.query.paymentSerialNum,
			paymentOrder:{},
			isWC:true,
			html:''
		}
	},

	componentDidMount: function() {
		PaymentAlipayUtil.getData(this.props.location.query, function(res) {
			if(res.paymentOrder===null||res.paymentOrder.isActive===false){
				alert("支付单过期或已失效");
				return ;
			}
			this.setState({
				timeCountDown:res.timeCountDown,
				paymentOrder:res.paymentOrder,
				isWC:res.isWC
			});
			
			if(!res.isWC){
				var data = {
					paymentSerialNum:this.props.location.query.paymentSerialNum,
					paymentId:4
				};
				PaymentAlipayUtil.submitHandler(data, function(res) {
					this.setState({
	                    	html: res.html,
	                    	isWC:res.isWC
	                  });
					setTimeout(function() {document.forms['alipaysubmit'].submit();}, 0);
				}.bind(this));
			}
			this._getResult();
		}.bind(this));
		
	},

	render: function() {

		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='payment-alipay'>
						<div className="payment-alipay-other">
							{this.state.isWC?"请点击右上角选择用其他浏览器打开支付宝支付":"请稍后..."}
						</div>
						{this.state.isWC?<CountDownBlock timeCountDown={this.state.timeCountDown}/>:null}
						{this.state.isWC?<div className="payment-alipay-detail">
						
							<div className="payment-alipay-detail-row">
								<span className="payment-alipay-detail-row-name">
								订单号:
								</span>
								<span className="payment-alipay-detail-row-info">
								{this.props.location.query.paymentSerialNum}
								</span>
							</div>
							<div className="payment-alipay-detail-row">
								<span className="payment-alipay-detail-row-name">
								支付金额:
								</span>
								<span className="payment-alipay-detail-row-info">
								{this.state.paymentOrder.money}元
								</span>
							</div>
						</div>:null}
						
						{this.state.html ? <div dangerouslySetInnerHTML={this._getMarkup()}></div> : null}
					</div>
				</div>
			</div>
		);
	},
	_getResult: function() {
		var resultHandler = (res) => {
			
			if (!res.isPaid) {
				PaymentAlipayUtil.getResult(this.props.location.query, resultHandler)
				return
			}else{
				window.location = "/paymentResult?paymentSerialNum=" + this.props.location.query.paymentSerialNum;
			}
		}
		
		PaymentAlipayUtil.getResult(this.props.location.query, resultHandler)
	},
		_getMarkup: function() {
		return {
			__html: this.state.html
		}
	},
});

module.exports = PaymentAlipay;
