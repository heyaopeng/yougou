var CKF = require('./CKF.js');
require('../less/pro-detail-info.less');

require('bootstrap/js/tab.js');

require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');

module.exports = (function() {
    var moduleName = 'proDetailInfo';
    var module = CKF.create(moduleName, true);

    function proDetailBuynow() {
        module[0].submit();
    }

    function proDetailCart() {
        var $this = $('.js-cart');
        var $form = $this.closest('form');
        var $inputSpin = $form.find('.js-minus-plus-group');
        var data = {};
        $(this).closest('form').attr('action', '/cooka-productDetail-web/addToUserCart.do');
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
            if (aComb['amount'] !== '0') {
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
                if (data == "success") {
                    $('#cart-modal').modal('show');
                } else {
                    if (data == "notPermission") {
                        alert('notPermission');
                    } else {
                        CKF.notify({
                            type: 'show-sign-in',
                            data: true
                        });
                    }
                }
            }
        });
    }

    function buildEvent(data) {
        if (data) {
            module = CKF.rebuild(moduleName);
        }
        if (module !== null) {
            module.find('.f-quantity').val('0');
            module.on('init.form.fv', function(e, data) {
                // module.find('.js-buy').prop('disabled', true);
                // module.find('.js-cart').prop('disabled', true);
                data.fv.disableSubmitButtons(true);
            });
            module.on('minusPlusGroup.iptChange', function() {
                var totalPiece = 0;

                module.find('.js-quantity').each(function(idx, ele) {
                    totalPiece += parseInt($(ele).val());
                });

                CKF.notify({
                    type: 'perform-total',
                    data: totalPiece
                });
            });
            module.formValidation({
                    /*addOns: {
                        i18n: {}
                    }, */
                    err: {
                        container: '.pro-detail-info-messages'
                    },
                    fields: {
                        'f-quantity': {
                            selector: '.f-quantity',
                            validators: {
                                // callback: {
                                //     message: {
                                //         en_US: 'The total pieces less than requested',
                                //         zh_CN: '总件数少于起批量'
                                //     },

                                // callback: function (value, validator, $field) {
                                // 	console.log('a');
                                // Determine the numbers which are generated in captchaOperation
                                // var text = module.find('.js-piece').text()*1;	                                    	
                                /*var min = parseInt(module.find('.js-pro-detail-total').data('range'));
	                                    var text = 0;*/
                                /*module.find('.f-quantity').each(function(index, el) {
	                                        text+=$(el).val()*1;
	                                    });*/
                                // console.log(text);
                                /*if(text===0){
	                                    	return true;
	                                    }*/
                                /*if(min > text){
	                                        return {
	                                            valid: false,
	                                            message: 'The total pieces less than requested'
	                                        };
	                                    }*/
                                // if(value>parseInt($field.closest('.js-minus-plus-group').data('max'))){
                                //    return {
                                //         valid: false,
                                //         message: 'The pieces more than inventories'
                                //     }; 
                                // }
                                // return true;
                                //     }
                                // },
                                /*digits:{
                                },*/
                                /* lessThan:{
                                 	max:$(this).data('max'),                            	
                                     message: {
                                         en_US: 'The total pieces more than inventories',
                                         zh_CN: '超过库存'
                                     }
                                 }*/
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
    }
    return {
        init: function() {
            buildEvent();
            CKF.listen({
                'pro-detail-buynow': proDetailBuynow,
                'pro-detail-cart': proDetailCart,
                'rebuild-event': buildEvent
            }, moduleName);
        }
    };
})();