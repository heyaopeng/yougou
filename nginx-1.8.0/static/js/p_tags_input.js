(function ($) {
	$.fn.tagsInput = function () {
		return this.each(function () {
			var $this = $(this);
			var $tagsInput = $this.find('.tags-input');
			var $tagNode = $tagsInput.find('.clone');
			var $tagEnter = $tagsInput.find('.tag-enter');
			var maxItem = $tagsInput.data('max-item') || 0;

			if (maxItem <= 0) {
				console.log('data-max-item can not less than 0');
				return false;
			}

			var $tagLimit = $tagsInput.next('.tag-limit');

			var $tagsValues = $tagsInput.find('.tag-save');
			var tagsValues = [];

			function updateTagsValues() {
				// empty array
				tagsValues.length = 0;
				$tagsInput.find('span.tag').each(function (idx, ele) {
					tagsValues.push($(ele).data('text'));
				});
				$tagsValues.val(tagsValues.join(' '));
			}

			function cloneAndInsert(text) {
				$tagNode.clone().detach()
				.removeClass('clone').addClass('tag')
				.prepend(text)
				.data('text', text)
				.insertBefore($tagEnter);
			}

			function existAlert(node) {
				node.addClass('exist');
				setTimeout(function () {
					node.removeClass('exist');
				}, 1000);
			}

			function handleTagKeydown(e, $cxt) {
				var $elem = $(e.target);
				var inputText = $.trim($elem.val());
					
				// inputText = inputText.replace(/[^0-9a-z\u4e00-\u9fa5]+/gi, '');
				
				var $currentTags = $cxt.find('span.tag');
				// enter
				if (e.which === 13 && inputText === '') {
					e.preventDefault();
					return false;
				}
				if ((e.which === 13 || e.which === 32) && (inputText !== '')) {

					if ($currentTags.length >= maxItem) {	
						// FIX: submit when press enter? 
						e.preventDefault();
						return false;
					}
					var tagExist = false;
					$currentTags.each(function (idx, ele) {
						if (inputText === $(ele).data('text')) {
							existAlert($(this));
							tagExist = true;
						}
					});
					if (!tagExist) {
						cloneAndInsert(inputText);
						$elem.val('');

						// length -> before insert new tag
						showLimit(maxItem - $currentTags.length - 1);
					}
					e.preventDefault();
					return false;
				}
				// back space
				else if (e.which === 8 && $elem.val() === '') {
					if ($elem.prev('.tag').length) {
						$elem.prev('.tag').remove();
						showLimit(maxItem - $currentTags.length + 1);
					}
				}
			}

			function removeTag() {
				var $this = $(this);
				var restTag = $this.parent('.tag').siblings('.tag').length;
				$this.parent('.tag').remove();
				showLimit(maxItem - restTag);
			}

			function showLimit(n) {
				$tagLimit.text("还可以输入" + n + "个关键词");
				updateTagsValues();
			}

			$tagEnter.on('keydown', function (e) {
				handleTagKeydown(e, $tagsInput);
			});

			$tagEnter.on('focus', function () {
				$tagsInput.addClass('active');
			});
			$tagEnter.on('blur', function () {
				$tagsInput.removeClass('active');
			});

			$tagsInput.on('click', function () {
				$tagEnter.focus();
			});

			$tagsInput.on('click', '.tag span.glyphicon-remove', removeTag);
		});
	};	
})(jQuery);
