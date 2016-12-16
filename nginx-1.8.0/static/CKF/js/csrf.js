(function($) {
	$.ajaxSetup({
		beforeSend: function(XHR, settings) {
			// console.info(':: csrf check :: ' + settings.type + ' -> ' + settings.url);
			XHR.setRequestHeader('__RequestVerificationToken', $('input[name="xToken"]').val());
		},
		complete: function(XHR) {
			if (parseInt(XHR.status) === 401) {
				alert(__('You should sign in first'));
				// console.log('XHR:', XHR);
				// window.location.href = '/cooka-user-web/login';
			}
		}
	});
})(jQuery);