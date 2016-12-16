require('../../less/account-center.less');
var Link = require('react-router').Link;
var React = require('react');
var Navi = require('./Navi.js');
var browserHistory = require('react-router').browserHistory;
var AccountCenterUtil = require('../utils/AccountCenterUtil.js');
var _ = require('lodash')
var ScrollLoad = require('./ScrollLoad.js');
var CenterTab = React.createClass({
	render: function()	{
		var props = this.props;
		return(
			<div className="accountcenter-tab">
				<div className={'accountcenter-tab-item' + (!this.props.query.typeQuery || this.props.query.typeQuery === 'bill' ? ' active' : '')} onClick={this._tapTab.bind(this, 'bill')}>
					账单
				</div>
				<div className={'accountcenter-tab-item' + (this.props.query.typeQuery === 'integral' ? ' active' : '')} onClick={this._tapTab.bind(this, 'integral')}>
					积分
				</div>
			</div>
		);
	},
	_tapTab: function(t) {
		browserHistory.replace({
			pathname: '/accountcenter',
			query: {
				typeQuery: t
			}
		});
	}
});

var CenterFilter = React.createClass({
	render: function() {
		return (
			<div className='accountcenter-filter'>
				<div className='accountcenter-filter-item' onClick={this._filterTab.bind(this, 'all')}>
					<span className={'accountcenter-filter-item-text' + (!this.props.query.filter || this.props.query.filter === 'all' ? ' active' : '')} >全部</span>
				</div>
				<div className='accountcenter-filter-item' onClick={this._filterTab.bind(this, 'out')}>
					<span className={'accountcenter-filter-item-text' + (this.props.query.filter === 'out' ? ' active' : '')} >支出</span>
				</div>
				<div className='accountcenter-filter-item' onClick={this._filterTab.bind(this, 'in')}>
					<span className={'accountcenter-filter-item-text' + (this.props.query.filter === 'in' ? ' active' : '')} >收入</span>
				</div>
			</div>
		);
	},
	_filterTab: function(t) {
		var isIn = null;
		if(t!=='all'){
			isIn = t==='in'?1:0;
		}
		browserHistory.replace({
			pathname: '/accountcenter',
			query: {
				isIn : isIn,
				typeQuery: 'bill',
				filter : t
			}
		});
	}
});

var Meta = React.createClass({
	render : function(){
		return(
			<div className={'accountcenter-meta'+ (this.props.query.typeQuery === 'integral' ? ' integral' : '')}>
				<div className='accountcenter-meta-item'>
					时间
				</div>
				<div className='accountcenter-meta-item'>
				标题
				</div>
				<div className='accountcenter-meta-item'>
					{this.props.query.typeQuery==='integral'?'积分':'金额'}
				</div>
			</div>
		);
	}
});

var Log = React.createClass({
	render : function(){

		var list = this.props.balanceLog.map(function(item,index){
			return (
				<tr key={index} className='accountcenter-log-table-body-col'>
					<td className='accountcenter-log-table-col-item'>
						{item.timeStr}
					</td>
					<td className='accountcenter-log-table-col-item'>
						{item.title}
					</td>
					<td className={'accountcenter-log-table-col-item ' + (item.isIn?'income':'out')}>
						{item.money}
					</td>
				</tr>
			);
		}.bind(this));

		return(
			<table className='accountcenter-log-table'>
				<tbody className='accountcenter-log-table-body'>
					{list}
				</tbody>
			</table>
		);
	}
});

var AccountCenter = React.createClass({
	getInitialState: function() {
		return {
			loading: false,
			hasNextPage: false,
			pageNum: -1,
			account:{balance:5},
			type:1,
			balanceLog: [],
		};
	},

	componentDidMount : function(){
		this.props.location.query.pageNum=1;
		var q = this.props.location.query;
		AccountCenterUtil.getData(q,function(res){
			this.setState(res);
		}.bind(this));
	},

	componentWillReceiveProps: function(nextProps) {
		AccountCenterUtil.getData(nextProps.location.query, function(res) {
			this.setState(res);
		}.bind(this));
	},

	render: function() {
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className={'accountcenter'  + (this.props.location.query.typeQuery === 'integral' ? ' integral' : '')}>
						<CenterTab query={this.props.location.query} />
						{
							!this.props.location.query.typeQuery || this.props.location.query.typeQuery==='bill'?<CenterFilter query={this.props.location.query}/>:null
						}
						<Meta query={this.props.location.query}/>
						<ScrollLoad
							containerHeight={window.innerHeight-170}
							loading={this.state.loading}
							onReachBottom={this._loadMore}>
							<div className='accountcenter-log'>
								<Log balanceLog={this.state.balanceLog} query={this.props.location.query}/>
							</div>
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
		)},
	_loadMore: function() {
		if (this.state.hasNextPage) {
			this.setState({
				loading: true
			});
			var q = _.assign({}, this.props.location.query)
			q.pageNum = this.state.pageNum + 1
			AccountCenterUtil.getData(q, function(res) {
				var nState = _.assign({}, this.state);
				nState.balanceLog = nState.balanceLog.concat(res.balanceLog);
				this.setState({
					loading: false,
					hasNextPage: res.hasNextPage,
					balanceLog: nState.balanceLog,
					pageNum: res.pageNum
				});
			}.bind(this));
		}
	}
});

module.exports = AccountCenter;