(function($) {
	function getRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	$.fn.checkOrAddProStyle = function() {
		return this.each(function(index, ele) {

			var $this = $(ele);
			var $sayExisted = $this.find('.say-existed');
			var $sayEdit = $this.find('.say-edit');
			var $addInputGroup = $this.find('.input-group-add');
			var $hideInputGroup = $this.find('.input-group-hide');
			var $tagsInput = $this.find('.tags-input');
			var $tagNode = $tagsInput.find('.clone');
			var $hiddenVal = $tagNode.find('input[type="hidden"]').data('value');
			var $tagEnter = $tagsInput.find('.tag-enter');
			var $tagCopy = $tagsInput.find('.tag-copy');
			var $tagLimit = $tagsInput.next('.tag-limit');
			var maxItem = $tagsInput.data('max-item') || 0;
			var $checkbox = $this.find('.checkbox input');
			var tagsValues = [];
			var inputArr = [];

			var tagCount = $this.find('.tag').length;

			$this.data('value', tagsValues);

			//初始化
			inputArr.length = 0;
			$tagsInput.find('span.tag').each(function(idx, ele) {
				inputArr.push($(ele).data('text'));
			});
			if (inputArr.length !== 0) {
				var $appendItem = $this.find('.has-tags-input');
				$appendItem.show();
				$hideInputGroup.show();
				$addInputGroup.hide();
			}
			updateTagsValues();
			//添加自定义输入框
			$addInputGroup.click(function() {
				var $appendItem = $this.find('.has-tags-input');
				$appendItem.show();
				$hideInputGroup.show();
				$addInputGroup.hide();
			});

			//隐藏自定义输入框
			$hideInputGroup.click(function() {
				var $appendItem = $this.find('.has-tags-input');
				$appendItem.hide();
				$hideInputGroup.hide();
				$addInputGroup.show();
			});

			if (maxItem <= 0) {
				return false;
			}

			// 更新data-value数组
			function updateTagsValues() {
				// empty array
				tagsValues.length = 0;
				inputArr.length = 0;

				$checkbox.closest('.checkbox').find('input[type="checkbox"]:checked').each(function(idx, ele) {
					tagsValues.push($(ele).data('text'));
				});
				$tagsInput.find('span.tag').each(function(idx, ele) {
					inputArr.push($(ele).data('text'));
					tagsValues.push($(ele).data('text'));

				});
				$this.data('value', tagsValues);
				$tagCopy.val(inputArr.join(" "));
				if ($this.data('value').length === 0) {
					$this.addClass('ck-error');
					$sayEdit.show();
				} else {
					$this.removeClass('ck-error');
					$sayEdit.hide();
				}

				//留给小凯的trigger，与交易信息表衔接
				$this.trigger('prop.changed');
			}

			//就在这里
			function cloneAndInsert(text) {
				var $rand = new Date().getTime().toString() + getRandom(10000, 99999).toString(); // + ':0';
				$tagNode.clone().detach()
					.removeClass('clone').addClass('tag')
					.prepend(text)
					.attr('data-text', text)
					.attr('data-sid', 'c' + tagCount)
					.attr('data-spath', '/images/default_img.jpg')
					.insertBefore($tagEnter)
					.find('input[type="hidden"]').first()
					.data('value', $hiddenVal + ':' + $rand)
					.val($rand).prop({
						'name': function() {
							return $(this).prop('name') + 'selfSpecificationValues[' + tagCount + '].hashCode';
						},
						'disabled': false
					})
					.next()
					.val(text).prop({
						'name': function() {
							return $(this).prop('name') + 'selfSpecificationValues[' + tagCount + '].selfValue';
						},
						'disabled': false
					});
				tagCount++;
			}



			function existAlert(node) {
				node.addClass('exist');
				setTimeout(function() {
					node.removeClass('exist');
				}, 1000);
			}

			//验证输入的内容是否存在
			function handleTagKeydown(e, $cxt) {
				var $elem = $(e.target);
				var inputText = $elem.val();
				var $currentTags = $cxt.find('span.tag');
				inputText = $.trim(inputText);

				// inputText = inputText.replace(/[^0-9a-z\u4e00-\u9fa5]+/gi, '');
				// enter
				if (e.which === 13 && inputText === '') {
					e.preventDefault();
					return false;
				}

				if ((e.which === 13 || e.which === 32) && inputText !== '') {
					if ($currentTags.length >= maxItem) {
						// FIX: submit when press enter?
						e.preventDefault();
						return false;
					}
					if ($currentTags.length >= maxItem) {
						// FIX: submit when press enter?
						return false;
					}
					var tagExist = false;
					//输入内容与已输入比较
					$currentTags.each(function(idx, ele) {
						if (inputText === $(ele).data('text').toString()) {
							existAlert($(this));
							tagExist = true;
						}
					});

					//输入内容与已勾选比较
					var $checked = $this.find('input[type="checkbox"]:checked');
					$checked.each(function(idx, ele) {
						if (inputText === $(ele).data('text')) {
							tagExist = true;
						}
					});

					if (!tagExist) {
						cloneAndInsert(inputText);
						$elem.val('');
						$sayExisted.hide();

						// length -> before insert new tag
						showLimit(maxItem - $currentTags.length - 1);
					} else {
						$sayExisted.show();
						e.preventDefault();
						return false;
					}
					e.preventDefault();
				}

				// back space
				else if (e.which === 8 && $elem.val() === '') {
					if ($elem.prev('.tag').length) {
						$elem.prev('.tag').remove();
						showLimit(maxItem - $currentTags.length + 1);
					}
				}
			}

			//验证勾选内容在输入内容中是否已存在
			function checkAndInput(e) {
				var $elem = $(e.target).closest('.checkbox');
				var checking = $elem.find('input[type="checkbox"]:checked');
				var $checkingVal = checking.data('text');
				var $currentTags = $this.find('span.tag');
				var tagExist = false;

				$currentTags.each(function(idx, ele) {
					if ($checkingVal === $(ele).data('text')) {
						existAlert($(this));
						tagExist = true;
					}
				});

				if (!tagExist) {
					$sayExisted.hide();
					updateTagsValues();
				} else {
					checking.attr('checked', false);
					$sayExisted.show();
					return false;
				}
			}

			function removeTag() {
				var $this = $(this);
				var restTag = $this.parent('.tag').siblings('.tag').length;
				$this.parent('.tag').remove();
				showLimit(maxItem - restTag);
			}

			function showLimit(n) {
				$tagLimit.text("还可以输入" + n + "个自定义");
				updateTagsValues();
			}

			$tagEnter.on('keydown', function(e) {
				handleTagKeydown(e, $tagsInput);
			});

			$tagEnter.on('focus', function() {
				$tagsInput.addClass('active');
			});

			/*$tagEnter.on('blur', function() {
				var $this = $(this);
				var vText = $.trim($this.val());
				if (vText !== '') {
					cloneAndInsert(vText);
					updateTagsValues();
				}
				$this.val('');
				$tagsInput.removeClass('active');
			});*/

			$tagsInput.on('click', function() {
				$tagEnter.focus();
			});

			$checkbox.on('change', function(e) {
				checkAndInput(e);
			});

			$tagsInput.on('click', '.tag span.glyphicon-remove', removeTag);
		});
	};
})(jQuery);

/*$(document).ready(function() {
	$('.check-or-add-product-style').checkOrAddProStyle();
});*/