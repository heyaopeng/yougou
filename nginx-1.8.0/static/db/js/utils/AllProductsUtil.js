var request = require('superagent');
var A = require('../A.js');

module.exports = {
	allProducts: function(q, cb) {
		request
			.get('/duobao-user-web/allProducts')
			.query(q)
			.use(A.ajaxLoading())
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	}
};