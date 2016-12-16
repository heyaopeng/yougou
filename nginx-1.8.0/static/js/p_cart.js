(function($) {
    $.fn.cart = function() {
        return this.each(function(index, ele) {
            var $this = $(ele);
            var $proSpecific = $this.find('.pro-specific');
            var $checkSize = $proSpecific.find('.size-checkbox');
            var $removeSize = $proSpecific.find('button').has('.glyphicon-trash');
            var $cartBlock = $this.closest('.cart-block');

            var $proTr = $this.find('tr');
            var $sayBelow = $this.find('.say-below');
            var $checkPro = $this.find('.pro-check');
            var $proHead = $this.find('.pro-head');
            var $submitBtn = $cartBlock.find('button[type="submit"]');

            var $footer = $cartBlock.find('.cart-footer');
            var $accountArea = $footer.find('.cost');
            var LEAST_COUNT = $sayBelow.data('least');

            // 判断价格用到的变量
            var $priceBlock = $this.find('.pro-price');
            var $priceArea = $priceBlock.find('dd');
            var $countArea = $priceBlock.find('dt');
            var totalPieces = 0;
            var countArr = [];
            var priceArr = [];

            // 留给廖明Ajax用到的辅助数据
            var savePro = null;
            var sizeId = null;
            var proId = null;
            var inputVal = 1;

            // 初始化加减按钮状态
            $proSpecific.each(function(idx, ele) {
            	var elem = $(ele);
            	var inputArea = elem.find('.f-pieces');
            	var MOST_COUNT = inputArea.data('most');
                setDisable($(ele).find('.f-pieces').val(), $(ele), MOST_COUNT);
            });


            // countArr
            $countArea.each(function(idx, ele) {

                // 非数字的字符替换成空格
                var count = $(ele).text().replace(/[^0-9]/ig, " ");
                count = $.trim(count);

                // 这里只保留每一栏价格段里面小的值，也就是说当前的价格要num件以上
                countArr.push(parseInt(count));
            });
            LEAST_COUNT = countArr[0];

            // priceArr
            $priceArea.each(function(idx, ele) {
                priceArr.push($(ele).text());
            });


            settleTotalAccount();

            function setDisable(newVal, elem, MOST_COUNT) {
                var plusBtn = elem.find('button').has('.glyphicon-plus');
                var minusBtn = elem.find('button').has('.glyphicon-minus');
                var sayAvailable = elem.find('.say-available');
                var inputArea = elem.find('.f-pieces');
                if (newVal >= MOST_COUNT) {
                    sayAvailable.removeClass('hidden');
                    inputArea.val(MOST_COUNT);
                    plusBtn.attr('disabled', 'disabled');
                } else {
                    plusBtn.removeAttr('disabled');
                    sayAvailable.addClass('hidden');
                }
                if (newVal <= 1) {
                    inputArea.val(1);
                    minusBtn.attr('disabled', 'disabled');
                } else {
                    minusBtn.removeAttr('disabled');
                }
            }

            function modify(elem) {
                //修改
                var inputArea = elem.find('.f-pieces');
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
                $cartBlock.trigger('cart.submit');
            }

            function settleTotalAccount() {
                var nowPrice = priceArr[0];
                var account = 0;
                totalPieces = 0;
                $this.find('.size-checkbox:checked').each(function(idx, ele) {
                    nowPieces = $(ele).closest('.pro-specific').find('.f-pieces').val();
                    totalPieces += nowPieces * 1;
                });

                if (totalPieces === 0) {
                    nowPrice = priceArr[0];
                } else {
                    for (var i = 0; i < countArr.length; i++) {
                        if (totalPieces >= countArr[i]) {
                            nowPrice = priceArr[i];
                        } else {
                            break;
                        }
                    }
                }
                $proTr.each(function(idx, ele) {
                    var eleInputArea = $(ele).find('.f-pieces');
                    var eleCost = $(ele).find('.cost p');
                    eleCost.text((eleInputArea.val() * 100) * (nowPrice * 100) / Math.pow(100, 2));
                });
                $cartBlock.find('.size-checkbox:checked').each(function(idx, ele) {
                    nowCost = $(ele).closest('tr').find('.cost p').text();
                    account += nowCost * 1;
                });
                $accountArea.text(account);
                if (account === 0) {
                    $submitBtn.attr('disabled', 'disabled');
                }
            }

            function setProChecked() {
                var flagChecked = true;
                $this.find('.size-checkbox').each(function(idx, ele) {
                    if (!($(ele).is(':checked'))) {
                        flagChecked = false;
                        return false;
                    }
                });
                if (flagChecked) {
                    $checkPro.prop('checked', true);
                } else {
                    $checkPro.prop('checked', false);
                    $('.cart-block .select-all').prop('checked', false);
                }


                var flagAll = true;
                $cartBlock.find('.pro-check').each(function(idx, ele) {
                    if (!($(ele).is(':checked'))) {
                        flagAll = false;
                        return false;
                    }
                });
                if (flagAll) {
                    $('.cart-block .select-all').prop('checked', true);
                } else {
                    $('.cart-block .select-all').prop('checked', false);
                }
            }

            function handleCheckSize() {
                var flagclicked = true;
                setProChecked();
                settleTotalAccount();
                $this.find('.size-checkbox').each(function(idx, ele) {
                    if ($(ele).is(':checked')) {
                        sayBelow();
                        flagclicked = false;
                        return false;
                    }
                });
                if (flagclicked) {
                    $sayBelow.addClass('hidden');
                }
                $cartBlock.trigger('cart.submit');
            }

            function handleRemoveSize(e) {
                var item = e.closest('.pro-specific');
                var $proSpecific = item.closest('.pro-item').find('.pro-specific');
                var firstTr = item.closest('.pro-item').find('tr:first-child');
                var priceBlock = firstTr.find('.pro-price');

                var nowRows = priceBlock.attr('rowspan');
                if ($proSpecific.length === 1) {
                    $this.remove();
                    if ($cartBlock.find('.pro-item').length === 0) {
                        $('.cart-block').siblings('.empty-cart').removeClass('hidden');
                        $('.cart-block').remove();
                    }
                } else {
                    priceBlock.attr('rowspan', nowRows - 1);
                    if (item.find('td').length === 6) {
                        priceBlock.clone().insertBefore(item.next().find('td:eq(2)'));
                        item.find('.pro-img').clone().insertBefore(item.next().find('td:eq(0)'));
                    }
                    item.remove();
                }
                handleCheckSize(e);
            }

            $proSpecific.each(function(idx, ele) {
                var elem = $(ele);
                var inputArea = elem.find('.f-pieces');
                var MOST_COUNT = inputArea.data('most');

                // 编辑某一项的件数时，对应的尺寸checkbox状态为checked
                inputArea.on('keydown blur', function(e) {
                    var $checkSize = elem.find('.size-checkbox');
                    if (e.which === 13 || e.which === 32 || e.type === 'blur') {
                        setDisable(inputArea.val(), elem, MOST_COUNT);
                        modify(elem);
                        $checkSize.prop('checked', true);
                        setProChecked();
                        settleTotalAccount();
                        sayBelow();
                    }
                });

                elem.find('.input-group button').on('click', function() {
                    var $inputArea = elem.find('.f-pieces');
                    var $checkSize = elem.find('.size-checkbox');

                    setDisable($inputArea.val(), elem, MOST_COUNT);
                    modify(elem);
                    $checkSize.prop('checked', true);
                    settleTotalAccount();
                    setProChecked();
                    sayBelow();
                });

                $checkSize.on('change', function(e) {
                    handleCheckSize(e);
                    if (!$(this).is(':checked')) {
                        $(this).closest('.pro-item').find('.pro-check').prop('checked', false);
                        $('.cart-block .select-all').prop('checked', false);
                        settleTotalAccount();
                    }
                });
            });

            $checkPro.on('change', function(e) {
                if ($(this).is(':checked')) {
                    handleCheckSize(e);
                } else {
                    settleTotalAccount();
                    $sayBelow.addClass('hidden');
                    $cartBlock.trigger('cart.submit');
                }
            });

            $removeSize.each(function() {
                $(this).on('click', function(e, param) {
                    var conf = null;
                    if (param === undefined) {
                        conf = confirm(__('The specifications will be removed from Shopping Cart'));
                    }
                    if (conf === true || param) {
                        var item = $(this).closest('.pro-specific');

                        // 留给廖明Ajax用到的辅助数据，删除规格
                        proId = item.closest('.pro-item').data('pro-id');
                        itemId = "id=" + item.data('size-id');
                        $.ajax({
                            type: "post",
                            url: "/cooka-cart-web/delectItem.do",
                            data: itemId,
                            dataType: "html",
                            async: true,
                            success: function(data) {
                                console.log(data);
                            },
                            error: function(XMLHttpRequest, textStatus, errorThrown) {
                                console.log(XMLHttpRequest.status);
                                console.log(XMLHttpRequest.readyState);
                                console.log(textStatus);
                            }
                        });
                        handleRemoveSize($(this));
                    }
                });
            });
            $proHead.find('.star-empty-pro').on('click', function(e) {
                var tar = $(e.target);
                var conf = confirm(__('Successfully collected'));
                if (conf === true) {
                    var item = tar.closest('.pro-item');
                    //收藏商品
                    savePro = item.data('pro-id');

                    var collect = {};
                    collect['productId'] = savePro;
                    collect['title'] = item.find('.pro-title').text();
                    collect['imageUrl'] = item.find('.pro-img img').attr("src");
                    collect['price'] = priceArr[countArr.length - 1];

                    console.log(JSON.stringify(collect));
                    $.ajax({
                        type: "post",
                        url: "/cooka-productDetail-web/addProToFavourite.do",
                        contentType: "application/json; charset=UTF-8",
                        data: JSON.stringify(collect),
                        dataType: "html",
                        async: true,
                        success: function(data) {},
                        error: function(XMLHttpRequest, textStatus, errorThrown) {}
                    });

                }
            });

        });
    };

})(jQuery);