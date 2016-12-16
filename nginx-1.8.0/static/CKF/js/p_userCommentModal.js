var CKF = require('./CKF.js');
require('../less/user-comment-modal.less');
require('bootstrap/js/modal.js');

var getCookie = require('./getCookie.js');
var lang = getCookie('language');

require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
module.exports = (function() {
	var moduleName = 'userCommentModal';

	var module = CKF.create(moduleName, true);

	function commentModal(data) {

		var html = '';
		module.find('form').data('formValidation').resetField('f-text', true);
		module.find('.js-comb').empty();
		module.find('.js-img').attr('src', data.src);
		$.each(data.comb, function(index, elem) {
			html += '<span class="user-comment-modal-span">' + elem + '</span>\n';
		});
		module.find('.js-title').text(data.title);
		module.find('.js-comb').append(html);
		module.find('.js-osn').val(data.orderSerialNum);
		module.find('.js-pid').val(data.productId);
		module.modal('show');
	}

	return {
		init: function() {

			if (module !== null) {
				module.find('form').formValidation({
					excluded: ':disabled',
					icon: {
						valid: 'glyphicon glyphicon-ok',
						invalid: 'glyphicon glyphicon-remove',
						validating: 'glyphicon glyphicon-refresh'
					},
					fields: {
						'f-text': {
							selector: '.f-text',
							validators: {
								notEmpty: {
									message: __('The content is required')
								}
							}
						}
					}
				}).on('err.validator.fv', function(e, data) {
					data.element.data('fv.messages').find('.help-block[data-fv-for="' + data.field + '"]')
						.hide().filter('[data-fv-validator="' + data.validator + '"]').show();
				}).off('success.form.fv').on('success.form.fv', function(e) {
					// Prevent form submission
					e.preventDefault();

					var $form = $(e.target),
						fv = $form.data('formValidation');

					// Use Ajax to submit form data
					$.ajax({
						url: $form.attr('action'),
						type: 'POST',
						data: $form.serialize(),
						success: function(result) {
							alert(__('Comment Success!'));
							window.location.reload();
						}
					});
				});

				CKF.listen({
					'comment-modal': commentModal
				}, moduleName);

			}
		}
	};
})();