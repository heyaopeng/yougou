var request = require('superagent');
var A = require('../A.js');

module.exports = {
	getData: function(query,cb) {
		request
			.get('/duobao-user-web/termStatus')
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