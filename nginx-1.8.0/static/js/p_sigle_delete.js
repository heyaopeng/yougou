(function($) {
	$.fn.sigleDelete = function () {
		return this.each(function (index, element) {
			var $that=$(element);
			var $single=$that.find('.p-delete-content');
			var modalName= $single.data('modal');
			var $yesClick= $('div.'+modalName);
			var $modBodyText=$yesClick.find('.p-modal-content');
			var config=$single.data('config');
			$that.on('click', '.p-sub-delete', function () {
				var $deleteOneGood = $(this);
				$modBodyText.text(config.messagePrev+' '+config.messageAfter);
				$yesClick.modal('show');
				/*点击确定就删除该货品*/
				$that.on('click', 'button.p-ensure-delete', function () {
					var sinDelId=$deleteOneGood.parents('div.p-sub-block').data('del-id');
	
					$.post("/cooka-user-web/center/deletefavouriteProduct.do","proId="+sinDelId, function(data){
						console.log(data)
						if(data == "success"){
							$deleteOneGood.parents('div.p-sub-block').remove();
							var favLength=$single.find('div.p-sub-block').length;
							if(favLength<=0) {
								$that.find('.p-empty-tip').removeClass('hide');
								$that.find('.p-select-area').addClass('hide');
							}
						}else{
						}
						
		            }, 'html');

					
				});
			});
		});
	};

})(jQuery);
