var CKF = require('./CKF.js');
// other dependencies ...

module.exports = (function() {
	var moduleName = 'breadcrumbSet';
	var module = CKF.create(moduleName);

	function setBread (list) {
		var $curl = module.data('url');
		var $liUrl;
		if ($curl.indexOf('?') !== -1) {
			$liUrl = $curl + '&ct=';
		} else {
			$liUrl = $curl + '?ct=';
		}
		
		if(list.length) {
			for (var i = 0; i < list.length; i++) {
				var $li = '<li>' +
							'<a href="' + $liUrl + list[i].categoryId +'">' + list[i].category + '</a>' + 
						  '</li>';
				module.append($li);
			}
		}

		var $updateLi = module.find('li').length;

		if ($updateLi >= 3) {
			module.find('li:last-child').addClass('active');
			var $text = module.find('li:last-child > a').text();
			module.find('li:last-child').html($text);
		}
	}
	return {
		init: function() {
			CKF.listen({
				'set-bread': setBread,
			}, moduleName);
		}
	};
})();