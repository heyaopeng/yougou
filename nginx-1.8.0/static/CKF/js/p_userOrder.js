var CKF = require('./CKF.js');
require('../less/user-order.less');

module.exports = (function() {

	var moduleName = 'userOrder';
	var module = CKF.create(moduleName, true);

	return {
		init: function() {

			if (module !== null) {
				module.find('#confirm-reception-form').on('submit', function(e) {
					e.preventDefault();
					var password = $('#pay-password').val();
					if(password!==''){
						console.log('submit');

						$.ajax({
							type: "POST",
							url: "/cooka-order-web/verifyPayPassword",
							data: "payPassword=" + escape(password).replace(/\+/g, '%2B').replace(/\"/g,'%22').replace(/\'/g, '%27').replace(/\//g,'%2F'),
							success: function(msg) {
								if (msg === "success") {
									$.ajax({
										type: 'POST',
										contentType: 'application/json;charset=utf-8',
										url: aurl,
										dataType: "html",
										success: function(ret) {
											if (ret === "success") {
												window.location.reload();
											} else {
												alert(__("operation failed, you should deal with dispute first"));
											}
										}
									});
								} else if (msg === "error") {
									alert(__("your account has been locked, your can change password to active it"));
									// window.location.reload();
								} else {
									$('#error-text').html(msg);
								}
							}
						});
					}
				});
				$('.confirm-reception').on('hidden.bs.modal', function (e) {
				  $(this).find('#pay-password').val('');
				});

				// FIX　ME
				var aurl = '';
				$('.pre-confirm-order').on('click', function() {
					aurl = $(this).data('url');
				});

				// FIX　ME
				$('.pre-cancel-order').on('click', function() {
					aurl = $(this).data('url');
					$('.modal-cancel-order').find('.set-order-val').attr('value', aurl);
				});

				/*===========*/

				module.on('click', '.user-order-commet', function(e) {
					var $tr = $(this).closest('tr');
					var info = $tr.data('info');
					var nInfo = JSON.parse(JSON.stringify(info));
					nInfo.comb = info.comb.trim().slice(0, -1).split('|');
					CKF.notify({
						type: 'comment-modal',
						data: nInfo
					});
				});
			}
		}
	};
})();
