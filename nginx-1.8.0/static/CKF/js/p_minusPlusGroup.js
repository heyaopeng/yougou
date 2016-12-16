var CKF = require('./CKF.js');

var limited = window.location.href.indexOf('promotionProduct?') > -1;

module.exports = (function () {
    var moduleName = 'minusPlusGroup';
    var module = CKF.create(moduleName,true);

        function buildEvent(data) {
            if(data){
                module = CKF.rebuild(moduleName);
            }
            if(module!==null){
	            module.each(function (index, elem) {
	                var $elem = $(elem);
	                
	                var $max=$elem.data('max');
	                var $pack=$elem.data('pack');
	                $elem.minusPlusGroup(0,$max,$pack);
	            });
            }
       }


    return {
        init: function () {
            buildEvent();
            CKF.listen({
                'rebuild-event': buildEvent
            }, moduleName);
        }
    };
})();

(function($) {
    $.fn.minusPlusGroup = function (min,max,pack) {
        var $this = $(this);
        var $plusBtn = $this.find('.js-plus');
        var $minusBtn = $this.find('.js-minus');
        var $inputArea = $this.find('input[type="text"]');
        var $inputValue = $inputArea.val();
        var packMax = max;

        if(max%pack!==0){
            packMax = parseInt(max-max%pack);
        }

        $minusBtn.on('click', function () {
            $inputValue = parseInt($inputArea.val());
            if($inputValue>packMax) $inputValue=packMax;
            if($inputValue>parseInt(min)){
                $plusBtn.removeAttr('disabled');
                var newVal = $inputValue - parseInt(pack);
                $inputArea.val(newVal);

                // sometimes in need
                $this.trigger('minusPlusGroup.iptChange');
            }
            else{
                $minusBtn.attr('disabled','disabled');
            }

            // $('.js-say-more').addClass('hidden');
        });
        $plusBtn.on('click', function () {

            // cao ni mei
            if (limited) {
                var gg = false;
                $('.js-quantity').each(function(index, input) {
                    var $i = $(input);
                    if (parseInt($i.val()) >= 1) {
                        gg = true;
                        return false;
                    }
                });
                if (gg) {
                    return;
                }
            }

            $inputValue = $inputArea.val();
            if($inputValue<parseInt(max)) {
                $minusBtn.removeAttr('disabled');
                var newVal = $inputValue * 1 + parseInt(pack);

                if(newVal>max) newVal=max;
                $inputArea.val(newVal);

                // sometimes in need
                $this.trigger('minusPlusGroup.iptChange');
            }
            else{
                $plusBtn.attr('disabled','disabled');
               /* $('.js-say-more').removeClass('hidden');
                setTimeout(function() {
                    $('.js-say-more').addClass('hidden');
                }, 2000);*/
            }
        });
        $inputArea.on('keyup',function(e){
            var $inputValue = $(this).val();
            if($inputValue>parseInt(max)){
                $('.js-say-more').removeClass('hidden');
                $('.js-say-less').addClass('hidden');
            }
        });
        $inputArea.on('keydown blur', function (e) {
            var $inputValue = $(this).val();
            if (e.which === 13 || e.which === 32 || e.type === 'blur') {
                $inputValue = $inputValue.replace(/[^0-9]/ig, " ");
                $inputValue = $.trim($inputValue);
                if ($inputValue === '') {
                    $inputValue = parseInt(pack);
                    $inputArea.val($inputValue);
                }
                else {
                    $inputValue = parseInt($inputValue);
                    var $remainder = $inputValue%parseInt(pack);
                    if($remainder!==0){
                        $inputValue = $inputValue + parseInt(pack) - $remainder;
                    }
                    if($inputValue>=parseInt(max)){
                        $inputArea.val(parseInt(max));
                        $plusBtn.attr('disabled','disabled');
                    }
                    else{
                        $inputArea.val($inputValue);
                        $plusBtn.removeAttr('disabled');
                    }
                }

                $('.js-say-more').addClass('hidden');
                $('.js-say-less').removeClass('hidden');
                // sometimes in need
                e.preventDefault();
                $this.trigger('minusPlusGroup.iptChange');
            }
            else{
                // if($inputValue>parseInt(max)){
                //     $('.js-say-more').removeClass('hidden');
                //     $('.js-say-less').addClass('hidden');
                // }
            }
        });
    };

})(jQuery);