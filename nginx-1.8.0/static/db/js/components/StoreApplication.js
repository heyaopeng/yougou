require('../../less/store-application.less');

var React = require('react');
var Navi = require('./Navi.js');
var StoreApplicationUtil = require('../utils/StoreApplicationUtil.js');
var FormUtil = require('../utils/FormUtil.js');
var fto = require('form_to_object');
var ErrorMessage = require('./ErrorMessage.js');
var browserHistory = require('react-router').browserHistory;
var errMap = {
	'empty_name': '请输入店铺名称',
	'empty_phone': '请输入联系电话',
	'empty_shopkeeper': '请输入店主名字',
	'wrong_phone': '请输入正确的11位数字手机号码',
	'wrong_phone': '请输入店主名字',
	'empty_state': '请选择省份',
	'empty_city': '请选择城市',
	'empty_region': '请选择地区',
	'empty_addrDetail': '请输入详细地址'
};

var StoreApplication = React.createClass({

	getInitialState: function(){
		return {
			error: '',
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
		StoreApplicationUtil.getData(q,function(res){
			this.setState(res);
		}.bind(this));
	},

	render: function() {
		console.log(this.state.deliverAddr);
		var state = this.state.state?this.state.state.map(function(item,index){
			return <option value={item.stateId} key={item.stateId} >{item.state}</option>;
		}.bind(this)):null;
		var city = this.state.city?this.state.city.map(function(item,index){
			return <option value={item.cityId} key={item.cityId}>{item.city}</option>;
		}.bind(this)):null;
		var region = this.state.region?this.state.region.map(function(item,index){
			return <option value={item.regionId} key={index}>{item.region}</option>;
		}.bind(this)):null;
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='store-application'>
						<form className='form-horizontal store-application-form' onSubmit={this._handleSubmit}>
							<div className='form-group store-application-form-group'>
								<input className="form-control" type="text" name="name" placeholder="店铺名称"  onChange={this._handleChange.bind(this,'name')}/>
							</div>
							<div className='form-group store-application-form-group'>
								<input className="form-control" type="text" name="shopkeeper" placeholder="店主名称"  onChange={this._handleChange.bind(this,'name')}/>
							</div>
							<div className='form-group store-application-form-group'>
								<input className="form-control" type="text" name="phone" placeholder="手机号码"  onChange={this._handleChange}onChange={this._handleChange.bind(this,'phone')}/>
							</div>
							<div className='form-group store-application-form-group'>
								<select className="form-control store-application-form-control-select"  name="stateId" onChange={this._setCity}>
									<option value="">请选择省份</option>
									{state}
								</select>
								<select className="form-control store-application-form-control-select"  name="cityId" onChange={this._setRegion}>
									<option value="">请选择城市</option>
									{city}
								</select>
								<select className="form-control store-application-form-control-select"  name="regionId" onChange={this._handleChange.bind(this,'regionId')}>
									<option value="">请选择地区</option>
									{region}
								</select>
							</div>
							<div className='form-group store-application-form-group'>
								<input className="form-control" type="text" name="addrDetail" placeholder="详细地址" onChange={this._handleChange.bind(this,'addrDetail')}/>
							</div>
							<ErrorMessage error={this.state.error} />
							<button type="submit" className="btn btn-primary btn-block store-application-button">提交</button>
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

	_setCity :function(e){

		var q = {
			stateId : e.target.value
		}
		StoreApplicationUtil.getCity(q,function(res){
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
		StoreApplicationUtil.getRegion(q,function(res){
			this.setState({
				region : res.region,
				cityId: q.cityId
			});
		}.bind(this));
	},

	_handleSubmit : function(e){
		e.preventDefault();

		var data = fto(e.target);
		if(!data.name){
			this.setState({
				error: errMap['empty_name']
			});
			return false;
		}
		if(!data.shopkeeper){
			this.setState({
				error: errMap['empty_shopkeeper']
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
		console.log(data);
		StoreApplicationUtil.storeApplyHandler(data, function(res) {
			if (res.result==="success") {
				alert('申请成功，请耐心等待审核通过');
				browserHistory.replace({
					pathname: '/applicationResult'
				});
			}else if(res.result==="existed"){
				alert("请勿重复申请");
			}
			else {
				alert("网络繁忙，请稍后再试");
			}
		}.bind(this));
	}
});

module.exports = StoreApplication;