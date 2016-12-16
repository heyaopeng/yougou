var CKF = require('./CKF.js');

require('jquery-countdown/dist/jquery.countdown.min.js');

module.exports = (function() {
	var moduleName = 'refundDetailCountdown';
	var module = CKF.create(moduleName,true);

	return {
		init: function() {
			if(module!==null){					
				var ts = module.text();
				var d = new Date(parseInt(ts) + 7 * 24 * 60 * 60 * 1000);
				module.countdown(d, function(event) {
					$(this).html(event.strftime('%D ' + __('days') + ' %H ' + __('hours') + ' %M ' + __('minutes') + ' %S ' + __('seconds')));
				});	
			}		
		}
	};
})();