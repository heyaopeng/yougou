var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'); 

require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');

require('./p_btn_file.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

$(document).ready(
	function() {
		var elem = $('.choose-re.act');
		var $forRefund = elem.closest('.apply-re-form').find('.for-refund');
		if (elem.hasClass('is-refund')) {
			$forRefund.removeClass('non-refund');
		} else {
			$forRefund.addClass('non-refund');
		}

		$('#up-img').change(function() {
			if (this.files && this.files[0]) {
				var reader = new FileReader();
				reader.onload = function(e) {
					$('#view-img').attr('src', e.target.result);
				};
				reader.readAsDataURL(this.files[0]);
			}
		});

		$('.btn-file').btnFile();

		$('#apply-re-form').formValidation({
			icon : {
				valid : 'glyphicon glyphicon-ok',
				invalid : 'glyphicon glyphicon-remove',
				validating : 'glyphicon glyphicon-refresh'
			},
			addOns : {
				i18n : {}
			},
			fields : {
				'f-abc' : {
					selector : '.f-reason',
					validators : {
						notEmpty : {}
					}
				},
				'f-ab' : {
					selector : '.f-money',
					validators : {
						notEmpty : {},
						between : {
							min : 1,
							max : $('.f-money').data('max')
						},
						regexp : {
							regexp : /^(\d+(?:\.\d{2})?)$/,
							message : {
								en_US : 'Please enter a valid amount'
							}
						}
					}
				}
			}
		}).on(
				'err.validator.fv',
				function(e, data) {
					data.element.data('fv.messages').find('.help-block[data-fv-for="' + data.field + '"]')
							.hide().filter('[data-fv-validator="' + data.validator + '"]').show();
				});
		$('#apply-re-form').formValidation('setLocale', lang);
	});