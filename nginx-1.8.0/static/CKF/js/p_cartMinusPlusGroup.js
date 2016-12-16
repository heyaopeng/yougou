var CKF = require('./CKF.js');

module.exports = (function () {
    var moduleName = 'cartMinusPlusGroup';
    var module = CKF.create(moduleName,true);

    return {
        init: function () {
            if(module!==null){
                module.each(function (index, elem) {
                    var $elem = $(elem);
                    var $max=parseInt($elem.data('max'));
                    var $pack=parseInt($elem.data('pack'));
                    var inputArea = $elem.find('input[type="text"]');
                    var newVal = inputArea.val();
                    if (newVal >= $max) {
                        inputArea.val($max);
                    }
                    if (newVal <= $pack) {
                        inputArea.val($pack);
                    }
                    $elem.minusPlusGroup(1,$max,$pack);
                });
            }
        }
    };
})();

(function($) {
    $.fn.minusPlusGroup = function (min,max,pack) {
        var $this = $(this);
        var $plusBtn = $this.find('.js-plus');
        var $help = $this.next('.js-help');//添加
        var $minusBtn = $this.find('.js-minus');
        var $inputArea = $this.find('input[type="text"]');
        var $inputValue = $inputArea.val();        
        var packMax = max;

        if(max%pack!==0){
            packMax = max-max%pack;
        }
        if(min%pack!==0){
            min = min+min%pack;
        }

        $minusBtn.on('click', function () {
            $inputValue = $inputArea.val();
            if($inputValue>packMax) $inputValue=packMax;
            $help.addClass('hidden');
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
        });
        $plusBtn.on('click', function () {
            $inputValue = $inputArea.val();
            if($inputValue<parseInt(max)) {
                $minusBtn.removeAttr('disabled');
                var newVal = parseInt($inputValue) + parseInt(pack);
                if(newVal>max) newVal=max;
                $inputArea.val(newVal);
                $help.addClass('hidden');

                // sometimes in need
                $this.trigger('minusPlusGroup.iptChange');
            }
            else{
                $help.removeClass('hidden');
                $plusBtn.attr('disabled','disabled');
                setTimeout(hiddenHelp,1500);
            }
        });
        function hiddenHelp(){
            $help.addClass('hidden');
        }
        $inputArea.on('keyup',function(e){
            var $inputValue = $(this).val();
            if($inputValue>parseInt(max)){
                $help.removeClass('hidden');
                $('.say-below').addClass('hidden');
            }
        });
        $inputArea.on('keydown blur', function (e) {
            var $inputValue = $(this).val();
            if (e.which === 13 || e.which === 32 || e.type === 'blur') {                
                $inputValue = $inputValue.replace(/[^0-9]/ig, " ");
                $inputValue = $.trim($inputValue);
                if ($inputValue === ''||parseInt($inputValue)<parseInt(pack)) {
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
                        $help.removeClass('hidden');
                        $plusBtn.attr('disabled','disabled');
                        $minusBtn.removeAttr('disabled');//添加这一句
                    }
                    else{
                        $inputArea.val($inputValue);
                        $help.addClass('hidden');
                        $plusBtn.removeAttr('disabled');
                    }
                }
                $help.addClass('hidden');
                e.preventDefault();
                // sometimes in need
                $this.trigger('minusPlusGroup.iptChange');
            }
            else{
                /*if($inputValue>parseInt(max)){

                    $help.removeClass('hidden');
                    $('.say-below').addClass('hidden');
                }*/
            }
        });
    };

})(jQuery);