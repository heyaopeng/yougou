var CKF = require('./CKF.js');

module.exports = (function () {
	var moduleName = 'bb';

	var module = CKF.create(moduleName);

	return {
		init: function () {
			module.each(function (index, elem) {
				$(elem).on('click', 'button', function () {
					CKF.notify({
						type: 'aa',
						data: null
					});
				});
			});
		}
	};
})();