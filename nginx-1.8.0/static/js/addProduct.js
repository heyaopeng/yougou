var galleryPositionId = -1;
var galleryPositionParentId = -1;

if (localStorage.getItem('galleryPositionId')) {
	galleryPositionId = parseInt(localStorage.getItem('galleryPositionId'));
}
if (localStorage.getItem('galleryPositionParentId')) {
	galleryPositionParentId = parseInt(localStorage.getItem('galleryPositionParentId'));
}

$(document).ready(function() {
	function rebuildForm() {
		$('#add-product-form').formValidation('destroy');
		fv();
	}



	$('.req-int').on('change', function() {
		var c = $(this).prop('checked');
		if (c) {
			$('.interval-input:visible').prop('required', true);
		}
	});

	$('.req-int-no').on('change', function() {
		var c = $(this).prop('checked');
		if (c) {
			$('.interval-input:visible').prop('required', false);
		}
	});

	var dt = {
		"titles": [],
		"level": 0,
		"counts": [],
		"names": [],
		"values": {}
	};
	var DEFAULT_IMG_PATH = '/images/default_img.jpg';
	var sidClick = -1;
	var clickMid = null;

	function init(msg) {
		if (msg) {
			$('#add-product-form').formValidation('destroy');
			$('#feature-specification').html(msg);
			fv();
		}
		$('.pro-attr-block').addCustomAttr();
		$('.check-or-add-product-style').checkOrAddProStyle();
	}


	$(document).on('change', '.comb-product-code', function() {
		if (dypfirst) {
			$('.comb-product-code').each(function(index, elem) {
				var $this = $(this);
				var key = $this.data('dy');
				dypdata[key] = $this.val();
			});
			dypfirst = false;
		} else {
			var $this = $(this);
			var key = $this.data('dy');
			dypdata[key] = $this.val();
		}
	});


	function uploadLocalImage(targetId, clickMid) {

		//Here is new code with 'jquery.form.js'
		var options = {
			type: "POST",
			url: '/duobao-product-web/doUploadImage.do',
			cache: false,
			contentType: false,
			processData: false,
			success: function(url) {

				if (targetId && clickMid) {
					$('#' + targetId).val(url);
					$('[data-sid="' + clickMid + '"]').data('spath', url);
				}
				// insert image node into summernote
				else {
					$("#summernote").summernote("insertImage", url, url);
				}
			},
			error: function() {
				alert('Error!!!');
			}
		};
		$('#add-product-form').ajaxSubmit(options);
		return false;
	}



	$('#sale-info-table').on('click', '.batch-fill-btn', function() {
		var _this = $(this);
		var target = _this.data('target');
		var _targetInput = $(target);

		var sameVal = '';

		_targetInput.each(function(index, elem) {
			var _elem = $(elem);
			var eVal = _elem.val();
			if (eVal !== '') {
				sameVal = eVal;
				return false;
			}
		});

		_targetInput.val(sameVal);
		_targetInput.trigger('change');
	});

	$('.match-imgs').on('click', '.btn-choose-match', function() {
		var _this = $(this);
		var _mBlock = _this.closest('.match-block');
		var mPath = _mBlock.find('img').prop('src');

		sidClick = _mBlock.data('mid');

		clickMid = _mBlock.data('mid');

		$('#choosed-img').prop('src', mPath);
		$('#pc-match-preview').prop('src', DEFAULT_IMG_PATH);
	});

	$('#pc-choose').on('click', function() {
		$('#pc-file').trigger('click');
	});

	$('#pc-file').on('change', function(e) {
		if (this.files && this.files[0]) {
			var file = this.files[0];
			if (!/(png|jpg|jpeg|gif|bmp|tif|webp)$/i.test(file.name)) {
				alert('You should choose a image file! (png,jpg,jpeg,gif,bmp,tif,webp)');
				$('#pc-file').val('');
				return;
			}
			if (parseInt(file.size) >= 2 * 1024 * 1024) {
				alert('File should be smaller than 2MB!');
				$('#pc-file').val('');
				return;
			}

			var reader = new FileReader();

			reader.onload = function(e) {
				$('#pc-match-preview').prop('src', e.target.result);
				$('#choosed-img').prop('src', e.target.result);
			};

			reader.readAsDataURL(this.files[0]);
		}
	});

	$('#reset-img').on('click', function() {
		$('#choosed-img').prop('src', DEFAULT_IMG_PATH);
		$('#pc-match-preview').prop('src', DEFAULT_IMG_PATH);
	});

	$('.gallery-block').on('click', '.gallery-holder', function() {
		var _this = $(this);
		// is img
		if (!_this.hasClass('gallery-folder')) {
			var clickSrc = _this.find('img[data-src]').data('src');
			$('#choosed-img').prop('src', clickSrc);
		}
		// is folder
		else {
			var pid = _this.data('pid');

			var aid = _this.data('aid');
			var d = 'albumId=' + aid;

			galleryPositionId = aid;
			localStorage.setItem('galleryPositionId', aid.toString());


		}
	});



	$('#match-img-modal').on('shown.bs.modal', function() {
		$('#pc-file').val('');
		$('#mul-pc-file').val('');
		if (galleryPositionId !== -1) {
			var d = 'albumId=' + galleryPositionId;

		} else {
			$('#choose-gallery').trigger('change');
		}
	});

	// insert confirm click handler
	$('#insert-confirm').on('click', function() {
		var _modal = $(this).closest('.modal');
		var choosedSrc = $('#choosed-img').prop('src');

		if (_modal.hasClass('from-summernote')) {
			$('#summernote').summernote('focus');
			// upload image
			if (choosedSrc.slice(0, 4) === 'data') {
				uploadLocalImage();
			} else {
				$("#summernote").summernote("insertImage", choosedSrc, choosedSrc);
			}
		} else {
			var _midItem = $('.match-block[data-mid="' + clickMid + '"]');

			if (choosedSrc.indexOf('/images/default_img.jpg') > -1) {
				_midItem.find('img').prop('src', DEFAULT_IMG_PATH);
				$('[data-sid="' + clickMid + '"]').data('spath', '');
				_midItem.find('.image-url').val('');
			} else {
				_midItem.find('img').prop('src', choosedSrc);

				if (choosedSrc.slice(0, 4) === 'data') {
					var targetId = _midItem.find('.image-url').prop('id');
					uploadLocalImage(targetId, clickMid);
				} else {
					$('[data-sid="' + clickMid + '"]').data('spath', choosedSrc);
					_midItem.find('.image-url').val(choosedSrc);
				}
			}
		}
	});


	$('.page-group').pageGroup(function() {
		var $this = $(this);
		var actIdx = $this.find('.page-section.active').index();
		$('#add-product-step')
			.find('.active').removeClass('active')
			.end().children('li').eq(actIdx).addClass('active');
	});

	$('#keyword-input').tagsInput();
	$('#price-interval-table').priceInterval();
	$('#summernote').summernote({
		height: 500,
		minHeight: null,
		maxHeight: null,
		toolbar: [
			['style', ['style']],
			['font', ['bold', 'italic', 'underline', 'clear']],
			['fontname', ['fontname']],
			['fontsize', ['fontsize']],
			['color', ['color']],
			['height', ['height']],
			['table', ['table']],
			['insert', ['link', 'hello', 'hr']],
			['view', ['codeview']],
			['misc', ['fullscreen']]
		]
	});
	$('#summernote').on('summernote.change', function(customEvent, contents, $editable) {
		if (contents.length && contents.indexOf('<p><br></p>') !== -1) {
			var c = contents.replace(/(<p><br><\/p>|<div><br><\/div>){2,}/g, '');
			$(this).summernote('code', c);
			$('#summernote').summernote('focus');
		}
	});

	$(document).on('keyup', '.comb-amount', function() {
		var $this = $(this);
		var v = $this.val().replace(/[^\d]/g, '');
		if (v === '') {
			v = '0';
		}
		$this.val(parseInt(v));
	});

	$(document).on('keyup', '.f-product-num', function(e) {
		checkProductExist();
	});
	$(document).on('click', 'li.store-id-li', function(e) {
		checkProductExist();
	});
	$(document).on('keyup', 'input.channel-information', function(e) {
		checkProductExist();
	});
	$(document).on('blur', 'input.channel-information', function(e) {
		checkProductExist();
	});
	$(document).on('change', 'input.channel-radio', function(e) {
		checkProductExist();
	});



	function fv() {
		var lang = 'en_US';
		$('#add-product-form').formValidation({
				framework: 'bootstrap',
				icon: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
				},
				addOns: {
					i18n: {}
				},
				fields: {
					"f-title": {
						selector: '.f-title',
						validators: {
							notEmpty: {
								message: {
									en_US: 'Please enter product title',
									zh_CN: '请输入产品名称'
								}
							},
							stringLength: {
								max: 128,
								message: {
									en_US: 'Title length too long',
									zh_CN: '长度过长'
								}
							}
						}
					},
					"f-cici": {
						selector: '.f-cici',
						validators: {
							notEmpty: {
								message: {
									en_US: 'Please enter information',
									zh_CN: '请输入信息'
								}
							}
						}
					},
					"f-product-num": {
						selector: '.f-product-num',
						validators: {
							notEmpty: {
								message: {
									en_US: 'Please enter product number',
									zh_CN: '请输入货号'
								}
							},
							stringLength: {
								max: 64,
								message: {
									en_US: 'Number length too long',
									zh_CN: '长度过长'
								}
							}
						}
					},
					"f-req-prop": {
						selector: '.f-req-prop',
						validators: {
							notEmpty: {
								message: {
									en_US: 'Please chooes property',
									zh_CN: '请选择属性'
								}
							}
						}
					}

				}
			}).on('err.validator.fv', function(e, data) {
				data.element
					.data('fv.messages')
					.find('.help-block[data-fv-for="' + data.field + '"]').hide()
					.filter('[data-fv-validator="' + data.validator + '"]').show();
			})
			.off('success.form.fv')
			.on('success.form.fv', function(e) {
				e.preventDefault();
				$('#submit-p').prop('disabled', false).removeClass('disabled');
				$('#preview').prop('disabled', false).removeClass('disabled');

				var $form = $(e.target);
				var fv = $form.data('formValidation');

				// comb-count ?
				var hasErrComb = false;
				$('.comb-amount').each(function(index, elem) {
					var $this = $(this);
					var v = $this.val();

					if (!/^(0|[1-9][0-9]*)$/.test(v)) {
						hasErrComb = true;
						return false;
					}
				});
				if (hasErrComb) {
					alert('库存量填写错误');
					$('html, body').scrollTop($('#sale-info-table').offset().top);
					return false;
				}

				// ck-error?
				var cke = $('.ck-error');
				if (cke.length) {
					alert('信息填写不完整或错误');
					var t = cke.eq(0).offset().top;
					$('html, body').scrollTop(t);
					$('#submit-p').prop('disabled', false).removeClass('disabled');
					$('#preview').prop('disabled', false).removeClass('disabled');
					return false;
				}

				// available time ?
				if ($('#datetime-p').is(':visible')) {
					var inputTime = $.trim($('#datetime-input').val());
					if (inputTime === '') {
						alert('上架时间未填写');
						$('html, body').scrollTop($('#datetime-p').offset().top);
						return false;
					}

					if (new Date().getTime() >= new Date(inputTime).getTime()) {
						alert('上架时间不能为当前时间之前');
						$('html, body').scrollTop($('#datetime-p').offset().top);
						return false;
					}
				}

				// upload 3+ ?
				var uploaded = 0;
				$('#prod-pic-upload').find('.match-fig > img').each(function(index, elem) {
					var $elem = $(elem);
					if ($elem.prop('src').indexOf('default_img.jpg') === -1) {
						uploaded++;
					}
				});
				if (uploaded < 3) {
					alert('Upload 3 pictures at least');
					return false;
				}

				// upload duplicate ?
				var urlArr = [];
				$('#prod-pic-upload').find('.image-url').each(function(index, elem) {
					var v = $(elem).val().trim();
					if (v !== '') {
						urlArr.push(v);
					}
				});
				var hasDup = false;
				urlArr.every(function(item, index, arr) {
					if (arr.indexOf(item) !== index) {
						hasDup = true;
						return false;
					}
					return true;
				});
				if (hasDup) {
					alert('不能上传相同的产品图片');
					return false;
				}

				// summernote empty?
				var rHtml = $('#summernote').summernote('code');
				var $temp = $('<div>' + rHtml + '</div>');
				if (rHtml.length <= 0 || $temp.is(':empty')) {
					alert('Product description can not be empty');
					return false;
				}

				// SUBMIT
				alert(rHtml);
				$('#rich-content').val(rHtml);

				if ($('#preview').attr('clicked') === 'yes') {
					$.ajax({
						url: $form.attr('action'),
						type: 'POST',
						cache: false,
						contentType: false,
						processData: false,
						data: new FormData($form[0]),
						success: function(result) {
							var w = window.open('/preview_holder.html');
							w.previewHtml = result;
						}
					});
				} else {
					$('#submit-p').prop('disabled', true);
					fv.defaultSubmit();
					return true;
				}

			});

		$('#add-product-form').formValidation('setLocale', lang);
	}

	$('#add-product-form').submit(function() {
		var rHtml = $('#summernote').summernote('code');
		$('#rich-content').val(rHtml);
	})
});