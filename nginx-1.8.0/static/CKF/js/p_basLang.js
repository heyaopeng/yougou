var CKF = require('./CKF.js');
require('../less/bas-lang.less');

module.exports = (function () {
	var moduleName = 'basLang';
	var module = CKF.create(moduleName);
    return {
        init: function () {
			module.on('click', 'a[data-lang]', function(e) {
				e.preventDefault();
				var lang = $(this).data('lang');
				CKF.util.setCookie('language', lang, Infinity);
				window.location.reload();
			});
        }
    };
})();