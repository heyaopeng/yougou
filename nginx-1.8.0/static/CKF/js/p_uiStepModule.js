var CKF = require('./CKF.js');
require('../less/ui-step-module.less');
// other dependencies ...

module.exports = (function () {
	var moduleName = 'uiStepModule';
    var module = CKF.create(moduleName);

    // 当前步
    function nowActive(ob){
    	var $index;
    	var $tOb;
		ob.each(function(index, el) {
    		var $this = $(this);
    		if ($this.hasClass('ui-step-active')) {
    			$index = index;
    			$tOb = $this;

                return {
                    index: $index,
                    tob: $tOb
                };
    		}
    	});

    	return {
    		index: $index,
    		tob: $tOb
    	};
    }

    // 下一步
    function nextActive(){
        module.each(function(index, el) {
            var $this = $(this);
            var $moduleContent = $this.find('.ui-step-flow');
    	    var $allStep = $moduleContent.find('li');
            if (!$($allStep[$allStep.length-1]).hasClass('ui-step-active')) {
                var active = $moduleContent.find('.ui-step-active');
                var nextActive = active.next('li');
                active.removeClass('ui-step-active');
                nextActive.addClass('ui-step-active');
            }
        });
    }
    
    // 初始化
    function stepInit(){
    	module.find('.ui-step-active').removeClass('ui-step-active');
    	module.find('.ui-step-flow').find('li:first-child').addClass('ui-step-active');
    }

	return {
		init: function () {
			CKF.listen({
				'next-active': nextActive,
				'step-init': stepInit
			}, moduleName);
		}
	};
})();