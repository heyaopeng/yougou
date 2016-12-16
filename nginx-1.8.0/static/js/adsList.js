$('.single-mgr').on('click', '.single-action', function (e) {
	e.preventDefault();

	function refreshPage(){ 
		window.location.reload(); 
	};
	var action = {
		sEnable: function () {
			var $this = $(this);
			var $tr = $this.closest('tr');
			alert("请编辑广告设置好时间，耐心等待30s，系统自动激活");
			//30s刷新页面
			window.setTimeout(refreshPage,30000);
		},

		sDisable: function () {
			var $this = $(this);
			if (window.confirm('禁用广告会初始化时间，确定禁用？')) {
				var adId = $this.data('id');
				var data = [];
				data.push(adId);
				$.ajax({
					type: "post",
			        url: 'closeAd',
			        data: {
	                    "datas": data
	                },
					success: function (ret) {
						console.log(ret);
						if(ret==="closeSuccess"){
							window.location.reload(true);
						}
					}
				});
			}
		},

		sDelete: function () {
			var $this = $(this);
			var e = $this.data('enable');
			if (e) {
				alert("You should disable advertisement first");	
			}else {
				if (window.confirm('Are you sure to delete?')) {
					var adId = $this.data('id');
					var data = [];
					data.push(adId);
					$.ajax({
						type: "post",
				        url: 'delAds',
				        data: {
	                        "datas": data
	                    },
						success: function (ret) {
							if(ret==="delSuccess"){
								$this.closest('tr').remove();
							}else if(ret==="adActive"){
								alert("此广告为激活的广告，请先禁用广告");
							}
						}
					});
				}
			}
		},
		sEdit: function () {
			 var $this = $(this);
			 var adId = $this.data('id');
			 var e = $this.data('enable');
			 if (e) {
			 	alert("You should disable advertisement first");	
			 }else {
				window.location.href=$this.attr('href');
			 }
		}
	};

	function updateMenu (elem) {
		var dText = elem.text();
		elem
		.closest('li').addClass('disabled')
		.siblings('li').removeClass('disabled')
		.end()
		.closest('.single-mgr').find('[data-toggle="dropdown"]').html(dText + '\n<span class="caret"></span>');
	}

	var $this = $(this);
	var dAction = $this.data('action');

	if (!$this.parent('li').hasClass('disabled')) {
		action[dAction].call(this);
	}
});
$('.batch-del').on('click', function (e) {
	e.preventDefault();
	if($('.check-item:checked').length===0){
		alert('Please check items');
	}else{
		if (window.confirm('Are you sure to delete?')) {		
			var data = [];
			$('.check-item:checked').each(function(index, el) {
				var $el = $(el);
				var adId = $el.closest('tr').attr('data-ad-id');
				data.push(adId);
			});
			$.ajax({
				type: "post",
		        url: 'delAds',
		        data: {
	                "datas": data
	            },
				success: function (ret) {
					if(ret==="delSuccess"){
						$('.check-item:checked').closest('tr').remove();
					}else if(ret==="adActive"){
						alert("删除的广告有激活的广告，请先禁用激活的广告");
					}
				}
			});
		}
	}
});