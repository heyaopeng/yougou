require('../../less/lucky-list.less');

var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Navi = require('./Navi.js');
var LuckyListUtil = require('../utils/LuckyListUtil.js');
var _ = require('lodash')
var ScrollLoad = require('./ScrollLoad.js');


var LuckyListItem = React.createClass({

	render: function() {
		return (
			<div className="lucky-list-item">
				<div className="lucky-list-item-header">
					<span className="pull-left">
						第{this.props.currentTerm}期
					</span>
					<span className="pull-right">
						揭晓时间：{this.props.openTimeStr}
					</span>
				</div>
				<div className="lucky-list-item-person">
					<div className="lucky-list-item-img">
						<Link to={'/userHome?serialNum=' + (this.props.winOrder.userSerialNum)} >
							<img src={this.props.winOrder.userImage} width="50" height="50"/>
						</Link>
					</div>
					<div className="lucky-list-item-info">
						<div>
							获得用户：<span className='blue'>{this.props.winOrder.nickName}</span>
						</div>
						<div>
							来<span className='blank'></span>自：{this.props.winOrder.ipAddr}
						</div>
						<div>
							参与人次：<span className='red'>{this.props.winOrder.allNumberCount}人次</span>
						</div>
						<div>
							幸运号码：<span className='red'>{this.props.winOrder.luckyNumber}</span>
						</div>
					</div>
				</div>
			</div>
			);
	}
});

var LuckyList = React.createClass({
	getInitialState: function() {
		return {
			loading: false,
			hasNextPage: false,
			pageNum: 0,
			terms: []
		}
	},

	componentDidMount: function() {
		this.props.location.query.pageNum = 1;
		LuckyListUtil.recordList(this.props.location.query, function(res) {
			this.setState({
				hasNextPage: res.hasNextPage,
				terms: res.terms,
				pageNum: res.pageNum
			});
		}.bind(this));
	},

	componentWillReceiveProps: function(nextProps) {
		LuckyListUtil.recordList(nextProps.location.query, function(res) {
			this.setState({
				hasNextPage: res.hasNextPage,
				terms: res.terms,
				pageNum: res.pageNum
			});
		}.bind(this));
	},

	render: function() {
		var items = this.state.terms.map((item, index) => {
			return <LuckyListItem {...item} key={index}/>
		});

		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='lucky-list'>
						<ScrollLoad
							containerHeight={window.innerHeight-50}
							loading={this.state.loading}
							onReachBottom={this._loadMore}>

							{items}

                            {
                                this.state.hasNextPage ?
                                null
                                :
                                <div className="text-center">
                                    ~~已显示全部
                                </div>
                            }

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
            LuckyListUtil.recordList(q, function(res) {
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
	}
});

module.exports = LuckyList;