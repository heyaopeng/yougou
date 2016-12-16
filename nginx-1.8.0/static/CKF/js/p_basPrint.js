var CKF = require('./CKF.js');
require('../less/bas-print.less');

module.exports = (function() {
	var moduleName = 'basPrint';
	var module = CKF.create(moduleName);
	return {
		init: function() {

			module.on('click', '.bas-print-trigger', function(e) {
				e.preventDefault();
				window.print();
			});

			module.on('click', '.bas-print-back', function(e) {
				e.preventDefault();
				history.back();
			});
		}
	};
})();