var request = require('superagent');
var A = require('../A.js');

module.exports = {
	isWC: function(cb) {
		request
			.get('/duobao-user-web/isWC')
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(res.body.isWC);
			});
	},
};