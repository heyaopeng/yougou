var CKF = require('./CKF.js');
require('../less/bas-modal.less');

// bootstrap
require('bootstrap/js/transition.js');
require('bootstrap/js/modal.js');

module.exports = (function() {
    var moduleName = 'basHistoryModal';
    var module = CKF.create(moduleName);

    function openHistory(data) {
        module.modal('show');
        module.find('.bas-history-holder').html(data);
    }

    return {
        init: function() {
            CKF.listen({
                'bas-open-history': openHistory
            }, moduleName);

            module.on('click', '.bas-bill-time-slide', function(e) {
                // v = YYYY/MM/(a|b)
                var v = $(this).data('value');

                $.getJSON('/cooka-xxx-web/url/' + v, function(data) {
                    var template = require('./hbs/basHistory.handlebars');
                    var html = template(data);
                    module.find('.bas-history-holder').html(html);
                });
            });
        }
    };
})();