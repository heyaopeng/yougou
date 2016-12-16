var CKF = require('./CKF.js');
require('../less/bas-search.less');

var getCookie = require('./getCookie.js');
var lang = getCookie('language');

// bootstrap datepicker
require('bootstrap-datepicker/dist/js/bootstrap-datepicker.js');
require('bootstrap-datepicker/dist/css/bootstrap-datepicker3.standalone.css');

// form validation
require('../css/formValidation.min.css');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');

module.exports = (function () {
	var moduleName = 'basSearch';
	var module = CKF.create(moduleName);

	var $dateRange = module.find('.input-daterange');
	var $form = module.find('#bas-search-form');

    return {
        init: function () {
            $dateRange
				.datepicker({
					format: "yyyy/mm/dd",
					todayHighlight: true
				})
				.on('changeDate', function() {
					$form.formValidation('revalidateField', 'f-date');
				});

			$form.formValidation({
				framework: 'bootstrap',
				icon: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
				},
				fields: {
					"f-date": {
						selector: '#bas-search-form .f-date',
						validators: {
							date: {
								format: 'YYYY/MM/DD',
								message: __('Not a valid date')
							}
						}
					}
				}
			}).on('err.validator.fv', function(e, data) {
				data.element
					.data('fv.messages')
					.find('.help-block[data-fv-for="' + data.field + '"]').hide()
					.filter('[data-fv-validator="' + data.validator + '"]').show();
			});
        }
    };
})();