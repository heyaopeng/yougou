var CKF = require('./CKF.js');

module.exports = (function () {
	var moduleName = 'aa';

	var module = CKF.create(moduleName);

	function a() {
		console.log('AAA');
	}

	return {
		init: function () {
			CKF.listen({
				'aa': a
			}, moduleName);

			module.on('click', 'button', function () {
				CKF.notify({
					type: 'bb',
					data: null
				});

				// CKF.destroy('aa');
			});
		}
	};
})();