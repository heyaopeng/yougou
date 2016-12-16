var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE');

require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');

require('./handlebars_helpers.js');
require('./hbs/address-template.js');

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

	formValidateInit($('#new-addr-form'));

	//新增地址表单提交
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

		$.ajax({
			type: "post",
			url: "/cooka-store-web/addReturnAddr",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(aData),
			dataType: "html",
			async: true,
			success: function(data) {
				console.log(data);
				var html = Handlebars.templates.addressItem($.parseJSON(data));
				$('.address-mgr').append(html);
				$('#new-addr-modal').modal('hide');
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(XMLHttpRequest.status);
			}
		});
	});

	$('.address-mgr')
		// 点击删除
		.on('click', '.address-mgr-delete', function(e) {
			var $this = $(this);
			var $addrItem = $this.closest('.address-mgr-item');
			if (confirm('Do you want to delete this address?')) {
				// get id
				var aid = "returnaddrId=" + $addrItem.data('addr-id');
				$.ajax({
					type: "post",
					url: "/cooka-store-web/deleteReturnAddrHandler",
					data: aid,
					success: function(data) {
						console.log(data);
						$addrItem.fadeOut(function() {
							$(this).remove();
						});
					}
				});
			}
		})
		// 点击设置默认
		.on(
			'click',
			'.address-mgr-set-default',
			function() {
				var $pos = $('#address-mgr-default-pos');
				var $this = $(this);
				var $addrItem = $this.closest('.address-mgr-item');
				// get id
				var aid = "returnaddrId=" + $addrItem.data('addr-id');
				console.log(aid);
				$.ajax({
					type: "post",
					url: "/cooka-store-web/updateDefaultAddrHandler",
					data: aid,
					success: function(data) {
						$addrItem.addClass('is-default').siblings('.address-mgr-item.is-default')
							.removeClass('is-default');
						$addrItem.insertAfter($pos);
					}
				});

			})
		// 点击编辑地址
		.on('click', '.address-mgr-edit', function() {
			var $this = $(this);
			var $addrItem = $this.closest('.address-mgr-item');
			var data = $addrItem.data('addr');
			var html = Handlebars.templates.addressForm(data);
			var $form = $('#edit-addr-form');
			if ($('#edit-addr-form').data('formValidation')) {
				$('#edit-addr-form').data('formValidation').destroy();
			}

			$('#edit-addr-form').find('.form-horizontal').html(html);
			formValidateInit($('#edit-addr-form'));

			$('#edit-addr-form').find('.address-group').addressGroup();
			$('#edit-addr-form').find('.address-group').on('address.change', function() {
				var $this = $(this);
				$this.closest('form').data('formValidation').revalidateField('f-country');
				$this.closest('form').data('formValidation').revalidateField('f-state');
				$this.closest('form').data('formValidation').revalidateField('f-city');
				$this.closest('form').data('formValidation').revalidateField('f-region');
			});

			$('#edit-addr-form').on('success.form.fv', function(e) {
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
					"zipcode": "",
					"deliveraddrId": ""
				};

				$.each(aData, function(key, value) {
					aData[key] = $form.find('[name="' + key + '"]').val();
				});

				$.ajax({
					type: "post",
					url: "/cooka-store-web/updateReturnAddrHandler",
					contentType: "application/json; charset=UTF-8",
					data: JSON.stringify(aData),
					dataType: "html",
					async: true,
					success: function(data) {
						// 更换旧的 item
						var d = $.parseJSON(data);
						var aid = d.deliveraddrId;
						var html = Handlebars.templates.addressItem(d);
						$('.address-mgr-item[data-addr-id=' + aid + ']').after(html).remove();
						$('#edit-addr-modal').modal('hide');
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						alert(XMLHttpRequest.status);
					}
				});
			});
		});

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