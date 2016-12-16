var CKF = require('./CKF.js');
require('../less/pro-detail-tab.less');

require('bootstrap/js/tab.js');

module.exports = (function() {
	var moduleName = 'proDetailTab';
	var module = CKF.create(moduleName);

	return {
		init: function() {
			CKF.notify({
				type: 'disable-ajax-loading',
				data: null
			});
			$.get('/cooka-productDetail-web/getProductRelavantFile?url=' + module.find('.js-feature').data('url'), function(data) {
				module.find('.js-feature').html(data);

				$.get('/cooka-productDetail-web/getProductRelavantFile?url=' + module.find('.js-desc').data('url'), function(data) {
					module.find('.js-desc').html(data);
					CKF.notify({
						type: 'enable-ajax-loading',
						data: null
					});
					$('.js-desc').find('img').removeAttr('style').css({
						'margin-bottom':'20px',
						'display': 'block',
						'width': '100%'
					}).end().find('br').remove();

				});
			});


			/* code contributed by Littlee */
			module.find('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
				var $target = $(e.target);
				if ($target.attr('href') === '#comment') {

					module.find('a[data-toggle="tab"]').off('show.bs.tab');

					$.getJSON('/cooka-productDetail-web/getCommentsList?productId=' + module.data('pid'), function(data) {

						var template = require('./hbs/productDetailComment.handlebars');
						var html = template(data);
						module.find('.comment-communication').html(html);
						CKF.notify({
							type: 'rebuild-productRate',
							data: null
						});
						CKF.notify({
							type: 'rebuild-pagination',
							data: null
						});
					});
				}
			});
			/* code contributed by Littlee */
		}
	};
})();