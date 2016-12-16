var CKF = require('./CKF.js');
module.exports = (function() {
    var moduleName = 'proDetailFavorPro';
    var module = CKF.create(moduleName, true);

    return {
        init: function() {
            if (module !== null) {
                module.each(function(index, elem) {
                    var $ele = $(elem);
                    $ele.on('click', function(event) {
                        event.preventDefault();
                        var collect = {};
                        $form = $ele;
                        collect['productId'] = $form.data('product-id');
                        collect['title'] = $form.data('title');
                        collect['imageUrl'] = $form.data('image-url');
                        var price = $.trim($form.data('cost')).split(' ');
                        collect['price'] = price[price.length - 1];

                        $.ajax({
                            type: "post",
                            url: "/cooka-productDetail-web/addProToFavourite.do",
                            contentType: "application/json; charset=UTF-8",
                            data: JSON.stringify(collect),
                            dataType: "html",
                            async: true,
                            success: function(data) {
                                if (data === "success") {
                                    $('#favor-modal').modal('toggle');
                                    console.log('run');
                                } else if (data === "isExist") {
                                    $('#favor-exist-modal').modal('toggle');
                                } else if (data === "nologin") {
                                    CKF.notify({
                                        type: 'show-sign-in',
                                        data: null
                                    });
                                    console.log('run1');
                                } else if (data == "notPermission") {
                                    alert('notPermission');
                                }
                            },
                            error: function(data) {
                                console.log('error');
                            }
                        });
                    });
                });
            }
        }
    };
})();
