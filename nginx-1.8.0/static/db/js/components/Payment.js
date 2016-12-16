require('../../less/payment.less');

var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Navi = require('./Navi.js');
var PaymentUtil = require('../utils/PaymentUtil.js');
var _ = require('lodash')
var ScrollLoad = require('./ScrollLoad.js');
var CountDown = require('./CountDown.js');
var PaymentMethod = React.createClass({
	getInitialState: function() {
		return {
			type: ""
		};
	},
	render : function(){
		var items = this.props.data.payment.map((item, index) => {
				return (
					<div className={'payment-info-method ' + (this.state.type===item.paymentId?'active':'')} key={index} onClick={this._paymentOnChange.bind(this,item.paymentId)}>
						{
							item.strategyClassName==='CommissionPaymentStrategy'?
							 <img src="../../images/payment/commission.jpg" className='payment-info-method-image' />
							 :
							 item.strategyClassName==='WCJSAPIPaymentStrategy'?
							 	<img src="../../images/payment/WC.png" className='payment-info-method-image'/>
							 	:
							 	item.strategyClassName==='AlipayPaymentStrategy'?
							 		<img src="../../images/payment/alipay.jpg" className='payment-info-method-image'/>
							 		:
							 		item.strategyClassName==='BalancePaymentStrategy'?
							 			<img src="../../images/payment/balance.jpg" className='payment-info-method-image'/>
							 		:
							 			<img src="../../images/payment/point.png" className='payment-info-method-image'/>
						}
						<span className='payment-info-method-text'>{item.payment}</span>

							{
								item.strategyClassName==='CommissionPaymentStrategy'?
								<span>（剩余<span className="red">{this.props.data.commission}</span>个)</span>:
									item.strategyClassName==='BalancePaymentStrategy'?
									<span>(剩余佣金<span className="red">{this.props.data.balance}</span>元) </span>:
										item.strategyClassName==='PointPaymentStrategy'?
											<span>(剩余积分<span className="red">{this.props.data.points}</span>) </span>:
											null
							}
						<span className="fa fa-check icon-check"></span>
					</div>
				);
		});
		return (
			<div className='payment-info'>
				{items}
				<div className='payment-info-money pull-right'>
					商品合计：{this.props.data.totalMoney}
					{!this.props.data.paymentOrder.isPoint?
						'个U币'
						:'积分'
					}，免费参与
				</div>
			</div>
		);
	},
	_paymentOnChange : function(paymentId){
		this.setState({
			type:paymentId
		});
		this.props._paymentOnChange(paymentId);
	}
});

var CountDownBlock = React.createClass({
	render : function(){
		return(
			<div className='payment-countdown'>
				<div className='payment-countdown-title'>订单已提交</div>
				<CountDown time={this.props.timeCountDown} onComplete={this._onCounwDownComplete}/>
				<div className='payment-countdown-remind'>（请在规定时间内完成支付）</div>
			</div>
		);
	},
	_onCounwDownComplete : function(){
		console.log("超时了");
	}
});

var Payment = React.createClass({
	getInitialState: function() {
		return {
			loading: false,
			timeCountDown:0,
			payment:[],
			balance:0,
			commission:0,
			totalMoney:0,
			paymentSerialNum:this.props.location.query.paymentSerialNum,
			paymentId:0,
			paymentOrder:{},
			isWC:true,
			html:'',
			isPoint:false,
			points:0
		}
	},

	componentDidMount: function() {
		PaymentUtil.getData(this.props.location.query, function(res) {
			this.setState({
				timeCountDown:res.timeCountDown,
				payment:res.payment,
				balance:res.balance,
				commission:res.commission,
				points:res.points,
				totalMoney:res.totalMoney,
				paymentOrder:res.paymentOrder,
				isWC:res.isWC,
				isPoint:res.paymentOrder.isPoint
			});
			if(this.state.paymentOrder==null||this.state.paymentOrder.isActive===false){
				alert("支付单过期或已失效");
			}
		}.bind(this));
	},

	render: function() {

		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='payment'>
						<CountDownBlock timeCountDown={this.state.timeCountDown}/>
						<PaymentMethod data={this.state} _paymentOnChange={this._paymentOnChange}/>
						<div className='payment-bottom'>
							<button type="button" className="btn btn-default payment-bottom-button" onClick={this._submitHandler}>{this.state.isPoint&&this.state.paymentOrder.money===0?'免费参与':'马上支付'}</button>
						</div>
						{this.state.html ? <div dangerouslySetInnerHTML={this._getMarkup()}></div> : null}
					</div>
				</div>
			</div>
		);
	},
	_getMarkup: function() {
		return {
			__html: this.state.html
		}
	},
	_getWeixinConfig: function(data) {
		if (typeof WeixinJSBridge == "undefined") {
			alert('请用微信打开链接');
		} else {
			WeixinJSBridge.invoke(
				'getBrandWCPayRequest', data,
				function(res) {
					if (res.err_msg == "get_brand_wcpay_request:ok") {
						window.location = '/paymentResult?paymentSerialNum=' + data.paymentSerialNum;
					} else {
						console.log("支付失败");
					}
				// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
				}.bind(this)
			);
		}
	},

	_paymentOnChange: function(paymentId){
		console.log(paymentId);
		this.setState({
			paymentId:paymentId
		});
	},

	_submitHandler: function(paymentId){
		if(this.state.paymentOrder.isActive===false){
			alert("支付单过期或已失效");
			return;
		}
		if(this.state.paymentId==0){
			alert("请至少选择一种支付方式");
			return;
		}

		var data={};
		data.paymentSerialNum=this.props.location.query.paymentSerialNum;
		data.paymentId=this.state.paymentId;
		PaymentUtil.submitHandler(data, function(res) {
			console.log(res);
			if(res.result===true){
				if (res.type === 'WC') {
					if(res.result==='failed'){
						alert('网络繁忙，请稍后再试');
						return false;
					}
					res['package'] = res.prePackage;
					this._getWeixinConfig(res);
					return false;
				}else if (res.type === 'alipay') {
					if(res.isWC){
						window.location.href = '/seller/paymentAlipay?paymentSerialNum=' + this.props.location.query.paymentSerialNum;
					}else{
						this.setState({
							html: res.html
						});
						setTimeout(function() {
							document.forms['alipaysubmit'].submit();
						}, 0);
					}
				}else{
					browserHistory.push({
						pathname: '/paymentResult',
						query: {
							paymentSerialNum: res.paymentSerialNum
						}
					});
				}		
			}else{
				if(res.reason==='money_not_enough'){
					alert("余额不足，请选择其他支付方式");
				}else{
					alert("网络繁忙，请稍后再试");
				}
			}
			
		}.bind(this));
	}
});

module.exports = Payment;
