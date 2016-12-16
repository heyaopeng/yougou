(function($) {
	/*批量删除货品*/
	$.fn.batchDelete = function (options) {
		return this.each(function (index, element) {
			var $that=$(element);
			var $batch=$that.find('.p-select-area');
			var config = $batch.data('config');
			var $yesClick =$batch.find('.p-delete-modal');
			var $modBodyText=$yesClick.find('.modal-body .p-modal-content');
			$that.on('click','.p-delete-icon',function(){
				var deleteLeng=0;
				var $deleteSet=$batch.find('.p-sub-block');
				$.each($deleteSet,function(){
					var $imgBlock=$(this);
					var selected=$imgBlock.find('.p-sub-checkbox').prop('checked');
					if(selected){
						deleteLeng++;
					}
				});
				if(deleteLeng>0){
					$modBodyText.text(config.messagePrev+' '+deleteLeng+' '+config.messageAfter);
					$yesClick.modal('show');
				}else if(deleteLeng===0) {
					$modBodyText.text(config.messagePlease);
					$yesClick.modal('show');
				}

				$that.on('click', 'button.p-ensure-delete', function () {
					var delArr = [];
                    $.each($deleteSet,function(){
                        var $imgBlock=$(this);                        
                        var selected=$imgBlock.find('.p-sub-checkbox').prop('checked');
                        if(selected){
                            /*预留接口*/                        	
                            var delId=$imgBlock.data('del-id');
                            delArr.push(delId);
                        }
                    });
                   if(delArr.length!=0){                	                
                	   $.post("/cooka-user-web/center/deleteSomefavPros.do", {delArr:delArr}, function(data){
                        if(data == "success"){                       	                        		                 	                      		
                        		 $.each(delArr,function(){                           	
	                                var $deleteDom=$batch.find('[data-del-id="'+this+'"]');
	                                    $deleteDom.remove();
                            	});                        
                                                       
                            var favLength=$batch.find('.p-sub-block').length;
                            if(favLength<=0) {
                                $that.find('.p-empty-tip').removeClass('hide');
                                $that.find('.p-select-area').addClass('hide');
                            }
                        }else{                        	
                        }
                    }, 'html');   
                   }                                     
                });
			});
		});
	};
})(jQuery);