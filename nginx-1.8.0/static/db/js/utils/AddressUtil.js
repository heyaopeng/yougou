var request = require('superagent');
var A = require('../A.js');

module.exports = {
	getData: function(query, cb) {
		query.pageSize = 10;
		request
			.get('/duobao-user-web/addrList')
			.query(query)
			.use(A.ajaxAuth())
			.use(A.ajaxLoading())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	delAddr : function(data,cb){
		request
			.post('/duobao-user-web/delAddrHandler')
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
	setDefault : function(data,cb){
		request
			.post('/duobao-user-web/setDefaultAddr')
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
	pickAddr : function(data,cb){
		request
			.post('/duobao-user-web/pickAddrHandler')
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