var CKF = require('./CKF.js');
require('../less/panel-operation.less');
// other dependencies ...

module.exports = (function () {
	var moduleName = 'panelOperation';
	var module = CKF.create(moduleName);
	return {
		init: function () {
			//rank page show select ajax
			var $rankShow = module.find('.rank-product-show-num');
			$rankShow.on('change', 'select', function () {
				var value=$(this).val();
				$.post(" ","showVal="+value, function(data){
					if(data == "success"){

					}else{

					}
				}, 'html');
			});

			var $showOrder = module.find('.panel-operation-select');
			if ($showOrder.length) {
				$showOrder.find('select').on('change', function(event) {
					event.preventDefault();
					var $URL = this.options[this.selectedIndex].value;
					location.href = $URL;
				});
			}
		}
	};
})();