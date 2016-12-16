var CKF = require('./CKF.js');
require('../less/bank-cart-modal.less');
require('bootstrap/js/modal.js');
// other dependencies ...

// other dependencies ...
var getCookie = require('./getCookie.js');
var lang = getCookie('language');

// form validation
require('../css/formValidation.min.css');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');

//datepicker
require('bootstrap-datepicker/dist/js/bootstrap-datepicker.js');
require('bootstrap-datepicker/dist/css/bootstrap-datepicker3.standalone.css');
require('jquery-form');

module.exports = (function() {

    var moduleName = 'bankCartModal';
    var module = CKF.create(moduleName);
    return {
        init: function() {
            var $bankCartForm = module.find('#bank-cart-form');
            $bankCartForm.formValidation({
                icon: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    'f-new-cart': {
                        selector: '.f-new-cart',
                        validators: {
                            notEmpty: {
                                message: __('The Current account is required')
                            },
                            regexp: {
                                regexp: /[0-9]+/,
                                message: __('Please enter the correct card number')
                            },
                            remote: {
                                verbose: false,
                                url: '/cooka-finance-web/verifyCardNum',
                                type: 'POST',
                                data: function(validator, $field, value) {
                                    return {
                                        cardNum: validator.getFieldElements('f-new-cart').val()
                                    };
                                },
                                message: __('Please enter the card number')
                            }
                        }
                    },
                    'f-due-date': {
                        selector: '.f-due-date',
                        validators: {
                            notEmpty: {
                                message: __('The due date is required')
                            }
                        }
                    },
                    'f-csc': {
                        selector: '.f-csc',
                        validators: {
                            notEmpty: {
                                message: __('The value is required')
                            },
                            regexp: {
                                regexp: /^[0-9]{3}$/,
                                message: __('The value must consist of 3 number')
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
                e.preventDefault();
                var options = {
                    type: "GET",
                    url: '/cooka-finance-web/addBankCard',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function(result) {
                        if (result === "failed") {
                            alert();
                        } else if (result === "success") {
                            
                            var $parent = $('.f-cart');

                            var text = module.find('.f-new-cart').val();
                            var html = '<option value="' + text + '" selected>' + text + '</option>';
                            $(html).appendTo($parent);
                            $('.bank-cart-modal').modal('hide');
                        } else {
                            alert(result + 'already existed');
                        }
                        
                    },
                    error: function(status) {
                        alert('add card Error!!!');
                    }
                };
                $('#bank-cart-form').ajaxSubmit(options);

            }).on('success.field.fv', '.f-new-cart', function(e, data) {
                $('#cardType-image').prop('src', '/images/' + data.result.cardType + '.png');
                $('#cardType-image').prop('width', '50');
                $('#cardType-image').prop('height', '35');
                $('.calculate').html(data.result.handlingCharge);
                $('#handling-charge').val(data.result.handlingCharge);

            });

            $bankCartForm.find('.f-due-date').datepicker({
                    format: "yyyy/mm",
                    startView: "years",
                    minViewMode: "months",
                    autoclose: true,
                    orientation: "top left",
                    language: lang
                })
                .on('changeDate', function() {
                    $bankCartForm.formValidation('revalidateField', '.f-due-date');
                });

            $('.f-new-cart').on('change', function() {
                var cardNum = $(this).val();
                $.ajax({
                    type: "GET",
                    url: '/cooka-finance-web/getCardType?cardNum=' + cardNum,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function(result) {
                        if (result != "error") {
                            var obj = $.parseJSON(result);
                            $('.calculate').html(obj.handlingCharge);
                            $('#handling-charge').val(obj.handlingCharge);
                        }
                    },
                    error: function(status) {
                        alert('get cardtype error!!! ');
                    }
                });
            });
        }
    };
})();