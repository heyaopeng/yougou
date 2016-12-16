require('./libs/bootstrap.min.js');
require('./p_cart.js');
require('./p_minus_plus_group.js');
require('./p_checkbox_linkage.js');
require('./ck_page.js');

$(document).ready(function () {
    $('.cart-block .input-pieces').minusPlusGroup();
    $('.cart-block .pro-check').on('change', function () {
        var $proItem = $(this).closest('.pro-item');
        var $cartBlock = $proItem.closest('.cart-block');
        var checkedBlock = $proItem.find('.size-checkbox');
        var $selectAll = $cartBlock.find('.select-all');
        $(this).checkboxLinkage(checkedBlock, $selectAll);
    });
    $('.cart-block .select-all').on('change', function () {
        var $this = $(this);
        var $cartBlock = $this.closest('.cart-block');
        var checkedBlock = $cartBlock.find('.size-checkbox');
        $(this).checkboxLinkage(checkedBlock.add('.cart-block .select-all'), null);
        checkedBlock.trigger('change');
    });

    $('.cart-block .trash-pro').on('click', function() {
        var conf = confirm(__('The product will be removed from Shopping Cart'));
        if (conf === true) {
            var item = $(this).closest('.pro-item');
            item.find('.pro-specific').each(function(idx,ele){
                $(ele).find('.trash-size').trigger('click',true);
            });
            item.find('.size-checkbox').trigger('change');
        }
    });

    $('.cart-block .remove-chosen').on('click', function () {
        var conf = confirm(__('The selected items will be removed from Shopping Cart'));
        if (conf === true) {
            $('.cart-block').find('.size-checkbox:checked').closest('.pro-specific')
                    .find('.trash-size').trigger('click', true);
        }
    });
    $('.cart-block .pro-item').cart();
    $('.cart-block').on('cart.submit', function () {
        var flag = true;
        var elem=$(this);
        elem.find('.say-below').each(function (idx, ele) {
            if (!($(ele).is(':hidden'))) {
                flag = false;
                return false;
            }
        });
        if ($('.cart-footer .cost').text() === '0') {
        	flag = false;
        }
        if(flag){
            elem.find('.cart-submit').removeAttr('disabled');
        }
        else{
            elem.find('.cart-submit').attr('disabled', 'disabled');
        }
        elem.find('.size-checkbox:checked').each(function(idx, ele) {
            var most=$(ele).closest('.pro-specific').data('most');
            if(most*1===0){
            	elem.find('.cart-submit').attr('disabled', 'disabled');
            }
        });
    });
});