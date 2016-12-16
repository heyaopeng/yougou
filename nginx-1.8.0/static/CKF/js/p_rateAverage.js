var CKF = require('./CKF.js');
require('../less/rate-average.less');

module.exports = (function () {
	var moduleName = 'rateAverage';
	var module = CKF.create(moduleName);

	return {
		init: function () {
			module.each(function (index, elem) {
				var $elem = $(elem);
				var score = parseFloat($elem.data('score'));
				var s = score * 100 / 5;
				$elem.find('.rate-average-i').width(s + '%');
			});
		}
	};
})();