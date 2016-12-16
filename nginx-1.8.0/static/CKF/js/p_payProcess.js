var CKF = require('./CKF.js');
require('../less/pay-process.less');

//bootstrap js
require('bootstrap/js/collapse.js');
// other dependencies ...
var getCookie = require('./getCookie.js');
var lang = getCookie('language');

require('../css/formValidation.min.css');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');

module.exports = (function () {
    var moduleName = 'payProcess';
    var module = CKF.create(moduleName);
    return {
        init: function () {
            //click event pay process
            module.on('click', '.collapse-button', function (e) {
                e.preventDefault();
                var $this = $(this);
                var $par = $this.closest('.pay-process-floor');
                var hasSub = $par.find('.pay-process-body').length;
                if(hasSub){
                    $par.toggleClass('is-closed').toggleClass('is-open');
                }
            });
            
            //password input handle start
            var $psdRadio = module.find('.js-payment-radio');
            var $psdInput = module.find('.js-pay-process-psd');
            function showPsdInput(){
            	var isNeedPsd = $psdRadio.prop('checked');  
                if(!isNeedPsd){
                  if($('f-password').is(':visible')){
                    $('#pay-process-form').data('formValidation').resetField('f-password',true);
                  }
                	
                	$psdInput.addClass('hide');
                }
                	
                else
                	$psdInput.removeClass('hide');
            }
            showPsdInput();
            module.on('change', '.js-payment-type', function (e) {
            	showPsdInput();
            });
          //password input handle end
            
            var $payProcessForm = module.find('#pay-process-form');
            $payProcessForm.formValidation({           
           	 icon: {
                   valid: 'glyphicon glyphicon-ok',
                   invalid: 'glyphicon glyphicon-remove',
                   validating: 'glyphicon glyphicon-refresh'
               },           
               fields: {                 
                   'f-password': {
                       selector: '.f-password',
                       validators: {
                           notEmpty: {
                               message:__("The password is required and can't be empty")
                           },
                           stringLength: {
                        	   min: 6,
                               message: __('The password must be up to six digits')
                           }
                       }
                   }
               }
           })
           .on('err.validator.fv', function(e, data) {
               data.element
                   .data('fv.messages')
                   .find('.help-block[data-fv-for="' + data.field + '"]').hide()
                   .filter('[data-fv-validator="' + data.validator + '"]').show();
           });
           
        }
    };
})();