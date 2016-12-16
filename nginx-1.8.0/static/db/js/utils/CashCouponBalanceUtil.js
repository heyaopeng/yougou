var request = require('superagent');
var A = require('../A.js');

module.exports = {
	getData: function(query, cb) {
		query.pageSize = 15;
		request
			.get('/duobao-user-web/couponBalanceDetail')
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
};