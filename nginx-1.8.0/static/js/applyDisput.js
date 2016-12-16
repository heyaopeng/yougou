var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'); 

require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');

require('./p_btn_file.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');
require('./ck_sidebar.js');


$(document).ready(
	function() {
		var elem=$('.choose-re.act');
		var $forRefund=elem.closest('.apply-re-form').find('.for-refund');
		var $parent=elem.closest('.apply-refund');
		var $refundSteps=$parent.find('.refund-steps');
		var $returnSteps=$parent.find('.return-steps');

		if (elem.hasClass('is-refund')) {
			$forRefund.removeClass('non-refund');
			$refundSteps.removeClass('hidden');
			$returnSteps.addClass('hidden');
		}
		else {
			$forRefund.addClass('non-refund');
			$refundSteps.addClass('hidden');
			$returnSteps.removeClass('hidden');
		}

		$('.choose-re').on('click',function(e){
			var elem=$(this);
			var $parent=elem.closest('.apply-re-form');
			var $applyRefund=elem.closest('.apply-refund');
			var $refundSteps=$applyRefund.find('.refund-steps');
			var $returnSteps=$applyRefund.find('.return-steps');
			var $forRefund=$parent.find('.for-refund');
			var t = elem.scrollTop();
			var $reason=$parent.find('.f-reason');

			$('#apply-re-form').data('formValidation').resetField($reason,true);
			$parent.find('.form-group').removeClass('hidden');
			$('body').animate({'scrollTop':t+400},500);

			elem.addClass('act').siblings().removeClass('act');
			elem.parent().find('.ipt-re-type').val(elem.data('val'));
			if (elem.hasClass('is-refund')) {
				$forRefund.removeClass('non-refund');
				$refundSteps.removeClass('hidden');
				$returnSteps.addClass('hidden');
			}
			else {
				$forRefund.addClass('non-refund');
				$refundSteps.addClass('hidden');
				$returnSteps.removeClass('hidden');
			}
			e.preventDefault();
		});

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
						notEmpty : {							
	                        message:{
	                            en_US: 'The content is required',
	                            zh_CN: '内容不能为空'
	                        }
						}
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
								en_US : 'Please enter a valid amount',
								zh_CN: '请输入有效数字'
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