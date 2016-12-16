var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE');

require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');
require('./hbs/ship-template.js');
require('./handlebars_helpers.js');
require('./p_calculate_fare.js');
require('./p_choose_address.js');
require('./p_address_group.js');
require('./ck_ajax_setup.js');
require('./ck_lang.js');


$(document).ready(function() {
	$('.address-group').addressGroup();
	$('.address-group').on('address.change', function() {
		var $this = $(this);
		$this.closest('form').data('formValidation').revalidateField('f-country');
		$this.closest('form').data('formValidation').revalidateField('f-state');
		$this.closest('form').data('formValidation').revalidateField('f-city');
		$this.closest('form').data('formValidation').revalidateField('f-region');
	});
	// =================================
	$('.choose-address').chooseAddress().on('default.changed', function() {
		// edit default address
		/*AJAX*/
		var addrDefaultId = "addrDefaultId=" + $('.ship-address.active').data('addr')['deliveraddrId'];
		$.ajax({
			type: "post",
			url: "/cooka-order-web/updateDefaultAddrHandler",
			data: addrDefaultId,
			dataType: "html",
			async: true,
			success: function(data) {
				console.log(data);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(XMLHttpRequest.status);
			},
		});
	});
	/*AJAX*/
	$.getJSON('/cooka-order-web/selectDefaultAddrHandler', function(data) {
		//data = [];
		// has address
		if (data.length) {
			var html = Handlebars.templates.shipAddress(data[0]);
			$('#selected-addr').html(html);
			$('#save-order-addr').val(data[0].deliveraddrId);
		}
		// no address
		else {
			$('#selected-addr').addClass('ck-hide');
			$('#new-addr-form').removeClass('ck-hide');
			formValidateInit($('#new-addr-form'));
			$('.btn-payment').prop('disabled', true);
		}
		formValidateInit($('#edit-addr-form'));
	});
	var addrChanged = false;
	$('.order-ship').on('click', '.edit-select', function() {
		if (!addrChanged) {
			$.getJSON('/cooka-order-web/selectAllAddrHandler', function(data) {
				var html = Handlebars.templates.shipAddressList(data);
				$('#choose-addr').html(html).slideDown('fast');
				$('#selected-addr').slideUp('fast');
				addrChanged = true;
			});
		} else {
			$('#choose-addr').slideDown('fast');
			$('#selected-addr').slideUp('fast');
		}
	}).on('click', '.add-new-addr', function() {
		$('#new-addr-form').slideDown('fast', function() {
			$('#new-addr-form').addClass('has-cancel');
			formValidateInit($('#new-addr-form'));
			$('#new-addr-form').data('formValidation').resetForm();
			$('#new-addr-form')[0].reset();
		});
		$('#choose-addr').slideUp('fast');
	}).on('click', '.choose-confirm', function() {
		var data = $('.ship-address.active').data('addr');
		var html = Handlebars.templates.shipAddress(data);
		$('#selected-addr').html(html).slideDown('fast');
		$('#choose-addr').slideUp('fast');
		$('#save-order-addr').val(data.deliveraddrId);
	}).on('click', '.edit-address', function() {
		var data = $(this).closest('.ship-address').data('addr');
		var html = Handlebars.templates.shipAddressForm(data);
		$('#edit-addr-form').data('formValidation').destroy();
		$('#edit-addr-form').html(html);
		$('#edit-addr-form').slideDown('fast', function() {
			$('#edit-addr-form')
				.find('.address-group')
				.addressGroup()
				.on('address.change', function() {
					var $this = $(this);
					$this.closest('form').data('formValidation').revalidateField('f-country');
					$this.closest('form').data('formValidation').revalidateField('f-state');
					$this.closest('form').data('formValidation').revalidateField('f-city');
					$this.closest('form').data('formValidation').revalidateField('f-region');
				});
			formValidateInit($('#edit-addr-form'));
			$('#edit-addr-form').on('success.form.fv', function(e) {
				e.preventDefault();
				/*AJAX*/
				var $form = $(this);
				var aData = {
					"addrDetail": "",
					"city": "",
					"country": "",
					"name": "",
					"phone": "",
					"region": "",
					"state": "",
					"zipcode": "",
					"deliveraddrId": ""
				};
				$.each(aData, function(key, value) {
					aData[key] = $form.find('[name="' + key + '"]').val();
				});
				addrChanged = false;
				$.ajax({
					type: "post",
					url: "/cooka-order-web/updateUserAddrHandler",
					contentType: "application/json; charset=UTF-8",
					data: JSON.stringify(aData),
					dataType: "html",
					async: true,
					success: function(data) {
						$form.slideUp('fast');
						var html = Handlebars.templates.shipAddress(aData);
						$('#selected-addr').html(html).slideDown('fast');
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						alert(XMLHttpRequest.status);
					},
				});
			});
		});
		$('#choose-addr').slideUp('fast');
	}).on('click', '.new-cancel', function() {
		$('#new-addr-form').slideUp('fast');
		$('#choose-addr').slideDown('fast');
	}).on('click', '.edit-cancel', function() {
		$('#edit-addr-form').slideUp('fast');
		$('#choose-addr').slideDown('fast');
	});
	$('#new-addr-form').on('success.form.fv', function(e) {
		e.preventDefault();
		var $form = $(this);
		var aData = {
			"addrDetail": "",
			"city": "",
			"country": "",
			"name": "",
			"phone": "",
			"region": "",
			"state": "",
			"zipcode": ""
		};
		$.each(aData, function(key, value) {
			aData[key] = $form.find('[name="' + key + '"]').val();
		});
		/*AJAX*/
		$.ajax({
			type: "post",
			url: "/cooka-order-web/addUserAddrHandler",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(aData),
			dataType: "html",
			async: true,
			success: function(data) {
				addrChanged = false;
				$('.btn-payment').prop('disabled', false);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(XMLHttpRequest.status);
			}
		});
		var nhtml = Handlebars.templates.shipAddress(aData);
		$('#selected-addr').html(nhtml);
		$(this).slideUp('fast').addClass('has-cancel');
		$('#selected-addr').slideDown('fast');
	});
	// =====================================
	$('.order-procedure .cart-block').calculateFare();
	var $orderInfoCancel = $('div.order-procedure').find('.order-info div.cancel-box');
	var isExt = "$notExtDeliverAddr";
	if (false) {
		$('.order-procedure').find('.order-info').slideDown();
		$orderInfoCancel.css('display', 'none');
	} else if (true) {
		$('.order-procedure').find('.addr-passed-wrap').slideDown();
		$orderInfoCancel.css('display', 'block');
	}

	function formValidateInit($elem) {
		var fid = $elem.prop('id');
		$elem.formValidation({
			framework: 'bootstrap',
			icon: {
				valid: 'glyphicon glyphicon-ok',
				invalid: 'glyphicon glyphicon-remove',
				validating: 'glyphicon glyphicon-refresh'
			},
			addOns: {
				i18n: {}
			},
			fields: {
				'f-receiver': {
					selector: '#' + fid + ' .f-receiver',
					validators: {
						notEmpty: {
							message: {
								en_US: 'Receiver\'s name is required',
								zh_CN: '请填写收件人信息'
							}
						},
						stringLength: {
							max: 50,
							message: {
								en_US: 'Receiver\'s name must be less than 50 characters',
								zh_CN: '收件人姓名过长'
							}
						}
					}
				},
				'f-country': {
					selector: '#' + fid + ' .f-country',
					validators: {
						notEmpty: {
							message: {
								en_US: 'Country name is required',
								zh_CN: '请选择国家'
							}
						}
					}
				},
				'f-state': {
					selector: '#' + fid + ' .f-state',
					validators: {
						notEmpty: {
							message: {
								en_US: 'State name is required',
								zh_CN: '请选择省份'
							}
						}
					}
				},
				'f-city': {
					selector: '#' + fid + ' .f-city',
					validators: {
						notEmpty: {
							message: {
								en_US: 'City name is required',
								zh_CN: '请选择城市'
							}
						}
					}
				},
				'f-region': {
					selector: '#' + fid + ' .f-region',
					validators: {
						notEmpty: {
							message: {
								en_US: 'Region name is required',
								zh_CN: '请选择地区'
							}
						}
					}
				},
				'f-addr-detail': {
					selector: '#' + fid + ' .f-addr-detail',
					validators: {
						notEmpty: {
							message: {
								en_US: 'Address detail is required',
								zh_CN: '请填写详细地址'
							}
						}
					}
				},
				'f-zipcode': {
					selector: '#' + fid + ' .f-zipcode',
					validators: {
						notEmpty: {
							message: {
								en_US: 'Zipcode is required',
								zh_CN: '请填写邮政编码'
							}
						},
						stringLength: {
							max: 32,
							message: {
								en_US: 'Zipcode is too long',
								zh_CN: '邮政编码过长'
							}
						}
					}
				},
				'f-phone': {
					selector: '#' + fid + ' .f-phone',
					validators: {
						notEmpty: {
							message: {
								en_US: 'Phone number is required',
								zh_CN: '请填写电话号码'
							}
						},
						regexp: {
							regexp: /^[0-9]+([\-][0-9]+)*$/,
							message: {
								en_US: 'Not a correct phone number',
								zh_CN: '电话号码格式不正确'
							}
						},
						stringLength: {
							max: 32,
							message: {
								en_US: 'Phone number is too long',
								zh_CN: '电话号码过长'
							}
						}
					}
				}
			}
		}).on('err.validator.fv', function(e, data) {
			data.element.data('fv.messages').find(
				'.help-block[data-fv-for="' + data.field + '"]').hide().filter(
				'[data-fv-validator="' + data.validator + '"]').show();
		});
		$elem.formValidation('setLocale', lang);
	}
});