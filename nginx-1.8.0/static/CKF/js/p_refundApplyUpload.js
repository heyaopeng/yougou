var CKF = require('./CKF.js');
require('jquery-form/jquery.form.js');

module.exports = (function() {
	var moduleName = 'refundApplyUpload';
	var module = CKF.create(moduleName,true);

	function uploadLocalImage($ele) {

		//Here is new code with 'jquery.form.js'
		
		if($ele.find('.js-img-box:hidden').length>0){
			$ele.find('.js-img-box:hidden:eq(0) img').prop('src',url);
		}
		else{
			alert('up to 3 pictures');
		}
		var options = {
			type: "POST",
			url: '/cooka-product-web/doUploadImage.do',
			cache: false,
			contentType: false,
			processData: false,
			success: function(url) {
			},
			error: function() {
				alert('Error!!!');
			}
		};
		$ele.closest('form').ajaxSubmit(options);
		return false;
	}

	return {
		init: function() {
			if(module!==null){
					module.each(function(idx,ele){
					var $ele=$(ele);
					var $btn = $ele.find('.js-btn');
					var $ipt= $ele.find('.js-ipt');
					$btn.on('click',function(){
						$ipt.trigger('click');
					});

					$ipt.on('change',function(){
						uploadLocalImage($ele);
					});

				});

			}
		}
	};
})();