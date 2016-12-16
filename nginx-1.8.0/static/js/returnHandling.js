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

$(document).ready(function() {
	var $this=$(this);
	if($this.find('.cancel-reason').length!==0){
		$('.cancel-reason').change(function() {
			if ($('#others').is(':checked')) {
				$('.text-others').removeClass('hidden');
			} else {
				$('.text-others').addClass('hidden');
			}
		});
	}
	if($this.find('.refund-awb-form').length!==0){
		var $refundAwbForm = $('.refund-awb-form');
		$('.f-company').change(function() {
			if ($('#others-company').is(':selected')) {
				$('.has-new-company').removeClass('hidden');
			} else {
				$('.has-new-company').addClass('hidden');
			}
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
		$('.refund-awb-form')
		.formValidation({
			icon : {
				valid : 'glyphicon glyphicon-ok',
				invalid : 'glyphicon glyphicon-remove',
				validating : 'glyphicon glyphicon-refresh'
			},
			addOns : {
				i18n : {}
			},
			excluded: [':hidden'],
			fields : {
				'f-abc' : {
					selector : '.f-company',
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
					selector : '.f-new-company',
					validators : {
						notEmpty : {							
	                        message:{
	                            en_US: 'The content is required',
	                            zh_CN: '内容不能为空'
	                        }
						}
					}
				},
				'f-a' : {
					selector : '.f-number',
					validators : {
						digits : {							
							message : {
								en_US : 'Please enter a valid amount',
								zh_CN: '请输入有效数字'
							}
						},
						notEmpty : {							
	                        message:{
	                            en_US: 'The content is required',
	                            zh_CN: '内容不能为空'
	                        }
						}
					}
				}
			}
		})
		.on('err.validator.fv',
				function(e, data) {
					data.element.data('fv.messages').find('.help-block[data-fv-for="' + data.field + '"]')
							.hide().filter('[data-fv-validator="' + data.validator + '"]').show();
				});
		$('#refund-awb-form').formValidation('setLocale', lang);
		$('#submit-awb').on('click', function() {
			$refundAwbForm.data('formValidation').validate();
			if($refundAwbForm.find('.glyphicon-remove').length===0){			
				
					var $confAwb = $('.conf-awb');
					var $Img = $refundAwbForm.find('.profile-hero');
					if ($('#others-company').is(':selected')) {
						$confAwb.find('#conf-company').text($('.f-new-company').val());
					} else {
						$confAwb.find('#conf-company').text($('.f-company option:selected').text());
					}
					$confAwb.find('#conf-num').text($('.f-number').val());
					$confAwb.find('#conf-instructions').text($('#return-instructions').val());
					if ($Img.attr('src')) {
						$confAwb.find('.preview-control').removeClass('hidden');
						$confAwb.find('#conf-img').attr('src',$Img.prop('src'));
					}
					else{
						$confAwb.find('.preview-control').addClass('hidden');
					}

				$refundAwbForm.find('button[type=submit]').prop('disabled','').removeClass('disabled');
				$('.conf-awb').modal('show');
				$('#conf-sub').on('submit',function(){
					$refundAwbForm.trigger('submit');
				});
			}
			else{
				$('.conf-awb').modal('hide');
			}
		});
		
	}
});