require('./libs/bootstrap.min.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');
require('./ck_sidebar.js');
$(document).ready(function () {
	$('.cancel-reason').change(function() {
		if($('#others').is(':checked')){
			$('.text-others').removeClass('hidden');
		}
		else{
			$('.text-others').addClass('hidden');
		}
	});
});
		