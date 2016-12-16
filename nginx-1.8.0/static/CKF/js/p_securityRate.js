var CKF = require('./CKF.js');
require('../less/security-rate.less');
// other dependencies ...

module.exports = (function () {
	var moduleName = 'securityRate';
	var module = CKF.create(moduleName);

	function setProgressCss(changeItem){
		var MIX_SAFE = 2;
		var $progressV = module.find('.progress-bar');
		var $showV = module.find('.security-rate-title').find('strong');
		$progressV.css('width', changeItem.per);
		$progressV.attr('aria-valuenow', changeItem.item*20);
		$showV.text(changeItem.item * 20);
		if(changeItem.item <= MIX_SAFE){
			$progressV.addClass('progress-bar-danger');
			$showV.css('color', '#d9534f');
		} else {
			$showV.css('color', '#8cc63f');
		}
	}

	return {
		init: function () {
			CKF.listen({
				'set-progress-css': setProgressCss
			}, moduleName);
		}
	};
})();