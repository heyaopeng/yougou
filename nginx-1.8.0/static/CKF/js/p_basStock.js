var CKF = require('./CKF.js');

module.exports = (function () {
	var moduleName = 'basStock';
	var module = CKF.create(moduleName);
    return {
        init: function () {
            module.each(function (index, elem) {
            	var $elem = $(elem);

            	$elem.on('click', function (e) {
            		e.preventDefault();
                    var info = $(this).closest('.bas-table').data('info');
                    var template = require('./hbs/basStock.handlebars');
                    var html = template(info);

            		CKF.notify({
            			type: 'bas-open-stock',
            			data: html
            		});
            	});
            });
        }
    };
})();