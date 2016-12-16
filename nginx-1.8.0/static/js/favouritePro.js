require('./libs/bootstrap.min.js');
require('./ck_sidebar.js');
require('./ck_page.js');
require('./p_batch_delete.js');
require('./p_collect_all.js');
require('./p_sigle_delete.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');
$(document).ready(function() {
	var $collectImg = $('div.collect-img');
	$collectImg.collectAll();
	var $mainbox = $('.main-box');
	$mainbox.batchDelete();
	$mainbox.sigleDelete();

	
	/*添加到购物车
	$('#addToCart').on('hide.bs.modal', function() {
		$('#addToCart').find('.add-success').hide();
		$('#addToCart').find('.add-exist').hide();		
	});
	$('.add-cart-btn').on('click',function(){
		$("[data-toggle='popover']").popover();	
		$this=$(this);
		var proId = $this.closest('.img-block').data('del-id');		
				console.log(proId);
		$.post("","proId="+proId, function(data){			
			if(data == "success"){
				$('#addToCart').find('.add-success').show();
			}
				else if (data === "isExist") {				
					$('#addToCart').find('.add-exist').show();
				} 
        }, 'html');		
	});*/
});