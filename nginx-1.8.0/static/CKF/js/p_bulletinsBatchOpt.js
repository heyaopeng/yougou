var CKF = require('./CKF.js');
require('../less/bulletins-batch-opt.less');

module.exports = (function () {
    var moduleName = 'bulletinsBatchOpt';
    var module = CKF.create(moduleName);

    return {
        init: function () {
        	module
        	.on('click', '.btn-del-batch', function(event) {
        		event.preventDefault();
        		CKF.notify({
            		type: 'batch-remove',
            		data: null
        		});
        	})
        	.on('click', '.btn-del-complete-batch', function(event) {
        		event.preventDefault();
        		CKF.notify({
        			type: 'batch-remove-com',
        			data: null
        		});
        	})
        	.on('click', '.btn-col-batch', function(event) {
        		event.preventDefault();
        		CKF.notify({
        			type: 'batch-star',
        			data: null
        		});
        	})
        	.on('click', '.btn-read-batch', function(event) {
        		event.preventDefault();
        		CKF.notify({
        			type: 'batch-read',
        			data: null
        		});
        	})
            .on('click', '.btn-recovery-batch', function(event) {
                event.preventDefault();
                CKF.notify({
                    type: 'batch-recovery',
                    data: null
                });
            })
            .on('click', '.btn-cancelCol-batch', function(event) {
                event.preventDefault();
                CKF.notify({
                    type: 'batch-cancelCol',
                    data: null
                });
            });				
        }
    };
})();