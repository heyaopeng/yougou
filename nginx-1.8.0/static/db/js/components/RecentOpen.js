require('../../less/recent-open.less');
var Link = require('react-router').Link;
var React = require('react');
var Navi = require('./Navi.js');
var RecentOpenUtil = require('../utils/RecentOpenUtil.js');
var _ = require('lodash')
var ScrollLoad = require('./ScrollLoad.js');
var CountDown = require('./CountDown.js');
var ProductItem = React.createClass({
	getInitialState: function(){
		return {
			term : this.props
		};
	},
	render: function() {
		return (
			<div className="recent-open-item">
				<a href={"/detail?termId=" + (this.state.term.termId)}>
					<img src={this.state.term.productImage} className="recent-open-item-img"/>
				</a>

				{
					this.state.term.tag ?
					<span className="recent-open-item-tag">
						{this.state.term.tag}
					</span>
					: null
				}
				
				<div className="recent-open-item-info">
					<div className="recent-open-item-title">
						{this.state.term.productTitle}
					</div>
					{ this.state.term.status==='openning'?
						<div className="recent-open-item-extra">
							<div className="recent-open-item-term">
								期数：第{this.state.term.currentTerm}期
							</div>
							<div className="recent-open-item-text">
								开奖倒计时：
							</div>
							<div className='recent-open-item-countdown'>
								<CountDown time={this.props.timeCountDown} onComplete={this._onCounwDownComplete.bind(this,this.props.termId,this.props.status)}/>
							</div>
						</div>
						:
						<div className="recent-open-item-extra">
							<div className="recent-open-item-term">
								期<span className='blank'></span>数：第{this.state.term.currentTerm}期
							</div>
							<div className="recent-open-item-winner">
								获奖用户：<span>{this.state.term.winOrder.nickName}</span>
							</div>
							<div className="recent-open-item-amount">
								参与人次：{this.state.term.winOrder.allNumberCount}
							</div>
							<div className="recent-open-item-number">
								幸运号码：{this.state.term.winOrder.luckyNumber}
							</div>
							<div className="recent-open-item-time">
								揭晓时间：{this.state.term.openTimeStr}
							</div>
						</div>
					}
				</div>
			</div>
		);
	},
	_onCounwDownComplete : function(t,status){
		var q = {};
		q.termId=t;
		var resultHandler = (res) => {
			if (res.status === 'opening') {
				RecentOpenUtil.getResult(q, resultHandler);
				return
			}

			if (res.status === 'opened') {
				this.setState(res);
				return
			} 
		}
		RecentOpenUtil.getResult(q, resultHandler);
	}
});

var RecentOpen = React.createClass({

	getInitialState: function(){
		return {
			loading: false,
			hasNextPage: false,
			pageNum: 0,
			terms: []
		};
	},

	componentDidMount : function(){
		var q = this.props.location.query;
		RecentOpenUtil.getData(q,function(res){
			this.setState(res);
		}.bind(this));
	},

	componentWillReceiveProps: function(nextProps) {
		var q = this.props.location.query;
		RecentOpenUtil.getData(q,function(res){
			this.setState(res);
		}.bind(this));
	},

	render: function() {
		var list = this.state.terms.map(function(item, index) {
			return <ProductItem key={index} {...item} />
		});
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='recent-open'>
						<ScrollLoad
							containerHeight={window.innerHeight-55}
							loading={this.state.loading}
							onReachBottom={this._loadMore}>

							{list}
						</ScrollLoad>
						
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
			RecentOpenUtil.getData(q, function(res) {
				var nState = _.assign({}, this.state);
				nState.terms = nState.terms.concat(res.terms);
				this.setState({
					loading: false,
					hasNextPage: res.hasNextPage,
					terms: nState.terms,
					pageNum: res.pageNum
				});
			}.bind(this));
		}
	},
});

module.exports = RecentOpen;