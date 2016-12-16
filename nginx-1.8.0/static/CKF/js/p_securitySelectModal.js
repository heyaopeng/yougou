var CKF = require('./CKF.js');
require('../less/security-select-modal.less');

// form validation
require('../css/formValidation.min.css');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');

// bootstrap
require('bootstrap/js/transition.js');
require('bootstrap/js/modal.js');

module.exports = (function() {
    var moduleName = 'securitySelectModal';
    var module = CKF.create(moduleName);

    var $wayId;

    var $modalTitle = module.find('.security-select-modal-title');

    function openSelectModal(wayId) {
        $wayId = wayId;
        switch ($wayId) {
            case 1:
                $modalTitle.text(__('You are modifying your email, Please select the verification code'));
                break;

            case 2:
                $modalTitle.text(__('You are modifying your login password, Please select the verification code'));
                break;

            case 3:
                $modalTitle.text(__('You are modifying your mobile, Please select the verification code'));
                break;

            case 4:
                $modalTitle.text(__('You are modifying your safety problem, Please select the verification code'));
                break;

            case 5:
                $modalTitle.text(__('You are modifying your payment password, Please select the verification code'));
                break;

            default:
                alert(__('Unknown error'));
        }
        module.modal({
            backdrop: 'static',
            show: true
        });
    }


    return {
        init: function() {
            CKF.listen({
                'open-select-modal': openSelectModal
            }, moduleName);

            module.on('click', '.btn', function() {
                var $this = $(this);
                var $varId = $this.data('verId');
                module.modal('hide');

                CKF.notify({
                    type: 'open-modify-modal',
                    data: $wayId
                });

                CKF.notify({
                    type: 'open-ver-form',
                    data: $varId
                });
            });
        }
    };
})();