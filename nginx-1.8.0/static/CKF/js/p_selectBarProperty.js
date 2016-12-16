var CKF = require('./CKF.js');
require('../less/select-bar-property.less');
// other dependencies ...

require('bootstrap/js/dropdown.js');

module.exports = (function () {
	var moduleName = 'selectBarProperty';
	var module = CKF.create(moduleName);

	return {
		init: function () {
			module.find('.select-bar-property-title').on('click', function () {
				var $this = $(this);
				$this.find('.glyphicon').toggleClass('glyphicon-triangle-bottom');
				$this.find('.glyphicon').toggleClass('glyphicon-triangle-right');
				var $sibling = $this.siblings().stop().slideToggle();
			});
		}
	};
})();
