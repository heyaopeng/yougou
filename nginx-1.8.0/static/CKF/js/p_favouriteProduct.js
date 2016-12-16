var CKF = require('./CKF.js');
require('../less/favourite-product.less');
require('bootstrap/js/modal.js');
// other dependencies ...

module.exports = (function () {
    var moduleName = 'favouriteProduct';
    var module = CKF.create(moduleName,true);

    return {
        init: function () {
            var $subCheckbox = module.find('.js-sub-checkbox');
            var $parCheckbox = module.find('.js-par-checkbox');

            var $subSet=module.find('.js-pro-item');

            selectAll();
            batchDelete();

            module.find('.js-single-cart').bind('focus',function() {
                if(this.blur) {this.blur();}
            });
            
            var favLength=module.find('.js-pro-item').length;
            if(favLength<=0) {
                module.find('.js-empty').removeClass('hide');
                module.find('.js-product-content').addClass('hide');
            }
            
            //single delete
          
            module.on('click','.js-single-delete',function(){
                var $this = $(this);
                var $par = $this.closest('.js-pro-item');
                var id=$par.data('id');
                if(confirm(__('Are you sure to delete?'))) {
                    $.post('/cooka-user-web/center/deletefavouriteProduct.do', 'proId=' + id, function (data) {
                        if (data === 'success') {
                            $par.remove();
                            var favLength=module.find('.js-pro-item').length;
                             if(favLength<=0) {
                                 module.find('.js-empty').removeClass('hide');
                                 module.find('.js-product-content').addClass('hide');
                             }
                        }
                        else {
                        }
                    }, 'html');
                }
            });

            module.on('click','.js-single-cart',function(){
        		var $this = $(this);
        		var id = $this.data('value');
                
        		$.ajax({
        			type: "post",
        			url: "/cooka-user-web/center/getProductDetail?productId="+id,
        			success: function(data) {
        				$('.shopping-modal').html(data);
        				$('#shopping-modal').modal('show');
        				
        				$('.js-cancel').click(function(){
        					$('#shopping-modal').modal('hide');
        				});
        				
                        CKF.notify({
                            type: 'rebuild-event',
                            data: true
                        });
        			}
        		});       	
        	});
         
        	
            // checkbox control
            function selectAll() {
                $parCheckbox.change(function(){
                    var $this = $(this);
                    $subCheckbox.prop('checked', $this.prop('checked'));
                    $parCheckbox.prop('checked', $this.prop('checked'));
                });

                $subCheckbox.change(function(){
                    var thisState = $(this).prop('checked');
                    if (!thisState) {
                        $parCheckbox.prop('checked', false);
                    }
                    else {
                        var allState = true;
                        $subCheckbox.each(function () {
                            var $this = $(this);
                            var indexState = $this.prop('checked');
                            if (!indexState) {
                                allState = false;
                                return false;
                            }
                        });
                        if (allState)
                            $parCheckbox.prop('checked', true);
                    }
                });
            }

            function judgeEmpty() {
                var array = [];
                $subSet.each(function(){
                    var $this=$(this);
                    var selected=$this.find('.js-sub-checkbox').prop('checked');
                    if(selected){
                        var Id=$this.data('id');
                        array.push(Id);
                    }
                });
                if(array.length===0)
                    alert(__('No product has been chosen!'));
                return array;
            }

            //batch delete
            function batchDelete() {
                module.on('click','.js-batch-remove',function(){
                    var array = judgeEmpty();
                    if(array.length){
                    	
                        if(confirm(__('Are you sure to delete?'))){
                          
                            //your batch delete ajax
                            $.post('/cooka-user-web/center/deleteSomefavPros.do',{"delArr":array}, function(data){
                                if(data === 'success'){
                                    /*$.each(array,function(){
                                        var $deleteDom=module.find('[data-id="'+this+'"]');
                                        $deleteDom.remove();
                                    });*/
                                    window.location.reload();
                                    /*var favLength=module.find('.js-pro-item').length;
                                    if(favLength<=0) {
                                        module.find('.js-empty').removeClass('hide');
                                        module.find('.js-product-content').addClass('hide');
                                    }*/
                                }else{
                                }
                            }, 'html');
                        }
                    }

                });
            }
        }
    };
})();