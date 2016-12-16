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
							html += '<li class="leaf"';
						}
						else {
							html += '<li class="node"';
						}
						html += 'data-cid="' + val.categoryId + '" data-level="' + val.level + '">' + val.category +'</li>\n';
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

					$leafVal.val(cid);
					$this.trigger('node.selected');
				});

				$nodeWrap.on('click', 'li.leaf', function () {
					var $leaf = $(this);
					$leaf
					.siblings().removeClass('active')
					.end().addClass('active')
					.closest('.node-wrap').nextAll('.node-wrap').empty();

					$leafVal.val($leaf.data('cid'));
					$this.trigger('leaf.selected');
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