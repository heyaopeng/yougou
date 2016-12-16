var CKF = require('./CKF.js');
require('../less/transaction-history.less');

// other dependencies ...

module.exports = (function() {

	var moduleName = 'transactionHistory';
	var module = CKF.create(moduleName);

	return {
		init: function() {
			$('.js-transaction-history-time-box').on('click', 'a', function(e) {
				var type = $('.js-transaction-history-time-box').data('type');
				e.preventDefault();

				if ($('.js-transaction-history-time-box').hasClass('desc')) {
					window.location.href = '/cooka-finance-web/' + type + '?orderBy=asce';
				} else {
					window.location.href = '/cooka-finance-web/' + type + '?orderBy=desc';
				}
			});

			$('.bill-withdraw-time-box').on('click', 'a', function(e) {
				var type = $('.bill-withdraw-time-box').data('type');
				e.preventDefault();

				if ($('.bill-withdraw-time-box').hasClass('desc')) {
					window.location.href = '/cooka-store-web/' + type + '?orderBy=asce';
				} else {
					window.location.href = '/cooka-store-web/' + type + '?orderBy=desc';
				}
			});

			$('.dispute-time-box').on('click', 'a', function(e) {
				var type = $('.dispute-time-box').data('type');
				e.preventDefault();

				if ($('.dispute-time-box').hasClass('desc')) {
					window.location.href = '/cooka-order-web/' + type + '&orderBy=asce';
				} else {
					window.location.href = '/cooka-order-web/' + type + '&orderBy=desc';
				}
			});


			$('.confirm-withdraw').click(function(e) {
				e.preventDefault();
				var h = $(this).attr('href');
				if (confirm(__("Are you sure to confirm?"))) {
					$.ajax({
					type: "GET",
					contentType : 'application/json;charset=utf-8',
					url: h,
					success: function(result) {
						alert(__("confirm success"));
						window.location.href='/cooka-finance-web/withdrawHistory';
					},
					error: function() {
						alert('Error!!!');
					}
				});
				}
			});
		}
	};
})();