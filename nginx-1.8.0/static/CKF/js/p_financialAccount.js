var CKF = require('./CKF.js');
require('../less/financial-account.less');
// other dependencies ...

module.exports = (function () {
	var moduleName = 'financialAccount';
	var module = CKF.create(moduleName);

	var $progressModule = module.find('.security-rate-financial-center');
	var $item = $progressModule.data('level');
	var $per = 20 * $item + '%';
	return {
		init: function () {
			CKF.notify({
				type: 'set-progress-css',
				data: {
					item: $item,
					per: $per
				}
			});
		}
	};
})();