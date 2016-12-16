(function($) {
	$.fn.addCustomAttr = function() {
		return this.each(function(index, element) {
			$proTop = $(element);
			var sum = $('.down-pro').length + 1;
			var $addA = $proTop.find('div.attr-button-add a');
			var brotherFocus = false;
			var isSameName = false;
			var checkBox = false;

			/*add a line when click add-button*/
			$addA.click(function(e) {
				e.preventDefault();
				$proTop.addClass('ck-error');
				if (sum <= 3) {
					addLine(sum);
					sum++;
				} else
					$proTop.find('.note').html('最多只能加3个属性');
			});

			/*delete a line when chick*/
			$proTop.on('click', '.deleteIt', function(e) {
				e.preventDefault();
				$(this).parents('.pro-attr-block .custom-line').remove();
				$proTop.find('div.error-style').remove();
				sum--;
				if (sum <= 3) {
					$proTop.find('.note').html('如果您觉得我们提供的产品属性无法满足您的需要，您可以手动添加产品属性');
				}
				isSameName = false;
				isError();			
				if (!isSameName/*&&checkBox*/) {
					$proTop.removeClass('ck-error');
				}
			});


			var $season = $proTop.find('.product-attr-checkbox');
			var requiredSeason = $season.data('required');
			if(requiredSeason==='required') {
				$proTop.on('change', '.product-attr-checkbox input[type="checkbox"]', function() {
					checkbox();
				});
			}
			
			/* add a line when click*/
			var $formBlock = $proTop.find('div.down-pro');
			var customLine = '';

			function addLine(number) {
				$proTop.find('div.error-style').remove();
				customLine = '<div class="custom-line form-group has-feedback" data-line="' + number + '">' +
						'<div class="col-md-2">'+
							'<input type="text" class="form-control" data-lev="1" name="selfFeatures[\'' + (number - 1) + '\'].selfFeature" placeholder="Attribute" required>' +
						'</div>' +
						'<div class="col-md-7  trim-left">'+
							'<input type="text" class="form-control" data-lev="2" name="selfFeatures[\'' + (number - 1) + '\'].selfFeatureValue.selfValue" placeholder="Attribute val" required>' +
						'</div>' +
						'<a href="#" class="deleteIt">delete</a>' +
					'</div>';
				$formBlock.append(customLine);
			}

			/*handle Error Information*/
			var errorInfo = '';

			function handleErrorInfo(stringInfo, $errorStyle) {
				errorInfo = '<div class="form-group error-style">'+
					'<div class="col-md-offset-2 col-md-10 trim-left">'+
					'<div class="attr-error-style">' + stringInfo + '</div>'+
					'</div>';
				$errorStyle.remove();
				$formBlock.append(errorInfo);
			}
			
			function checkbox() {
				var $checkbox = $proTop.find('.product-attr-checkbox');
				var $checkboxSub = $checkbox.find('input[type="checkbox"]:checked');
				if($checkboxSub.length===0)
					$proTop.addClass('ck-error');
				else {
					checkBox=true;
					if (!isSameName&&checkBox) {
						$proTop.removeClass('ck-error');
					}
				}
					
			}
			/* 检查错误的方法*/
			function isError() {
				var $existedProA = $proTop.find('.pro-t');
				var $attrNames = $proTop.find('.custom-line [data-lev="1"]');
				var stepOne = true;
				var $getVal = $proTop.find('.custom-line input');
				$.each($getVal, function() {
					if ($(this).val() === '') {
						stepOne = false;
						return false;
					}
				});
				/*if stepOne is true ,set hasErroe*/
				
				/*如果无空的时候继续第二步检查是否相同,否则就可以直接添加错误提示的类*/
				if (!stepOne) {
					$proTop.addClass('ck-error');
				} else if (stepOne) {
					var arrayLevOne = [];
					$.each($attrNames, function() {
						var getArrayVal = $.trim($(this).val());
						arrayLevOne.push(getArrayVal);
					});
					$.each($existedProA, function() {
						var txt = $(this).text();
						var attrName = $.trim(txt.substring(0, txt.length - 2));
						arrayLevOne.push(attrName);
					});
					var lengthArray = arrayLevOne.length;
					var total;
					var i;
					var j;
					
					$.trim(' a das  ')
					for (i = 0; i < lengthArray; i++) {
						total = 0;						
						for (j = 0; j < lengthArray; j++) {
							if (arrayLevOne[i] == arrayLevOne[j]) {		
								total++;
								if (total >= 2) {
									isSameName = true;
									break;
								}
							}
						}
						if(isSameName)
						break;
					}
					if (isSameName) {						
						$proTop.addClass('ck-error');
					}				
				}
				
				/*if !isSameName and stepOne is true,set hasErroe*/
			}			
		
			
			/*blur even in every input box*/
			$proTop.on('blur', '.custom-line input.form-control', function() {
				isSameName = false;
				var that = this;
				var $itSelf = $(this);
				var attrValue = $itSelf.val();
				var lev = $itSelf.data('lev');
				var $errorStyle = '';
				var required = '';
				isError();
				if (!isSameName) {
					$proTop.removeClass('ck-error');
				}
				else if(isSameName)
					$proTop.addClass('ck-error');
				if (attrValue === '') {
					required = $itSelf.prop('required');
					if (lev === 1) {
						if (required) {
							$errorStyle = $proTop.find('div.error-style');
							handleErrorInfo("请输入属性", $errorStyle);
							$proTop.addClass('ck-error');
						}
					} else if (lev === 2 && required) {
						$errorStyle = $proTop.find('div.error-style');
						handleErrorInfo("请输入属性值", $errorStyle);
						$proTop.addClass('ck-error');
					}
				} else {
					total = 0;
					/*检查兄弟节点是否为空,兄弟节点为空才去判断聚焦在不在同一行*/
					var $siblingInput = $(that).parent().siblings('.form-group').find('input');
					var brotherVal = $siblingInput.val();
					if (brotherVal === '') {
						setTimeout(function() {
							brotherFocus = $siblingInput.is(':focus');
							/* 如不在同一行*/
							if (brotherFocus === false) {
								if (lev === 1) {
									$errorStyle = $proTop.find('div.error-style');
									handleErrorInfo("请输入该行属性值", $errorStyle);
									$proTop.addClass('ck-error');
								} else if (lev === 2) {
									$errorStyle = $proTop.find('div.error-style');
									handleErrorInfo("请输入该行属性", $errorStyle);
									$proTop.addClass('ck-error');
								}
							}

						}, 0);
					} else {
						if (isSameName) {
							$errorStyle = $proTop.find('div.error-style');
							handleErrorInfo("不能输入相同的属性", $errorStyle);
							$proTop.addClass('ck-error');
							setTimeout(function() {
								broth = $siblingInput.is(':focus');
								if (broth) {
									$proTop.find('div.error-style').remove();
								}
							}, 0);
						} else if (!isSameName) {
							$proTop.find('div.error-style').remove();
							var stepOne = true;
							var $getVal = $proTop.find('.custom-line input');
							$.each($getVal, function() {
								if ($(this).val() === '') {
									stepOne = false;
									return false;
								}
							});
							if (!stepOne){
								$errorStyle = $proTop.find('div.error-style');
							    handleErrorInfo("请填写完整属性和属性值", $errorStyle);
							    $proTop.addClass('ck-error');
							}
						}
					}
				}
			});
		});
	};
})(jQuery);