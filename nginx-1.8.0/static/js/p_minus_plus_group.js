(function($) {
    $.fn.minusPlusGroup = function () {
        return this.each(function (index, ele) {
            var $this = $(ele);
            var $plusBtn = $this.find('button').has('.glyphicon-plus');
            var $minusBtn = $this.find('button').has('.glyphicon-minus');
            var $inputArea = $this.find('input[type="text"]');
            var $inputValue = $inputArea.val();

            $minusBtn.on('click', function () {
                $inputValue = $inputArea.val();
                var newVal = $inputValue - 1;
                $inputArea.val(newVal);
            });
            $plusBtn.on('click', function () {
                $inputValue = $inputArea.val();
                var newVal = $inputValue * 1 + 1;
                $inputArea.val(newVal);
            });
            $inputArea.on('keydown blur', function (e) {
                if (e.which === 13 || e.which === 32 || e.type === 'blur') {
                    var $inputValue = $(this).val();
                    $inputValue = $inputValue.replace(/[^0-9]/ig, " ");
                    $inputValue = $.trim($inputValue);
                    if ($inputValue === '') {
                        $inputValue = 1;
                    }
                    else {
                        $inputValue = parseInt($inputValue);
                    }
                    $inputArea.val($inputValue);
                    e.preventDefault();
                }
            });
        });
    };

})(jQuery);