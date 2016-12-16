var CKF = require('./CKF.js');
require('../less/refund-detail.less');

require('bootstrap/js/tooltip.js');
require('bootstrap/js/popover.js');



module.exports = (function() {

	return {
		init: function() {
			$('[data-toggle="popover"]').popover();
		}
	};
})();