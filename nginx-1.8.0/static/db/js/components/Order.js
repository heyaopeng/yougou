require('../../less/order.less');

var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Navi = require('./Navi.js');
var OrderUtil = require('../utils/OrderUtil.js');
var _ = require('lodash')
var ScrollLoad = require('./ScrollLoad.js');

var OrderItem = React.createClass({
	render: function() {
		console.log();
		return (
			<div className={"order-item " + (this.props.index==0?"first":"")}>
				<div className="order-item-thumb">
					<img src={this.props.imageUrl} width="100" height="100"/>
				</div>
				<div className="order-item-content">
					<div className="order-item-title">
						{this.props.title}
					</div>

					<div className="order-item-info">
						<span>
						期 <span className="blank"> </span> 数：第{this.props.term.currentTerm}期
						</span>

					</div>

					<div className='order-item-rest'>
						<span className="pull-left">
						参与人次：
						{this.props.isPoint?
							<span className='blue'>1</span>:
							<span className='blue'>{this.props.amount}</span>
						}
						人次
						</span>
					</div>
				</div>
			</div>
		);
	},

});

var OrderSettlement = React.createClass({
	render : function(){
		return(
			<div className='order-settlement'>
				<div className='order-settlement-info'>
					{this.props.data.isPoint?
					<div className='order-settlement-info-row'>
						<span className='red remind'>活动专区{this.props.data.money===0?'，免费参与':''}</span>
					</div>:
					<div className='order-settlement-info-row'>
						<span className='red remind'>一元众筹有风险，参与需谨慎</span>
					</div>}
					
					<div className='order-settlement-info-row'>
						共{this.props.data.number}件商品，合计：<span className='red'>{this.props.data.money}</span>
						{this.props.data.isPoint?' 积分':' 个U币'}
					</div>
				</div>
				<button type="button" className="btn btn-default order-settlement-button" onClick={this._orderHandler.bind(this,this.props.data.isPoint)}>{this.props.data.isPoint?'立即参与':'立即支付'}</button>
			</div>
		);
	},
	_orderHandler : function(isPoint){
		if(isPoint){
				window.location = '/seller/payment?paymentSerialNum=' + this.props.paymentSerialNum ;
		}else{
			OrderUtil.orderHandler(function(res){
				window.location = '/seller/payment?paymentSerialNum=' + res.paymentSerialNum;
			}.bind(this));
		}
		
	}
});

var Order = React.createClass({
	getInitialState: function() {
		return {
			loading: false,
			cart: [],
			number : 0,
			money : 0,
			isPoint:false
		}
	},

	componentDidMount: function() {
		if(this.props.location.query.paymentSerialNum){
			OrderUtil.getPointData(this.props.location.query, function(res) {
				this.setState({
					cart: res.cart,
					number : res.cart.length,
					money : res.totalMoney,
					isPoint:res.isPoint
				});
			}.bind(this));
		}else{
			OrderUtil.getData(this.props.location.query, function(res) {
				this.setState({
					cart: res.cart,
					number : res.cart.length,
					money : res.totalMoney
				});
			}.bind(this));
		}
		
	},

	componentWillReceiveProps: function(nextProps) {
		OrderUtil.getData(nextProps.location.query, function(res) {
			this.setState({
				cart: res.cart,
				number : res.cart.length,
				money : res.totalMoney
			});
		}.bind(this));
	},

	render: function() {
		var items = this.state.cart.map((item, index) => {
			return <OrderItem {...item} isPoint={this.state.isPoint} key={index} index={index}/>
		});

		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='order'>

						{items}

						<OrderSettlement data={this.state} paymentSerialNum={this.props.location.query.paymentSerialNum}/>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Order;