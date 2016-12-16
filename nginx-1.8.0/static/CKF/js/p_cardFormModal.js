var CKF = require('./CKF.js');
require('../less/card-form.less');
// other dependencies ...
var getCookie = require('./getCookie.js');
var lang = getCookie('language');

// form validation
require('../css/formValidation.min.css');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');

// bootstrap
require('bootstrap/js/transition.js');
require('bootstrap/js/modal.js');
require('bootstrap/js/tooltip.js');
require('bootstrap/js/popover.js');
require('bootstrap-datepicker/dist/js/bootstrap-datepicker.js');
require('bootstrap-datepicker/dist/css/bootstrap-datepicker3.standalone.css');

module.exports = (function () {
	var moduleName = 'cardFormModal';

    return {
    	init: function(){
            $('[data-toggle="popover"]').popover();

            // 信息验证
            $('#card-form').formValidation({
                framework: 'bootstrap',
                icon: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    "f-number": {
                        selector: '.f-number',
                        validators: {
                            notEmpty: {
                                message: __('The content is required')
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
                                        cardNum: validator.getFieldElements('f-number').val()
                                    };
                                },
                                message: __('Please enter the correct card number')
                            }
                        }
                    },
                    "f-name": {
                        selector: '.f-name',
                        validators: {
                            notEmpty: {
                                message: __('The content is required')
                            }
                        }
                    },
                    "f-due-date": {
                        selector: '.f-due-date',
                        validators: {
                            notEmpty: {
                                message: __('The content is required')
                            }
                        }
                    },
                    "f-cvv": {
                        selector: '.f-cvv',
                        validators: {
                            notEmpty: {
                                message: __('The content is required')
                            },
                            regexp: {
                                regexp: /^[0-9]{3}$/,
                                message: __('Please enter the correct content')
                            }
                        }
                    },
                    "f-country": {
                        selector: '.f-country',
                        validators: {
                            notEmpty: {
                                message: __('The content is required')
                            }
                        }
                    },
                    "f-bank": {
                        selector: '.f-bank',
                        validators: {
                            notEmpty: {
                                message: __('The content is required')
                            }
                        }
                    },
                }
            })
            .on('err.validator.fv', function(e, data) {
                data.element
                    .data('fv.messages')
                    .find('.help-block[data-fv-for="' + data.field + '"]').hide()
                    .filter('[data-fv-validator="' + data.validator + '"]').show();
            })
            .on('success.field.fv', '.f-number', function(e, data) {
                if(data.result.cardType==='JCB'||data.result.cardType==='Mastercard'||data.result.cardType==='Visa'){
                    $('#card-type').prop('src', '/images/' + data.result.cardType + '.png');
                    $('#card-type').removeClass('hidden');
                    $('#init-card-type').addClass('hidden');
                    $('#except-card-type').addClass('hidden');
                    $('.modal-cardType').val(data.result.cardType);
                }
                else{
                    $('#card-type').addClass('hidden');
                    $('#except-card-type').removeClass('hidden');
                    $('#init-card-type').addClass('hidden');
                }

            })
            .on('err.field.fv', '.f-number', function(e, data) {
                $('#card-type').addClass('hidden');
                $('#init-card-type').removeClass('hidden');
                $('#except-card-type').addClass('hidden');
            });
            $('#card-form').find('.f-due-date').datepicker({
                format: "yyyy/mm",
                startView: "years",
                minViewMode: "months",
                autoclose: true,
                orientation: "top left",
                language: lang
            })
            .on('changeDate', function() {
                $('#card-form').formValidation('revalidateField', 'f-due-date');
            });

            $('.js-crediet-card').click(function(){
                var id = $('.js-crediet-card').data('value');
                console.log(id);
                $('#modal-paymentId').val(id);
            });
    	}
    };

})();
