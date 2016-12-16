var CKF = require('./CKF.js');
var WAIT_TIME = 2 * 1000;

function check() {
	CKF.notify({
		type: 'disable-ajax-loading',
		data: null
	});
	$.get('/duobao-user-web/isLogin', function(data) {
		if (data !== 'false') {
			$.ajax({
				type: 'GET',
				contentType: 'application/json;charset=utf-8',
				url: "/cooka-order-web/checkIfNeedInfo",
				dataType: "html",
				success: function(ret) {
					var c = JSON.parse(ret);
					if (c.length !== 0) {
						// console.log('优惠券');
						CKF.notify({
							type: 'enable-ajax-loading',
							data: null
						});
					}
				}
			});
		}
	});
}

setTimeout(check, WAIT_TIME);