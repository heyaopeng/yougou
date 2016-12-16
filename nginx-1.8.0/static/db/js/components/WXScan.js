var React = require('react');
var request = require('superagent');
var WXScanUtil = require('../utils/WXScanUtil.js');

var WXScan = React.createClass({
	getInitialState: function() {
		return {
			text: '准备中...'
		};
	},

	componentDidMount: function() {
		WXScanUtil.isWC(function(isWC) {
			if (!isWC) {
				this.setState({
					text: '请在微信打开本链接'
				});
				return;
			}
			request
				.get('/duobao-user-web/fastPaymentScan?url=http://www.uclee.com/wxscan')
				.end(function(err, res) {
					var c = JSON.parse(res.text);
					console.log(c);
					wx.config({
						debug: false,
						appId: c.appId,
						timestamp: c.timestamp,
						nonceStr: c.noncestr,
						signature: c.signature,
						jsApiList: ['scanQRCode']
					});
					wx.ready(function() {
						wx.scanQRCode({
							needResult: 1,
							scanType: ["qrCode", "barCode"],
							success: function(res) {
								var url = res.resultStr;
								console.log(url);
								window.location = "couponDetail?number=" +url;
							}
						});
					});
				}.bind(this));
		}.bind(this));
	},

	render: function() {
		return (
			<div>
				<h1 className="text-center">{this.state.text}</h1>
			</div>
			);
	}
});

module.exports = WXScan;