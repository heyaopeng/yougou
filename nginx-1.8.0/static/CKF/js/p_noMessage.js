var CKF = require('./CKF.js');
require('../less/no-message.less');

module.exports = (function() {
	var moduleName = 'noMessage';
	var module = CKF.create(moduleName);

	function setHide () {
		module.addClass('hide');
	}
	return {
		init: function() {
			CKF.listen({
        		'set-hide': setHide
        	}, moduleName);
		}
	};
})();