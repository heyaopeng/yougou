var CKF = require('./CKF.js');
require('../less/top-bar.less');
// other dependencies ...

require('bootstrap/js/dropdown.js');

module.exports = (function() {
	var moduleName = 'topBar';
	var module = CKF.create(moduleName);
	var $tUserName = module.find('.top-bar-user-name');
	var $tSignOut = module.find('.top-bar-sign-out');
	var $tSignIn = module.find('.top-bar-sign-in');
	var $tSignUp = module.find('.top-bar-sign-up');
	var $langSet = module.find('.top-bar-lang-set');

	function userSignIn(name) {
		$tUserName.removeClass('hide').find('a').text(name);
		$tSignOut.removeClass('hide');

		$tSignIn.addClass('hide');
		$tSignUp.addClass('hide');

		CKF.notify({
			type: 'hide-sign-modal',
			data: null
		});
	}

	return {
		init: function() {

			CKF.listen({
				'user-sign-in': userSignIn
			}, moduleName);

			module.on('click', '[data-action]', function() {
				var $btn = $(this);
				var action = $btn.data('action');

				if (action === 'signin') {
					CKF.notify({
						type: 'show-sign-in',
						data: null
					});
				} else if (action === 'signup') {
					CKF.notify({
						type: 'show-sign-up',
						data: null
					});
				}
			});
		}
	};
})();