var CKF = require('./CKF.js');
require('../less/pro-detail-mimg.less');

require('jquery-zoom/jquery.zoom.js');

module.exports = (function () {
    var moduleName = 'MImg';
    var module = CKF.create(moduleName);

    function performSrc(src) {
        module.find('img').attr('src',src);
        var height = module.find('img').height();
        module.find('.pro-detail-mimg-m').css('height',height+'px');
    }

    return {
        init: function () {
            var loadImg = false;
            module.find('.js-mimg-img').on('load',function(){  
                if(module.find('img').height()>0){                
                    loadImg = true;
                    var height = module.find('img').height();
                    module.find('.pro-detail-mimg-m').css('height',height+'px');
                } 
            });
            $(window).on('resize',function (){
                if(module.find('img').height()>0){                
                    loadImg = true;
                    var height = module.find('img').height();
                    module.find('.pro-detail-mimg-m').css('height',height+'px');
                } 
            });
            if(!loadImg){
                module.find('.js-mimg-img').trigger('load');
            }
        
            $('.pro-detail-mimg-m').zoom({
                target: '.pro-detail-mimg-zoom',
                magnify: 2.2,
                duration:0,
                onZoomIn:function(){
                    $('.pro-detail-mimg-zoom').css({'z-index':'100'});
                },
                onZoomOut:function(){
                    $('.pro-detail-mimg-zoom').css({'z-index':'0'});
                }
            });

            CKF.listen({
                'perform-src': performSrc
            }, moduleName);        
        }
    };
})();
