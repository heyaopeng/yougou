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

	$('#datetime-p').datetimepicker({
		format: 'yyyy/MM/dd hh:mm:ss'
	});
	$('#saleUnit').on('change', function() {
		$('#unitAmount').val($('#saleUnit').find('option:selected').data('amount'));
		$('#unit-text').html($('#measurement-unit').find('option:selected').val());
	});

	$('#datetime-r').on('change', function() {
		var c = $(this).prop('checked');
		if (c) {
			$('#datetime-p').removeClass('hide');
			$('#datetime-input').prop('name', 'activeTime');
			//rebuildForm();
		}
	});
	$('.datetime-i').on('change', function() {
		var c = $(this).prop('checked');
		if (c) {
			$('#datetime-p').addClass('hide');
			$('#datetime-input').prop('name', '');
			//rebuildForm();
		}
	});

	$('.f-self-num').on('blur',function(){
		var num = $('.f-self-num').val();
		$.ajax({
				type: "get",
				url: "/cooka-product-web/ifExistedSelfNum?selfCodingNum="+num,
				success: function(data) {
					if(data==='false'){
						$('#self-num-note').html('编号重复');
					}else{
						$('#self-num-note').html('');
					}
				}
			});
	});

	$('.req-int').on('change', function() {
		var c = $(this).prop('checked');
		if (c) {
			$('.interval-input:visible').prop('required', true);
		}
	}).trigger('change');

	$('.req-int-no').on('change', function() {
		var c = $(this).prop('checked');
		if (c) {
			$('.interval-input:visible').prop('required', false);
		}
	}).trigger('change');

	var tCount = 0;
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
			if ($('#add-product-form').data('formValidation')) {
				$('#add-product-form').data('formValidation').destroy();
			}
			if ($('#feature-specification').length) {
				$('#feature-specification').html(msg);
			}
			fv();
		}
		$('.pro-attr-block').addCustomAttr();
		$('.check-or-add-product-style').checkOrAddProStyle();
	}

	function handlePropChange() {
		var inputs = '';
		var values = [];
		var customValues = [];

		dt['titles'] = [];
		dt['counts'] = [];
		dt['names'] = [];

		var coaps = $('.check-or-add-product-style');

		dt['level'] = coaps.length;

		tCount++;
		// data for dynamic table
		if (tCount <= 1) {
			$.getJSON('/cooka-product-web/getSpecificationTable?categoryId=' + $('#categoryId').val() + '&productId=' + $('#productId').val(), function(data) {
				dt['titles'] = data['titles'];
				dt['level'] = data['level'];
				$('#sale-info-table').dynamicTable2(data);
				getCombs();
			});
		} else {
			coaps.each(function(index, elem) {
				var $elem = $(elem);
				var cnt = $elem.data('value').length;
				var names = $elem.data('value');
				var tit = $elem.data('spec');
				dt['titles'].push(tit);
				dt['counts'].push(cnt);
				dt['names'].push(names);
			});

			$('#sale-info-table').dynamicTable2(dt);
			getCombs();
		}

		$('#sale-info-table').dynamicTable2(dt);

		$.each(dydata, function(key, value) {
			$('.comb-amount[data-dy="' + key + '"]').val(value);
		});
		$.each(dypdata, function(key, value) {
			$('.comb-product-code[data-dy="' + key + '"]').val(value);
		});
	}

	var dydata = {};
	var dypdata = {};
	var dyfirst = true;
	var dypfirst = true;
	$(document).on('change', '.comb-amount', function() {
		if (dyfirst) {
			$('.comb-amount').each(function(index, elem) {
				var $this = $(this);
				var key = $this.data('dy');
				dydata[key] = $this.val();
			});
			dyfirst = false;
		} else {
			var $this = $(this);
			var key = $this.data('dy');
			dydata[key] = $this.val();
		}

	});

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

	function handlePreviewChange() {
		var _specs = $('.check-or-add-product-style').eq(0).find("input[data-sid]:checked, .tag[data-sid]");
		var mHtml = '';
		_specs.each(function(index, elem) {
			var _s = $(elem);
			mHtml += '<div class="match-block" data-mid="' + _s.data('sid') + '">\n' +
				'<div class="match-inner">\n' +
				'<div class="match-fig">\n' +
				'<img src="' + _s.data('spath') + '">\n' +
				'</div>\n' +
				'<button class="btn btn-default btn-block btn-choose-match" type="button" data-toggle="modal" data-target="#match-img-modal">' +
				_s.data('text') +
				'</button>\n';

			var sPath = _s.data('spath');

			if (sPath.indexOf(DEFAULT_IMG_PATH) > -1) {
				sPath = '';
			}

			var name = null;
			var lastIndex = null;
			var targetName = null;

			if (_s.hasClass('tag')) {
				name = _s.find('input.custom-spec').prop('name');
				lastIndex = name.lastIndexOf('.');
				targetName = name.slice(0, lastIndex) + '.imageUrl';
				mHtml += '<input type="hidden" name="' + targetName + '" value="' + sPath + '" class="image-url" id="spec-image-' + _s.find('.custom-spec').val() + '">\n';
			} else {
				name = _s.prop('name');
				lastIndex = name.lastIndexOf('.');
				targetName = name.slice(0, lastIndex) + '.imageUrl';
				mHtml += '<input type="hidden" name="' + targetName + '" value="' + sPath + '" class="image-url" id="spec-image-' + _s.val() + '">\n';
			}
			mHtml += '</div>\n</div>\n';
		});

		$('#match-imgs').html(mHtml);
	}

	function uploadLocalImage(targetId, clickMid) {
		var options = {
			type: "POST",
			url: '/cooka-product-web/doUploadImage.do',
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
						'<img src="' + data[i].cPath + '" title="' + data[i].name + '" data-src="' + data[i].path + '">\n' +
						'<img src="' + data[i].path + '" style="display:none;width:0;height:0;">' +
						'</div>\n' +
						'</li>\n';
				}
			}
		} else {
			html = '<div><h3>No Image In Gallery Yet</h3><a href="/cooka-store-web/imageZone" class="btn btn-primary" target="_blank">Go to upload</a></div>';
		}

		// stop downloading <img>
		if (window.stop !== undefined) {
			window.stop();
		} else if (document.execCommand !== undefined) {
			document.execCommand('Stop', false);
		}

		return html;
	}

	function getCombs() {
		$('#sale-info-table').find('.comb').each(function(index, elem) {
			var comb = $(elem);
			var cNum = comb.data('num').toString().split('');
			var pVal = '';

			$('.check-or-add-product-style').each(function(index, elem) {
				var $coaps = $(elem);
				var values = $coaps.find('input[data-value]:checked, input.custom-spec[data-value]');
				var theVal = values.eq(cNum[index]);

				pVal += theVal.data('value') + ',';

				if (theVal.hasClass('custom-spec')) {
					pVal = pVal.slice(0, -1);
					pVal += ':0,';
				}
			});
			pVal = pVal.slice(0, -1);
			comb.val(pVal);
		});
	}

	init();

	$('body').on('prop.changed', function() {
		handlePropChange();
		handlePreviewChange();
		getCombs();
	}).trigger('prop.changed');

	$('#preview').on('click', function(e) {
		$(this).attr('clicked', 'yes');
		$('#add-product-form').prop('action', '/cooka-product-web/preview.do');
		$('#add-product-form').prop('target', '_blank');
	});
	$('#submit-p').on('click', function(e) {
		$('#preview').removeAttr('clicked');
		$('#add-product-form').prop('action', '/cooka-store-web/doUpdateProductHandler.do');
		$('#add-product-form').prop('target', '');
	});

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

			$.ajax({
				type: "post",
				data: d,
				url: "/cooka-product-web/getImagesAndAlbums",
				success: function(data) {
					var h = genGalleryList(data);
					$('#gallery-list').html(h);

					$('#go-parent').data('aid', pid);
					galleryPositionParentId = pid;
					localStorage.setItem('galleryPositionParentId', pid.toString());
				}
			});
		}
	});

	$('#go-parent').on('click', function() {
		var _this = $(this);
		var aid = _this.data('aid');
		var d = 'albumId=' + aid;
		if (parseInt(aid) === -1) {
			return;
		}
		$.ajax({
			type: "post",
			data: d,
			url: "/cooka-product-web/getImagesAndAlbums",
			success: function(data) {
				var h = genGalleryList(data);
				$('#gallery-list').html(h);
				var nPid = $('.gallery-holder[data-ppid]').eq(0).data('ppid');
				$('#go-parent').data('aid', nPid);
				galleryPositionParentId = nPid;
				localStorage.setItem('galleryPositionParentId', nPid.toString());
			}
		});
	});

	$('#match-img-modal').on('shown.bs.modal', function() {
		$('#pc-file').val('');
		$('#mul-pc-file').val('');
		if (galleryPositionId !== -1) {
			var d = 'albumId=' + galleryPositionId;
			$.ajax({
				type: "post",
				data: d,
				url: "/cooka-product-web/getImagesAndAlbums",
				success: function(data) {
					var h = genGalleryList(data);
					$('#gallery-list').html(h);
					$('#go-parent').data('aid', galleryPositionParentId);
				}
			});
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

	$.get('/cooka-product-web/getParentAlbums', function(data) {
		var h = '';
		$.each(data, function(index, item) {
			h += '<li class="choose-gallery-li" value="' + item.albumId + '" data-aid="' + item.albumId + '">' + item.albumName + '</li>\n';
		});
		$('#choose-gallery').html(h); //.trigger('change');
	});

	$('#choosed-album').on('change', function() {
		console.log("ffffffff");
		var _this = $(this);
		var ggid = _this.val();
		galleryPositionId = ggid;
		localStorage.setItem('galleryPositionId', ggid.toString());

		var d = 'albumId=' + ggid;
		$.ajax({
			type: "post",
			data: d,
			url: "/cooka-product-web/getImagesAndAlbums",
			success: function(data) {
				var h = genGalleryList(data);
				$('#gallery-list').html(h);
				$('#go-parent').data('aid', '-1');
			}
		});
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
	$('#summernote-pre').summernote({
		height: 500,
		minHeight: null,
		maxHeight: null,
		toolbar: []		
	});
	$('#summernote').on('summernote.change', function(customEvent, contents, $editable) {
		if (contents.length && contents.indexOf('<p><br></p>') !== -1) {
			var c = contents.replace(/(<p><br><\/p>|<div><br><\/div>){2,}/g, '');
			$(this).summernote('code', c);
			$('#summernote').summernote('focus');
		}
	});
	$('#summernote').summernote('code', $('#summernote').summernote('code').replace(/style="width:100%"/g, 'style="width:200px"'));

	$(document).on('keyup', '.comb-amount', function() {
		var $this = $(this);
		var v = $this.val().replace(/[^\d]/g, '');
		if (v === '') {
			v = '0';
		}
		$this.val(parseInt(v));
	});

	$('#next-step').on('click', function() {
		var path = $('#next-step').attr('href');
		var id = $('#categoryId').val();
		var pid = $('#productId').val();
		if (id === '') {
			alert('未选择主类目');
			return;
		}
		$.ajax({
			type: "GET",
			url: path,
			data: {
				categoryId: id,
				productId: pid
			},
			error: function() {
				alert('Error loading document');
			},
			success: function(msg) {
				$('.comb-amount').eq(0).change();
				$('.comb-product-code').eq(0).change();
				init(msg);
			}
		});
	}).trigger('click');

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

	function checkProductExist() {
		var productNum = $('.f-product-num').val();
		var storeId = $('#store_name').val();

		var hasInfo = $('input.channel-information').is(':visible') && $('input.channel-information').val() !== '';

		var d = {
			productNum: productNum,
			storeId: storeId,
			information: ''
		};

		if (hasInfo) {
			d.information = $('input.channel-information').val();
		}

		d.productId = $('#productId').val();

		if (productNum !== '' && storeId !== '' && (storeId !== '1' || hasInfo)) {
			$.get('/cooka-product-web/ifExistedProduct', d, function(result) {
				if (result === 'success') {
					$('.ee-alert').addClass('hide').removeClass('ck-error');
				} else {
					$('.ee-alert').removeClass('hide').addClass('ck-error');
				}
			});
		}
	}

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

				e.preventDefault();
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
				if ($('#prod-pic-upload').length) {
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
				}

				// summernote empty?
				var rHtml = $('#summernote').summernote('code');
				var $temp = $('<div>' + rHtml + '</div>');
				if (rHtml.length <= 0 || $temp.is(':empty')) {
					alert('Product description can not be empty');
					return false;
				}

				// SUBMIT
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
					fv.defaultSubmit();
					return true;
				}
			});

		$('#add-product-form').formValidation('setLocale', lang);
	}
});