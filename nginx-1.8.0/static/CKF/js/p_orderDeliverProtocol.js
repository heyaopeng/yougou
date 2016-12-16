var CKF = require('./CKF.js');
require('../less/order-deliver-protocol.less');
// other dependencies ...

module.exports = (function () {
    var moduleName = 'orderDeliverProtocol';
    var module = CKF.create(moduleName);

    return {
        init: function () {
        	module.find('.order-deliver-item').on('click', function(event) {
        		event.preventDefault();
        		var $this = $(this);
        		var $getId = $this.data('id');
        		$this.siblings().removeClass('active');
        		$this.addClass('active');

        		CKF.notify({
        			type: 'release-the-SubmitBtn',
        			data: null
        		});

        		CKF.notify({
	                type: 'set-allowSegmentalDelivery',
	                data: $getId
	            });
        	});
        }
    };
})();