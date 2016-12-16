var CKF = require('./CKF.js');
require('../less/pagination.less');

module.exports = (function() {
	var moduleName = 'pagination';
	var module = CKF.create(moduleName, true);
	var maxPage = -1;

	var isSearchWebPage;
	if (module !== null) {
		isSearchWebPage = module.parent('.user-order-pagination').siblings('.search-result').length;
	}

	function generateLink(p) {
		var currentUrl = null;

		if (window.location.hash.length) {
			window.location.hash = '';
		}

		currentUrl = window.location.href;

		if (currentUrl.slice(-1) === '#') {
			currentUrl = currentUrl.slice(0, -1);
		}

		var qIndex = currentUrl.indexOf('?');
		var querys = null;
		var newUrl = currentUrl;

		if (qIndex > -1) {
			querys = currentUrl.slice(qIndex + 1);
			// only with question mark
			if (querys.length === 0) {
				newUrl += 'page=' + p;
			}
			// has page param
			else if (/page=[0-9]*/.test(querys)) {
				newUrl = currentUrl.replace(/page=[0-9]*/, 'page=' + p);
			}
			// no page param
			else {
				newUrl += '&page=' + p;
			}
		}
		// no question mark
		else {
			newUrl += '?page=' + p;
		}

		return newUrl;
	}

	function go() {
		var inputPage = parseInt(module.find('.pagination-input').val());

		if (isNaN(inputPage) || inputPage > maxPage || inputPage < 1) {
			return;
		}

		if (isSearchWebPage) {
			if (parseInt(inputPage) < 1) {
				inputPage = 1;
			}
			location.href = generateLink(parseInt(inputPage) - 1);
		} else {
			location.href = generateLink(parseInt(inputPage));
		}
	}

	function initial() {
		if (module !== null) {
			module.find('a[data-page]').each(function(index, elem) {

				var $elem = $(elem);
				var p = $(elem).data('page');
				var newUrl = generateLink(p);
				$elem.attr('href', newUrl);
			});

			maxPage = parseInt(module.find('.pagination-control').data('max'));
			module.off('click').on('click', '.pagination-go', function(e) {
				e.preventDefault();
				go();
			});
			module.off('keyup').on('keyup', '.pagination-input', function(e) {
				if (e.which === 13) {
					go();
				}
			});
		}
	}

	function rebuild() {
		module = CKF.rebuild(moduleName);
		initial();
	}

	return {
		init: function() {

			initial();

			CKF.listen({
				'rebuild-pagination': rebuild
			}, moduleName);
		}
	};
})();
