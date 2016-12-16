var CKF = require('./CKF.js');
require('../less/cart-collection.less');

module.exports = (function () {
    var moduleName = 'cartCollection';
    var module = CKF.create(moduleName,true);

    return {
        init: function () {
        	if(module!==null){
        		module.each(function (index, elem) {
                	var $elem = $(elem);
	            });
        	}
            
        }
    };
})();
