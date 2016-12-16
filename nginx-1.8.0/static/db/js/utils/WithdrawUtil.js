var request = require('superagent');
var A = require('../A.js');

module.exports = {
	getData: function(cb) {
		request
			.get('/duobao-user-web/withdraw')
			.use(A.ajaxAuth())
			.use(A.ajaxLoading())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	},
	withdrawHandle : function(data, cb) {
		request
			.post('/duobao-user-web/withdrawHandler')
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