//require('./js/libs/jquery-1.11.2.min.js') // you should not see me
require('./libs/bootstrap.min.js');
require('./ck_page.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

$(document).ready(function (){
	$('.juri-admin').on('click','.delete-click',function(){
		var $parent = $(this).closest('tr');
		var permissionId = $parent.data('id');
		$('#juriModal').modal('show');
		$('.sure-btn').click(function(){	
			$.ajax({
                type: "POST",
                url: "/cooka-backend-web/delePermission",
                data:"permissionId="+permissionId,
                success: function(data){
                    if(data == "success"){
                        //成功
                    	console.log("success");
                    	
                			
                			$('#juriModal').modal('hide');
                			$parent.remove();
                		
                    }else{
                    	//失败
                    	console.log("fail");
                    }
                }
            });
		});
		});
	
	$('.action-btn').click(function(){
    	$this = $(this);	
    	var permissionId = $this.closest('tr').data('id');	
    	var status = $this.hasClass('urp-enable');
    	
    	if(status)
    		var isAble=2;
    	else 
    		var isAble=1;
    	$.ajax({
            type: "POST",
            url: "/cooka-backend-web/disablePermission",
            data:"permissionId="+permissionId+"&isAble="+isAble,
            success: function(data){
                if(data == "success"){
                	console.log("success");
                	$this.siblings('button').removeClass('hide');
            		$this.addClass('hide');
                	
                }else{
                	console.log("fail");
                }
            }
        });
    });
});