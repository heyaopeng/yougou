require('../../less/detail.less');
require('slick-carousel/slick/slick.less');
var Navi = require('./Navi.js');
var React = require('react');
var Slick = require('react-slick');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var CountDown = require('./CountDown.js');

var DetailUtil = require('../utils/DetailUtil.js');

var DetailCarousel = (props) => {
	var slickSettings = {
		dots: true,
		arrows: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true
	};

	var items = props.productImages.map((item, index) => {
		return (
			<div className="home-carousel-item" key={index}>
				<img src={item} className="home-carousel-img"/>
			</div>
			)
	})

	return (
		<div className="detail-carousel">
			<span className="detail-carousel-tag">{props.tag}</span>
			<Slick {...slickSettings}>
				{items}
			</Slick>
		</div>
		);
}

var DetailInfoOpening = (props) => {
	return (
		<div className="detail-info-opening">
			<div>{`第${props.currentTerm}期`}</div>
			{
				props.timeCountDown > 0 ?
				<div>
					揭晓倒计时：
					<CountDown time={props.timeCountDown} onComplete={() => {
						window.location.reload();
					}}/>

					<Link to={'/termReal?termId=' + (props.termId)} className="detail-info-opening-btn">
						计算详情
					</Link>
				</div>
				:
				<div>
					揭晓中...
					<Link to={'/termReal?termId=' + (props.termId)} className="detail-info-opening-btn">
						计算详情
					</Link>
				</div>
			}
			
		</div>
		)
}

var DetailInfoRunning = (props) => {
	return (
		<div>
			<div className="clearfix">
				<span className="detail-info-term">第{props.currentTerm}期</span>
				{
					props.code===''?
						<div className="detail-info-share" onClick={() => {
							DetailUtil.share(props.serialNum,props.productTitle,props.productImages[0]);
							props._showShare(true);
						}}>
							分享赚现金
						</div>
					:
					props.point===0?
					<div className="detail-info-share" >
						免费参与
					</div>:
					<div className="detail-info-share" >
						参与需{props.point}积分
					</div>
				}
			</div>
			{
				!props.isPoint?
				<div className="detail-info-percent">
					<div className="detail-info-finish" style={{
						width: (props.currentAmount / props.totalAmount) * 100 + '%'
					}}/>
				</div>
				:null
			}

			{
				!props.isPoint?
				<div className="clearfix">
					<span className="pull-left">
						总需{props.totalAmount}人次
					</span>
					<span className="pull-right">
						剩余{props.totalAmount - props.currentAmount}
					</span>
				</div>
				:null
			}
			
			
		</div>
		)
}

var DetailInfoOpened = (props) => {
	return (
		<div className="detail-info-opened">
			{
				props.code===''?
					<div className="detail-info-share" onClick={() => {
						DetailUtil.share(props.serialNum,props.productTitle,props.productImages[0]);
						props._showShare(true);
					}}>
						分享赚现金
				</div>
				:null
			}
			
			<div className="detail-info-avatar">
				<Link to={'/userHome?serialNum=' + (props.userSerialNum)} >
					<img src={props.userImage} width="75" height="75"/>
				</Link>
			</div>
			<div className="detail-info-user">
				<div>{`获得用户：${props.nickName}`}</div>
				<div>来<span className="blank"></span>    自：{`${props.ipAddr}`}</div>
				<div>期 <span className="blank"></span>   数：{`${props.currentTerm}`}</div>
				<div>{`本期参与：${props.allNumberCount} 人次`}</div>
				<div>{`商品价值：${props.productPrice}元`}</div>
				<div>{`揭晓时间：${props.openTimeStr}`}</div>
			</div>
			<div className="detail-info-num">
				<div className='detail-info-num-text'>
				{`幸运号码：${props.luckyNumber}`}
				</div>
				<Link to={'/termReal?termId=' + (props.termId)} className="detail-info-num-btn">
					计算详情
				</Link>
			</div>
			{
				props.isPoint&&props.code!==''?null:
					<div className="detail-info-next">
						<div className='detail-info-next-text'>
						第{props.currentTerm + 1}期正在火热进行中
						</div>
						<a href={'/detail?termId=' + (props.termId) + '&isNew=1'} className="detail-info-next-btn">
							立即参与
						</a>
					</div>
			}

			
			
		</div>
		)
}

var DetailInfo = (props) => {
	var statusMap = {
		'running': '进行中',
		'opened': '已揭晓',
		'opening': '待开奖'
	}

	var comp = null;
	if (props.status === 'running') {
		comp = <DetailInfoRunning {...props}/>
	}
	else if (props.status === 'opened') {
		comp = <DetailInfoOpened {...props.result} _showShare={props._showShare} serialNum={props.serialNum} productTitle={props.productTitle} productImages={props.productImages}/>
	}
	else {
		comp = <DetailInfoOpening {...props}/>
	}

	return (
		<div className="detail-info">
			<div className="detail-info-title">
				<span className="detail-info-label">
					{statusMap[props.status]}
				</span>
				{props.productTitle}
			</div>
			{comp}
		</div>
		)
}

var DetailJoin = (props) => {
	return (
		<div className="detail-join">
			{
				props.isPoint&&props.status==='running'?
						props.fullTimeCountDown&&props.fullTimeCountDown > 0 ?
						<div className="clearfix detail-join-fulltime">
							<CountDown time={props.fullTimeCountDown} tag='截止倒计时：' onComplete={() => {
											window.location.reload();
										}}/>
						</div>:
						null
						:
						
					null
			}
			{props.myOrderNumberCount<=0?"您没参与本期拼货":"您已参与"+props.myOrderNumberCount+"人次"}

			
		</div>
		
	)
}

var DetailLinks = (props) => {
	return (
		<div className="detail-links">
			<Link to="/detaildescription" className="detail-link" onClick={() => {
				sessionStorage.setItem('d_d_url', props.description)
			}}>
				商品详情
				<span className="fa fa-chevron-right" />
			</Link>
			<Link to={"/showList?productId=" + props.productId} className="detail-link">
				晒单分享
				<span className="fa fa-chevron-right" />
			</Link>
			{
				props.isPoint&&props.code===''?null:
				<Link to={{
					pathname: '/joinList',
					query: {
						termId: props.termId,
						isNew:props.isNew
					}}} className="detail-link">
					所有拼货记录
					<span className="fa fa-chevron-right" />
				</Link>

			}
			<Link to={{
				pathname: '/detailchart',
				query: {
					termId: props.termId
				}
			}} className="detail-link" onClick={() => {
				sessionStorage.setItem(`ts${props.termId}`, JSON.stringify(props.termStatics))
			}}>
				近十期走势
				<span className="fa fa-chevron-right" />
			</Link>
		</div>
		)
}

var DetailRecent = (props) => {
	var items = props.latestWinInfo.map(function(item, index) {
		return (
			<div className="detail-recent-item" key={index}>
				<div className="detail-recent-item-header">
					<span className="pull-left">
						第{item.currentTerm}期
					</span>
					<span className="pull-right">
						揭晓时间：{item.openTimeStr}
					</span>
				</div>
				<div className="detail-recent-item-person">
					<div className="detail-recent-item-img">
						<Link to={'/userHome?serialNum=' + (item.winOrder.userSerialNum)} >
							<img src={item.winOrder.userImage} width="50" height="50"/>
						</Link>
					</div>
					<div className="detail-recent-item-info">
						<div>
							获得用户：{item.winOrder.nickName}
						</div>
						<div>
							来<span className="blank"></span>自：{item.winOrder.ipAddr}
						</div>
						<div>
							参与人次：{item.winOrder.allNumberCount}
						</div>
						<div>
							幸运号码：{item.winOrder.luckyNumber}
						</div>
					</div>
				</div>

				<Link to={"/commonRecorddetail?orderSerialNum=" + (item.winOrder.orderSerialnum)} className="detail-recent-item-check">
					查看Ta本期所有号码>>
				</Link>
			</div>
			)
	})

	return (
		<div className="detail-recent">
			<div className="detail-recent-title">
				最近三期中奖名单
				<Link to={"/luckyList?termId=" + (props.termId)} className="detail-recent-more">
					查看更多
				</Link>
			</div>
			<div className="detail-recent-items">
				{ items }
			</div>
		</div>
		)
}

var DetailCart = (props) => {
	return (
		<div className="detail-cart">
			<div className="detail-cart-btn-wrap">
				<button type="button" className="detail-cart-btn"  onClick={() => {
					props._now(props.termId,props.isPoint,props.status)	
				}}>
					{!props.isPoint?'立即参与':'免费参与'}
				</button>
				{
					!props.isPoint?
					<button type="button" className="detail-cart-btn detail-cart-btn-re" onClick={() => {
						props._addCart(props.termId)
					}}>
						加入购物车
					</button>
					:null
				}
			</div>
			<div className="detail-cart-btn-wrap-sm">
				<button type="btton" className="detail-cart-add">
					<Link to="/cart" >
						<span className="fa fa-shopping-cart"/>
					</Link>
				</button>
			</div>
		</div>
	)
}


var Detail = React.createClass({
	getInitialState: function() {
		return {
			totalAmount: 0,
			currentAmount: 0,
			productImages: [],
			latestWinInfo: [],
			termStatics: [],
			result: {},
			productId:0,
			tag:'',
			status:'',
			termId:0,
			myOrderNumberCount:0,
			isShareShow : false,
			isSubscribeShow : true,
			serialNum:'',
			isSubscribe:true,
			isPoint:false,
			code:'',
			fullTimeStr:'',
			timeCountDown:0,
			fullTimeCountDown:0
		}
	},
	componentDidMount: function() {
		DetailUtil.getDetail(this.props.location.query, function(res) {
			this.setState(res.term)
		}.bind(this))
		this._getResult();
		if(this.props.location.query.serialNum){
			var data = {};
			data.serialNum = this.props.location.query.serialNum;
			DetailUtil.invitationHandler(data);
			this.props.location.query.serialNum=null;
		}
	},
	componentWillReceiveProps: function(nextProps) {
		DetailUtil.getDetail(this.props.location.query, function(res) {
			this.setState(res.term)
		}.bind(this))
		this._getResult();
		if(this.props.location.query.serialNum){
			var data = {};
			data.serialNum = this.props.location.query.serialNum;
			DetailUtil.invitationHandler(data);
			this.props.location.query.serialNum=null;
		}
	},
	render: function() {
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='detail'>
						<DetailCarousel productImages={this.state.productImages} tag={this.state.tag}/>
						<DetailInfo {...this.state} productImages={this.state.productImages} getResult={this._getResult} _showShare={this._showShare} serialNum={this.state.serialNum}/>
						<DetailJoin status={this.state.status} myOrderNumberCount={this.state.myOrderNumberCount} fullTimeCountDown={this.state.fullTimeCountDown} isPoint={this.state.isPoint} fullTimeStr={this.state.fullTimeStr}/>
						<DetailLinks
							termStatics={this.state.termStatics}
							termId={this.props.location.query.termId}
							isNew={this.props.location.query.isNew}
							productId={this.state.productId}
							description={this.state.description}
							code={this.state.code}
							isPoint={this.state.isPoint}/>
						<DetailRecent latestWinInfo={this.state.latestWinInfo} termId={this.state.termId}/>
						{this.state.isShareShow?
						<div className="detail-hidden-share" onClick={this._showShare.bind(this, false)}>
							<img className='detail-hidden-share-image' src='../../images/share/share.png' />
						</div>
						:null}
						{!this.state.isSubscribe?
						<div className="detail-hidden-subscribe">
							<img className='detail-hidden-subscribe-image' src='../../images/subscribe4.png' />
							<button className='detail-hidden-subscribe-button' onClick={this._showSubscribe.bind(this, true)}>先逛逛</button>
						</div>
						:null}
					</div>
					<DetailCart termId={this.state.termId} isPoint={this.state.isPoint} _now={this._now} status={this.state.status} _addCart={this._addCart}/>
					<Navi/>
				</div>
			</div>
			);
	},
	_showShare: function (b) {
		this.setState({
			isShareShow: b
		})
	},
	_showSubscribe: function (b) {
		this.setState({
			isSubscribe: b
		})
	},
	
	_getResult: function() {
		var resultHandler = (res) => {
			
			console.log(res.order.status);
			if (res.order.status === 'opening') {
				DetailUtil.getResult(this.props.location.query, resultHandler)
				return
			}

			if (res.order.status === 'opened') {
				this.setState({
					status: res.order.status,
					result: res.order
				})
			} 
		}
		
		DetailUtil.getResult(this.props.location.query, resultHandler)
	},

	_now : function(termId,isPoint,status){
		if(!isPoint){
			var q = {};
			q.termId=termId;
			DetailUtil.cartHandler(q, function(res) {
				if(res.result===false){
					alert("网络繁忙，请稍后再试!");
				}
				window.location='/cart';
			}.bind(this))
		}else{
			DetailUtil.getIsSubscribe(function(res){
				if(!res.isSubscribe){
					this.setState({
						isSubscribe:res.isSubscribe
					})
					return ;
				}else{
					var q = {};
					q.termId=termId;
					DetailUtil.pointOrderHandler(q, function(res) {
						if(status==='opened'){
							alert("活动已结束!");
						}else if(res.paymentSerialNum==='error'){
							alert("网络繁忙，请稍后再试!");
						}else if(res.paymentSerialNum==='notPointProduct'){
							alert("所选产品非活动专区产品！");
						}else if(res.paymentSerialNum==='existed'){
							alert("您已参与过本次活动，如未支付，请进入个人中心->参与记录完成支付！");
						}else{
							window.location='/order?paymentSerialNum='+res.paymentSerialNum;
						}
					}.bind(this))
				}
			}.bind(this))
			
		}
	},
	_addCart : function(termId){
		var q = {};
		q.termId=termId;
		DetailUtil.cartHandler(q, function(res) {
			if(res.result===false){
				alert("网络繁忙，请稍后再试!");
			}
		}.bind(this))
	},
});

module.exports = Detail;