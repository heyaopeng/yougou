require('../../less/withdraw-list.less');

var React = require('react');
var Navi = require('./Navi.js');
var browserHistory = require('react-router').browserHistory;
var WithdrawListUtil = require('../utils/WithdrawListUtil.js');
var _ = require('lodash')
var ScrollLoad = require('./ScrollLoad.js');
var WithdrawListTab = React.createClass({
	render: function() {
		var props = this.props;
		return (
			<div className="withdraw-list-tab">
				<div className={'withdraw-list-tab-item' + (!props.query.status || props.query.status == 1 ? ' active' : '')} onClick={this._tapTab.bind(this, 1)}>
					待审核
				</div>
				<div className={'withdraw-list-tab-item' + (props.query.status == 2 ? ' active' : '')} onClick={this._tapTab.bind(this, 2)}>
					已完成
				</div>
				<div className={'withdraw-list-tab-item' + (props.query.status == 3 ? ' active' : '')} onClick={this._tapTab.bind(this, 3)}>
					已拒绝
				</div>
			</div>
			);
	},

	_tapTab: function(t) {
		browserHistory.replace({
			pathname: '/withdrawList',
			query: {
				status: t
			}
		});
	}
});

var WithdrawItem = React.createClass({
	render : function(){
		return (
			<div className="withdraw-list-item">
				<div className="withdraw-list-item-row">
					<span className="withdraw-list-item-row-time">
						提现时间：{this.props.applyTimeStr}
					</span>
					<span className={'withdraw-list-item-row-status ' + (this.props.status==1?'yellow':this.props.status==2?'green':'red')}>
						{this.props.status==1?'审核中':this.props.status==2?'已完成':'已拒绝'}
					</span>
				</div>
				<div className="withdraw-list-item-row">
					<span className="withdraw-list-item-row-accountType">
						提现到：{this.props.accountType==1?'支付宝':this.props.accountType==2?'银行卡':'U币'}
					</span>
				</div>
				{
					this.props.accountType!==3?
					<div className="withdraw-list-item-row">
						<span className="withdraw-list-item-row-accountNum">
							提现账号：{this.props.accountNum}
						</span>
					</div>
					:null
				}
				
				<div className="withdraw-list-item-row">
					<span className="withdraw-list-item-row-name">
						{this.props.accountType==1?'真实名字：':this.props.accountType==2?'户主名：':''}
						{this.props.accountType!=3?this.props.name:''}
					</span>
				</div>
				<div className="withdraw-list-item-row">
					<span className="withdraw-list-item-row-money">
						提现金额：{this.props.money}
					</span>
				</div>
				<div className="withdraw-list-item-row">
					<span className="withdraw-list-item-row-handlingCharge">
						手续费：{this.props.handlingCharge}
					</span>
				</div>
				<div className="withdraw-list-item-row">
					<span className="withdraw-list-item-row-realMoney">
						实际到账金额：{this.props.money - this.props.handlingCharge}
					</span>
				</div>
			</div>
		);
	}
});

var WithdrawList = React.createClass({
	getInitialState: function() {
		return {
			loading: false,
			hasNextPage: false,
			pageNum: 0,
			withdrawList: []
		}
	},

	componentDidMount: function() {
		this.props.location.query.status = 1;
		WithdrawListUtil.getData(this.props.location.query,function(res){
			this.setState(res);
		}.bind(this));
	},

	componentWillReceiveProps: function(nextProps) {
		WithdrawListUtil.getData(nextProps.location.query, function(res) {
			this.setState(res);
		}.bind(this));
	},

	render: function() {
		var items = this.state.withdrawList.map((item, index) => {
			return <WithdrawItem {...item} key={index}/>
		});
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='withdraw-list'>
						<WithdrawListTab query={this.props.location.query}/>
						<ScrollLoad
							containerHeight={window.innerHeight-95}
							loading={this.state.loading}
							onReachBottom={this._loadMore}>

							{items}

                            {
                                this.state.hasNextPage ?
                                null
                                :
                                <div className="text-center">
                                    已显示全部
                                </div>
                            }

						</ScrollLoad>
						<Navi />
					</div>
				</div>
			</div>
			);
	}
});

module.exports = WithdrawList;