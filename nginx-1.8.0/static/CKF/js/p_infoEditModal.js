var CKF = require('./CKF.js');
require('../less/info-edit-modal.less');

var getCookie = require('./getCookie.js');
var lang = getCookie('language');

// form validation
require('../css/formValidation.min.css');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');

// bootstrap
require('bootstrap/js/modal.js');

module.exports = (function() {
  var moduleName = 'infoEditModal';
  module = CKF.create(moduleName);

  function newAddress() {
    //新增地址表单提交
    module.find('#info-edit-form').on('success.form.fv', function(e) {
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
        url: "/cooka-user-web/center/addUserAddrHandler",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(aData),
        dataType: "html",
        async: true,
        success: function(data) {
          var html = Handlebars.templates.receiptMessageItem($.parseJSON(data));
          $('.receipt-message-module').find('.receipt-message-info-empty').before(html);
          var isAddressM = $('.receipt-message-module').find('.receipt-message-info-line').length;
          var newA = $('.receipt-message-module').find('.receipt-message-info:nth-last-child(2)');
          if (isAddressM) {
            newA.addClass('receipt-message-info-line');
            newA.find('.receipt-message-common').addClass('receipt-message-details');
          }
          var $countAddr = $('.receipt-message-module').find('.receipt-message-info').length;
          if ($countAddr === 2) { // 有一个为空
            $('.receipt-message-module').find('.receipt-message-info:first-child').addClass('isdefault');
            var $theDefault = $('.receipt-message-module').find('.receipt-message-info.isdefault');
            console.log($theDefault.length);

            var $addrId = $('.receipt-message-module').find('.receipt-message-info.active').data('addr-id');
            CKF.notify({
              type: 'set-addr-id',
              data: $addrId
            });

            $theDefault.find('.receipt-message-opt').find('.receipt-message-opt-del').addClass('hide');
          }
          module.modal('hide');
          clearForm();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          alert(XMLHttpRequest.status);
        }
      });

    });
  }

  function clearForm() {
    var $form = module.find('.info-edit-modal-form').find('#info-edit-form');
    var isEditFrom = $form.length;
    if (isEditFrom) {
      if ($form.data('formValidation')) {
        $form.data('formValidation').destroy();
      }

      formValidateInit($form);

      $form.data('formValidation').resetForm();
      $form.find('input').each(function() {
        $(this).val('');
      });
      $form.find('select').each(function() {
        $(this).find('option:first-child').attr('selected', 'selected');
      });
      $form.find('textarea').val('');
    }
  }

  function buildForm(opt) {
    var html = opt.htm;
    var $isActiveAddr = opt.isA;
    var $form = module.find('#info-change-form');
    var $getT = $form.length;
    if ($getT) {
      if ($form.data('formValidation')) {
        $form.data('formValidation').destroy();
      }

      $form.html(html);

      formValidateInit($form);

      CKF.notify({
        type: 'address-group-rebuild',
        data: null
      });

      $form.find('.address-group').on('address.change', function() {
        var $this = $(this);
        $this.closest('form').data('formValidation').revalidateField('f-country');
        $this.closest('form').data('formValidation').revalidateField('f-state');
        $this.closest('form').data('formValidation').revalidateField('f-city');
        $this.closest('form').data('formValidation').revalidateField('f-region');
      });

      $form.on('success.form.fv', function(e) {
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
          url: "/cooka-user-web/center/updateUserAddrHandler",
          contentType: "application/json; charset=UTF-8",
          data: JSON.stringify(aData),
          dataType: "html",
          async: true,
          success: function(data) {
            // 更换旧的 item
            var d = $.parseJSON(data);
            var aid = d.deliveraddrId;
            var html = Handlebars.templates.receiptMessageItem(d);
            var $hasDefault = $('.receipt-message-info[data-addr-id=' + aid + ']').hasClass('isdefault');
            var $editAddr = $('.receipt-message-info[data-addr-id=' + aid + ']').after(html).remove();
            $editAddr = $('.receipt-message-info[data-addr-id=' + aid + ']');
            var isAddressM = $('.receipt-message-module').find('.receipt-message-info-line').length;
            if (isAddressM) {
              $editAddr.addClass('receipt-message-info-line');
              $editAddr.find('.receipt-message-common').addClass('receipt-message-details');
              if ($isActiveAddr) {
                $editAddr.find('.receipt-message-opt-del').addClass('hide');
              }
            } else {
              if ($isActiveAddr) {
                $editAddr.addClass('active');
              }
              if (!$hasDefault) {
                $editAddr.addClass('notdefault');
              }
            }
            if ($editAddr.hasClass('isdefault')) {
              $editAddr.find('.receipt-message-opt-del').addClass('hide');
            }
            if ($hasDefault) {
              $editAddr.addClass('isdefault');
              $editAddr.find('.receipt-message-opt-del').addClass('hide');
            }
            $('#info-change-modal').modal('hide');
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
          }
        });
      });
    }
  }

  function removeHdb() {
    module.on('hidden.bs.modal', function() {
      var $this = $(this);
      $this.find('#info-change-form').html('');
    });
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
          'f-name': {
            selector: '#' + fid + ' .f-name',
            validators: {
              notEmpty: {
                message: __('Receiver\'s name is required')
              },
              stringLength: {
                max: 30,
                message: __('Receiver\'s name must be less than %s characters')
              }
            }
          },
          'f-country': {
            selector: '#' + fid + ' .f-country',
            validators: {
              notEmpty: {
                message: __('Country name is required')
              }
            }
          },
          'f-state': {
            selector: '#' + fid + ' .f-state',
            enabled: false,
            validators: {
              notEmpty: {
                message: __('State name is required')
              }
            }
          },
          'f-city': {
            selector: '#' + fid + ' .f-city',
            enabled: false,
            validators: {
              notEmpty: {
                message: __('City name is required')
              }
            }
          },
          'f-region': {
            selector: '#' + fid + ' .f-region',
            enabled: false,
            validators: {
              notEmpty: {
                message: __('Region name is required')
              }
            }
          },
          'f-addr-detail': {
            selector: '#' + fid + ' .f-addr-detail',
            validators: {
              notEmpty: {
                message: __('Address detail is required')
              },
              stringLength: {
                max: 150,
                message: __('Address detail is too long')
              }
            }
          },
          'f-zipcode': {
            selector: '#' + fid + ' .f-zipcode',
            validators: {
              notEmpty: {
                message: __('Zipcode is required')
              },
              regexp: {
                regexp: /^[a-zA-Z0-9]{1,5}[- ]?[a-zA-Z0-9]{1,5}$/,
                message: __('The postal code is invalid')
              }
            }
          },
          'f-phone': {
            selector: '#' + fid + ' .f-phone',
            validators: {
              notEmpty: {
                message: __('Phone number is required')
              },
              regexp: {
                regexp: /^[0-9]+([\-][0-9]+)*$/,
                message: __('Not a correct phone number')
              },
              stringLength: {
                max: 20,
                message: __('Phone number is too long')
              }
            }
          }
        }
      })
      .on('err.validator.fv', function(e, data) {
        data.element.data('fv.messages').find(
          '.help-block[data-fv-for="' + data.field + '"]').hide().filter(
          '[data-fv-validator="' + data.validator + '"]').show();
      });
  }


  return {
    init: function() {
      CKF.listen({
        'clear-form': clearForm,
        'build-form': buildForm,
        'new-address': newAddress,
        'remove-hdb': removeHdb

      }, moduleName);

      module.find('.time-count').on('click', function() {
        CKF.notify({
          type: 'use-take-count',
          data: $(this)
        });
        var $thisVal = $('.f-phone').val();
        var $mobileNumGet = "tele=" + $thisVal;
        $.ajax({
          type: "post",
          url: "/cooka-user-web/center/getNumToSet.do",
          data: $mobileNumGet,
          dataType: "html",
          async: true,
          success: function(data) {
            if (data == "success") {
              $('.f-captcha').attr('disabled', false);
            } else {
              $('.f-captcha').attr('disabled', false);
            }
          }
        });
      });

      // 修改地址验证
      module.find('#info-change-form').formValidation({
        framework: 'bootstrap',
        icon: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
          'f-name': {
            selector: '#info-change-form .f-name',
            validators: {
              notEmpty: {
                message: __('Please enter your name')
              },
              stringLength: {
                max: 30,
                message: __('Receiver\'s name must be less than %s characters')
              }
            }
          },
          'f-sex': {
            selector: '#info-change-form .f-sex',
            validators: {
              notEmpty: {
                message: __('Please select the sexuality')
              }
            }
          },
          'f-phone': {
            selector: '#info-change-form .f-phone',
            validators: {
              notEmpty: {
                message: __('Please enter your mobile')
              },
              stringLength: {
                min: 11,
                max: 11,
                message: __('The mobile length limit')
              },
              regexp: {
                message: __('The mobile can only contain the digits, spaces, -, (, ), + and .'),
                regexp: /^[0-9\s\-()+\.]+$/
              }
            }
          },
          'f-addr-detail': {
            selector: '#info-change-form .f-addr-detail',
            validators: {
              notEmpty: {
                message: __('The address details is required')
              },
              stringLength: {
                max: 150,
                message: __('Address detail is too long')
              }
            }
          },
          'f-zipcode': {
            selector: '#info-change-form .f-zipcode',
            validators: {
              notEmpty: {
                message: __('The postal code is required')
              },
              regexp: {
                regexp: /^[a-zA-Z0-9]{1,5}[- ]?[a-zA-Z0-9]{1,5}$/,
                message: __('The postal code is invalid')
              }
            }
          },
          'f-country': {
            selector: '#info-change-form .f-country',
            validators: {
              notEmpty: {
                message: __('Country name is required')
              }
            }
          },
          'f-state': {
            selector: '#info-change-form .f-state',
            validators: {
              notEmpty: {
                message: __('State name is required')
              }
            }
          },
          'f-city': {
            selector: '#info-change-form .f-city',
            validators: {
              notEmpty: {
                message: __('City name is required')
              }
            }
          },
          'f-region': {
            selector: '#info-change-form .f-region',
            validators: {
              notEmpty: {
                message: __('Region name is required')
              }
            }
          }

        }
      }).on('err.validator.fv', function(e, data) {
        data.element
          .data('fv.messages')
          .find('.help-block[data-fv-for="' + data.field + '"]').hide()
          .filter('[data-fv-validator="' + data.validator + '"]').show();
      }).on('success.form.fv', function(e) {
        // Prevent form submission
        e.preventDefault();
        $('#info-edit-modal').modal('hide');
        var $form = $(e.target),
          fv = $form.data('formValidation');
        //手机异步验证
        $.ajax({
          type: "post",
          url: "/cooka-user-web/center/getNumToSet.do",
          data: $mobileNumGet,
          dataType: "html",
          async: true,
          success: function(data) {
            if (data == "success") {
              $('.f-captcha').attr('disabled', false);
            } else {
              $('.f-captcha').attr('disabled', false);
            }
          }
        });
      });

      // 新增地址验证
      var $getTel = $('.getTel').text(); // get telphone;
      var $infoEditForm = module.find('#info-edit-form');

      $infoEditForm.formValidation({
          framework: 'bootstrap',
          icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
          fields: {
            'f-name': {
              selector: '#info-edit-form .f-name',
              validators: {
                notEmpty: {
                  message: __('Please enter your name')
                },
                stringLength: {
                  max: 30,
                  message: __('Receiver\'s name must be less than %s characters')
                }
              }
            },
            'f-sex': {
              selector: '#info-edit-form .f-sex',
              validators: {
                notEmpty: {
                  message: __('Please select the sexuality')
                }
              }
            },
            'f-phone': {
              selector: '#info-edit-form .f-phone',
              validators: {
                notEmpty: {
                  message: __('Please enter your mobile')
                },
                stringLength: {
                  max: 20,
                  message: __('The mobile length can not be more than %s')
                },
                regexp: {
                  message: __('The mobile can only contain the digits, spaces, -, (, ), + and .'),
                  regexp: /^[0-9\s\-()+\.]+$/
                }
              }
            },
            'f-captcha': {
              enabled: false,
              selector: '.f-captcha',
              validators: {
                stringLength: {
                  max: 8,
                  message: __('The captcha length can not more than %s')
                },
                remote: {
                  message: __('The captcha is wrong'),
                  url: '/cooka-user-web/center/isTrueCode.do',
                  type: 'POST',
                  delay: 2000
                }
              }
            },
            'f-addr-detail': {
              selector: '#info-edit-form .f-addr-detail',
              validators: {
                notEmpty: {
                  message: __('The address details is required')
                },
                stringLength: {
                  max: 150,
                  message: __('Address detail is too long')
                }
              }
            },
            'f-zipcode': {
              selector: '#info-edit-form .f-zipcode',
              validators: {
                notEmpty: {
                  message: __('The postal code is required')
                },
                regexp: {
                  regexp: /^[a-zA-Z0-9]{1,5}[- ]?[a-zA-Z0-9]{1,5}$/,
                  message: __('The postal code is invalid')
                }
              }
            },
            'f-country': {
              selector: '#info-edit-form .f-country',
              validators: {
                notEmpty: {
                  message: __('Country name is required')
                }
              }
            },
            'f-state': {
              selector: '#info-edit-form .f-state',
              validators: {
                notEmpty: {
                  message: __('State name is required')
                }
              }
            },
            'f-city': {
              selector: '#info-edit-form .f-city',
              validators: {
                notEmpty: {
                  message: __('City name is required')
                }
              }
            },
            'f-region': {
              selector: '#info-edit-form .f-region',
              validators: {
                notEmpty: {
                  message: __('Region name is required')
                }
              }
            }
          }
        })
        .on('err.validator.fv', function(e, data) {
          if (data.field === "f-phone") {
            $('.captcha-block').hide('fast');
          }
          data.element
            .data('fv.messages')
            .find('.help-block[data-fv-for="' + data.field + '"]').hide()
            .filter('[data-fv-validator="' + data.validator + '"]').show();
        });

      module.find('#info-edit-form').data('formValidation').resetForm();

      // ============ fix bug in profile =================
      var isProfile = module.closest('.main').find('.user-profile').length;
			if (isProfile) {
				$infoEditForm.find('select').each(function() {
					var $this = $(this);
					var $fieldName = 'f-' + $this.attr('name');
					var l = $this.find('option').length;
					if (l === 1) {
						$infoEditForm.data('formValidation').enableFieldValidators($fieldName, false);
						$infoEditForm.data('formValidation').revalidateField($fieldName);
					}
				});
			}
      // =================================================
    }
  };
})();
