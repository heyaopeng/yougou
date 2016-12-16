var CKF = require('./CKF.js');
require('../less/m-bas-search.less');

module.exports = (function() {
	var moduleName = 'mBasSearch';
	var module = CKF.create(moduleName, true);

	function supportLocalStorage() {
		try {
			return 'localStorage' in window && window.localStorage !== null;
		} catch (e) {
			return false;
		}
	}

	function formatKeywords(k) {
		k = k.map(function(value) {
			return value !== '' ? value : '(空)';
		});
		return k.join(' + ');
	}

	return {
		init: function() {
			if (module !== null) {
				var $form = module.find('#bas-search-form');
				var $list = module.find('.m-bas-search-hlist');
				if (supportLocalStorage()) {
					var ucode = localStorage.getItem('ucode');
					var his = {};
					var action = $form.attr('action');
					if (localStorage.getItem('history')) {
						his = JSON.parse(localStorage.getItem('history'));

						var uHis = his[ucode];
						if (uHis) {
							var html = '';
							Object.keys(uHis).forEach(function(value) {
								html += '<li><a href="' + action + '/?' + value + '">' + formatKeywords(uHis[value]) + '</a></li>\n';
							});
							$list.html(html);
						}
					} else {
						console.log('NO_SEARCH_HISTORY');
					}

					$form.on('submit', function() {
						var serial = $form.serialize();
						var keywords = serial.split('&').map(function(value) {
							var v = value.split('=');
							return v[1];
						});
						if (keywords.join('') !== '') {

							if (!his[ucode]) {
								his[ucode] = {};
							}

							his[ucode][serial] = keywords;

							localStorage.setItem('history', JSON.stringify(his));
						}
					});

					module.on('click', '.m-bas-search-clear', function(e) {
						e.preventDefault();
						his = JSON.parse(localStorage.getItem('history'));
						delete his[ucode];
						localStorage.setItem('history', JSON.stringify(his));
						$list.html('');
					});

				} else {
					console.log('NOT_SUPPORT_HISTORY');
				}
			}
		}
	};
})();