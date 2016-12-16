var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE');

require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');

// load login module
require('./login_module.js');

require('./libs/validator.min.js');
require('./libs/jquery.zoom.min.js');
require('./p_switch_figure.js');
require('./p_input_spinner.js');
require('./p_star_load.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

$(document).ready(function() {
	$('#pp-desc').load('/cooka-productDetail-web/getProductRelavantFile?url=' + $('#pp-desc').data('url'));
	$('#pp-feature').load('/cooka-productDetail-web/getProductRelavantFile?url=' + $('#pp-feature').data('url'));
	$('.product-zoom').zoom({
		target: '.zoom-place',
		magnify: 1
	});
	$('.product-figure').swithFigure();
	$('.input-spinner').inputSpinner().on('spin.change', function() {
			var totalPiece = 0;
			$('.input-spinner').each(function() {
				totalPiece += Number($(this).find('.spin-num').val());
			});
			$('#total-piece').text(totalPiece);
			var rangeArr = $('.quantity-row').data('range').toString().split(' ');
			var costArr = $('.price-row').data('cost').toString().split(' ');
			var singlePrice = 0;
			var saveInter = {
				getamountlimit: rangeArr[0].toString(),
				getPrices: costArr[0].toString()
			};
			for (var i = rangeArr.length - 1; i >= 0; i--) {
				if (totalPiece >= rangeArr[i]) {
					singlePrice = costArr[i];
					saveInter['getamountlimit'] = rangeArr[i].toString();
					saveInter['getPrices'] = singlePrice.toString();
					$('#save-interval').data('interval', saveInter);
					break;
				}
			}
			if (singlePrice === 0) {
				saveInter['getamountlimit'] = rangeArr[0].toString();
				saveInter['getPrices'] = costArr[0].toString();
				$('#save-interval').data('interval', saveInter);
				$('#cost-money').text('0');
				$('#b-buy-now').prop('disabled', true);
				$('#b-add-cart').prop('disabled', true);
			} else {
				// precise calculation
				$('#cost-money').text((singlePrice * 100) * (totalPiece * 100) / Math.pow(100, 2));
				$('#b-buy-now').prop('disabled', false);
				$('#b-add-cart').prop('disabled', false);
			}
			// add class 'has' or not
			var $tabPane = $(this).closest('div.tab-pane');
			var tabId = $tabPane.prop('id');
			var addHas = false;
			$tabPane.find('input[type="text"].spin-num').each(function(index, elem) {
				var $elem = $(elem);
				var elemValue = Number($elem.val());
				// not a number
				if (isNaN(elemValue)) {
					return false;
				}
				// great than 0
				else if (elemValue > 0) {
					addHas = true;
					return false;
				}
			});
			if (addHas) {
				$('.type-thumbnail-list').find('a[href="#' + tabId + '"]').parent('li').addClass('has');
			} else {
				$('.type-thumbnail-list').find('a[href="#' + tabId + '"]').parent('li').removeClass('has');
			}
		})
		.on('spin.wrong', function() {
			$('#cost-money').text(__('Wrong quantity'));
			$('#total-piece').text('');
		}).trigger('spin.change');
	$('#type-thumbnail').on('click', '.type-thumb-item', function(e) {
		e.preventDefault();
		var newSrc = $(this).prop('src');
		$('#prod-figure').find('.switch-main').attr('src', newSrc).end().find('.zoomImg').attr('src', newSrc);
	});
	$('#b-add-cart').on('click', function(e) {
		e.preventDefault();
		var $this = $(this);
		var $form = $this.closest('form');
		var $inputSpin = $form.find('div.input-spinner');
		var data = {};
		data['storeId'] = $form.find('input[name="storeId"]').val();
		data['productId'] = $form.find('input[name="productId"]').val();
		data['combination'] = [];

		$inputSpin.each(function(index, elem) {
			var $elem = $(elem);
			var aComb = {};
			aComb['combinationId'] = $.trim($elem.find(
				'[name="combination[' + index + '].combinationId"]').val());
			aComb['userAmount'] = $.trim($elem.find(
				'[name="combination[' + index + '].getamount"]').val());
			if (aComb['userAmount'] !== '0') {
				data['combination'].push(aComb);
			}
		});
		$.ajax({
			type: "post",
			/*beforeSend: function(request) {
                request.setRequestHeader("__RequestVerificationToken", $form.find('input[name="xToken"]').val());
            },*/
			url: "/cooka-productDetail-web/addToUserCart.do",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(data),
			dataType: "html",
			async: true,
			success: function(data) {
				if (data == "success") {
					$('.add-fail').hide();
					$('.add-success').show();
				} else {
					$('.add-success').hide();
					$('.add-fail').show();
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest.status);
			},
		});
	});

	function buildData() {
		var data = $.parseJSON($('#ps-info').data('psinfo'));
		var combine = [];
		var interval = $('#save-interval').data('interval');
		data['productPrices'].getamountlimit = interval.getamountlimit;
		data['productPrices'].getPrices = interval.getPrices;
		data['totleprice'] = $('#cost-money').text();
		$('.buy-count').each(function(index, elem) {
			var $elem = $(elem);
			var perComb = {};
			perComb['combinationId'] = $elem.data('comb').toString();
			perComb['color'] = $('a.pick-link[href="#' + $elem.closest('div.tab-pane').prop('id') + '"]').data('color');
			perComb['size'] = $elem.data('size').toString();
			perComb['getamount'] = $elem.val().toString();
			perComb['getcomprice'] = interval.getPrices;
			combine.push(perComb);
		});
		data['combination'] = combine;
		return data;
	}
	$('.scores-load').starLoad();
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
		$.ajax({
			type: "post",
			url: "/cooka-productDetail-web/addProToFavourite.do",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(collect),
			dataType: "html",
			async: true,
			success: function(data) {
				if (data === "success") {
					$('#addToFav').find('.add-success').show();
				} else if (data === "isExist") {
					$('#addToFav').find('.add-exist').show();
				} else if (data === "nologin") {
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
		$.ajax({
			type: "post",
			url: "/cooka-productDetail-web/addStoreToFavourite.do",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(collect),
			dataType: "html",
			async: true,
			success: function(data) {
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

	$('#b-buy-now').on('click', function(){
		console.log("click buy now ");
		event.preventDefault();
		$.ajax({
			url:"/duobao-user-web/isLogin",
			type: 'GET',
			success: function(result) {
				console.log(result);
				if(result =="false"){
					loadLoginModal();
					console.log('has not logined, run the modal.');
				}else{
					console.log("isLogin");
					$('#b-buy-now').closest('form')[0].submit();
					//return true;
				}
			}
		});
	});

	function loadLoginModal() {
		$('#loginModal').modal({
            show: true,
            backdrop: 'static',
            keyboard: false,
        });
	}
	 $('.scores-load').starLoad();
});