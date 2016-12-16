require('../../less/join-list.less');

var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Navi = require('./Navi.js');
var JoinListUtil = require('../utils/JoinListUtil.js');
var _ = require('lodash')
var ScrollLoad = require('./ScrollLoad.js');


var JoinListItem = React.createClass({
	render: function() {
		return (
			<Link to={"commonRecordDetail?orderSerialNum=" + (this.props.orderSerialnum)}>
			<div className="joinList-item">
				<div >
					<img className="joinList-item-thumb" src={this.props.userImage} width="60" height="60"/>
				</div>
				<div className="joinList-item-content">
					<div className="joinList-item-content-nickname">
						{this.props.nickName}
					</div>

					<div className='joinList-item-content-ip'>
						<span className="pull-left">
							{this.props.ipAddr}
						</span>
					</div>
					<div className="joinList-item-content-info">
						
							共参与了<span className="red">{this.props.allNumberCount}</span>人次
						
						<span>
						{this.props.createTimeStr}
						</span>
					</div>
				</div>
			</div>
			</Link>
			);
	}
});

var JoinList = React.createClass({
	getInitialState: function() {
		return {
			loading: false,
			hasNextPage: false,
			pageNum: 0,
			orders: []
		}
	},

	componentDidMount: function() {
		this.props.location.query.pageNum = 1;
		JoinListUtil.recordList(this.props.location.query, function(res) {
			this.setState({
				hasNextPage: res.hasNextPage,
				orders: res.orders,
				pageNum: res.pageNum
			});
		}.bind(this));
	},

	componentWillReceiveProps: function(nextProps) {
		JoinListUtil.recordList(nextProps.location.query, function(res) {
			this.setState({
				hasNextPage: res.hasNextPage,
				orders: res.ordesr,
				pageNum: res.pageNum
			});
		}.bind(this));
	},

	render: function() {
		var items = this.state.orders.map((item, index) => {
			return <JoinListItem {...item} key={index}/>
		});

		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='joinList'>
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
            JoinListUtil.recordList(q, function(res) {
                var nState = _.assign({}, this.state);
                nState.orders = nState.orders.concat(res.orders);
                this.setState({
                    loading: false,
                    hasNextPage: res.hasNextPage,
                    orders: nState.orders,
                    pageNum: res.pageNum
                });
            }.bind(this));
		}
	}
});

module.exports = JoinList;