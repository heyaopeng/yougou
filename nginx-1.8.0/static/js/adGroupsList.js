$('.single-del').on('click', function (e) {
	e.preventDefault();

	var $this = $(this).closest('tr');
	if (window.confirm('会删除包括此广告组下所有的广告，确定删除？')) {
		var adId = $this.attr('data-group-id');
		var data = [];
		data.push(adId);
		$.ajax({
			type: "post",
	        url: 'delAdGroups',
	        data: {
                "datas": data
            },
			success: function (ret) {
				if(ret==="delSuccess"){
					$this.remove();
				}else if(ret==="adActive"){
					alert("此广告组下有激活的广告，请先禁用广告");
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
		if (window.confirm('会删除包括广告组的广告，确定删除？')) {		
			var data = [];
			$('.check-item:checked').each(function(index, el) {
				var $el = $(el).closest('tr');
				var adId = $el.attr('data-group-id');
				data.push(adId);
			});
			$.ajax({
				type: "post",
		        url: 'delAdGroups',
		        data: {
	                "datas": data
	            },
				success: function (ret) {
					if(ret==="delSuccess"){
						$('.check-item:checked').closest('tr').remove();
					}else if(ret==="adActive"){
						alert("删除的广告组中有激活的广告，请先禁用广告！");
					}else if(ret==="adGroupDefault"){
						alert("删除的广告组中有默认的广告组，禁止删除！");
					}
					
				}
			});
		}
	}
});