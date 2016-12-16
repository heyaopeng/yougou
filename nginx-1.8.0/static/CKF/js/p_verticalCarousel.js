var CKF = require('./CKF.js');

module.exports = (function () {
    var moduleName = 'verticalCarousel';
    var module = CKF.create(moduleName);

    function handleCarouselNext(elem) {
        var moduleHeight = parseInt(module.find('.js-contain').css('height'));
        var ul = elem.find('.js-ul');
        var li = ul.find('.js-li');
        var liHeight = parseInt(li.css('height'));
        var topVal = parseInt(ul.css('top'));

        if(moduleHeight - topVal < parseInt(ul.css('height'))){
            topVal= topVal-liHeight;
            ul.animate({top:topVal+'px'});
        }
    }

    function handleCarouselPrev(elem) {
        var ul=elem.find('.js-ul');
        var li=ul.find('.js-li');
        var liHeight=parseInt(li.css('height'));
        var topVal=parseInt(ul.css('top'));
        if(topVal<0) {
            topVal=topVal+liHeight;
            ul.animate({top: topVal + 'px'});
        }
    }

    function getSrc(elem){
    var src = elem.attr('src');

        CKF.notify({
            type: 'perform-src',
            data: src
        });
    }

    return {
        init: function () {
            module.each(function (index, elem) {
                var $elem = $(elem);

                var $iconDown = $elem.find('.js-down');
                var $iconUp = $elem.find('.js-up');

                $iconDown.on('click', function (e) {
                        e.preventDefault();
                    var ul = $elem.find('.js-ul');
                    if(!ul.is(':animated')) {
                        handleCarouselNext($elem);
                    }
                });
                $iconUp.on('click', function (e) {
                        e.preventDefault();
                    var ul = $elem.find('.js-ul');
                    if(!ul.is(':animated')) {
                        handleCarouselPrev($elem);
                    }
                });

                var $li = $elem.find('.js-li');

                $li.each(function(idx,ele){
                        $(ele).on('mouseenter',function(){
                        var ele=$(this);
                        ele.addClass('active');
                        ele.siblings().removeClass('active');
                        getSrc(ele.find('img'));
                    });
                });


            });
        }
    };
})();
