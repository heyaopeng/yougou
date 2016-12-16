var CKF = require('./CKF.js');

module.exports = (function () {
	var moduleName = 'basHistory';
	var module = CKF.create(moduleName);
    return {
        init: function () {
            module.each(function (index, elem) {
            	var $elem = $(elem);

            	$elem.on('click', function (e) {
            		e.preventDefault();
                    var info = JSON.parse($(this).closest('.bas-table').data('info'));
                    var template = require('./hbs/basHistory.handlebars');
                    var html = template(info);

            		CKF.notify({
            			type: 'bas-open-history',
            			data: html
            		});
            	});
            });
        }
    };
})();