require('../../less/treasure-record.less');
var CountDown = require('./CountDown.js');
var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Navi = require('./Navi.js');
var TreasureRecordUtil = require('../utils/TreasureRecordUtil.js');
var _ = require('lodash')
var ScrollLoad = require('./ScrollLoad.js');
var TreasureRecordTab = React.createClass({
	render: function() {
		var props = this.props;
		return (
			<div className="treasure-rec-tab">
				<div className={'treasure-rec-tab-item' + (!props.query.isOpen || props.query.isOpen === '' ? ' active' : '')} onClick={this._tapTab.bind(this, '')}>
					全部
				</div>
				<div className={'treasure-rec-tab-item' + (props.query.isOpen === '0' ? ' active' : '')} onClick={this._tapTab.bind(this, '0')}>
					进行中
				</div>
				<div className={'treasure-rec-tab-item' + (props.query.isOpen === '1' ? ' active' : '')} onClick={this._tapTab.bind(this, '1')}>
					已揭晓
				</div>
			</div>
			);
	},

	_tapTab: function(t) {
		browserHistory.replace({
			pathname: '/treasurerecord',
			query: {
				isOpen: t
			}
		});
	}
});



var TreasureRecordItem = React.createClass({
	render: function() {
		return (
			<div className="treasure-rec-item">
				<a href={'/detail?termId=' + (this.props.term.termId)} >
					<div className="treasure-rec-item-thumb">
						<img src={this.props.productImage} width="100" height="100"/>
					</div>
				</a>
				<div className="treasure-rec-item-content">
					<div className="treasure-rec-item-title">
						{this.props.productTitle}
					</div>

					<div className="treasure-rec-item-info">
						<span>
							第 {this.props.term.currentTerm} 期
						</span>
						{this.props.isPaid===true?
							<span>
							已参与 <span className="red">{this.props.numberCount} </span>人次
							</span>
							:
							<span className="treasure-rec-item-countdown-text">（请在规定时间内完成支付）</span>
						}
					</div>

					{
						this.props.isPaid===true?
							this.props.term.status==='opened' ?
							<div className='treasure-rec-item-time'>
								<span className="pull-left">
									揭晓時間：{this.props.term.openTimeStr}
								</span>
							</div>
							:
							this.props.term.isPoint?
								null:
								<div>
									<span className="pull-left treasure-rec-item-rest ">
										总需 {this.props.term.totalAmount} 人次
									</span>
									<span className="pull-right treasure-rec-item-rest">
										剩余 {this.props.term.totalAmount - this.props.term.currentAmount}
									</span>
									<div className="clearfix"/>
									<div className="treasure-rec-item-proc">
										<div className="treasure-rec-item-proc-fill" style={{
											width: this.props.term.currentAmount / this.props.term.totalAmount * 100 + '%'
										}}/>
									</div>
								</div>
						:
							<CountDown time={this.props.timeCountDown} onComplete={this._onCounwDownComplete}/>
					}
					<div className="treasure-rec-item-btns">
						{
							this.props.isPaid===true?

								this.props.term.status==='opened'?

								<a href={'/detail?termId=' + (this.props.term.termId)+'&isNew=1'} className="btn btn-primary button">
									再次购买
								</a>
								:
								this.props.term.code===''?
									<a href={'/detail?termId=' + (this.props.term.termId)} className="btn btn-primary button">
										追加
									</a>
									:
									null	
								:
								<button type="button" className="btn btn-primary button " onClick={this._orderHandler.bind(this,this.props.orderSerialnum)}>立即支付</button>
						}
						{
							this.props.isPaid===true?
								<Link to={'/recorddetail?orderSerialNum=' + this.props.orderSerialnum} className="btn btn-primary button">
									详情
								</Link>
								:null
						}
					</div>
				</div>
				{
					this.props.term.status==='opened' ?
					
						<div className="treasure-rec-item-win">
							<div className="treasure-rec-item-win-cell">
								<div className="treasure-rec-item-win-cell-left">
									获奖者:
									<a href={'/userHome?serialNum=' + (this.props.winner.serialNum)}>
										<span className="text-primary">
										{this.props.winner.name}
										</span>
									</a>
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
						</div>
					
					: null
				}
			</div>
		);
	},
	_onCounwDownComplete : function(){
		this.props._onCounwDownComplete();
	},
	_orderHandler : function(orderSerialnum){
		var order = {};
		order.orderSerialnum = orderSerialnum;
		TreasureRecordUtil.orderHandler(order,function(res){
			if(res.paymentSerialNum===null){
				alert('网络繁忙请稍后再试');
				return;
			}
			window.location='/seller/payment?paymentSerialNum='+res.paymentSerialNum;
		}.bind(this));
	}
});

var TreasureRecord = React.createClass({
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
		TreasureRecordUtil.recordList(this.props.location.query, function(res) {
			this.setState({
				hasNextPage: res.hasNextPage,
				orders: res.orders,
				pageNum: res.pageNum
			});
		}.bind(this));
	},

	componentWillReceiveProps: function(nextProps) {
		TreasureRecordUtil.recordList(nextProps.location.query, function(res) {
			this.setState({
				hasNextPage: res.hasNextPage,
				orders: res.orders,
				pageNum: res.pageNum
			});
		}.bind(this));
	},

	render: function() {
		var items = this.state.orders.map((item, index) => {
			return <TreasureRecordItem {...item} key={index} _onCounwDownComplete={this._onCounwDownComplete}/>
		});

		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='treasure-rec'>
						<TreasureRecordTab query={this.props.location.query}/>
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
	},

	_loadMore: function() {
		if (this.state.hasNextPage) {

            this.setState({
                loading: true
            });
            var q = _.assign({}, this.props.location.query)
            q.pageNum = this.state.pageNum + 1
            TreasureRecordUtil.recordList(q, function(res) {
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
	},
	_onCounwDownComplete : function(){
		this.props.location.query.pageNum = 1;
		TreasureRecordUtil.recordList(this.props.location.query, function(res) {
			this.setState({
				hasNextPage: res.hasNextPage,
				orders: res.orders,
				pageNum: res.pageNum
			});
		}.bind(this));
	}
});

module.exports = TreasureRecord;