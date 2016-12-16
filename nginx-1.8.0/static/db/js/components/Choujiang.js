require('../../less/choujiang.less');
var request = require('superagent');
var React = require('react');
var ChoujiangUtil = require('../utils/ChoujiangUtil.js');
var ChouJiang = React.createClass({
	getInitialState: function() {
		return {
			rotate: 0,
			isSubscribe:false,
			hasChance:false,
			html:'',
			isImageShow:false,
			serialNum:''
		}
	},
	componentDidMount: function() {
		var serialNum = '';
		ChoujiangUtil.getSerialNum(function(res){
			this.setState({
				serialNum:res.serialNum
			});
			serialNum = res.serialNum;
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
			ChoujiangUtil.invitationHandler(data);
		}
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
					title: '现金红包,iphone,iwatch免费抽奖啦', // 分享标题
					desc: '100%中奖，更有机会一元领取iphone7哦~~', // 分享描述
					link: 'm.uclee.com/choujiang?serialNum='+ serialNum, // 分享链接
					imgUrl: 'http://120.25.193.220/group1/M00/24/51/eBnB3Fgw-1SAHHoyAAFgj66MltY30.file', // 分享图标
					success: function () {
					},
					cancel: function () {
					}
				});
				wx.onMenuShareTimeline({
					title: '现金红包,iphone,iwatch免费抽奖啦', // 分享标题
					link: 'm.uclee.com/choujiang?serialNum='+ serialNum, // 分享链接
					imgUrl: 'http://120.25.193.220/group1/M00/24/51/eBnB3Fgw-1SAHHoyAAFgj66MltY30.file', // 分享图标
					success: function () { 
					},
					cancel: function () {
					}
				});
			});
		}.bind(this));
	},


	render: function() {
		return (
			<div className='row'>
				<div className='col-xs-12 trim-col'>
					<div className='choujiang'>
						<div className='choujiang-conversation'>
							<img className='choujiang-conversation-image' src='../images/conversation.jpg'/>
						</div>
						<div className='choujiang-pan'>
							<img className='choujiang-pan-body' src='../images/body.png'/>
							<img className={'choujiang-pan-head rotate' + (this.state.rotate)}  src='../images/head.png' onClick={this._runrotate}/>
						</div>
						<div className='choujiang-qrcode'>
							<img className='choujiang-qrcode-image' src='../images/qrcode.jpg'/>
						</div>
						<div className='choujiang-subc'>
						<a href='https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI2MTU0MDIxMQ==&scene=110#wechat_redirect' className='choujiang-subc-button'>
							点我马上关注UC优购
						</a>
						</div>
						<div className='choujiang-intro'>
							<div className='choujiang-intro-tag'>
								UC优购介绍
							</div>
							<div className='choujiang-intro-text'>
								UC优购，是一个以众筹为模式销售各类商品的平台。其引入了一元众筹购物的概念，用户只需一元参与，就有机会获得一件商品。具体玩法是：商品按照一元一人次的概念，将总价分成若干份，每参与一人次即可获得一个摇奖号，当商品到达总人次时，系统结合福利彩票时时彩，通过公式公平公正的计算出幸运号，拥有该号码的用户即可获得该件商品。
							</div>
							<div className='choujiang-intro-end'>
								一块钱能做什么？在这里，一块钱，能还你一个惊喜！
							</div>
						</div>
						{this.state.isImageShow ? 
							<div className='choujiang-result'>
								<img src='../images/win.png' className='choujiang-result-image' onClick={this._location}/>
							</div> 
							: null}
					</div>
				</div>
			</div>
		);
	},
	_location:function(){
		window.location='/share';
	},
	_sleep(numberMillis) {  
	    var now = new Date();  
	    var exitTime = now.getTime() + numberMillis;  
	    while (true) {  
	        now = new Date();  
	        if (now.getTime() > exitTime)  
	            break;  
	    }  
	},
	_runrotate:function(){
		var q = this.props.location.query;
		ChoujiangUtil.getData(q,function(res){
			this.setState(res);
			if(!this.state.isSubscribe){
				alert('亲，请先点击下方按钮或长按二维码关注公众号继续抽奖哦~~');
				/*window.location='https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI2MTU0MDIxMQ==&scene=110#wechat_redirect';*/
				return;
			}
			if(!this.state.hasChance){
				var conf = confirm('您已抽过奖，是否立即前往领取iphone7?');
				if(conf){
					window.location="http://m.uclee.com";
				}
				return;
			}
			this.setState({
				rotate : res.result
			})
			setTimeout(function(){
				this.setState({
					isImageShow : true
				})
			}.bind(this),3000)
		}.bind(this));
	}
});

module.exports = ChouJiang;