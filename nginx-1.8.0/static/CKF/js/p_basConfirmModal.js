var CKF = require('./CKF.js');
require('../less/bas-modal.less');

// bootstrap
require('bootstrap/js/transition.js');
require('bootstrap/js/modal.js');

module.exports = (function() {
	var moduleName = 'basConfirmModal';
	var module = CKF.create(moduleName);

	function openConfirm(data) {
		module.modal('show');
		module.find('.bas-table-holder').html(data);
		module.find('#confirm-form').submit(function(e) {
			if (confirm('你将要提交所选择的库存确认，确定提交吗？')) {
				e.target.submit();
				return false;
			}
			return false;
		});
	}

	return {
		init: function() {
			CKF.listen({
				'bas-open-confirm': openConfirm
			}, moduleName);
		}
	};
})();