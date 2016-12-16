var CKF = require('./CKF.js');
require('../less/m-bas-delivery.less');

module.exports = (function() {
	var moduleName = 'mBasDelivery';
	var module = CKF.create(moduleName);

	return {
		init: function() {
			module.on('click', '.m-bas-delivery-info', function(e) {
				e.preventDefault();
				var $item = $(this).closest('.m-bas-delivery-item');
					$item.find('.m-bas-delivery-detail').stop().slideToggle();
					$item.toggleClass('open');
			});
		}
	};
})();