var CKF = require('./CKF.js');
require('../less/category.less');

require('jquery.scrollbar/jquery.scrollbar.css');
require('jquery.scrollbar');

module.exports = (function() {
	var moduleName = 'category';
	var module = CKF.create(moduleName);
	var JSON_URL = '/cooka-productDetail-web/getCategories';
	// var JSON_URL = '/CKF/js/json/c.json';

	return {
		init: function() {
			CKF.notify({
				type: 'disable-ajax-loading',
				data: null
			});
			$.getJSON(JSON_URL, function(data) {
				CKF.notify({
					type: 'enable-ajax-loading',
					data: null
				});

				data[0]['trend']['101080000'] = 'Váy';
				delete data[0]['trend']['101040000'];

				var template = require('./hbs/category.handlebars');
				var cHtml = template(data);
				module.html(cHtml);
				module.find('.category-list').scrollbar();
			});

		}
	};
})();