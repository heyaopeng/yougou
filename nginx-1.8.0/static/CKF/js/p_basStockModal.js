var CKF = require('./CKF.js');
require('../less/bas-modal.less');

// bootstrap
require('bootstrap/js/transition.js');
require('bootstrap/js/modal.js');

var getCookie = require('./getCookie.js');
var lang = getCookie('language');

// form validation
require('../css/formValidation.min.css');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');

module.exports = (function() {
    var moduleName = 'basStockModal';
    var module = CKF.create(moduleName);

    function openStock(data) {
        module.modal('show');
        $('#bas-stock-form').data('formValidation').destroy();
        module.find('.bas-table-holder').html(data);
        formValidate($('#bas-stock-form'));
    }

    function formValidate($form) {
        $form.formValidation({
            framework: 'bootstrap',
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh spin'
            },
            row: {
                selector: 'td'
            },
            fields: {
                "f-inventory": {
                    selector: '.f-inventory',
                    validators: {
                        notEmpty: {
                            message: __('Please enter inventory')
                        },
                        integer: {
                            message: __('Wrong inventory')
                        },
                        between: {
                            min: 0,
                            max: 4000000000,
                            message: __('The inventory must be between %s and %s')
                        }
                    }
                }
            }
        }).on('err.validator.fv', function(e, data) {
            data.element
                .data('fv.messages')
                .find('.help-block[data-fv-for="' + data.field + '"]').hide()
                .filter('[data-fv-validator="' + data.validator + '"]').show();
        });
    }

    return {
        init: function() {
            CKF.listen({
                'bas-open-stock': openStock
            }, moduleName);

            formValidate($('#bas-stock-form'));
        }
    };
})();