var CKF = require('./CKF.js');
require('../less/refund-detail-info.less');

module.exports = (function() {
	var moduleName = 'refundDetailInfo';
	var module = CKF.create(moduleName,true);
	function toggleModule(){		
			module.each(function(idx,ele){
				var $ele=$(ele);
				var $head =  $ele.find('.js-head');
				var $down = $ele.find('.js-down');
				var $up = $ele.find('.js-up');
				var $body = $ele.find('.js-body');
				if($down.is(':hidden')){
					$body.hide();
				}
				$head.on('click',function(){
					$down.toggleClass('hidden');
					$up.toggleClass('hidden');
					$body.slideToggle();
				});

			});
	}

	return {
		init: function() {
			if(module!==null){
				toggleModule();
			}
		}
	};
})();