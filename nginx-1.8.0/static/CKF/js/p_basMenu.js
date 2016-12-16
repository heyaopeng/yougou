var CKF = require('./CKF.js');
require('../less/bas-menu.less');

module.exports = (function() {
	var moduleName = 'basMenu';
	var module = CKF.create(moduleName);

	return {
		init: function() {
			module.on('click', '.bas-menu-toggle', function(e) {
				e.preventDefault();
				$(this).closest('li').find('.bas-menu-x').stop().slideToggle();
			});
		}
	};
})();