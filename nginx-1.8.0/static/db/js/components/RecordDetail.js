require('../../less/record-detail.less');

var React = require('react');
var Navi = require('./Navi.js');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var RecordDetailUtil = require('../utils/RecordDetailUtil.js');
var RecordIofo = React.createClass({
	render: function() {
		console.log(this.props.addr);
		return (
			<div className="record-detail-item">
				<a href={'/detail?termId=' + (this.props.order.termId)} >
					<div className="record-detail-item-thumb">
						<img src={this.props.order.productImage} width="100" height="100"/>
					</div>

				</a>
				<div className="record-detail-item-content">
					<div className="record-detail-item-title">
						{this.props.order.productTitle}
					</div>

					<div className="record-detail-item-info">
						<span>
							第 {this.props.order.term.currentTerm} 期
						</span>
						<span>
							已参与 <span className="red">{this.props.order.numberCount} </span>人次
						</span>
					</div>
					{
					this.props.order.term.status==='opened' ?
					<div>
						<span className="pull-left">
							揭晓時間：{this.props.order.term.openTimeStr}
						</span>
					</div>
					:this.props.order.isPoint?
						null:
						<div>
							<span className="pull-left">
								总需 {this.props.order.term.totalAmount} 人次
							</span>
							<span className="pull-right record-detail-item-rest">
								剩余 {this.props.order.term.totalAmount - this.props.order.term.currentAmount}
							</span>
							<div className="clearfix"/>
							<div className="record-detail-item-proc">
								<div className="record-detail-item-proc-fill" style={{
									width: this.props.order.term.currentAmount / this.props.order.term.totalAmount * 100 + '%'
								}}/>
							</div>
						</div>
					}
					{
						<div className="record-detail-item-btns">
							{
							<a href={'/detail?termId=' + (this.props.order.termId) + '&isNew=1'} className="btn btn-primary button">
								继续购买
							</a>
							}
						</div>
					}
				</div>
				{
					this.props.order.status==='opened' ?
					<div className="record-detail-item-win">
						<div className="record-detail-item-win-cell">
							<div className="record-detail-item-win-cell-left">
								获奖者:
								<a href={'/userHome?serialNum=' + this.props.order.winner.serialNum}>
									<span className="text-primary">
									{this.props.order.winner.name}
									</span>
								</a>
							</div>
						</div>
						<div className="record-detail-item-win-cell">
							<div className="record-detail-item-win-cell-center">
								参与了
								<span className="record-detail-item-win-cell-center-text">
								{this.props.order.winner.count}
								</span>
								人次
							</div>
						</div>
						<div className="record-detail-item-win-cell">
							<div className="record-detail-item-win-cell-right">
								幸运号: {this.props.order.winner.luckyNumber}
							</div>
						</div>
					</div>
					: null
				}
				{
					this.props.order.addr!==null?
					<div className="record-detail-item-addr">
						<div className='record-detail-item-addr-row'>
						收货地址：{this.props.order.addr}
						</div>
						<div className='record-detail-item-addr-row'>
						收<span className='blank'></span>件<span className='blank'></span>人：{this.props.order.name}
						</div>
						<div className='record-detail-item-addr-row'>
						联系电话：{this.props.order.phone}
						</div>
					</div>
					:null
				}
			</div>
			);
	}
});

var NumberInfo = React.createClass({

	render : function(){
		console.log(this.props.isPoint);
		return (
			<div className="record-detail-numberinfo">
				<div className="record-detail-numberinfo-time">
					<span className="pull-left record-detail-numberinfo-time-left">拼货时间:</span>
					<span className="pull-left record-detail-numberinfo-time-left">{this.props.createTimeStr}</span>
				</div>
				{
					!this.props.isPoint&&this.props.totalPrice>this.props.numberCount?
					<div className='record-detail-numberinfo-list-miss'><span className='number'>库存不足，处理失败{this.props.totalPrice-this.props.numberCount}个，已退还U币</span></div>
					:null

				}
				{
					this.props.order.size>0?
					<div className='record-detail-numberinfo-list'>
						<div className='record-detail-numberinfo-list-meta'>拼货号</div>

						{
							this.props.order.orderNumber.map((item, index) => {
								return (
									<div className={'record-detail-numberinfo-list-item ' + (item.isLuckyNumber===true?'lucky':'') + ((index+1)%3===1?' left':(index+1)%3===2?' center':' right')}  key={index}>
										{item.number}
									</div>
								);
							})
						}
					</div>
					:null

				}
				
				<div className='record-detail-numberinfo-list-meta'>共参与<span className='number'>{this.props.numberCount}</span>人次</div>


			</div>
		);
	}
});

var RecordDetail = React.createClass({

	getInitialState: function() {
		return {
			loading: false,
			order: {}
		}
	},

	componentDidMount: function() {
		RecordDetailUtil.recordDetail(this.props.location.query, function(res) {
			this.setState({
				order: res.order
			});
		}.bind(this));
	},

	render: function() {
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='record-detail'>
						{this.state.order&&this.state.order.term?<RecordIofo order={this.state.order}/>:null}
						{this.state.order&&this.state.order.term&&this.state.order.allOrderNumber?

							this.state.order.allOrderNumber.map((item, index) => {
								return (
									<NumberInfo order={item} createTimeStr={this.state.order.createTimeStr} isPoint={this.state.order.isPoint} totalPrice={this.state.order.totalPrice} numberCount={this.state.order.numberCount} key={index}/>
								);
							})
							

							:null
						}
						<Navi />
					</div>
				</div>
			</div>
			);
	}
});

module.exports = RecordDetail;