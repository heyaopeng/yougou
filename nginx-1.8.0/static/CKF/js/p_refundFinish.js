var CKF = require('./CKF.js');
require('../less/refund-finish.less');
require('bootstrap/js/tooltip.js');
require('bootstrap/js/popover.js');
require('bootstrap/js/modal.js');
module.exports = (function () {
    // var moduleName = 'refundFinish';
    // var module = CKF.create(moduleName);

    return {
        init: (function () {
			  $('[data-toggle="popover"]').popover();
			})
    };
})();