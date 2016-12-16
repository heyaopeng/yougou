var CKF = require('./CKF.js');
require('../less/ajax-loading.less');
// other dependencies ...

module.exports = (function() {
	var moduleName = 'ajaxLoading';

	// insert html before create
	var AJAX_HTML = '<div class="ajax-loading" data-j="ajaxLoading"><div class="ajax-loading-icon"></div><div class="ajax-loading-in"></div></div>';
	$('body').append(AJAX_HTML);

	var module = CKF.create(moduleName);

	function enable() {
		$(document).off('ajaxStart.ckf').on('ajaxStart.ckf', function() {

			// FIX ME

			// module.addClass('loading');
		});

		$(document).off('ajaxStop.ckf').on('ajaxStop.ckf', function() {
			module.removeClass('loading');
		});
	}

	function disable() {
		$(document).off('ajaxStart.ckf');
		$(document).off('ajaxStop.ckf');
	}

	return {
		init: function() {
			enable();

			CKF.listen({
				'enable-ajax-loading': enable,
				'disable-ajax-loading': disable
			}, moduleName);
		}
	};
})();