(function ($) {
	$.fn.checkboxGroup = function () {
		var HELP_TEXT = '请至少选择一个';
		return this.each(function (index, element) {
			var $ele = $(element);
			var $helpBlock = $ele.children('.help-block');
			var $targetForm = $($(this).data('target'));

			$ele.find('input[type="checkbox"]').on('change', function () {
				var $checkedItem = $ele.find('input[type="checkbox"]:checked');
				if ($checkedItem.length === 0) {
					$ele.addClass('has-error');
					$helpBlock.text(HELP_TEXT);
				}
				else {
					$ele.removeClass('has-error');
					$helpBlock.empty();
				}
			});

			$targetForm.on('submit', function (e) {
				var $checkedItem = $ele.find('input[type="checkbox"]:checked');
				if ($checkedItem.length > 0) {
					$helpBlock.empty();
					return true;
				}
				else {
					$ele.addClass('has-error');
					$helpBlock.text(HELP_TEXT);
					return false;
				}
			});
		});
	};
})(jQuery);

$(document).ready(function (){
	$('.checkbox-group').checkboxGroup();
});