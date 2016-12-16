var request = require('superagent');
var A = require('../A.js');

module.exports = {
	getData: function(cb) {
		request
			.get('https://baconipsum.com/api/?type=meat-and-filler')
			.use(A.ajaxLoading())
			.end(function(err, res) {
				if (err) {
					return err;
				}

				cb(JSON.parse(res.text));
			});
	}
};