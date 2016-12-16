$('.single-del').on('click', function (e) {
	e.preventDefault();

	var $this = $(this).closest('tr');
	if (window.confirm('会删除包括此广告位下所有的广告组和广告，确定删除？')) {
		var adId = $this.data('info').id;
		var data = [];
		data.push(adId);
		$.ajax({
			type: "post",
	        url: 'delAdPositions',
	        data: {
                "datas": data
            },
			success: function (ret) {
				if(ret==="delSuccess"){
					$this.remove();
				}else if(ret==="adActive"){
					alert("此广告位下有激活的广告，请先禁用广告！");
				}
			}
		});
	}

});
$('.batch-del').on('click', function (e) {
	e.preventDefault();
	if($('.check-item:checked').length===0){
		alert('Please check items');
	}
	else{			
		if (window.confirm('会删除包括此广告位下所有的广告组和广告，确定删除？')) {		
			var data = [];
			$('.check-item:checked').each(function(index, el) {
				var $el = $(el).closest('tr');
				var adId = $el.data('info').id;
				data.push(adId);
			});
			$.ajax({
				type: "post",
		        url: 'delAdPositions',
	        	data: {
	                "datas": data
	            },
				success: function (ret) {
					if(ret==="delSuccess"){
						$('.check-item:checked').closest('tr').remove();
					}else if(ret==="adActive"){
						alert("删除的广告位有激活的广告，请先禁用广告！");
					}
				}
			});
		}
	}
});