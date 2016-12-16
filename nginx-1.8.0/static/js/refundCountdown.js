//in backendRefundHandle.vm
require('./libs/jquery.countdown.min.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

$(document).ready(function() {			
	var ts = $('.countdown').text();
	var d = new Date(parseInt(ts) + 7 * 24 * 60 * 60 * 1000);
	$('.countdown').countdown(d, function(event) {
		$(this).html(event.strftime('%D' + __('days') + '%H' + __('hours') + '%M' + __('minutes') + '%S' + __('seconds')));
	});
});