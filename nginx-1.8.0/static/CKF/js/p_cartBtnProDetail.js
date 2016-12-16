var CKF = require('./CKF.js');
require('../less/favourite-product.less');
require('bootstrap/js/modal.js');

module.exports = (function() {
  var moduleName = 'cartBtnProDetail';
  var module = CKF.create(moduleName, true);

  return {
    init: function() {
      if (module !== null) {
        module.on('click', function() {
          event.preventDefault();
          var $this = $(this);
          var id = $this.data('value');
          $.ajax({
            type: "POST",
            url: "/duobao-user-web/isLogin",
            success: function(data) {
              if (data !== 'false') {
                console.log(data);
                $.ajax({
                  type: "post",
                  url: "/cooka-user-web/center/getProductDetail?productId=" + id,
                  success: function(data) {
                    $('.shopping-modal').html(data);
                    $('#shopping-modal').modal('show');

                    $('.js-cancel').click(function() {
                      $('#shopping-modal').modal('hide');
                    });

                    CKF.notify({
                      type: 'rebuild-event',
                      data: true
                    });
                  }
                });
              } else {
                CKF.notify({
                  type: 'show-sign-in',
                  data: null
                });
              }
            }
          });
        });
      }
    }
  };
})();
