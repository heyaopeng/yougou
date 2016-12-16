var request = require('superagent');
var A = require('../A.js');

module.exports = {
	recordList: function(query, cb) {
		request
			.get('/duobao-user-web/userShowList')
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