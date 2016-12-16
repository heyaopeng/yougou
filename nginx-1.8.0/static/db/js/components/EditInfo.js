require('../../less/edit-info.less');

var React = require('react');
var Navi = require('./Navi.js');
var EditInfoUtil = require('../utils/EditInfoUtil.js');
var FormUtil = require('../utils/FormUtil.js');
var fto = require('form_to_object');
var ErrorMessage = require('./ErrorMessage.js');
var browserHistory = require('react-router').browserHistory;
var errMap = {
	'empty_name': '请输入联系人姓名',
	'empty_phone': '请输入联系电话',
	'wrong_phone': '请输入正确的11位数字手机号码',
};

var EditInfo = React.createClass({

	getInitialState: function(){
		return {
			error: '',
			nickName:'',
			phone:''
		};
	},

	componentDidMount : function(){
		var q = this.props.location.query;
		EditInfoUtil.getData(q,function(res){
			this.setState(res);
		}.bind(this));
	},


	render: function() {
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='edit-info'>
						<form className='form-horizontal edit-info-form' onSubmit={this._handleSubmit}>
							<div className='form-group edit-info-form-group'>
								<input className="form-control" type="text" name="nickName" placeholder="用户昵称" value={this.state.nickName} onChange={this._handleChange.bind(this,'nickName')}/>
							</div>
							<div className='form-group edit-info-form-group'>
								<input className="form-control" type="text" name="phone" placeholder="手机号码" value={this.state.phone} onChange={this._handleChange}onChange={this._handleChange.bind(this,'phone')}/>
							</div>
							<ErrorMessage error={this.state.error} />
							<button type="submit" className="btn btn-primary btn-block edit-info-button">提交</button>
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

	_handleSubmit : function(e){
		e.preventDefault();
		var data = fto(e.target);
		if(!data.nickName){
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
		EditInfoUtil.editInfo(data, function(res) {
			if (res.result) {
				browserHistory.replace({
					pathname: '/userCenter'
				});
			}
			else {
				alert("网络繁忙，请稍后再试");
			}
		}.bind(this));
	}
});

module.exports = EditInfo;