var request = require('superagent');
var A = require('../A.js');

module.exports = {
	home: function(cb) {
		request
			.get('/duobao-user-web/home')
			.use(A.ajaxLoading())
			.use(A.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	},
	getTotalBuy: function(cb) {
		request
			.get('/duobao-user-web/getTotalBuy')
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
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
};