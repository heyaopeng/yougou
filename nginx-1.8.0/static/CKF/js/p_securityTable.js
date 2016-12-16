var CKF = require('./CKF.js');
require('../less/security-table.less');
// other dependencies ...

module.exports = (function () {
	var moduleName = 'securityTable';
	var module = CKF.create(moduleName);

	function successItem(){

		var MAX_RATE = module.find('tbody > tr').length;
		var $allCheckItems = module.find('tbody > tr').find('.security-table-check');
		var $successItem = 0;
		$allCheckItems.each(function(index, el) {
			var $this = $(this);
			var $icon = $this.find('span');
			if($icon.hasClass('icon-check-bold')){
				$successItem ++;
			}
		});

		var $securityPer = $successItem / MAX_RATE * 100 + '%';

		CKF.notify({
			type: 'set-progress-css',
			data: {
				item: $successItem,
				per: $securityPer
			}
		});
	}

	var $dataClass;	// 记录点击verification按钮所对应的验证方式

	function targetIcon(){
		CKF.notify({
			type: 'next-form',
			data: $dataClass
		});
	}

	function targetAction(){
		CKF.notify({
			type: 'change-action',
			data: $dataClass
		});
	}

	return {
		init: function () {
			successItem();

			CKF.listen({
				'target-icon': targetIcon,
				'target-action': targetAction
			}, moduleName);

			module.on('click', '.btn-verification', function(){
				var $this = $(this);
				var $targetIcon = $this.closest('tr').find('th:first-of-type').find('span');
				$dataClass = $targetIcon[0].className;
				var wayId = $this.closest('td').data('wayid');

				switch (wayId) {
					case 1:
						CKF.notify({
							type: 'change-title',
							data: __('Bind Email')
						});
						break;

					case 3:
						CKF.notify({
							type: 'change-title',
							data: __('Bind Mobile')
						});
						break;
					case 4:
						CKF.notify({
							type: 'change-title',
							data: __('Set Security Question')
						});
						break;

					default:
						alert(__("Unknown error"));
				}
			});

			module.on('click', '.btn-modify', function(event){
				event.preventDefault();

				var $wayId = $(this).closest('td').data('wayid');

				CKF.notify({
					type: 'open-select-modal',
					data: $wayId
				});
			});
		}
	};
})();
