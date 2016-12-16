var CKF = require('./CKF.js');
require('../less/home-carousel.less');

// bootstrap
require('bootstrap/js/transition.js');
require('bootstrap/js/carousel.js');

// other dependencies ...

module.exports = (function () {
	// var moduleName = 'homeCarousel';
	// var module = CKF.create(moduleName);
	return {
		init: function () {
			// $.getJSON('/CKF/home/carousel/data.json', function(data) {
			// 	var html = require('../home/carousel/template.handlebars')(data);
			// 	module.html(html);
			// });
		}
	};
})();