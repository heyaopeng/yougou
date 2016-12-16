/* main.js */
$(document).ready(function() {
	$('#addToFav').on('hide.bs.modal', function() {
		$('#addToFav').find('.add-success').hide();
		$('#addToFav').find('.add-exist').hide();
		$('#addToFav').find('.add-nologin').hide();
	});
	$('#addToCart').on('hide.bs.modal', function() {
		$('#addToCart').find('.add-success').hide();
		$('#addToCart').find('.add-fail').hide();
	});
	$('#favor-pro-link').on('click', function() {
		$("[data-toggle='popover']").popover();
		var collect = {};
		item = $(this);
		$form = item.closest('form');
		$proInfo = $form.siblings('.product-info');
		collect['productId'] = $form.find('input[name="productId"]').val();
		collect['title'] = $proInfo.find('.product-title').text();
		collect['imageUrl'] = $form.closest('.row').find('.zoom-img').attr("src");
		var price = $proInfo.find('.price-row').data('cost').split(' ');
		collect['price'] = price[price.length - 1];
		console.log(JSON.stringify(collect));
		$.ajax({
			type: "post",
			url: "/cooka-productDetail-web/addProToFavourite.do",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(collect),
			dataType: "html",
			async: true,
			success: function(data) {
				console.log((typeof data) + "!!s");
				if (data === "success") {
					console.log("SUCCESS");
					$('#addToFav').find('.add-success').show();
				} else if (data === "isExist") {
					console.log("ISEXITST");
					$('#addToFav').find('.add-exist').show();
				} else if (data === "nologin") {
					console.log("NOLOGIN");
					$('#addToFav').find('.add-nologin').show();
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest.status);
			}
		});
	});
	$('#favor-store-link').on('click', function() {
		var collect = {};
		item = $(this);
		$parent = item.closest('.row').prev();
		$panelBody = item.closest('.panel-body');
		$form = $parent.find('form');
		$proInfo = $parent.find('.product-info');
		collect['storeId'] = $form.find('input[name="storeId"]').val();
		collect['storeName'] = $panelBody.find('a[data-name]').data('name');
		collect['storeLogo'] = $panelBody.find('#store-logo').attr("src");
		console.log(JSON.stringify(collect));
		$.ajax({
			type: "post",
			url: "/cooka-productDetail-web/addStoreToFavourite.do",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(collect),
			dataType: "html",
			async: true,
			success: function(data) {
				console.log(typeof data + "dsfds");
				if (data == "success") {
					$('favor-pro-link').data('content', "gg");
				} else if (data == "isExist") {
					$('favor-pro-link').data('content', "bb");
				} else if (data == "nologin") {
					$('favor-pro-link').data('content', "hh");
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest.status);
			},
		});
	});
});