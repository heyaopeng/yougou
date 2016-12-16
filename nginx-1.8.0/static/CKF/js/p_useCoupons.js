var CKF = require('./CKF.js');
require('../less/use-coupons.less');

module.exports = (function() {
	var moduleName = 'useCoupons';
	var module = CKF.create(moduleName);
	return {
		init: function() {
			var $subCheckbox = module.find('.js-sub-checkbox');
			var $parCheckbox = module.find('.js-par-checkbox');

			var $childFirst = module.find('.js-use-coupons-item-first');
			var $childSecond = module.find('.js-use-coupons-item-second');
			selectAll();

			var $couponSelect = module.find('select[name="couponSerialNum"]');

			// checkbox control
			function selectAll() {
				$parCheckbox.change(function() {
					var $this = $(this);
					$subCheckbox.prop('checked', $this.prop('checked')).closest('.js-use-coupons-list-item').toggleClass('active');
					$parCheckbox.prop('checked', $this.prop('checked'));
					loadOptionsFirst();
					loadOptionsSecond();
				});

				$subCheckbox.change(function() {
					var thisState = $(this).prop('checked');
					if (!thisState) {
						$parCheckbox.prop('checked', false);
					} else {
						var allState = true;
						$subCheckbox.each(function() {
							var $this = $(this);
							var indexState = $this.prop('checked');
							if (!indexState) {
								allState = false;
								return false;
							}
						});
						if (allState)
							$parCheckbox.prop('checkbfb ced', true);
					}
				});
			}

			module.on('change', '.js-sub-item-coupons', function() {
				var $this = $(this);
				if($this.prop("checked")===true)
					$this.closest('.js-use-coupons-list-item').addClass('active');
				else
					$this.closest('.js-use-coupons-list-item').removeClass('active');
				loadOptionsFirst();
			});

			module.on('change', '.js-sub-item-activity', function() {
				var $this = $(this);
				$this.closest('.js-use-coupons-list-item').toggleClass('active');
				loadOptionsSecond();
			});

			function loadOptionsFirst() {
				if ($childFirst.hasClass('active')) {
					$childFirst.find('.js-form-control').prop('disabled',false);
					 CKF.notify({
						type: 'get-use-coupon-result',
					 	data: $couponSelect.find('option:selected').val()
					 });
				} else {
					$childFirst.find('.js-form-control').prop('disabled',true);

					 CKF.notify({
					 	type: 'get-use-coupon-result',
					 	data: ''
					 });
				}
			}

			function loadOptionsSecond() {
				if ($childSecond.hasClass('active')) {
					$childSecond.find('.js-form-control').prop('disabled',false);
				} else {
					$childSecond.find('.js-form-control').prop('disabled',true);
				}
			}
		}
	};
})();