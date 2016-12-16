require('../../less/share.less');
var request = require('superagent');
var React = require('react');
var Navi = require('./Navi.js');
var ShareUtil = require('../utils/ShareUtil.js');
var Link = require('react-router').Link;
var Top = React.createClass({
	render : function(){
		return (
			<div className='share-top'>
				<img className='share-top-image'  src='../../images/share/top.jpg' />
				<Link to="/shareIntro" className='share-top-link'>
					了解分享赚钱  >  >
				</Link>
			</div>
		);
	}

});

var Data = React.createClass({
	render : function(){
		console.log(this.props.data.commission);
		return(
			<div className='share-data'>
				<div className='share-data-info'>
					<div className='share-data-info-item'>
						{this.props.data.commission?this.props.data.commission:0}
					</div>
					<div className='share-data-info-item'>
						{this.props.data.number?this.props.data.number:0}
					</div>
				</div>
				<div className='share-data-title'>
					<div className='share-data-title-item'>
						佣金余额(￥)
					</div>
					<div className='share-data-title-item'>
						邀请朋友
					</div>
				</div>
			</div>
		);
	}
});

var Option = React.createClass({
	render : function(){
		return(
			<div className='share-option'>
				<Link to="/withdraw" className='share-option-text'>
					<span className='share-option-text-left'>提现</span><span className='fa fa-chevron-right share-option-text-right'></span>
				</Link>
				<Link to="/commission" className='share-option-text'>
					<span className='share-option-text-left'>佣金明细</span><span className='fa fa-chevron-right share-option-text-right'></span>
				</Link>
				<Link to="/invitation" className='share-option-text'>
					<span className='share-option-text-left'>邀请好友明细</span><span className='fa fa-chevron-right share-option-text-right'></span>
				</Link>
				<div className='share-option-button' onClick={this._shareHandle.bind(this, true,this.props.data.serialNum)}>
					立即分享赚钱
				</div>
				{this.props.data.isShareShow?
				<div className="share-option-hidden" onClick={this._clickHandle.bind(this, false)}>
					<img className='share-option-hidden-image' src='../../images/share/share.png' />
				</div>
				:null}
			</div>

		);
	},
	_clickHandle : function(b){
		this.props.showShare(b)
	},
	_shareHandle : function(b,serialNum){
		var q = {};
		q.url=window.location.href.split('#')[0];
		request
		.get('/duobao-user-web/fastPaymentScan')
		.query(q)
		.end(function(err, res) {
			var c = JSON.parse(res.text);
			wx.config({
			debug: false,
			appId: c.appId,
			timestamp: c.timestamp,
			nonceStr: c.noncestr,
			signature: c.signature,
			jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage']
		});
		wx.ready(function() {
			console.log("进入");
			wx.onMenuShareAppMessage({
				title: '坐着都能赚钱，邀请好友赚现金', // 分享标题
				desc: '还有机会一元领取iphone7哦~~', // 分享描述
				link: 'm.uclee.com/share?serialNum='+ serialNum, // 分享链接
				imgUrl: 'http://120.25.193.220/group1/M00/24/51/eBnB3Fgw-1SAHHoyAAFgj66MltY30.file', // 分享图标
				success: function () {
				},
				cancel: function () {
				}
			});
			wx.onMenuShareTimeline({
				title: '坐着都能赚钱，邀请好友赚现金', // 分享标题
				link: 'm.uclee.com/share?serialNum='+ serialNum, // 分享链接
				imgUrl: 'http://120.25.193.220/group1/M00/24/51/eBnB3Fgw-1SAHHoyAAFgj66MltY30.file', // 分享图标
				success: function () { 
				},
				cancel: function () {
				}
			});
		});
		}.bind(this));
		this.props.showShare(b);
	},
});


var Share = React.createClass({
	getInitialState :function(){
		return {
			commission : 0,
			number : 0,
			isShareShow : false,
			serialNum:'',
			isSubscribeShow:false
		};
	},

	componentDidMount : function(){
		var q = this.props.location.query;
		ShareUtil.getData(q,function(res){
			this.setState(res);
		}.bind(this));
		if(this.props.location.query.serialNum){
			var data = {};
			data.serialNum = this.props.location.query.serialNum;
			request
				.get('/duobao-user-web/isLogin')
				.end(function(err, res) {
					if (err) {
						return err
					}

					if (res.text === 'false') {
						localStorage.setItem('wx_login_path', window.location.pathname + window.location.search)
						window.location = '/duobao-user-web/weiXinLogin'
						return
					}
			})
			ShareUtil.invitationHandler(data);
		}
	},

	render: function() {
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='share'>
						<Top/>
						<Data data={this.state}/>
						<Option showShare={this._showShare} _getWeixinConfig={this._getWeixinConfig} data={this.state}/>
						<Navi />
						{this.state.isSubscribeShow?
						<div className="share-hidden-subscribe">
							<img className='share-hidden-subscribe-image' src='../../images/subscribe2.png' />
							<button className='share-hidden-subscribe-button' onClick={this._showSubscribe.bind(this, false)}>先逛逛~</button>
						</div>
						:null}
					</div>
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
			isSubscribeShow: b
		})
	},

	_getWeixinConfig: function(title,desc,link,imgUrl) {
		if (typeof WeixinJSBridge == "undefined") {
			alert('请用微信打开链接');
		} else {
			alert('11');
			WeixinJSBridge.invoke('shareTimeline',{
				"img_url":imgUrl,
				//"img_width":"640",
				//"img_height":"640",
				"link":link,
				"desc": desc,
				"title":title
			});
		}
	}
});

module.exports = Share;