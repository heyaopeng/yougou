var CKF = require('./CKF.js');
require('../less/m-bas-stock-in.less');

require('bootstrap/js/alert.js');

module.exports = (function() {

	var moduleName = 'mBasStockIn';
	var module = CKF.create(moduleName);

	function supprotFormValidate() {
		return 'noValidate' in document.createElement('form');
	}

	function supportInputNumber() {
		var i = document.createElement('input');
		i.setAttribute('type', 'number');
		return i.type !== 'text';
	}

	navigator.whoami = (function() {
		var ua = navigator.userAgent,
			tem,
			M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		if (/trident/i.test(M[1])) {
			tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
			return 'IE ' + (tem[1] || '');
		}
		if (M[1] === 'Chrome') {
			tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
			if (tem !== null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
		}
		M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
		if ((tem = ua.match(/version\/(\d+)/i)) !== null) M.splice(1, 1, tem[1]);
		return M.join(' ');
	})();

	return {
		init: function() {

			// suck safari html5 form
			if (navigator.whoami.toLowerCase().indexOf('safari') !== -1) {
				$('#m-bas-stock-in-form').attr('novalidate', true);
				$('#m-bas-stock-in-form').on('submit', function(e) {
					var $this = $(this);

					if (!event.target.checkValidity()) {
						event.preventDefault();
						module.find('.m-bas-stock-in-alert').removeClass('hide');
						module.find('input.form-control:invalid').focus();
						return false;
					}

					return true;
				});
			}
		}
	};
})();