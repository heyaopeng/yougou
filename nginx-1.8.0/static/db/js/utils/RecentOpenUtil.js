var request = require('superagent');
var A = require('../A.js');

module.exports = {
	getData: function(query, cb) {
		request
			.get('/duobao-user-web/latestOpen')
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
	getResult: function(query, cb) {
		request
			.get('/duobao-user-web/termResultForRecentOpen')
			.query(query)
			.use(A.ajaxAuth())
			.use(A.ajaxLoading())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	}
};