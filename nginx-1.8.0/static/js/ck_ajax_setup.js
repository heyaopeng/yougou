(function($) {
	$.ajaxSetup({
		beforeSend: function(request) {
			request.setRequestHeader('__RequestVerificationToken', $('input[name="xToken"]').val());
		},
		complete: function(XHR) {

			if (parseInt(XHR.status) === 401) {
				var __ = __ || null;
				if (__ !== null && typeof __ === 'function') {
					alert(__('You should sign in first'));
				}
				else {
					alert('You should sign in first!');
				}
				window.location.reload();
			}
		}
	});
})(jQuery);