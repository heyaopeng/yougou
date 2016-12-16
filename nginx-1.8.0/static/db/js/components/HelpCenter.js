require('../../less/help-center.less');
var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Navi = require('./Navi.js');
var HelpCenterTab = React.createClass({
	render: function() {
		var props = this.props;
		return (
			<div className="help-center-tab">
				<div className={'help-center-tab-item' + (!props.query.type || props.query.type === "1" ? ' active' : '')} onClick={this._tapTab.bind(this, 1)}>
					购买咨询
				</div>
				<div className={'help-center-tab-item' + (props.query.type === "2" ? ' active' : '')} onClick={this._tapTab.bind(this, 2)}>
					支付问题
				</div>
				<div className={'help-center-tab-item' + (props.query.type === "3" ? ' active' : '')} onClick={this._tapTab.bind(this, 3)}>
					物流售后
				</div>
			</div>
			);
	},

	_tapTab: function(t) {
		browserHistory.replace({
			pathname: '/helpCenter',
			query: {
				type: t
			}
		});
	}
});

var Question = React.createClass({
	render : function(){
		console.log(this.props.query.type);
		return(
			<div className="help-center-ques">
				{
					!this.props.query.type||this.props.query.type==="1"?
					<div>
						<div className="help-center-ques-item">
							<div className="help-center-ques-item-text" onClick={this._handleClick.bind(this, "1-1")}>
								UC优购的产品是正品吗？		
							</div>
						</div>
						<div className="help-center-ques-item">
							<div className="help-center-ques-item-text" onClick={this._handleClick.bind(this, "1-2")}>
								什么是UC优购		
							</div>
						</div>
						<div className="help-center-ques-item">
							<div className="help-center-ques-item-text" onClick={this._handleClick.bind(this, "1-3")}>
								UC优购有几种玩法及形式		
							</div>
						</div>
						<div className="help-center-ques-item">
							<div className="help-center-ques-item-text" onClick={this._handleClick.bind(this, "1-4")}>
								UC优购公正公平吗		
							</div>
						</div>
						<div className="help-center-ques-item">
							<div className="help-center-ques-item-text" onClick={this._handleClick.bind(this, "1-5")}>
								如何参加一元众筹	
							</div>
						</div>
						<div className="help-center-ques-item">
							<div className="help-center-ques-item-text" onClick={this._handleClick.bind(this, "1-6")}>
								什么是U币		
							</div>
						</div>
						<div className="help-center-ques-item">
							<div className="help-center-ques-item-text" onClick={this._handleClick.bind(this, "1-7")}>
								怎样查看是否中奖以及如何领取获奖产品		
							</div>
						</div>
						<div className="help-center-ques-item">
							<div className="help-center-ques-item-text" onClick={this._handleClick.bind(this, "1-8")}>
								如果一件商品很久没有达到总需人次怎么办		
							</div>
						</div>
						<div className="help-center-ques-item">
							<div className="help-center-ques-item-text" onClick={this._handleClick.bind(this, "1-9")}>
								UC优购提醒您：保护自身利益，避免损失		
							</div>
						</div>
					</div>
					:
					this.props.query.type==="2"?
					<div>
						<div className="help-center-ques-item">
							<div className="help-center-ques-item-text" onClick={this._handleClick.bind(this, "2-1")}>
								UC优购支持哪些支付方式
							</div>
						</div>
						<div className="help-center-ques-item">
							<div className="help-center-ques-item-text" onClick={this._handleClick.bind(this, "2-2")}>
								U币是否可以提现		
							</div>
						</div>
					</div>
					:
					<div>
						<div className="help-center-ques-item">
							<div className="help-center-ques-item-text" onClick={this._handleClick.bind(this, "3-1")}>
								UC获得的商品什么时候发货		
							</div>
						</div>
						<div className="help-center-ques-item">
							<div className="help-center-ques-item-text" onClick={this._handleClick.bind(this, "3-2")}>
								我需要付快递费用吗？		
							</div>
						</div>
						<div className="help-center-ques-item">
							<div className="help-center-ques-item-text" onClick={this._handleClick.bind(this, "3-3")}>
								我可以修改已确认的收货地址吗？		
							</div>
						</div>
						<div className="help-center-ques-item">
							<div className="help-center-ques-item-text" onClick={this._handleClick.bind(this, "3-4")}>
								我可以挑选商品的颜色以及型号吗？		
							</div>
						</div>
						<div className="help-center-ques-item">
							<div className="help-center-ques-item-text" onClick={this._handleClick.bind(this, "3-5")}>
								关于物流方面的售后		
							</div>
						</div>
						<div className="help-center-ques-item">
							<div className="help-center-ques-item-text" onClick={this._handleClick.bind(this, "3-6")}>
								签收时需注意哪些问题		
							</div>
						</div>
						<div className="help-center-ques-item">
							<div className="help-center-ques-item-text" onClick={this._handleClick.bind(this, "3-7")}>
								UC获得的商品有发票吗？		
							</div>
						</div>
						<div className="help-center-ques-item">
							<div className="help-center-ques-item-text" onClick={this._handleClick.bind(this, "3-8")}>
								UC获得的商品如何进行保修		
							</div>
						</div>
					</div>
				}
				</div>
		);
	},

	_handleClick : function(id){
		browserHistory.push({
			pathname: '/helpCenterContent',
			query: {
				id: id
			}
		});
	}
});


var HelpCenter = React.createClass({
	getInitialState: function() {
		return {
			type: this.props.location.query.type
		}
	},

	render: function() {
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='help-center'>
						<HelpCenterTab query={this.props.location.query} />
						<Question query={this.props.location.query}/>
						<Navi />
					</div>
				</div>
			</div>
			);
	}
});

module.exports = HelpCenter;