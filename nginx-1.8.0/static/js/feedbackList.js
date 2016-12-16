//require('./js/libs/jquery-1.11.2.min.js') // you should not see me
require('./libs/bootstrap.min.js');
require('./p_checkbox_select.js');
require('./ck_page.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

$('.buyer-bulletin-list').checkboxSelect();

var $getTable = $('.buyer-bulletin-list').find('tbody');
var $listState = $getTable.find('tr');
if ($listState.length === 0) {
    $('.buyer-bulletin-list').find('.no-envelope').show();
    $('.no-enve-pagenation').hide();
}
// single operation
$('.buyer-bulletin-list')
    .on('click', '.m-read', function(e) {
        e.preventDefault();
        var $this = $(this);
        var $tr = $this.closest('tr');
        var mid = $tr.find('.msg-id').text();
        var mfa = $this.find('.fa');
        var arr = [mid];

        if (mfa.hasClass('fa-envelope-o')) {
            postMsgChange(arr, 1, function() {

                mfa.removeClass('fa-envelope-o').addClass('fa-envelope');
            });
        } else {
            postMsgChange(arr, 2, function() {

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
        if (mfa.hasClass('fa-bell-o')) {
            postMsgChange(arr, 3, function() {
                mfa.removeClass('fa-bell-o').addClass('fa-check-square');
            });
        } else {
            postMsgChange(arr, 4, function() {

                mfa.removeClass('fa-check-square').addClass('fa-bell-o');
            });
        }
    })
    .on('click', '.m-remove', function(e) {
        e.preventDefault();
        $('#deleteModal').modal('show');
        var $this = $(this);
        $('.sure-btn').click(function(){      	
        	var $tr = $this.closest('tr');
            var mid = $tr.find('.msg-id').text();
            var arr = [mid];            
            $tr.remove();

            postMsgChange(arr, 5, function() {
            	$('#deleteModal').modal('hide');
                $tr.remove();                
            });
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
	            postMsgChange(arr, 1, function() {
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
                    if (mfa.hasClass('fa-bell-o')) {
                        mfa.removeClass('fa-bell-o').addClass('fa-check-square');
                    }
                });
            });
        } else {
            alert(__('Please choose some item'));
        }
    })
    .on('click', '.m-remove-batch', function(e) {
        e.preventDefault();
        $('#deleteModal').modal('show');
        $('.sure-btn').click(function(){    
        var arr = [];
        var $checkedSelTr = $('.select:checked').closest('tr');        
        if ($checkedSelTr.length) {
            $checkedSelTr.each(function(index, elem) {
                var $elem = $(elem);
                var mid = $elem.find('.msg-id').text();
                arr.push(mid);
            });
            postMsgChange(arr, 5, function() {               
                $('#deleteModal').modal('hide');
                $checkedSelTr.remove();
            });
        } else {
            alert(__('Please choose some item'));
        }
        });
    });

function postMsgChange(arr, type, callback) {
    var data = {
        msgIds: arr,
        type: type
    };

    $.post("/cooka-backend-web/handleFeedback", data, callback, 'html');
}

$('#myModal').on('show.bs.modal', function (e) {
	var $b = $(e.relatedTarget);
	// var $m = $(this);
    $('#c-id').val($b.data('id'));
	$('#c-note').val($b.attr('title'));
});