require('../../less/payment-result.less');

var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Navi = require('./Navi.js');
var PaymentResultUtil = require('../utils/PaymentResultUtil.js');
var _ = require('lodash')
var ScrollLoad = require('./ScrollLoad.js');


var PaymentResultItem = React.createClass({

	render: function() {
		console.log(this.props);
		return (
			<div className="payment-result-item">
				<div className="payment-result-item-person">
					<div className="payment-result-item-img">
						<img src={this.props.productImage} width="80" height="80"/>
					</div>
					<div className="payment-result-item-info">
						<div className="payment-result-item-info-row">
							（第{this.props.currentTerm}期）
						</div>
						<div className="payment-result-item-info-row">
							{this.props.productTitle}
						</div>
						<div className="payment-result-item-info-row">
							处理结果 {this.props.allNumberCount}/{this.props.isPoint?1:this.props.totalPrice}<span className='grey'>（成功购买/订单总量）</span>
						</div>
						<div className="payment-result-item-info-row">
							{
								!this.props.isPoint&&this.props.totalPrice>this.props.allNumberCount?
								'因库存不足，等额的' + (this.props.totalPrice-this.props.allNumberCount )+ '个U币已退回账户余额，请注意查收':
								null
							}
						</div>
					</div>
				</div>
			</div>
			);
	}
});

var PaymentResult = React.createClass({
	getInitialState: function() {
		return {
			orders: []
		}
	},

	componentDidMount: function() {
		this.props.location.query.pageNum = 1;
		PaymentResultUtil.getData(this.props.location.query, function(res) {
			this.setState({
				orders: res.orders
			});
		}.bind(this));
	},
	render: function() {
		var items = this.state.orders.map((item, index) => {
			return <PaymentResultItem {...item} key={index}/>
		});

		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='payment-result'>
						<div className='payment-result-title'>
							订单处理成功
						</div>
						{items}
						<div className="payment-result-qrcode">
							<img src="../images/payment/qrcode.jpg" className="payment-result-qrcode-image"/> 
							<div>长按关注二维码，及时收取中奖信息</div>
						</div>
						<div className='payment-result-button'>
							<Link to="/" className='payment-result-button-left'>
								继续购物
							</Link>
							<Link to="/treasureRecord" className='payment-result-button-right'>
								查看参与记录
							</Link>
						</div>
						<Navi />
					</div>
				</div>
			</div>
			);
	}
});

module.exports = PaymentResult;