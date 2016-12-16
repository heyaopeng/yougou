var CKF = require('./CKF.js');
require('../less/rank-sidebar.less');

//bootstrap js
require('bootstrap/js/collapse.js');
// other dependencies ...

module.exports = (function () {
    var moduleName = 'rankSidebar';
    var module = CKF.create(moduleName);
    return {
        init: function () {
           /* //init sidebar status
            var $item = module.find('.rank-sidebar-item');
            $item.each(function(e){
                var $that = $(this);
                var hasOpen = $that.hasClass('is-open');
                if(hasOpen)
                    $that.find('.collapse').addClass('in');
            });*/
            //click event sidebar
            module.on('click', '.rank-sidebar-item-title', function (e) {
                e.preventDefault();
                var $this = $(this);
                var $par = $this.closest('.rank-sidebar-item');
                var hasSub = $par.find('.rank-sidebar-item-inner').length;
                if(hasSub){
                    $par.toggleClass('is-closed').toggleClass('is-open');
               }
            });
        }
    };
})();