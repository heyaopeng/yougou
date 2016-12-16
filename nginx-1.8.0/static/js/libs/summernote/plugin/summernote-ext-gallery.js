(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		factory(window.jQuery);
	}
}(function($) {

	var tmpl = $.summernote.renderer.getTemplate();

	var DEFAULT_IMG_PATH = '/images/default_img.jpg';
	function uploadLocalImage() {
		//Here is new code with 'jquery.form.js';
		var options = {
			type: "POST",
			url: '/duobao-product-web/doUploadImage.do',
			cache: false,
			contentType: false,
			processData: false,
			success: function(url) {
				$("#summernote").summernote("insertImage", url, url);
			},
			error: function() {
				alert('Error!!!');
			}
		};
		$('#add-product-form').ajaxSubmit(options);
		return false;
	}

	function genGalleryList(data) {
		var html = '';
		if (data.length) {
			for (var i = 0; i < data.length; i++) {
				if (data[i].folder) {
					html += '<li>\n' +
						'<div class="gallery-holder gallery-folder" data-aid="' + data[i].id + '" data-pid="' + data[i].parentId + '" data-ppid="' + data[i].parentParentId + '">\n' +
						'<span>' + data[i].name + '</span>\n' +
						'<img src="' + (data[i].path === '' ? '/images/default_img.jpg' : data[i].path) + '" alt="">\n' +
						'</div>\n' +
						'</li>\n';
				} else {
					html += '<li>\n' +
						'<div class="gallery-holder">\n' +
						'<img src="' + data[i].path + '" alt="" title="' + data[i].name + '">\n' +
						'</div>\n' +
						'</li>\n';
				}
			}
		} else {
			html = '<div><h3>No Image In Gallery Yet</h3><a href="/cooka-store-web/imageZone" class="btn btn-primary" target="_blank">Go to upload</a></div>';
		}

		return html;
	}

	$('#mul-confirm').on('click', function() {
		var _modal = $(this).closest('.modal');
		$('#summernote').summernote('focus');

		// from pc
		if ($('#mul-choosed-match').hasClass('hide')) {
			uploadLocalImage();
		}
		// from gallery
		else {
			$('#mul-chosen-imgs').find('.mul-pic').each(function (index, elem) {
				var $img = $(elem);
				var src = $img.prop('src');
				console.log(src);
				// $("#summernote").summernote("insertImage", src, src);
				$("#summernote").summernote("insertNode", $('<div><img src="'+src+'"></div>')[0]);
			});
		}

	});

	$('#mul-pc-choose').on('click', function() {
		$('#mul-pc-file').trigger('click');
	});

	$('#mul-nav').on('show.bs.tab', function (e) {
		$('#pc-file').val('');
		$('#mul-pc-file').val('');
		if (e.target.href.indexOf('#mul-pc') !== -1) {
			$('#mul-choosed-match').addClass('hide');
			$('#pc-choosed-match').removeClass('hide');
		}
		else {
			$('#pc-choosed-match').addClass('hide');
			$('#mul-choosed-match').removeClass('hide');
		}
	});

	$('#mul-pc-file').on('change', function(e) {
		if (this.files && this.files[0]) {
			var file = this.files[0];
			if (!/(png|jpg|jpeg|gif|bmp|tif|webp)$/i.test(file.name)) {
				alert('You should choose a image file! (png,jpg,jpeg,gif,bmp,tif,webp)');
				$('#mul-pc-file').val('');
				return;
			}
			if (parseInt(file.size) >= 2 * 1024 * 1024) {
				alert('File should be smaller than 2MB!');
				$('#mul-pc-file').val('');
				return;
			}

			var reader = new FileReader();

			reader.onload = function(e) {
				//$('#mul-pc-match-preview').prop('src', e.target.result);
				$('#pc-chosen-imgs').html('<img src="' + e.target.result +'" width="100">');
			};

			reader.readAsDataURL(this.files[0]);
		}
	});

	$('.mul-gallery-block').on('click', '.gallery-holder', function() {
		var _this = $(this);
		// is img
		if (!_this.hasClass('gallery-folder')) {
			var $this = $(this);
			var clickSrc = $this.find('img').prop('src');
			var $mulPics = $('#mul-chosen-imgs').find('.mul-pic');
			var isExist = false;
			$mulPics.each(function (index, elem) {
				if (clickSrc === $(elem).prop('src')) {
					isExist = true;
					return false;
				}
			});
			if (isExist) {
				return;
			}
			$('#mul-chosen-imgs').append(
				'<div class="mul-img-item">' +
					'<div class="mul-img-wrapper">' +
						'<img src="' + clickSrc +'" class="mul-pic">' +
					'</div>' +
					'<span class="glyphicon glyphicon-remove" title="remove"></span>' +
					'<span class="glyphicon glyphicon-arrow-left" title="move left"></span>' +
					'<span class="glyphicon glyphicon-arrow-right" title="move right"></span>' +
				'</div>'
			);
		}
		// is folder
		else {
			var pid = _this.data('pid');

			var aid = _this.data('aid');
			var d = 'albumId=' + aid;

		}
	});

	$('#mul-chosen-imgs').on('click', '.glyphicon', function () {
		var $this = $(this);
		var $item = $this.closest('.mul-img-item');
		if ($this.hasClass('glyphicon-remove')) {
			$item.remove();
		}
		else if ($this.hasClass('glyphicon-arrow-left')) {
			if ($item.prev().length) {
				$item.prev().before($item);
			}
		}
		else if ($this.hasClass('glyphicon-arrow-right')) {
			if ($item.next().length) {
				$item.next().after($item);
			}
		}
	});





	$.summernote.addPlugin({
		name: 'gallery',
		buttons: {
			gallery: function(lang, options) {
				return tmpl.iconButton(options.iconPrefix + 'picture-o', {
					event: 'gallery',
					title: 'insert a image',
					value: '#mul-img-modal',
					hide: true
				});
			}
		},
		events: {
			gallery: function(event, editor, layoutInfo, value) {
				var $editable = layoutInfo.editable();

				var $mModal = $(value);
				$mModal.modal('show');
				$('#mul-chosen-imgs').empty();

				$mModal.off('shown.bs.modal').on('shown.bs.modal', function () {
					$('#mul-pc-match-preview').prop('src', DEFAULT_IMG_PATH);
					$('#mul-pc-file').val('');
					$('#mul-choose-gallery').trigger('change');
				});
			}
		}
	});
}));