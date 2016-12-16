var request = require('superagent');
var A = require('../A.js');

module.exports = {
	recordDetail: function(query, cb) {
		request
			.get('/duobao-user-web/recordDetail')
			.query(query)
			.use(A.ajaxLoading())
			.use(A.ajaxAuth())
			.end(function(err, res) {
				if (err) {
					return err;
				}
				cb(JSON.parse(res.text));
			});
	}
};