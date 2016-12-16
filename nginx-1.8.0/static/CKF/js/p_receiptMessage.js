var CKF = require('./CKF.js');
require('../less/receipt-message.less');

// other dependencies ...
require('./hbs/receiptMessage-temp_i18n.js');
require('./handlebars_helpers.js');

module.exports = (function() {

  var moduleName = 'receiptMessage';
  var module = CKF.create(moduleName);

  var $isAddressMananger = module.parent('#address-management').length; // 判断是地址管理还是下单流程

  function setAddressId(object) {
    var $setAddrId = $(object);
    var $getAddrId = module.find('.receipt-message-info.active').attr('data-addr-id');
    $setAddrId.val($getAddrId);
  }

  return {
    init: function() {

      module.each(function(index, elem) {

        CKF.listen({
          'active-address-id': setAddressId
        }, moduleName);


        module.on('click', '.receipt-message-info-empty', function(e) {
          CKF.notify({
            type: 'clear-form',
            data: null
          });

          CKF.notify({
            type: 'new-address',
            data: null
          });
        });

        // 设置默认
        module.on('click', '.receipt-message-set-default', function(e) {
          var $this = $(this);
          var $thisAddrBox = $this.closest('.receipt-message-info');
          if (!$thisAddrBox.hasClass('isdefault')) {
            // get id
            var aid = "addrDefaultId=" + $thisAddrBox.data('addr-id');

            var $confirm = confirm(__('Are you sure to select this address for your default receipt message?'));

            if ($confirm) {
              $.ajax({
                type: "post",
                url: "/cooka-user-web/center/updateDefaultAddrHandler",
                data: aid,
                success: function(data) {
                  var $otherBox;
                  if ($isAddressMananger) {
                    $otherBox = $thisAddrBox.siblings('.receipt-message-info');
                    $otherBox.find('.icon-delete-o').removeClass('hide');
                    $otherBox.removeClass('active');
                    $thisAddrBox.find('.icon-delete-o').addClass('hide');
                    $thisAddrBox.addClass('active');
                  } else {
                    $otherBox = $thisAddrBox.siblings('.receipt-message-info');
                    $otherBox.find('.icon-delete-o').removeClass('hide');
                    $otherBox.removeClass('isdefault').addClass('notdefault');
                    $thisAddrBox.find('.icon-delete-o').addClass('hide');
                    $thisAddrBox.removeClass('notdefault').addClass('isdefault');
                  }
                }
              });
            }
          }
        });

        // 选择收货地址
        module.on('click', '.receipt-message-info', function(event) {
          var $target = $(event.target);
          var $this = $(this);
          var $isEmpty = $this.hasClass('receipt-message-info-empty');
          if (!$isAddressMananger) {
            if (!$this.hasClass('active') && !$target.is('.icon-edit-o, .icon-delete-o, .receipt-message-set-default') && !$isEmpty) {
              if ($this.hasClass('isdefault')) {
                $this.siblings().removeClass('active');
                $this.addClass('active');
              } else {
                $this.siblings().removeClass('active');
                $this.addClass('notdefault active');
              }

              var $addrId = module.find('.receipt-message-info.active').attr('data-addr-id');
              CKF.notify({
                type: 'set-addr-id',
                data: $addrId
              });
            }
          }
        });

        CKF.notify({
          type: 'new-address',
          data: null
        });

        // 点击删除
        module.on('click', '.icon-delete-o', function() {
          var $this = $(this);
          var $addrItem = $this.closest('.receipt-message-info');
          var $confirm = confirm(__('WARNING: Are you sure to delete this receipt message?'));
          if ($confirm) {
            // get id
            var aidd = "deliveraddrId=" + $addrItem.data('addr-id');
            $.ajax({
              type: "post",
              url: "/cooka-user-web/center/deleteUserAddrHandler",
              data: aidd,
              success: function(data) {
                $addrItem.fadeOut(function() {
                  var $isDefault;
                  var $hasActive = $this.closest('.receipt-message-info').hasClass('active');
                  if ($hasActive) {
                    $isDefault = $this.closest('.receipt-message-info').siblings('.isdefault');
                    $isDefault.addClass('active');
                    $('#save-order-addr')[0].value = $isDefault.data('addr-id');
                  }
                  $this.closest('.receipt-message-info').remove();
                });
              }
            });
          }
        });

        // 点击修改
        module.on('click', '.icon-edit-o', function(event) {
          var $this = $(this);
          var $addrItem = $this.closest('.receipt-message-info');

          var $isActiveAddr = $addrItem.hasClass('active');

          var data = $addrItem.data('addr');

          var html = Handlebars.templates.receiptMessage(data);

          CKF.notify({
            type: 'build-form',
            data: {
              htm: html,
              isA: $isActiveAddr
            }
          });
        });
      });
    }
  };
})();
