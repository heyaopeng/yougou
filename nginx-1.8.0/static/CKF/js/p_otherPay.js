var CKF = require('./CKF.js');
require('../less/pay-other.less');


// other dependencies ...

module.exports = (function () {
   var moduleName = 'payOther';
	var module = CKF.create(moduleName);

	return {
		init: function() {
			module.on('click','.js-ali',function(){				
				module.find('.js-pay-other-ali').slideDown('fast');
				module.find('.pay-other-item').slideUp('fast');
			})
			module.on('click','.js-back',function(){				
				module.find('.js-pay-other-ali').slideUp('fast');
				module.find('.pay-other-item').slideDown('fast');
			})
			module.on('click','.js-wechat',function(){				
				module.find('.js-pay-other-wechat').slideDown('fast');
				module.find('.pay-other-item').slideUp('fast');
			})
			module.on('click','.js-back',function(){				
				module.find('.js-pay-other-wechat').slideUp('fast');
				module.find('.pay-other-item').slideDown('fast');
			})
		}
	};
})();