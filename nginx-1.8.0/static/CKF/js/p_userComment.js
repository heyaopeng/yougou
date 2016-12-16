var CKF = require('./CKF.js');
require('../less/user-comment.less');

module.exports = (function() {
	var moduleName = 'userComment';
	var module = CKF.create(moduleName);

	return {
		init: function() {
			module.each(function (index, elem) {

				var $ele = $(elem);
				$ele.find('.js-comment').on('click',function(){
					var $this= $(this).closest('tr');
					var title = $this.find('.js-title').text();
					var src = $this.find('.js-img').attr('src');
					var comb = [];
					// comb.length=0;
					var $tr = $(this).closest('tr');
					var info = $tr.data('info');
					var nInfo = JSON.parse(JSON.stringify(info));
					nInfo.comb = info.comb.trim().slice(0, -1).split('|');

					CKF.notify({
	                    type: 'comment-modal',
	                    data: nInfo
	                });
				});
				
			});
		}
	};
})();