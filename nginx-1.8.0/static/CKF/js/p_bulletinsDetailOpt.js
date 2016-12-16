var CKF = require('./CKF.js');
require('../less/bulletins-detail-opt.less');

module.exports = (function() {
	var moduleName = 'bulletinsDetailOpt';
	var module = CKF.create(moduleName);

	function postMsgChange(num, type, callback) {
        var data = {
            msgIds: num,
            type: type
        };
        $.post("/cooka-user-web/center/msgChangeStatus", data, callback, 'html');
    }

	return {
		init: function() {
			module.find('.bulletins-detail-star').on('click', function(event) {
				event.preventDefault();
				var $this = $(this);
				var $msgId = parseInt($this.data('mid'));
				postMsgChange($msgId, 3, function(){
					alert(__('collect success'));
				});
			});

			module.find('.bulletins-detail-remove').on('click', function(event) {
				event.preventDefault();
				var $this = $(this);
				var $msgId = parseInt($this.data('mid'));
				postMsgChange($msgId, 1, function(){
					location.href = '/cooka-user-web/center/announcementList';
				});
			});
		}
	};
})();