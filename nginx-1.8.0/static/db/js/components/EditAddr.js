require('../../less/edit-addr.less');

var React = require('react');
var Navi = require('./Navi.js');
var EditAddrUtil = require('../utils/EditAddrUtil.js');
var FormUtil = require('../utils/FormUtil.js');
var fto = require('form_to_object');
var ErrorMessage = require('./ErrorMessage.js');
var browserHistory = require('react-router').browserHistory;
var errMap = {
	'empty_name': '请输入联系人姓名',
	'empty_phone': '请输入联系电话',
	'wrong_phone': '请输入正确的11位数字手机号码',
	'empty_state': '请选择省份',
	'empty_city': '请选择城市',
	'empty_region': '请选择地区',
	'empty_addrDetail': '请输入详细地址'
};

var EditAddr = React.createClass({

	getInitialState: function(){
		return {
			error: '',
			deliverAddr : {},
			state : [],
			city : [],
			region : [],
			stateId: 0,
			cityId : 0,
			regionId : 0
		};
	},

	componentDidMount : function(){
		var q = this.props.location.query;
		EditAddrUtil.getData(q,function(res){
			this.setState(res);
		}.bind(this));
	},


	render: function() {
		console.log(this.state.deliverAddr);
		var state = this.state.state?this.state.state.map(function(item,index){
			return <option value={item.stateId} key={item.stateId} selected={this.state.deliverAddr.stateId==item.stateId?'selected':null}>{item.state}</option>;
		}.bind(this)):null;
		var city = this.state.city?this.state.city.map(function(item,index){
			return <option value={item.cityId} key={item.cityId} selected={this.state.deliverAddr.cityId==item.cityId?'selected':null}>{item.city}</option>;
		}.bind(this)):null;
		var region = this.state.region?this.state.region.map(function(item,index){
			return <option value={item.regionId} key={index} selected={this.state.deliverAddr.regionId==item.regionId?'selected':null}>{item.region}</option>;
		}.bind(this)):null;
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='edit-address'>
						<form className='form-horizontal edit-address-form' onSubmit={this._handleSubmit}>
							<div className='form-group edit-address-form-group'>
								<input className="form-control" type="text" name="name" placeholder="收件人姓名" value={this.state.deliverAddr.name} onChange={this._handleChange.bind(this,'name')}/>
							</div>
							<div className='form-group edit-address-form-group'>
								<input className="form-control" type="text" name="phone" placeholder="手机号码" value={this.state.deliverAddr.phone} onChange={this._handleChange}onChange={this._handleChange.bind(this,'phone')}/>
							</div>
							<div className='form-group edit-address-form-group'>
								<select className="form-control edit-address-form-control-select"  name="stateId" onChange={this._setCity}>
									<option value="">请选择省份</option>
									{state}
								</select>
								<select className="form-control edit-address-form-control-select"  name="cityId" onChange={this._setRegion}>
									<option value="">请选择城市</option>
									{city}
								</select>
								<select className="form-control edit-address-form-control-select"  name="regionId" onChange={this._handleChange.bind(this,'regionId')}>
									<option value="">请选择地区</option>
									{region}
								</select>
							</div>
							<div className='form-group edit-address-form-group'>
								<input className="form-control" type="text" name="addrDetail" placeholder="详细地址" value={this.state.deliverAddr.addrDetail} onChange={this._handleChange.bind(this,'addrDetail')} onFocus={this._focus}/>
							</div>
							<ErrorMessage error={this.state.error} />
							<button type="submit" className="btn btn-primary btn-block edit-address-button">提交</button>
						</form>
						<Navi />
					</div>
				</div>
			</div>
			);
	},

	_handleChange : function(key,e){
		var nState = this.state;
		nState[key] = e.target.value;
		this.setState(nState);
	},

	_focus : function(){
		window.scroll(0, document.activeElement.offsetTop);
	},
	_setCity :function(e){

		var q = {
			stateId : e.target.value
		}
		EditAddrUtil.getCity(q,function(res){
			this.setState({
				city : res.city,
				stateId : q.stateId
			});
		}.bind(this));

	},

	_setRegion :function(e){
		var q = {
			cityId : e.target.value
		}
		EditAddrUtil.getRegion(q,function(res){
			this.setState({
				region : res.region,
				cityId: q.cityId
			});
		}.bind(this));
	},

	_handleSubmit : function(e){
		e.preventDefault();
		var addrId = this.props.location.query.deliverAddrId;
		console.log(addrId);
		var data = fto(e.target);
		if(addrId){
			data.deliveraddrId = addrId;
		}
		if(!data.name){
			this.setState({
				error: errMap['empty_name']
			});
			return false;
		}
		if(!data.phone){
			this.setState({
				error: errMap['empty_phone']
			});
			return false;
		}
		if (!/^1[\d]{10}$/.test(data.phone)) {
			this.setState({
				error: errMap['wrong_phone']
			});
			return false;
		}
		if(!data.stateId){
			this.setState({
				error: errMap['empty_state']
			});
			return false;
		}
		if(!data.cityId){
			this.setState({
				error: errMap['empty_city']
			});
			return false;
		}
		if(!data.regionId){
			this.setState({
				error: errMap['empty_region']
			});
			return false;
		}
		if(!data.addrDetail){
			this.setState({
				error: errMap['empty_addrDetail']
			});
			return false;
		}
		if(addrId!==null){
			EditAddrUtil.addAddr(data, function(res) {
				if (res.result==="success") {
					alert('修改地址成功');
					if(this.props.location.query.orderSerialNum){
						var query = this.props.location.query;
						query.orderNumber=this.props.location.query.orderSerialNum;
						browserHistory.replace({
							pathname: '/address',
							query: query
						})
					}else{
						browserHistory.replace({
							pathname: '/address'
						});
					}
				}
				else {
					alert("网络繁忙，请稍后再试");
				}
			}.bind(this));
		}else{
			EditAddrUtil.addAddr(data, function(res) {
				if (res.result==="success") {
					alert('新增地址成功');
					if(this.props.location.query.orderSerialNum){
						var query = this.props.location.query;
						query.orderNumber=this.props.location.query.orderSerialNum;
						browserHistory.replace({
							pathname: '/address',
							query: query
						})
					}else{
						browserHistory.replace({
							pathname: '/address'
						});
					}
					
				}
				else {
					alert("网络繁忙，请稍后再试");
				}
			}.bind(this));
		}
	}
});

module.exports = EditAddr;