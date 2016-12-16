(function ($) {
	$.fn.nodePick = function (data) {
		return this.each(function () {
			var $this = $(this);
			var $first = $this.find('.node-wrap').eq(0);
			var $leafVal = $this.find('.leaf-val');
			var $nodeWrap = $this.find('.node-wrap');

			function buildContent (pid, arr) {
				var html = '';
				$.each(arr, function (key, val) {

					if (pid === 0 || (pid === val.parentId)) {
						if (val.isLeaf) {
							html += '<li class="leaf" data-cid="' + val.categoryId + '" data-level="' + val.level + '" data-name="' + val.category + '">' + 
							val.category + 
							'<div class="leaf-set"><a href="#" data-set="primary">primary</a> <a href="#" data-set="secondary">secondary</a></div>' +
							'</li>\n';
						}
						else {
							html += '<li class="node" data-cid="' + val.categoryId + '" data-level="' + val.level + '" data-name="' + val.category + '">' + val.category + '</li>\n';
						}
					}
					
				});
				return html;
			}

			function bindNodeEvent () {
				$nodeWrap.on('click', 'li.node', function () {
					var $node = $(this);
					var cid = $node.data('cid');
					var level = $node.data('level');
					var html = buildContent(cid, data[level + 1]);
					$node
					.siblings().removeClass('active')
					.end().addClass('active')
					.closest('.node-wrap').nextAll('.node-wrap').empty()
					.end().next('.node-wrap').html(html);

					$this.trigger('node.selected');
				});

				$nodeWrap.on('click', 'li.leaf', function () {
					var $leaf = $(this);
					$leaf
					.closest('.node-wrap').nextAll('.node-wrap').empty();
				});
			}

			function init () {
				$first.html(buildContent(0,data[1]));
				bindNodeEvent();
			}
			init();
		});
	};
})(jQuery);

$(function () {
	$(document).on('click', '.category-label-rm', function () {
		$(this).closest('.category-label').remove();
	});
	
	$(document).on('click', 'a[data-set="primary"]', function (e) {
		e.preventDefault();
		var $this = $(this);
		var $leaf = $this.closest('.leaf');
		var name = $leaf.data('name');
		
		var exist = false;
		$('.category-label[data-cname]').each(function (index, elem) {
			if ($(elem).data('cname') === name) {
				exist = true;
				return false;
			}
		});
		if (exist) {
			alert('不能进行重复选择');
			return;
		}
		
		$leaf
		.addClass('active')
		.siblings()
		.removeClass('active');

		var schtml = '';
		$('#category-node-pick').find('li.active').each(function(index, elem) {
			schtml += '<li>' + $(elem).data('name') + '</li>';
		});
		$('#selected-category').html(schtml);
		
		$('#primary-category').html('<span class="category-label" data-cname="' + name + '">' + name + '</span>\n');
		$('#categoryId').val($leaf.data('cid'));
		$('#next-step').removeClass('hide');
	});
	
	$(document).on('click', 'a[data-set="secondary"]', function (e) {
		e.preventDefault();
		var $this = $(this);
		var $leaf = $this.closest('.leaf');
		var name = $leaf.data('name');
		
		var exist = false;
		$('.category-label[data-cname]').each(function (index, elem) {
			if ($(elem).data('cname') === name) {
				exist = true;
				return false;
			}
		});
		if (exist) {
			alert('不能进行重复选择');
			return;
		}		
		
		var $label = $('#secondary-category').find('.category-label');
		if ($label.length > 1) {
				$label.eq(0).remove();
		}
		$('#secondary-category').append('<span class="category-label" data-cname="' + name + '">' + name +
				'<input type="hidden" class="ccc" value="' + $leaf.data('cid') + '">' +
				'\n<span class="glyphicon glyphicon-remove category-label-rm"></span></span>\n');
		$('.ccc').each(function (i,e) {
			$(e).prop('name', 'categoryId[' + (i + 1) + ']');
		});
	});
});