var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'); 

require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');

require('./p_checkbox_select.js');
//require('./feedbackList.js');
require('./ck_page.js');
require('./ck_sidebar.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

$(document).ready(function() {
    function postMsgChange(arr, type, callback) {
        var data = {
            msgIds: arr,
            type: type
        };
        $.post("/cooka-user-web/center/msgChangeStatus", data, callback, 'html');
    }

    var $getTable = $('.buyer-bulletin-list').find('tbody');
    var $listState = $getTable.find('tr');
    
    if ($listState.length === 0) {
        $('.buyer-bulletin-list').find('.show-null-message').show();
    }

    $('.buyer-bulletin-list').checkboxSelect();
    
    // announcement distance operation
    $('.buyer-bulletin-list')
    .on('click', '.m-read', function(e) {
        e.preventDefault();
        var $this = $(this);
        var $tr = $this.closest('tr');
        var mid = $tr.find('.msg-id').text();
        var mfa = $this.find('.fa');
        var arr = [mid];

        if (mfa.hasClass('fa-envelope-o')) {
            postMsgChange(arr, 7, function() {
                mfa.removeClass('fa-envelope-o').addClass('fa-envelope');
            });
        } else {
            postMsgChange(arr, 6, function() {
                mfa.removeClass('fa-envelope').addClass('fa-envelope-o');
            });
        }
    })
    .on('click', '.m-star', function(e) {
        e.preventDefault();
        var $this = $(this);
        var $tr = $this.closest('tr');
        var mid = $tr.find('.msg-id').text();
        var mfa = $this.find('.fa');
        var arr = [mid];
        if (mfa.hasClass('fa-star-o')) {
            postMsgChange(arr, 3, function() {
                mfa.removeClass('fa-star-o').addClass('fa-star');
            });
        } else {
            postMsgChange(arr, 4, function() {
                mfa.removeClass('fa-star').addClass('fa-star-o');
            });
        }
    })
    .on('click', '.m-remove', function(e) {
        e.preventDefault();
        var $this = $(this);
        var $tr = $this.closest('tr');
        var mid = $tr.find('.msg-id').text();
        var arr = [mid];
        postMsgChange(arr, 1, function() {
            $tr.remove();
        });
    })
    .on('click', '.m_per_dele', function(e) {
        e.preventDefault();
        var $this = $(this);
        var $tr = $this.closest('tr');
        var mid = $tr.find('.msg-id').text();
        var arr = [mid];
        postMsgChange(arr, 5, function() {
            $tr.remove();
        });
    })
    .on('click', '.m_cancel_dele', function(e) {
        e.preventDefault();
        var $this = $(this);
        var $tr = $this.closest('tr');
        var mid = $tr.find('.msg-id').text();
        var arr = [mid];
        postMsgChange(arr, 2, function() {
            $tr.remove();
        });
    })
    .on('click', '.m-read-batch', function(e) {
        e.preventDefault();
        var arr = [];
        var $checkedSelTr = $('.select:checked').closest('tr');
        if ($checkedSelTr.length) {
            $checkedSelTr.each(function(index, elem) {
                var $elem = $(elem);
                var mid = $elem.find('.msg-id').text();
                arr.push(mid);
            });

            postMsgChange(arr, 7, function() {
                $checkedSelTr.each(function(index, elem) {
                    var $elem = $(elem);
                    var mfa = $elem.find('.m-read > i.fa');
                    if (mfa.hasClass('fa-envelope-o')) {
                        mfa.removeClass('fa-envelope-o').addClass('fa-envelope');
                    }
                });
            });
        } else {
            alert(__('Please choose some item'));
        }
    })
    .on('click', '.m-star-batch', function(e) {
        e.preventDefault();
        var arr = [];
        var $checkedSelTr = $('.select:checked').closest('tr');
        if ($checkedSelTr.length) {
            $checkedSelTr.each(function(index, elem) {
                var $elem = $(elem);
                var mid = $elem.find('.msg-id').text();
                arr.push(mid);
            });

            postMsgChange(arr, 3, function() {
                $checkedSelTr.each(function(index, elem) {
                    var $elem = $(elem);
                    var mfa = $elem.find('.m-star > i.fa');
                    if (mfa.hasClass('fa-star-o')) {
                        mfa.removeClass('fa-star-o').addClass('fa-star');
                    }
                });
            });
        } else {
            alert(__('Please choose some item'));
        }
    })
    .on('click', '.m-remove-batch', function(e) {
        e.preventDefault();
        var arr = [];
        var $checkedSelTr = $('.select:checked').closest('tr');
        if ($checkedSelTr.length) {
            $checkedSelTr.each(function(index, elem) {
                var $elem = $(elem);
                var mid = $elem.find('.msg-id').text();
                arr.push(mid);
            });

            postMsgChange(arr, 1, function() {
                $checkedSelTr.remove();

            });
        } else {
            alert(__('Please choose some item'));
        }
    })
    .on('click', '.m-cancel-batch', function(e) {
        e.preventDefault();
        var arr = [];
        var $checkedSelTr = $('.select:checked').closest('tr');
        if ($checkedSelTr.length) {
            $checkedSelTr.each(function(index, elem) {
                var $elem = $(elem);
                var mid = $elem.find('.msg-id').text();
                arr.push(mid);
            });

            postMsgChange(arr, 2, function() {
                $checkedSelTr.remove();

            });
        } else {
            alert(__('Please choose some item'));
        }
    })
    .on('click', '.m-delete-batch', function(e) {
        e.preventDefault();
        var arr = [];
        var $checkedSelTr = $('.select:checked').closest('tr');
        if ($checkedSelTr.length) {
            $checkedSelTr.each(function(index, elem) {
                var $elem = $(elem);
                var mid = $elem.find('.msg-id').text();
                arr.push(mid);
            });
            postMsgChange(arr, 5, function() {
                $checkedSelTr.remove();

            });
        } else {
            alert(__('Please choose some item'));
        }
    });
});