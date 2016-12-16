require('../../less/coupon-withdraw.less');

var React = require('react');
var Navi = require('./Navi.js');
var ErrorMessage = require('./ErrorMessage.js');
var browserHistory = require('react-router').browserHistory;
var CouponWithdrawUtil = require('../utils/CouponWithdrawUtil.js');
var fto = require('form_to_object');
var WithdrawTab = React.createClass({
	render: function() {
		var data = this.props.data;
		return (
			<div className="withdraw-tab">
				<div className={'withdraw-tab-item' + (data.accountType===1 ? ' active' : '')} onClick={this._tapTab.bind(this, 1)}>
					支付宝
				</div>
				<div className={'withdraw-tab-item' + (data.accountType===2 ? ' active' : '')} onClick={this._tapTab.bind(this, 2)}>
					银行卡
				</div>
				<div className={'withdraw-tab-item' + (data.accountType===3 ? ' active' : '')} onClick={this._tapTab.bind(this, 3)}>
					U币
				</div>
			</div>
			);
	},

	_tapTab: function(t) {
		this.props._chooseAccountType(t);
	}
});

var errMap = {
	'empty_name_1': '请输入真实姓名',
	'empty_name_2': '请输入户主名',
	'empty_accountNum_1': '请输入支付宝账号',
	'empty_accountNum_2': '请输入银行卡号',
	'empty_bank': '请选择银行',
	'empty_withdrawMoney': '请输入提现金额'
};

var Withdraw = React.createClass({
	getInitialState: function() {
		return {
			accountType:1,
			account : {},
			bank : [],
			latestBank : ''
		}
	},

	componentDidMount: function() {
		CouponWithdrawUtil.getData(function(res){
			this.setState(res);
		}.bind(this));
	},


	render: function() {
		var bank = this.state.bank.map(function(item,index){
			return <option value={item.bank} key={index} selected={this.state.latestBank===item.bank?'selected':null}>{item.bank}</option>;
		}.bind(this));
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='withdraw'>
						<WithdrawTab data={this.state} _chooseAccountType={this._chooseAccountType}/>
						<form className='form-horizontal withdraw-form' onSubmit={this._handleSubmit}>
							<input type='hidden' name="accountType" value={this.state.accountType}/>
							{	this.state.accountType!==3?
									

									<div className='form-group withdraw-form-group'>
										<input className="form-control" type="text" name="accountNum" placeholder={this.state.accountType===1?"请输入支付宝账号":"请输入银行卡号"} onChange={this._handleChange}onChange={this._handleChange.bind(this,'accountNum')}/>
									</div>
									:null
							}

							{
								this.state.accountType!==3?
								<div className='form-group withdraw-form-group'>
									<input className="form-control" type="text" name="name" placeholder={this.state.accountType===1?"请输入真实姓名":"请输入户主名"}  onChange={this._handleChange.bind(this,'name')}/>
								</div>
								:
								null
							}
							{	this.state.accountType===2?
									
								<div className='form-group withdraw-form-group'>	
									<select className="form-control withdraw-form-group"  name="bank" onChange={this._handleChange.bind(this,'bank')}>
										<option value="">请选择银行</option>
										{bank}
									</select>
								</div>
									:null

							}
							<div className='form-group withdraw-form-group'>
								<input className="form-control" type="number" name="money" placeholder={"最多可提现"+ this.state.account.cashCoupon +"元"}  onChange={this._handleChange.bind(this,'addrDetail')}/>
							</div>
							<div className="withdraw-info">
								温馨提示：每笔提现需收取3%的手续费，每笔提现需大于20元
							</div>
							<ErrorMessage error={this.state.error} />
							<button type="submit" className="btn btn-primary btn-block withdraw-button">提交</button>
						</form>
						<Navi />
					</div>
				</div>
			</div>
			);
	},

	_handleSubmit : function(e){
		e.preventDefault();
		var data = fto(e.target);
		var accountType = data.accountType;
		console.log(data);
		
		if(!data.accountNum){
			if(parseInt(accountType)==1){
				this.setState({
					error: errMap['empty_accountNum_1']
				});
			}
			if(parseInt(accountType)==2){
				this.setState({
					error: errMap['empty_accountNum_2']
				});
			}
			return false;
		}
		if(!data.name){
			if(accountType==1){
				this.setState({
					error: errMap['empty_name_1']
				});
			}
			if(parseInt(accountType)==2){
				this.setState({
					error: errMap['empty_name_2']
				});
			}
			return false;
		}

		if(parseInt(accountType)==2&&!data.bank){
			this.setState({
				error: errMap['empty_bank']
			});
			return false;
		}
		if(!data.money){
			this.setState({
				error: errMap['empty_withdrawMoney']
			});
			return false;
		}
		CouponWithdrawUtil.withdrawHandle(data, function(res) {
			if (res.result==="success") {
				alert('提现成功');
				browserHistory.replace({
					pathname: '/withdrawList'
				});
			}else if(res.result==="money_limit"){
				alert("提现金额至少为20元");
			}else if(res.result==="money_not_enought"){
				alert("余额不足");
			}
			else {
				alert("网络繁忙，请稍后再试");
			}
		}.bind(this));
	},

	_handleChange : function(key,e){
		var nState = this.state;
		nState[key] = e.target.value;
		this.setState(nState);
	},
	_chooseAccountType : function(t){
		this.setState({
			accountType:t
		});
	}
});

module.exports = Withdraw;