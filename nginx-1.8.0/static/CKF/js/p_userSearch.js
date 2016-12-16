var CKF = require('./CKF.js');
require('../less/user-search.less');

var getCookie = require('./getCookie.js');
var lang = getCookie('language');

// bootstrap datepicker
require('bootstrap-datepicker/dist/js/bootstrap-datepicker.js');
require('bootstrap-datepicker/dist/css/bootstrap-datepicker3.standalone.css');

// form validation
require('../css/formValidation.min.css');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');

module.exports = (function() {
	var moduleName = 'userSearch';
	var module = CKF.create(moduleName);

	var $dateRange = module.find('.input-daterange');
	var $form = module.find('#user-search-form');
	var $range = module.find('.user-search-range');

	return {
		init: function() {
			module.find('ul.user-search-classify-items').find('a').each(function(index, elem) {
				var $a = $(elem);
				$a.prop('title', $a.text().trim());
			});

			$dateRange
				.datepicker({
					format: "yyyy/mm/dd",
					todayHighlight: true,
					todayBtn: true
				})
				.on('changeDate', function() {
					$form.formValidation('revalidateField', 'f-date');
					$range.val('');
				});

			$range.on('change', function () {
				var v = $(this).val();
				if (v !== '') {
					$form.data('formValidation').resetForm();
					$dateRange.find('.f-date').val('');
				}

				var today = new Date();
				if (v === '1') {
					today.setMonth(today.getMonth() - 1);
					$dateRange.find('.f-date').eq(0).datepicker('update', today);
					$dateRange.find('.f-date').eq(1).datepicker('update', new Date());
				}
				else if (v === '2') {
					today.setMonth(today.getMonth() - 3);
					$dateRange.find('.f-date').eq(0).datepicker('update', today);
					$dateRange.find('.f-date').eq(1).datepicker('update', new Date());
				}
				else if (v === '3'){
					today.setMonth(today.getMonth() - 3);
					$dateRange.find('.f-date').eq(0).datepicker('update', new Date(0));
					$dateRange.find('.f-date').eq(1).datepicker('update', today);
				}

			});

			$form.formValidation({
				framework: 'bootstrap',
				row: {
					selector: 'div.col-md-5'
				},
				fields: {
					"f-date": {
						selector: '#user-search-form .f-date',
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