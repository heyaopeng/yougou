(function($) {
	$.fn.setFileAccept = function(accept) {
		var regAccept = new RegExp(accept.join('$|'));
		return this.each(function(index, elem) {
			var $elem = $(elem);
			var prevVal = $elem.val();
			$elem.on('change', function(e) {
				var $this = $(this);
				var fileVal = $this.val();
				if (fileVal !== '' && !regAccept.test(fileVal)) {
					alert('CAN NOT CHOOSE THIS FILE');
					$elem.replaceWith($elem = $elem.clone(true));
				}
			});
		});
	};
})(jQuery);