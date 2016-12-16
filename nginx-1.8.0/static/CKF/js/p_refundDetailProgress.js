var CKF = require('./CKF.js');
require('../less/refund-detail-progress.less');
require('bootstrap/js/modal.js');
require('jquery-countdown/dist/jquery.countdown.min.js');

module.exports = (function() {
	var moduleName = 'refundDetailProgress';
	var module = CKF.create(moduleName);

	return {
		init: function() {
			var num = (parseInt($.trim(module.find('.countdown').text().replace(/[^0-9]/ig, " ")))/7)*100;
			module.find('.progress-bar').attr({style:'width:'+num+'%'});			
		}
	};
})();