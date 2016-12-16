(function($) {
	$.fn.dynamicTable2 = function(data) {
		return this.each(function(index, elem) {
			var $elem = $(elem);
			var $thead = $(elem).find('thead');
			var theadLen = $thead.find('th').length;
			
			var invTh = $thead.find('th').eq(theadLen-2);
			var proTh = $thead.find('th').eq(theadLen-1);

			var ths = '';
			var i = 0;
			for (i = 0; i < data.titles.length; i++) {
				ths += '<th>' + data.titles[i] + '</th>\n';
			}
			
			$thead.find('tr').empty(); 
			$thead.find('tr').append(ths);
			$thead.find('tr').append(invTh);
			$thead.find('tr').append(proTh);

			var vis = [];
			var thtml = '';

			function dfs(d,s) {
				var i = 0;
				var c = 1;
				if (d === data.level) return;
				for (i = d + 1; i < data.level; i++) {
					c *= data.counts[i];
				}
				if (d === 0) thtml += '<tr>\n';
				for (i = 0; i < data.counts[d]; i++) {
					vis[d] = i;
					thtml += '<td rowspan="' + c + '">' + data.names[d][i] + '</td>\n';
					if (d == data.level - 1) {
						if (data.values[vis.join('')]) {
							thtml += '<td>\n' +
								'<div class="form-group">\n' +
								'<input data-dy='+ s + data.names[d][i] +' type="text" name="combination[' + vis.join('') + '].amount" class="form-control comb-amount" value="' + data.values[vis.join('')][0] + '">\n' +
								'</div>\n' +
								'</td>' + 
								'<td>\n' +
								'<div class="form-group">\n' +
								'<input data-dy='+ s + data.names[d][i] +' type="text" name="combination[' + vis.join('') + '].productCode" value="' + data.values[vis.join('')][1] +'" class="form-control comb-product-code">\n' +
								'</div>\n' +
								'<input type="hidden" name="combination[' + vis.join('') + '].combination" value="" class="comb" data-num="' + vis.join('') + '">' +
								'</td>';
						}
						else {
							thtml += '<td>\n' +
								'<div class="form-group">\n' +
								'<input data-dy=' + s + data.names[d][i] +' type="text" name="combination[' + vis.join('') + '].amount" class="form-control comb-amount" value="10000">\n' +
								'</div>\n' +
								'</td>' + 
								'<td>\n' +
								'<div class="form-group">\n' +
								'<input data-dy='+ s + data.names[d][i] +' type="text" name="combination[' + vis.join('') + '].productCode" class="form-control comb-product-code">\n' +
								'</div>\n' +
								'<input type="hidden" name="combination[' + vis.join('') + '].combination" value="" class="comb" data-num="' + vis.join('') + '">' +
								'</td>';
						}
						
						thtml += '</tr>\n<tr>\n';
					}
					dfs(d + 1,s+data.names[d][i]);
				}
			}
			dfs(0,"");
			thtml = '<tbody>' + thtml.slice(0, -5) + '</tbody>';
			$elem.find('tbody').remove();
			$elem.find('thead').after(thtml);
		});
	};
})(jQuery);

