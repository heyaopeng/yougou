var CKF = require('./CKF.js');
require('../less/avatar-modal.less');
// other dependencies ...

module.exports = (function () {
    var moduleName = 'avatarModal';
    var module = CKF.create(moduleName);

    return {
        init: function () {
        	module.on('click','.js-avatar-btn',function(){
                module.find('.js-avatar-input').click();
            });
        	 
        	var $text = module.find('.avatar-modal-content-tip');
        	 module.find('.js-avatar-input').change(function() {
        		 if (this.files && this.files[0]) {
        				var file = this.files[0];
        				if (!/(png|jpg)$/i.test(file.name)) {       					
        					$('.js-avatar-input').val('');
        					$text.removeClass('avatar-modal-content-success').addClass('avatar-modal-content-error').text(__('You should choose a image file! (png,jpg)'));
        					return;
        				}
        				if (parseInt(file.size) >= 2* 1024 * 1024) {        					
        					$('.js-avatar-input').val('');
        					$text.removeClass('avatar-modal-content-success').addClass('avatar-modal-content-error').text(__('File should be smaller than 2MB!'));
        					return;
        				}
        				 module.find('#profile-form').ajaxSubmit({
                             url: '/cooka-user-web/center/uploadUserImage',
                             type: "POST",
                             success: function(result) {
                            	 $text.removeClass('avatar-modal-content-error').addClass('avatar-modal-content-success').text(__('upload Success!'));
                            	 module.find('.js-avatar-confirm').removeClass('disabled');
                                 module.find('.js-avatar-modal-img').attr('src',result);
                                 module.find('.js-confirm-input').prop('value',result);
                                 module.on('click','.js-avatar-confirm',function(){
                                     module.find('#profile-form').submit();
                                 });
                             }
                         });
                       
        		 }       		
        		  return false;
             });
        }
    };
})();