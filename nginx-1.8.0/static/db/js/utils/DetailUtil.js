var request = require('superagent');
var A = require('../A.js');

module.exports = {
	getDetail: function(q, cb) {
		request
			.get('/duobao-user-web/term')
			.query(q)
			.use(A.ajaxLoading())
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	},

	getResult: function(q, cb) {
		request
			.get('/duobao-user-web/termResult')
			.query(q)
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	},

	cartHandler: function(q, cb) {
		request
			.get('/duobao-user-web/cartHandler')
			.query(q)
			.use(A.ajaxLoading())
			.use(A.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	},
	pointOrderHandler: function(q, cb) {
		request
			.get('/duobao-user-web/pointOrderHandler')
			.query(q)
			.use(A.ajaxLoading())
			.use(A.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	},

	getDescription: function(url, cb) {
		request
			.get(url)
			.use(A.ajaxLoading())
			.end(function(err, res) {
				if (err) {
					return err
				}

				cb(res.text)
			})
	},

	invitationHandler: function(query) {
		request
			.get('/duobao-user-web/invitationHandler')
			.query(query)
			.use(A.ajaxLoading())
			.use(A.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}
			});
	},

	share: function(serialNum,productName,image) {
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
						title: productName  + '一元领取啦！！！', // 分享标题
						desc: '全场商品一元火热拼抢！！', // 分享描述
						link: 'http://m.uclee.com' + window.location.pathname + window.location.search + '&serialNum='+serialNum, // 分享链接
						imgUrl: image, // 分享图标
						success: function () {
						},
						cancel: function () {
						}
					});
					wx.onMenuShareTimeline({
						title: productName  + '一元领取啦！！！', // 分享标题
						link: 'http://m.uclee.com' + window.location.pathname + window.location.search + '&serialNum='+serialNum, // 分享链接
						imgUrl: image, // 分享图标
						success: function () { 
						},
						cancel: function () {
						}
					});
				});
			});
	},
	getIsSubscribe : function(cb){
		request
			.post('/duobao-user-web/isSubscribe')
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
};