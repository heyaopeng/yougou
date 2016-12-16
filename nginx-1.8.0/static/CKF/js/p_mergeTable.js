var CKF = require('./CKF.js');

module.exports = (function() {
	var moduleName = 'mergeTable';
	var module = CKF.create(moduleName, true);
	return {
		init: function() {

			CKF.listen({
				'remerge-table': remergeTable
			}, moduleName);

			function remergeTable() {
				module = CKF.rebuild(moduleName);
				module.each(function(index, table) {
					var $table = $(table);
					var tdLen = $table.find('tr').eq(0).find('td').length;

					for (var i = 1; i <= tdLen; i++) {
						var $tds = $table.find('td:nth-child(' + i + '):not("td.no-merge")');
						var max = $tds.length;

						var $temp = $tds.eq(0);
						var current = 0;
						var r = 1;
						for (var j = 0; j < max; j++) {

							if (j !== current) {
								if ($temp.html().trim() === $tds.eq(j).html().trim()) {
									$tds.eq(j).addClass('remove');
									r++;
									$temp.attr('rowspan', r);
								} else {
									r = 1;
									$temp = $tds.eq(j);
									current = j;
								}
							}
						}
					}

					$table.find('.remove').remove();
				});
			}
		}
	};
})();