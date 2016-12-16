var CKF = require('./CKF.js');
require('../less/refund-detail-choose.less');

module.exports = (function() {
	var moduleName = 'refundDetailChoose';
	var module = CKF.create(moduleName);

	return {
		init: function() {
			module.find('.js-box').on('click',function(e){
				if(module.find('.js-checkbox').is(':checked')){
				}
				else{
					e.preventDefault();
					module.find('.js-alert').removeClass('hidden');
				}
			});

			module.find('.js-close').on('click',function(){
				module.find('.js-alert').addClass('hidden');
			});

			module.find('.js-checkbox').on('change',function(event) {
				if($(this).is(':checked')){					
					module.find('.js-alert').addClass('hidden');
				}
			});
			
		}
	};
})();