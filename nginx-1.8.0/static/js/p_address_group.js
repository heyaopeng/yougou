(function($) {
	$.fn.addressGroup = function() {
		return this.each(function(index, elem) {
			var $elem = $(elem);
			var $select = $elem.find('select.address-select');
			var MAX_LEVEL = $select.length - 1;
			$select.on('change', function() {
				var $this = $(this);
				var level = $this.data('level');
				var value = $this.val();
				if (level < MAX_LEVEL && value !== '') {
					for (var i = level + 1; i <= MAX_LEVEL; i++) {
						$select.eq(i).get(0).length = 1;
					}
					var parentId = "parentId=" + $this.find('option:selected').data('parentid');
					var url = "/cooka-user-web/center/select" + $this.data('parent');
					$.ajax({
						type: "post",
						url: url,
						data: parentId,
						async: true,
						success: function(data) {
							var html = '';
							$.each(data, function(index, elem) {
								html += '<option value="' + elem.name + '" data-parentid="' + elem.id + '">' + elem.name + '</option>\n';
							});
							$select.eq(level + 1).append(html);
							$this.trigger('address.change');
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							console.log("gg");
						},
					});
				}
			});
		});
	};
})(jQuery);