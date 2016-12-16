var CKF = require('./CKF.js');
// require('../less/ck-ad.less');
require('../less/ckad-bar.less');
module.exports = (function () {
    var moduleName = 'ckAd';
    var module = CKF.create(moduleName,true);

    return {
        init: function () {
            if(module!==null){
                module.each(function (index, elem) {
                    $.get('/cooka-productDetail-web/adsHtml?templateCode='+$(elem).data('code')+'&categoryId='+$(elem).data('id'),function(html){
                    	$(elem).html(html);
                    },"html");

                });
            }
        }
    };
})();
