require('./libs/bootstrap.min.js');

require('./p_checkbox_group.js');
require('./p_switching_state.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

$(document).ready(function () {
	$('.banner-manage .mwui-switch-btn').switchingState();
	$('.banner-manage .mwui-switch-btn').on('click',function(){
		var bannerId = $(this).attr('id');
		var ipt = $(this).find('input');
		var isActive = ipt.val();
		var dat="bannerId="+bannerId +"&isActive="+isActive;
		$.ajax({
	        url: '/cooka-backend-web/toggleStatus',
	        data: dat,
	    }).then(function(data) {
	        console.log(data);
	    });
	});
	$('.banner-manage .bulk-switching').on('click',function(){
		if($('.banner-manage .banner-item:checked').length!==0){
			$('.banner-manage .banner-item:checked').closest('tr').find('.mwui-switch-btn')
													.trigger('click');
		}
		else{
			alert(__('Please at least choose one item'));
		}
	});
	$('.banner-manage .select-all').on('change',function(){
		$('.banner-manage .banner-item').prop('checked',$(this).prop('checked'));
	});
	$('.banner-manage .banner-del').on('click',function(){
		var $this = $(this);
		var con=confirm(__('Delete the banner chosen'));
		if(con===true){
			var bannerId = $this.data('id');
			var ipt = $this.find('input');
			var dat="bannerId="+bannerId ;
			$.ajax({
		        url: '/cooka-backend-web/doDeleteBackendBanner',
		        data: dat,
		    }).then(function(data) {
		        console.log(data);
		        $this.closest('tr').remove();
		    });
				
		}
	});
	$('.banner-manage .banner-item').each(function(idx,ele){
		$(ele).on('change',function(){
			if($('.banner-manage .banner-item:checked').length===$('.banner-manage .banner-item').length){
				$('.banner-manage .select-all').prop('checked',true);
			}
			else{
				$('.banner-manage .select-all').prop('checked',false);
			}
		});
	});

});