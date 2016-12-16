var request = require('superagent');
var A = require('../A.js');

module.exports = {
	getData: function(query, cb) {
		request
			.get('/duobao-user-web/cart')
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
	delItem : function(data,cb){
		request
			.post('/duobao-user-web/cartDelHandler')
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
	updateItem : function(data,cb){
		request
			.post('/duobao-user-web/cartUpdateHandler')
			.send(data)
			.use(A.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
};