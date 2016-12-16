var CKF = require('./CKF.js');
require('../less/share-modal.less');
// other dependencies ...

module.exports = (function() {
	var moduleName = 'shareModal';
	var module = CKF.create(moduleName);
	var fbAppId = '1629352350683323';

	var sharFunc = {
		facebook: function() {
			FB.ui({
				method: 'share',
				href: window.location.href,
			}, function(response) {});
		},

		googleplus: function() {
			if (window.location.href.indexOf('//localhost/') != -1) {
				alert('无法解析 localhost');
				return;
			}
			window.open('https://plus.google.com/share?url=' + window.location.href, '_blank');
		}
	};

	return {
		init: function() {
			module.on('click', 'a[data-share]', function (e) {
				e.preventDefault();
				sharFunc[$(this).data('share')]();
			});
		}
	};
})();