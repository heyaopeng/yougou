var CKF = require('./CKF.js');
require('../less/m-bas-settle.less');

module.exports = (function() {
	var moduleName = 'mBasSettle';
	var module = CKF.create(moduleName);

	return {
		init: function() {
			module.on('click', '.m-bas-settle-in-info', function(e) {
				e.preventDefault();
				var $item = $(this).closest('.m-bas-settle-in-item');
					$item.find('.m-bas-settle-in-detail').stop().slideToggle();
					$item.toggleClass('open');
			});
		}
	};
})();