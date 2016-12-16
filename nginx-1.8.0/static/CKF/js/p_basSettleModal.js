var CKF = require('./CKF.js');
require('../less/bas-modal.less');

// bootstrap
require('bootstrap/js/transition.js');
require('bootstrap/js/modal.js');

require('../css/formValidation.min.css');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');

module.exports = (function() {
    var moduleName = 'basSettleModal';
    var module = CKF.create(moduleName);

    return {
        init: function() {
            $('#bas-settle-form').formValidation({
                framework: 'bootstrap',
                icon: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh spin'
                },
                fields: {
                    "complaintInstructions": {
                        validators: {
                            notEmpty: {
                                message: __('description can not be empty')
                            },
                            stringLength: {
                                max: 256,
                                message: __('description is too long')
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
    };
})();