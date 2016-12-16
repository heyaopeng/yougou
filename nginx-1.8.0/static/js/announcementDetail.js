var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'); 

require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');

require('./ck_sidebar.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

$(document).ready(function() {
    function postMsgChange(arr, type, callback) {
        var data = {
            msgIds: arr,
            type: type
        };
        console.log(data);
        $.post("/cooka-user-web/center/msgChangeStatus", data, callback, 'html');
    }

    $('.bulletin-control')
    .on('click', '.b-star', function() {
        var $this = $(this);
        var mgsId = $this.data("mid");
        var arr = [mgsId];
        console.log(mgsId);
        var $thisStarState = $this.find('.fa');
        if ($thisStarState.hasClass('fa-star-o')) {
            postMsgChange(arr, 3, function() {
                $thisStarState.removeClass('fa-star-o').addClass('fa-star');
            });
        } else {
            postMsgChange(arr, 3, function() {
                $thisStarState.removeClass('fa-star').addClass('fa-star-o');
            });
        }

    })
    .on('click', '.b-remove', function() {
        var mgsId = $(this).data('mid');
        var arr = [mgsId];
        console.log(mgsId);

        postMsgChange(arr, 1, function() {
            alert(__("delete success"));
            window.location.href = "/cooka-user-web/center/announcementList";
        });
    });
});