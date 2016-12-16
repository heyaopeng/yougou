require('../../less/address.less');
var Link = require('react-router').Link;
var React = require('react');
var Navi = require('./Navi.js');
var AddressUtil = require('../utils/AddressUtil.js');
var browserHistory = require('react-router').browserHistory;
var _ = require('lodash')
var ScrollLoad = require('./ScrollLoad.js');
var Item = React.createClass({
	render : function(){
		return (
			<div className='address-info'>
				<div className='address-info-item'>
					<span className='address-info-item-name'>{this.props.item.name}</span>
					<span className='address-info-item-phone'>{this.props.item.phone}</span>
				</div>
				<div className='address-info-item'>
					<div className='address-info-item-addr'>{this.props.item.state}{this.props.item.city}{this.props.item.region}{this.props.item.addrDetail}</div>
				</div>
				<div className='address-info-option'>
					{/*<input type="radio" name="addressId" className='address-info-option-radio' checked={this.props.item.isDefault?'checked':''} onChange={this._setDefault(this.props.item.deliveraddrId)}/>
					<span className='address-info-option-setdeault'>设为默认地址</span>*/}
					{
						this.props.query.orderNumber?
						<div className='address-info-option-pick' onClick={this._pickHandler.bind(this,this.props.item.deliveraddrId)}> 选为收货地址</div>
						:
						null
					}
					<div className='address-info-option-delete' onClick={this._delHandler.bind(this,this.props.item.deliveraddrId)}> 删除</div>
					{
							this.props.query.orderNumber?
							<Link to={"/editaddr?deliverAddrId="+ (this.props.item.deliveraddrId) + "&orderSerialNum=" + (this.props.query.orderNumber)} className='address-info-option-edit'>
								编辑
							</Link>
							:
							<Link to={"/editaddr?deliverAddrId=" + this.props.item.deliveraddrId}  className='address-info-option-edit'> 编辑</Link>
					}
				</div>
			</div>
		);
	},
	_delHandler : function(aid){
		this.props._delHandler(aid);
	},
	_setDefault : function(aid){
		this.props._setDefault(aid);
	},
	_pickHandler : function(aid){
		var conf = confirm('所选收货地址将无法改变，是否继续?');
		if(conf){
			var data = {
				'deliveraddrId' : aid,
				'orderNumber':this.props.query.orderNumber
			}
			AddressUtil.pickAddr(data,function(res){
				if(res.result==='order_not_existed'){
					alert("所选订单不存在");
					return false;
				}
				if(res.result==='not_lucky_order'){
					alert("所选订单不是中奖订单");
					return false;
				}if(res.result==='addr_illegle'){
					alert("非法地址");
					return false;
				}
				if(res.result==='order_illegle'){
					alert("非法订单");
					return false;
				}
				if(res.result==='success'){
					browserHistory.push({
						pathname: '/winRecord'
					});
				}else{
					alert("网络繁忙，请稍后重试");
					return false;
				}
			}.bind(this));
		}
	}
});

var Address = React.createClass({

	getInitialState: function(){
		return {
			loading: false,
			hasNextPage: false,
			pageNum: -1,
			addrList : []
		};
	},

	componentDidMount : function(){
		var q = this.props.location.query;
		AddressUtil.getData(q,function(res){
			this.setState(res);
		}.bind(this));
	},

	componentWillReceiveProps: function(nextProps) {
		AddressUtil.getData(nextProps.location.query, function(res) {
			this.setState(res);
		}.bind(this));
	},

	render: function() {
		var list = this.state.addrList.map(function(item,index){
			return <Item item={item} key={index} _delHandler={this._delHandler} _setDefault={this._setDefault} query={this.props.location.query}/>;
		}.bind(this));
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='address'>
						<ScrollLoad
							containerHeight={window.innerHeight-105}
							loading={this.state.loading}
							onReachBottom={this._loadMore}>

							{ this.state.addrList.length ? list : <div className='address-empty'>~~亲，您还没添加地址呢</div>}
						</ScrollLoad>
						{
							this.props.location.query.orderNumber?
							<Link to={"/editaddr?orderSerialNum=" + (this.props.location.query.orderNumber)} className='address-add'>
								新增收货地址
							</Link>
							:
							<Link to="/editaddr" className='address-add'>
								新增收货地址
							</Link>
						}
						
						<Navi />
					</div>
				</div>
			</div>
			);
	},
	_loadMore: function() {
		if (this.state.hasNextPage) {
			this.setState({
				loading: true
			});
			var q = _.assign({}, this.props.location.query)
			q.pageNum = this.state.pageNum + 1
			AddressUtil.getData(q, function(res) {
				var nState = _.assign({}, this.state);
				nState.addrList = nState.addrList.concat(res.addrList);
				this.setState({
					loading: false,
					hasNextPage: res.hasNextPage,
					addrList: nState.addrList,
					pageNum: res.pageNum
				});
			}.bind(this));
		}
	},
	_delHandler :function(aid){
		var conf = confirm('确定要删除该地址?');
		var q = this.props.location.query;
		if(conf){
			var data = {
				'deliveraddrId' : aid
			}
			AddressUtil.delAddr(data,function(res){
				if(res.result==='isDefault'){
					alert("不能删除默认地址");
					return false;
				}
				if(res.result==='success'){
					AddressUtil.getData(q,function(res){
						this.setState(res);
					}.bind(this));
				}else{
					alert("网络繁忙，请稍后重试");
					return false;
				}
			}.bind(this));
		}
	},
	_setDefault :function(aid){
		var data = {
			'deliveraddrId' : aid
		}
		console.log(data);
		AddressUtil.setDefault(data,function(res){
			if(res.result==='success'){
				return true;
			}else{
				alert("网络繁忙，请稍后重试");
				return false;
			}
		}.bind(this));
	}
});

module.exports = Address;