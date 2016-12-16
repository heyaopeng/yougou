var CKF = require('./CKF.js');
require('../less/user-sidebar.less');

module.exports = (function() {
	var moduleName = 'userSidebar';
	var module = CKF.create(moduleName);

	return {
		init: function() {
			
			var currentUrl = window.location.href;
			module.find('a').each(function (index, elem) {
				var $link = $(elem);
				var linkHref = $link.prop('href');
				if (currentUrl.indexOf(linkHref) !== -1) {
					var $li = $link.closest('li');
					$li.addClass('active');
					var $lili = $li.closest('li');
					if ($lili.length) {
						$lili.addClass('active');
					}
					return false;
				}
			});

			module.on('click', '[data-toggle="submenu"]', function(e) {
				e.preventDefault();
				var $this = $(this);
				var $li = $this.closest('li');

				if ($li.is('.active')) {
					$li.find('.user-sidebar-submenu').slideUp('fast', function () {
						$li.removeClass('active');
						$(this).removeAttr('style');
					});
				}
				else {
					var $prevActiveLi = $li.siblings('.active');
					if ($prevActiveLi.length) {
						$prevActiveLi.find('.user-sidebar-submenu').slideUp('fast',function () {
							$prevActiveLi.removeClass('active');
							$(this).removeAttr('style');
						});
					}
					
					$li.find('.user-sidebar-submenu').stop().slideDown('fast',function() {
						$li.addClass('active');
					});
				}
			});
		}
	};
})();