var CKF = require('./CKF.js');

require('../less/pro-detail-info-size.less');   

module.exports = (function () {
    var moduleName = 'proDetailSize';
    var module = CKF.create(moduleName,true);

    function colorChosen($elem){
        var tabId = $elem.attr('id');
        var $thisPiece = 0;

        $elem.find('.js-quantity').each(function(idx,ele){
            $thisPiece += parseInt($(ele).val());
        });
        CKF.notify({
            type: 'show-color',
            data: {
                totalPiece: $thisPiece,
                tabId: tabId
            }
        });
    }

    function buildEvent(data) {
        if(data){
            module = CKF.rebuild(moduleName);
        }
        if(module!==null){
	        module.each(function (index, elem) {
		        var $ele = $(elem);
		        var $table = $ele.find('.js-table');
		        var totalPiece = 0;
	            var $iconDown = $ele.find('.js-down');
	            var $iconUp = $ele.find('.js-up');
	            var $iconGroup=$('.js-icon-group');

	            $iconDown.on('click', function (e) {
	                e.preventDefault();	
	                if(!$ele.is(":animated")) {	                	
		                $iconUp.toggleClass('hidden');
		                $iconDown.toggleClass('hidden');
	                	$ele.animate({maxHeight:"1200px"});	
	            	}
	                // $slideEle.show();
	            });
	            $ele.find('.input-group').mouseover(function(){
	            	$(this).addClass('hover').stop();
	            });
	            $ele.find('.input-group').mouseleave(function(){
	            	$(this).removeClass('hover').stop();
	            });
	            // $ele.find('.input-group .btn').mousedown(function(){
	            // 	$(this).closest('.input-group').addClass('active');
	            // });
	            $ele.find('.input-group .input-group-btn').mousedown(function(){
	            	var $this = $(this);
	            	if(!$this.find('button').prop('disabled')){	            		
	            		$this.addClass('active');
	            	}
	            });
	            $ele.find('.input-group input').focus(function(){
	            	$(this).closest('.input-group').addClass('active');
	            });
	            $ele.find('.input-group .input-group-btn').on('mouseup',function(e){
	            	$(this).removeClass('active');
	            });
	            $ele.find('.input-group input').on('blur',function(e){
	            	$(this).closest('.input-group').removeClass('hover').removeClass('active');
	            });

	            $iconUp.on('click', function (e) {
	                e.preventDefault();
	                if(!$ele.is(":animated")) {	
		                $ele.animate({maxHeight:"176px"},'fast',function(){			                	
			                $iconUp.toggleClass('hidden');
			                $iconDown.toggleClass('hidden');
		                });
		            }
	                // $slideEle.hide();
	            });
		
		        $table.each(function(idx,ele){
		            var $elem=$(ele);
		            var $tr=$elem.find('tr');
		
		           /* if($tr.length<=3){
		                $iconDown.addClass('hidden');
		            }
		            else{
		                var $slideEle=$elem.find('tr:eq(2)').nextAll();
		                $slideEle.hide();
		            }*/
		            $tr.on('minusPlusGroup.iptChange',function(){
		                colorChosen($elem);
		              /*  $tr.closest('form').formValidation('revalidateField', $tr.find('.f-quantity'));*/
		            });	            
		        }); 
		        if(module.find('.pro-detail-info-pack').length===0){
		        	if($table.eq(0).find('tr').length>4){
		        		$iconGroup.removeClass('hidden');
		        	}
		        	else{
		        		$iconGroup.addClass('hidden');
		        	}
		        }
		        else{
		        	if($table.eq(0).find('tr').length>3){
		        		$iconGroup.removeClass('hidden');
		        	}
		        	else{
		        		$iconGroup.addClass('hidden');
		        	}
		        }
		        

		        $('.pick-link').on('shown.bs.tab', function (e) {
		        	var $this = $(this);
		        	if(module.find('.pro-detail-info-pack').length===0){			        		
					  if($($this.attr('href')).find('tr').length>4){
					  	$iconGroup.removeClass('hidden');
					  }
					  else{				  	
					  	$iconGroup.addClass('hidden');
					  }
		        	}
		        	else{
		        		if($($this.attr('href')).find('tr').length>3){
					  		$iconGroup.removeClass('hidden');
						  }
						  else{				  	
						  	$iconGroup.addClass('hidden');
						  }
		        	}
				});
	        	
	        });
        }
    }

    return {
        init: function () {
            buildEvent();
            CKF.listen({
                'rebuild-event': buildEvent
            }, moduleName);
        }
    };
})();
