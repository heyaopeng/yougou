var CKF = require('./CKF.js');
require('bootstrap/js/modal.js');
require('../less/pro-detail-info-btn.less');

module.exports = (function() {
    var moduleName = 'shoppingModalBtn';

    var module = CKF.create(moduleName, true);

    function showBtn(singlePrice) {
        if (singlePrice <= 0) {
            module.find('.js-cart').prop('disabled', true);
            module.closest('form').data('formValidation').disableSubmitButtons(true);
        } else {
            module.find('.js-cart').prop('disabled', false);
            module.closest('form').data('formValidation').disableSubmitButtons(false);
        }
    }

    function buildEvent(data) {
        if (data) {
            module = CKF.rebuild(moduleName);

            if (module !== null) {
                var $cart = module.find('.js-cart');
                $cart.on('click', function(e) {
                    e.preventDefault();
                    var $this = $(this);
                    var $form = $this.closest('form');
                    var $inputSpin = $form.find('.js-minus-plus-group');
                    var data = {};
                    data['storeId'] = $form.find('input[name="storeId"]').val();
                    data['productId'] = $form.find('input[name="productId"]').val();
                    data['combination'] = [];

                    $inputSpin.each(function(index, elem) {
                        var $elem = $(elem);
                        var aComb = {};
                        aComb['combinationId'] = $.trim($elem.find(
                            '[name="combination[' + index + '].combinationId"]').val());
                        aComb['getamount'] = $.trim($elem.find(
                            '[name="combination[' + index + '].getamount"]').val());
                        if (aComb['getamount'] !== '0' && aComb['getamount'] !== '') {
                            data['combination'].push(aComb);
                        }
                    });
                    $.ajax({
                        type: "post",
                        url: "/cooka-productDetail-web/addToUserCart.do",
                        contentType: "application/json; charset=UTF-8",
                        data: JSON.stringify(data),
                        dataType: "html",
                        async: true,
                        success: function(data) {
                        	if (data === "success") {
                           	 $('#shopping-modal').modal('hide');
   	        				  $('#shopping-second-modal').modal('show');
                           }/*else if(data == "isExist"){
                           	  $('#shopping-modal').modal('hide');
               				  $('#shopping-second-existed-modal').modal('show');
                           }*/
                        	else if(data==="notPermission"){
                        		alert("not permission!")
                        	}
                           	else {
                               console.log('add failed');
                           }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            console.log(XMLHttpRequest.status);
                        }
                    });
                });
            }
        }
    }

    return {
        init: function() {
            CKF.listen({
                'rebuild-event': buildEvent,
                'perform-btn': showBtn
            }, moduleName);
        }
    };
})();
