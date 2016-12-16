var CKF = require('./CKF.js');
require('../less/cart-store.less');

module.exports = (function () {
    var moduleName = 'cartStore';
    var module = CKF.create(moduleName,true);

    return {
        init: function () {
            if(module!==null){                    
                module.each(function (index, elem) {
                    var $elem = $(elem);

                    var $control = $elem.find('.js-control');
                    var $show = $elem.find('.js-show');
                    var $iconDown = $elem.find('.js-down');
                    var $iconRight = $elem.find('.js-right');
                    $control.on('click',function(){
                        $iconRight.toggleClass('hidden').stop();
                        $iconDown.toggleClass('hidden').stop();
                        $show.toggleClass('hidden').stop();
                    });

                });
            }
        }
    };
})();

