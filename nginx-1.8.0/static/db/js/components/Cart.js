require('../../less/cart.less');

var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Navi = require('./Navi.js');
var CartUtil = require('../utils/CartUtil.js');
var _ = require('lodash')
var ScrollLoad = require('./ScrollLoad.js');

var CartItem = React.createClass({
	getInitialState: function() {
		return {
			amount: this.props.amount
		};
	},
	render: function() {
		console.log();
		return (
			<div className={"cart-item " + (this.props.index==0?"first":"")}>
				<div className="cart-item-thumb">
					<img src={this.props.imageUrl} width="80" height="80"/>
					<div className='cart-item-note'>
						1人次=1币
					</div>
				</div>
				<div className="cart-item-content">
					<div className="cart-item-title">
						{this.props.title}
					</div>

					<div className="cart-item-info">
						<span>
						期 <span className="blank"> </span> 数：第{this.props.term.currentTerm}期
						</span>
						<span className="fa fa-trash-o trash" onClick={this._delHandler.bind(this,this.props.itemId)}>
						</span>

					</div>

					<div className='cart-item-rest'>
						<span className="pull-left">
						剩余人次：<span className='blue'>{this.props.term.totalAmount - this.props.term.currentAmount}</span>&nbsp;/&nbsp;<span>{this.props.term.totalAmount}</span>人次
						</span>
					</div>
					<div className="cart-item-btns">
						<span className='pull-left text'>
							参与人次：
							<button className='btn btn-default  left' type="button" onClick={this._handlerMinus.bind(this,this.props.itemId,this.state.amount)}>
								<span className="fa fa-minus"></span>
							</button>
							<input className='input' type="number" name="amount" value={this.state.amount} onChange={this._inputChangeHandler}/>
							<button className='btn btn-default right' type="button" onClick={this._handlerPlus.bind(this,this.props.itemId,this.state.amount)}>
								<span className="fa fa-plus"></span>
							</button>
						</span>

					</div>
				</div>
				<div className="cart-item-number">
					<div className="cart-item-number-col" onClick={this._numberChangeHandler.bind(this,10)}>10</div>
					<div className="cart-item-number-col" onClick={this._numberChangeHandler.bind(this,50)}>50</div>
					<div className="cart-item-number-col" onClick={this._numberChangeHandler.bind(this,100)}>100</div>
					<div className="cart-item-number-col" onClick={this._numberChangeHandler.bind(this,500)}>500</div>
					<div className="cart-item-number-col" onClick={this._numberChangeHandler.bind(this,1000)}>1000</div>
					<div className="cart-item-number-col" onClick={this._numberChangeHandler.bind(this,null)}>包尾</div>
				</div>
			</div>
		);
	},

	_inputChangeHandler : function(event){
		var data = {};
		var newAmount = event.target.value;
		var target = this.props.moneyLimit;
		while(target<newAmount){
			target = target + this.props.moneyLimit;
		}
		newAmount = target;
		if(newAmount < this.props.moneyLimit){
			newAmount = this.props.moneyLimit;
		}
		if(newAmount > (this.props.term.totalAmount - this.props.term.currentAmount)){
			newAmount = (this.props.term.totalAmount - this.props.term.currentAmount);
		}
		this.setState({
			amount : newAmount
		});
		data.itemId = this.props.itemId;
		data.amount = newAmount;
		CartUtil.updateItem(data,function(res){
			return  true;
		}.bind(this));
		this.props._handleMoney(newAmount-this.state.amount);
	},

	_numberChangeHandler : function(number){
		var data = {};
		if(number===null){
			number = this.props.term.totalAmount - this.props.term.currentAmount;
		}
		var newAmount = number;
		var target = this.props.moneyLimit;
		while(target<newAmount){
			target = target + this.props.moneyLimit;
		}
		newAmount = target;
		if(newAmount < this.props.moneyLimit){
			newAmount = this.props.moneyLimit;
		}
		if(newAmount > (this.props.term.totalAmount - this.props.term.currentAmount)){
			newAmount = (this.props.term.totalAmount - this.props.term.currentAmount);
		}
		this.setState({
			amount : newAmount
		});
		data.itemId = this.props.itemId;
		data.amount = newAmount;
		CartUtil.updateItem(data,function(res){
			return  true;
		}.bind(this));
		this.props._handleMoney(newAmount-this.state.amount);
	},

	_delHandler : function(itemId){
		this.props._delHandler(itemId);
	},

	_handlerPlus : function(itemId,amount){
		var data = {};
		console.log(amount);
		var newAmount = Number(amount) + this.props.moneyLimit;
		console.log(newAmount);
		var needPlus = true;
		if(newAmount > (this.props.term.totalAmount - this.props.term.currentAmount)){
			newAmount = (this.props.term.totalAmount - this.props.term.currentAmount);
			needPlus = false;
		}
		this.setState({
			amount : newAmount
		});
		data.itemId = itemId;
		data.amount = newAmount;
		if(needPlus){
			CartUtil.updateItem(data,function(res){
				return  true;
			}.bind(this));
			this.props._handleMoney(this.props.moneyLimit);
		}
	},

	_handlerMinus : function(itemId,amount){
		var data = {};
		var needMinus = true;
		var newAmount = Number(amount)-this.props.moneyLimit;
		if(newAmount < this.props.moneyLimit){
			newAmount = this.props.moneyLimit;
			needMinus = false;
		}
		this.setState({
			amount : newAmount
		});
		data.itemId = itemId;
		data.amount = newAmount;
		if(needMinus){
			CartUtil.updateItem(data,function(res){
				return  true;
			}.bind(this));
			this.props._handleMoney(-1*this.props.moneyLimit);
		}
	},


});
var Cart = React.createClass({
	getInitialState: function() {
		return {
			loading: false,
			cart: [],
			number : 0,
			money : 0,
			isSubscribe:true,
			isShow:true
		}
	},

	componentDidMount: function() {
		this.props.location.query.pageNum = 1;
		CartUtil.getData(this.props.location.query, function(res) {
			this.setState({
				cart: res.cart,
				number : res.cart.length,
				money : res.totalMoney
			});
		}.bind(this));
	},

	componentWillReceiveProps: function(nextProps) {
		CartUtil.getData(nextProps.location.query, function(res) {
			this.setState({
				cart: res.cart,
				number : res.cart.length,
				money : res.totalMoney
			});
		}.bind(this));
	},

	render: function() {
		var items = this.state.cart.map((item, index) => {
			return <CartItem {...item} key={index} index={index} _delHandler={this._delHandler} _handleMoney={this._handleMoney}/>
		});

		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='cart'>

						{items}

						<div className='cart-settlement'>
							<div className='cart-settlement-info'>
								<div className='cart-settlement-info-row'>
									<span className='red remind'>一元众筹有风险，参与需谨慎</span>
								</div>
								<div className='cart-settlement-info-row'>
									共{this.state.number}件商品，合计：<span className='red'>{this.state.money}</span>个U币
								</div>
							</div>
							<div className="btn btn-default cart-settlement-button" onClick={this._clickHandler}>结算</div>
						</div>
						<Navi />
						{!this.state.isSubscribe&&this.state.isShow?
						<div className="cart-hidden-subscribe">
							<img className='cart-hidden-subscribe-image' src='../../images/subscribe3.png' />
							<button className='cart-hidden-subscribe-button' onClick={this._showSubscribe.bind(this, false)}>朕去意已决</button>
						</div>
						:null}
					</div>
				</div>
			</div>
		);
	},

	_delHandler : function(itemId){
		var conf = confirm('确定要删除该项?');
		if(conf){
			var data = {
				'itemId' : itemId
			}
			CartUtil.delItem(data,function(res){
				if(res.result===true){
					CartUtil.getData(this.props.location.query, function(res) {
						this.setState({
							cart: res.cart,
							number : res.cart.length,
							money : res.totalMoney
						});
					}.bind(this));
				}else{
					alert("网络繁忙，请稍后重试");
					return false;
				}
			}.bind(this));
		}
	},
	_clickHandler : function(isShow){
		if(this.state.isShow){
			CartUtil.getIsSubscribe(function(res){
				if(!res.isSubscribe){
					this.setState({
						isSubscribe:res.isSubscribe
					})
					return ;
				}else{
					window.location='/order';
				}
			}.bind(this));
		}else{
			window.location='/order';
		}
	},

	_handleMoney : function(inc){
		this.setState({
			money : this.state.money + inc
		});
	},
	_showSubscribe: function (b) {
		this.setState({
			isSubscribe: b,
			isShow:false
		})
	}
});

module.exports = Cart;