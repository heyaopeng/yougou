var CKF = require('./CKF.js');
var getCookie = require('./getCookie.js');
var lang = getCookie('language'); 
var Big =  require('big.js');
var currencyConfig = require('./currencyConfig.js');
require('../less/cart-pro.less');
/*require('bootstrap/js/transition.js');
require('bootstrap/js/carousel.js');
require('bootstrap/js/tab.js');*/

module.exports = (function () {
    var moduleName = 'cartPro';
    var module = CKF.create(moduleName,true);

    return {
        init: function () {
            if(module!==null){                    
                module.each(function (index, elem) {
                    var $this = $(elem);
                    var $proSpecific = $this.find('.js-cart-pro-comb');
                    var $checkSize = $this.find('.js-cart-pro-comb-check');
                    var $proTr = $this.find('tr');
                    var $checkPro = $this.find('.js-cart-pro-check');
                    var $sayBelow = $this.find('.say-below');
                    var countArr = $.trim($this.data('range').toString()).split(' ');
                    var priceArr = $.trim($this.data('cost').toString()).split(' ');
                    var LEAST_COUNT = countArr[0];
                    var totalPieces = 0;

                    // 留给廖明Ajax用到的辅助数据
                    var savePro = null;
                    var sizeId = null;
                    var inputVal = 1;

                    var nowPrice = new Big(priceArr[0]);
                    totalPieces = 0;
                    $proTr.each(function(idx, ele) {
                        if($(ele).find('.js-quantity').length!==0){                            
                            var eleInputArea = $(ele).find('.js-quantity');
                            var eleCost = $(ele).find('.js-cost');
                            var cost = new Big(eleInputArea.val()).times(nowPrice);
                            eleCost.text(CKF.util.fixPrice(cost.toFixed(currencyConfig)));
                        }
                    });

                    $checkSize.prop('checked',false);

                    function modify(elem) {
                        //修改
                        CKF.notify({
                            type: 'disable-ajax-loading',
                            data: null
                        });
                        var inputArea = elem.find('.js-quantity');
                        sizeId = elem.data('size-id');
                        inputVal = inputArea.val();
                        updateId = "id=" + elem.data('size-id') + "&num=" + inputArea.val();
                        $.ajax({
                            type: "post",
                            url: "/cooka-cart-web/updateItem.do",
                            data: updateId,
                            dataType: "html",
                            async: true,
                            success: function(data) {},
                            error: function(XMLHttpRequest, textStatus, errorThrown) {}
                        });
                    }

                    function sayBelow() {
                        if (totalPieces >= LEAST_COUNT) {
                            $sayBelow.addClass('hidden');
                        } else {
                            $sayBelow.removeClass('hidden');
                        }
                        CKF.notify({
                            type: 'cart-form-submit',
                            data: null
                        });
                    }

                    function settleTotalAccount() {
                        var nowPrice = priceArr[0];
                        totalPieces = 0;
                        $this.find('.js-cart-pro-comb-check:checked').each(function(idx, ele) {
                            nowPieces = $(ele).closest('.js-cart-pro-comb').find('.js-quantity').val();
                            totalPieces += parseInt(nowPieces);
                        });

                        if (totalPieces === 0) {
                            nowPrice = new Big(priceArr[0]);
                        } else {
                            for (var i = 0; i < countArr.length; i++) {
                                if (totalPieces >= countArr[i]) {
                                    nowPrice = new Big(priceArr[i]);
                                } else {
                                    break;
                                }
                            }
                        }
                        $proTr.each(function(idx, ele) {
                            var eleInputArea = $(ele).find('.js-quantity');
                            var eleCost = $(ele).find('.js-cost');
                            var cost = new Big(eleInputArea.val()).times(nowPrice);
                            eleCost.text(CKF.util.fixPrice(cost.toFixed(currencyConfig)));
                        });
                        CKF.notify({
                            type: 'get-cart-total'
                        });
                    }

                    function setProChecked() {
                        var flagChecked = true;
                        $this.find('.js-cart-pro-comb-check').each(function(idx, ele) {
                            if (!($(ele).is(':checked'))) {
                                flagChecked = false;
                                return false;
                            }
                        });
                        $checkPro.prop('checked', flagChecked);
                    }

                    function handleCheckSize() {
                        var flagclicked = true;
                        setProChecked();
                        settleTotalAccount();
                        $this.find('.js-cart-pro-comb-check').each(function(idx, ele) {
                            if ($(ele).is(':checked')) {
                                sayBelow();
                                flagclicked = false;
                                return false;
                            }
                        });
                        if (flagclicked) {
                            $sayBelow.addClass('hidden');
                            CKF.notify({
                                type: 'cart-form-submit',
                                data: null
                            });
                        }
                    }

                    $proSpecific.each(function(idx, ele) {
                        var elem = $(ele);
                        var inputArea = elem.find('.js-quantity');
                        var $checkSize = elem.find('.js-cart-pro-comb-check');

                        elem.on('minusPlusGroup.iptChange', function() {
                            modify(elem);
                            if(parseInt(inputArea.val())===0){
                                $checkSize.prop('checked', false);
                            }else{
                                $checkSize.prop('checked', true);
                            }
                            $checkSize.trigger('change');
                        });

                        $checkSize.on('change', function(e) {
                            if (!$(this).is(':checked')) {                                                       
                                handleCheckSize(e);
                            }
                            else{                            
                                handleCheckSize(e);
                                if(parseInt(inputArea.val())===0){
                                    $checkSize.prop('checked', false);
                                }
                            }
                        });
                    });

                    $checkPro.on('change', function(e) {
                        if ($(this).is(':checked')) {
                            $checkSize.prop('checked', true);
                            handleCheckSize(e);
                        } else {
                            $checkSize.prop('checked', false);
                            settleTotalAccount();
                            $sayBelow.addClass('hidden');

                            CKF.notify({
                                type: 'cart-form-submit',
                                data: null
                            });
                        }
                    });

                    $this.find('.js-cart-pro-collect').on('click', function() {
                        if(!$this.find('.js-cart-pro-collect').hasClass('active')){
                           CKF.notify({
                                type: 'enable-ajax-loading',
                                data: null
                            });

                            //收藏商品
                            savePro = $this.data('pro-id');
                            var collect = {};
                            collect['productId'] = savePro;
                            
                          /*  collect['title'] = $.trim($this.find('.cart-pro-title-name').text());
                            collect['imageUrl'] = $this.find('.cart-pro-head img').attr("src");
                            collect['price'] = priceArr[countArr.length - 1];*/
                            
                            $.ajax({
                                type: "post",
                                url: "/cooka-productDetail-web/addProToFavourite.do",
                                contentType: "application/json; charset=UTF-8",
                                data: JSON.stringify(collect),
                                dataType: "html",
                                async: true,
                                success: function(data) {                         
                                    $this.find('.js-cart-pro-collect').addClass('active').attr('title',__('already collected'));
                                },
                            }); 
                        }                    
                    });

                    $this.find('.js-cart-pro-remove').on('click', function(e,all) {
                        CKF.notify({
                            type: 'enable-ajax-loading',
                            data: null
                        });
                        var $ele=$(this);
                        var conf = false;
                        if(all!==true){
                           conf = confirm(__('The product will be removed from Shopping Cart')); 
                        }                    
                        if (conf===true||all===true) {
                            $.ajax({
                                type: "post",
                                url: "/cooka-cart-web/delectProItem",//change
                                data: "proId="+$this.data('pro-id'),
                                dataType: "html"
                            });

                            if ($ele.closest('.cart-pro').siblings('.cart-pro').length === 0) {
                                if($ele.closest('.cart-group').siblings('.cart-group').length === 0){
                                    $ele.closest('.cart-group').remove();
                                    $('.cart-footer').remove();

                                    CKF.notify({
                                        type: 'cart-empty'
                                    });
                                }
                                else{
                                    $ele.closest('.cart-group').remove();
                                }
                            }
                            else{
                                $this.remove();
                            }
                            setProChecked();

                            CKF.notify({
                                type: 'get-cart-total'
                            });
                        }
                    });
                });
            }

            CKF.listen({
                'cart-pro-comb-check': function cartProCombCheck(combCheck) {
                    module.find('.js-cart-pro-check').prop('checked', combCheck).trigger('change');
                },
                'remove-all':function removeAll(){
                    module.find('.js-cart-pro-check:checked').each(function(idx,ele){
                        $(ele).closest('.cart-pro').find('.js-cart-pro-remove').trigger('click',[true]);
                    });
                    module.find('.js-cart-pro-comb-check:checked').each(function(idx,ele){
                        var $ele = $(ele);
                        var $parent = $ele.closest('.js-cart-pro-comb');
                        var $proParent = $parent.closest('.cart-pro');
                        $.ajax({
                            type: "post",
                            url: "/cooka-cart-web/delectComItem",//change
                            data: "comId="+$ele.closest('.js-cart-pro-comb').data('size-id'),
                            dataType: "html",
                            async: true,
                            success: function(data) {
                                if($parent.find('.js-cart-pro-remove').length===0){
                                    $parent.remove();
                                }
                                else{
                                    $next = $proParent.find('.js-cart-pro-comb-check')
                                            .not(':checked').eq(0)
                                            .closest('.js-cart-pro-comb');
                                    $parent.find('td').each(function(idx,ele){
                                        var $thisTd = $(ele);
                                        if($thisTd.attr('rowspan')>1){
                                            $thisTd.clone(true)
                                            .insertAfter(
                                            $next.find('td').eq(idx-1));
                                        }
                                    });
                                    $parent.remove();
                                }
                                
                                $proParent.find('.say-below').addClass('hidden');
                                var flagChecked = true;
                                $ele.closest('.cart-pro').find('.js-cart-pro-comb-check').each(function(idx, ele) {
                                    if (!($(ele).is(':checked'))) {
                                        flagChecked = false;
                                        return false;
                                    }
                                });
                                $ele.closest('.cart-pro').find('.js-cart-pro-check').prop('checked', flagChecked);

                                CKF.notify({
                                    type: 'get-cart-total'
                                });
                            }
                        });
                    });
                },
                'collect-all':function collectAll(){
                    var selected = false;
                    module.each(function(idx,ele){
                        var $this = $(ele);
                        var $checked =  $this.find('.js-cart-pro-comb-check:checked');
                        if($checked.length>0){
                            $this.find('.js-cart-pro-collect').trigger('click');
                            selected = true;
                        }
                    });
                    if(!selected){
                        alert(__('Please choose some item'));
                    }
                },
                'remove-disabled':function removeDisabled(){
                    module.each(function(index, el) {
                        var $el =$(el);
                        if($el.hasClass('disabled')){
                            $el.find('.js-cart-pro-remove').trigger('click',[true]);
                        }
                    });
                }
            }, moduleName);
        }
    };
})();