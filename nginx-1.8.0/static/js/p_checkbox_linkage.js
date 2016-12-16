(function($) {
        
    $.fn.checkboxLinkage = function(checkedBlock, uncheckedBlock) {
        return this.each(function(index, ele) {
            var $this = $(ele);
            if (checkedBlock !== null) {
                if ($this.is(':checked')) {
                    checkedBlock.prop('checked', true);
                } else {
                    checkedBlock.prop('checked', false);
                    if (uncheckedBlock !== null) {
                        uncheckedBlock.prop('checked', false);
                    }
                }
            }
        });
    };

})(jQuery);