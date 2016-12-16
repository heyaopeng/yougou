var request = require('superagent');
var A = require('../A.js');

module.exports = {
	shareHandler: function(data, cb) {
		request
			.post('/duobao-user-web/shareHandler')
			.send(data)
			.use(A.ajaxLoading())
			.end(function(err, res) {
				if (err) {
					return err
				}

				cb(JSON.parse(res.text))
			})
	}
};