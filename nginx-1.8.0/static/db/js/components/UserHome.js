require('../../less/user-home.less');

var React = require('react');
var Navi = require('./Navi.js');
var UserHomeUtil = require('../utils/UserHomeUtil.js');
var Link = require('react-router').Link;
var _ = require('lodash')
var ScrollLoad = require('./ScrollLoad.js');
var browserHistory = require('react-router').browserHistory;
var Top = React.createClass({
	render : function(){
		return (
			<div className='userhome-top'>
				<img className='userhome-top-background'  src='../../images/userCenter/top.jpg' />
				<div className='userhome-top-data'>
					<div className='userhome-top-data-info'>
						<div className='userhome-top-data-info-item'>
							<img className='userhome-top-data-info-item-image' src={this.props.data.image}/>
						</div>
						<div className='userhome-top-data-info-item'>
							<div className='userhome-top-data-info-item-text'>{this.props.data.nickName} {this.props.data.phone}</div>
							<div className='userhome-top-data-info-item-text'>{this.props.data.ipAddr}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

});

var UserHomeTab = React.createClass({
	render: function() {
		var props = this.props;
		return (
			<div className="userhome-tab">
				<div className={'userhome-tab-item' + (!props.query.type || props.query.type === '1' ? ' active' : '')} onClick={this._tapTab.bind(this, '1')}>
					参与记录
				</div>
				<div className={'userhome-tab-item' + (props.query.type === '2' ? ' active' : '')} onClick={this._tapTab.bind(this, '2')}>
					中奖记录
				</div>
				<div className={'userhome-tab-item' + (props.query.type === '3' ? ' active' : '')} onClick={this._tapTab.bind(this, '3')}>
					晒单
				</div>
			</div>
			);
	},

	_tapTab: function(t) {
		browserHistory.replace({
			pathname: '/userhome',
			query: {
				serialNum: this.props.query.serialNum,
				type: t
			}
		});
	}
});

var TreasureRecordItem = React.createClass({
	render: function() {
		return (
			<div className="userhome-rec-item">
				<div className="userhome-rec-item-thumb">
					<img src={this.props.productImage} width="80" height="80"/>
				</div>
				<Link to={'/recorddetail?orderSerialNum=' + this.props.orderSerialnum}>
					<div className="userhome-rec-item-content">
						<div className="userhome-rec-item-title">
							{this.props.productTitle}
						</div>

						<div className="userhome-rec-item-info">
							<span>
								第 {this.props.term.currentTerm} 期
							</span>
							<span>
							已参与 <span className="red">{this.props.numberCount} </span>人次
							</span>
						</div>

						{
						this.props.term.status==='opened' ?
						<div className='userhome-rec-item-time'>
							<span className="pull-left">
								揭晓時間：{this.props.term.openTimeStr}
							</span>
						</div>
						:<div>
							<span className="pull-left userhome-rec-item-rest ">
								总需 {this.props.term.totalAmount} 人次
							</span>
							<span className="pull-right userhome-rec-item-rest">
								剩余 {this.props.term.totalAmount - this.props.term.currentAmount}
							</span>
							<div className="clearfix"/>
							<div className="userhome-rec-item-proc">
								<div className="userhome-rec-item-proc-fill" style={{
									width: this.props.term.currentAmount / this.props.term.totalAmount * 100 + '%'
								}}/>
							</div>
						</div>
						}
					</div>
				</Link>
				{
					this.props.term.status==='opened' ?
					<div className="userhome-rec-item-win">
						<div className="userhome-rec-item-win-cell">
							<div className="userhome-rec-item-win-cell-left">
								获奖者:
								<span className="text-primary">
								{this.props.winner.name}
								</span>
							</div>
						</div>
						<div className="userhome-rec-item-win-cell">
							<div className="userhome-rec-item-win-cell-center">
								参与了
								<span className="userhome-rec-item-win-cell-center-text">
								{this.props.winner.count}
								</span>
								人次
							</div>
						</div>
						<div className="userhome-rec-item-win-cell">
							<div className="userhome-rec-item-win-cell-right">
								幸运号: {this.props.winner.luckyNumber}
							</div>
						</div>
					</div>
					: null
				}
			</div>
			);
	}
});

var WinRecordItem = React.createClass({
	render: function() {
		return (
			<div className="userhome-rec-item">
				<div className="userhome-rec-item-thumb">
					<img src={this.props.productImage} width="80" height="80"/>
				</div>
				<Link to={'/recorddetail?orderSerialNum=' + this.props.orderSerialnum}>
					<div className="userhome-rec-item-content">
						<div className="userhome-rec-item-title">
							{this.props.productTitle}
						</div>

						<div className="userhome-rec-item-info">
							<span>
								第 {this.props.term.currentTerm} 期
							</span>
							<span>
							已参与 <span className="red">{this.props.numberCount} </span>人次
							</span>
						</div>

						<div className='userhome-rec-item-time'>
							<span className="pull-left">
								揭晓時間：{this.props.term.openTimeStr}
							</span>
						</div>
					</div>
				</Link>
				<div className="userhome-rec-item-win">
					<div className="userhome-rec-item-win-cell">
						<div className="userhome-rec-item-win-cell-left">
							获奖者:
							<span className="text-primary">
							{this.props.winner.name}
							</span>
						</div>
					</div>
					<div className="userhome-rec-item-win-cell">
						<div className="userhome-rec-item-win-cell-center">
							参与了
							<span className="userhome-rec-item-win-cell-center-text">
							{this.props.winner.count}
							</span>
							人次
						</div>
					</div>
					<div className="userhome-rec-item-win-cell">
						<div className="userhome-rec-item-win-cell-right">
							幸运号: {this.props.winner.luckyNumber}
						</div>
					</div>
				</div>
			</div>
			);
	}
});

var ShowListItem = React.createClass({
	render: function() {
		var image  = this.props.images.map(function(item,index){
			return (
				<span key={index}> <img className="userhome-show-item-images-col" src={item} /></span>
			);
		}.bind(this));
		return (
			<div className="userhome-show-item">
				<div >
					<img className="userhome-show-item-thumb" src={this.props.userImage}/>
				</div>
				<div className="userhome-show-item-content">
					<div className="userhome-show-item-nickname">
						{this.props.nickName}
					</div>

					<div className="userhome-show-item-info">
						<span>
							{this.props.ipAddr}
						</span>
						<span>
						{this.props.timeStr}
						</span>
					</div>

					<div className='userhome-show-item-title'>
						<span className="pull-left">
							{this.props.title}
						</span>
					</div>
					<div className="userhome-show-item-images" >
						{image}
					</div>
				</div>
			</div>
			);
	}
});

var UserHome = React.createClass({
	getInitialState :function(){
		return {
			loading: false,
			hasNextPage: false,
			pageNum: 0,
			nickName: "",
			ipAddr:"",
			phone:"",
			orders:[],
			userShowList:[]
		};
	},

	componentDidMount : function(){
		var q = this.props.location.query;
		UserHomeUtil.getData(q,function(res){
			this.setState(res);
		}.bind(this));
	},
	componentWillReceiveProps: function(nextProps) {
		UserHomeUtil.getData(nextProps.location.query, function(res) {
			this.setState(res);
		}.bind(this));
	},

	render: function() {
		var items = !this.props.location.query.type||this.props.location.query.type==1?
						this.state.orders.map((item, index) => {
								return <TreasureRecordItem {...item} key={index}/>
							})
					:
						this.props.location.query.type==2 ?
							this.state.orders.map((item, index) => {
								return <WinRecordItem {...item} key={index}/>
							})
							:
							this.state.userShowList.map((item, index) => {
								return <ShowListItem {...item} key={index}/>
							});

		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='userhome'>
						<Top data={this.state}/>
						<UserHomeTab query={this.props.location.query} data={this.state}/>
						<ScrollLoad
							containerHeight={window.innerHeight-272}
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

	/*_loadMore: function() {
		if (this.state.hasNextPage) {

            this.setState({
                loading: true
            });
            var q = _.assign({}, this.props.location.query)
            q.pageNum = this.state.pageNum + 1
            UserHomeUtil.getData(q, function(res) {
                var nState = _.assign({}, this.state);
                nState.userShowList = nState.userShowList.concat(res.userShowList);
                nState.orders = nState.orders.concat(res.orders);
                this.setState({
                    loading: false,
                    hasNextPage: res.hasNextPage,
                    userShowList: nState.userShowList,
                    orders : nState.orders,
                    pageNum: res.pageNum
                });
            }.bind(this));
		}
	},*/
});

module.exports = UserHome;