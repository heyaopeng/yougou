var CKF = require('./CKF.js');

require('../less/pro-detail-info-color.less');

module.exports = (function () {
    var moduleName = 'proDetailColor';
    var module = CKF.create(moduleName,true);

    function getSrc(elem){
        var src = elem.attr('src');

        CKF.notify({
            type: 'perform-src',
            data: src
        });
    }

    function showColor(data) {
        if(module!==null){
        	var $elem = module;
            var $colorLi = $elem.find('.js-color-li');
            if($colorLi.hasClass('active')){
                var $a = $elem.find('a[href="#' + data.tabId + '"]');
                var $li = $a.parent('li');
                if (data.totalPiece>0) {
                    if($li.hasClass('has')){
                        $a.find('.pro-detail-info-color-count').text(data.totalPiece);
                    }
                    else{
                        $li.addClass('has');
                        $a.append('<span class="pro-detail-info-color-count">'+data.totalPiece+'</span>');                        
                    }
                }
                else {
                    $li.removeClass('has');
                    $a.find('.pro-detail-info-color-count').remove();
                }
            }
        }
    }

    function buildEvent(data) {
        if(data){
            module = CKF.rebuild(moduleName);
        }
        if(module!==null){
            var $elem = module;
            
            var $colorLi = $elem.find('.js-color-li');

            $colorLi.on('click',function(){
                getSrc($(this).find('img'));
            });
            
        }
    }

    return {
        init: function () {

            buildEvent();
            CKF.listen({
                'rebuild-event': buildEvent,
                'show-color':showColor
            }, moduleName);
        }
    };
})();