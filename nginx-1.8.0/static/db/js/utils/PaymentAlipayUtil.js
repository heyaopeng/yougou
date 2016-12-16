var request = require('superagent');
var A = require('../A.js');

module.exports = {
	getData: function(query, cb) {
		request
			.get('/duobao-user-web/prePaymentForAlipay')
			.query(query)
			.use(A.ajaxLoading())
			.use(A.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	},
	getResult: function(q, cb) {
		request
			.get('/duobao-user-web/getPaymentResult')
			.query(q)
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	},
	submitHandler: function(data, cb) {
		request
			.post('/duobao-user-web/paymentHandler')
			.send(data)
			.use(A.ajaxLoading())
			.use(A.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
};