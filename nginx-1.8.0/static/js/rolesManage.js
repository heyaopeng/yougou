//require('./js/libs/jquery-1.11.2.min.js') // you should not see me
require('./libs/bootstrap.min.js');
require('./ck_page.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

$(document).ready(function (){
    $('.role-admin').on('click','.delete-click',function(){
        var $parent = $(this).closest('tr');
        var roleId = $parent.data('id');
        $('#roleModal').modal('show');
        $('.sure-btn').click(function(){
            $.ajax({
                type: "POST",
                url: "/cooka-backend-web/deleRole",
                data:"roleId="+roleId,
                success: function(data){
                    if(data == "success"){
                        //成功
                    	console.log("success");
                    	 
                              $('#roleModal').modal('hide');
                              $parent.remove();                  
                    }else{
                    	console.log("fail");//失败
                    	}
                }
            });
        });
     });
 
    
    $('.action-btn').click(function(){
    	$this = $(this);
    	var roleId = $this.closest('tr').data('id');
    	var status = $this.hasClass('urp-enable');
    	if(status)
    		var isAble=2;
    	else 
    		var isAble=1;
    	
    	$.ajax({
            type: "POST",
            url: "/cooka-backend-web/disableRole",
            data:"roleId="+roleId+"&isAble="+isAble,
            success: function(data){
                if(data == "success"){
                    //成功
                	console.log("success");
                	$this.siblings('button').removeClass('hide');
            		$this.addClass('hide');                	
                }else{
                	console.log("fail");
                	//失败
                }
            }
        });
    });
    
    
});