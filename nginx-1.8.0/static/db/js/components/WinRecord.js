require('../../less/win-record.less');

var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Navi = require('./Navi.js');
var WinRecordUtil = require('../utils/WinRecordUtil.js');
var _ = require('lodash')
var ScrollLoad = require('./ScrollLoad.js');


var WinRecordItem = React.createClass({
	render: function() {
		return (
			<div className="treasure-rec-item">
				<div className="treasure-rec-item-thumb">
					<img src={this.props.productImage} width="100" height="100"/>
				</div>
				<div className="treasure-rec-item-content">
					<div className="treasure-rec-item-title">
						{this.props.productTitle}
					</div>

					<div className="treasure-rec-item-info">
						<span>
							第 {this.props.term.currentTerm} 期
						</span>
						<span>
						已参与 <span className="red">{this.props.numberCount} </span>人次
						</span>
					</div>

					<div className='treasure-rec-item-time'>
						<span className="pull-left">
							揭晓時間：{this.props.term.openTimeStr}
						</span>
					</div>
					<div className="treasure-rec-item-btns">
						{
							this.props.addr===''?
							<Link to={'/address?orderNumber='+ this.props.orderSerialnum} className="btn btn-primary button addr">
								选择地址
							</Link>
							:null
						}
						
						<Link to={'/recorddetail?orderSerialNum=' + this.props.orderSerialnum} className="btn btn-primary button">
							详情
						</Link>
						<Link to={'/postShare?orderSerialNum=' + this.props.orderSerialnum} className="btn btn-primary button">
							晒单
						</Link>
					</div>
				</div>
				{/*<div className="treasure-rec-item-win">
					<div className="treasure-rec-item-win-cell">
						<div className="treasure-rec-item-win-cell-left">
							获奖者:
							<span className="text-primary">
							{this.props.winner.name}
							</span>
						</div>
					</div>
					<div className="treasure-rec-item-win-cell">
						<div className="treasure-rec-item-win-cell-center">
							参与了
							<span className="treasure-rec-item-win-cell-center-text">
							{this.props.winner.count}
							</span>
							人次
						</div>
					</div>
					<div className="treasure-rec-item-win-cell">
						<div className="treasure-rec-item-win-cell-right">
							幸运号: {this.props.winner.luckyNumber}
						</div>
					</div>
				</div>*/}
				{
					/*this.props.addr!==''?
					<div className="treasure-rec-item-addr">
						{this.props.addr}
					</div>
					:null*/
				}
			</div>
			);
	}
});

var WinRecord = React.createClass({
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
		WinRecordUtil.recordList(this.props.location.query, function(res) {
			this.setState({
				hasNextPage: res.hasNextPage,
				orders: res.orders,
				pageNum: res.pageNum
			});
		}.bind(this));
	},

	componentWillReceiveProps: function(nextProps) {
		WinRecordUtil.recordList(nextProps.location.query, function(res) {
			this.setState({
				hasNextPage: res.hasNextPage,
				orders: res.orders,
				pageNum: res.pageNum
			});
		}.bind(this));
	},

	render: function() {
		var items = this.state.orders.map((item, index) => {
			return <WinRecordItem {...item} key={index}/>
		});

		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='treasure-rec'>
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
                                    已显示全部
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
            WinRecordUtil.recordList(q, function(res) {
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

module.exports = WinRecord;