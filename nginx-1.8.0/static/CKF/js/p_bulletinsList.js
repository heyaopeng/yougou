var CKF = require('./CKF.js');
require('../less/bulletins-list.less');

module.exports = (function () {
    var moduleName = 'bulletinsList';
    var module = CKF.create(moduleName);

    var $allSelect = module.find('thead').find('tr > th').find('.all-select'); 

    function checkEmpty() {
        var $isEmpty = module.find('tbody').find('tr').length === 0;
        if ($isEmpty) {
            module.parent().siblings().removeClass('hide');
            module.parent().addClass('hide');
        } else {
            CKF.notify({
                type: 'set-hide',
                data: null
            });
        }
    }

    function postMsgChange(arr, type, callback) {
        var data = {
            msgIds: arr,
            type: type
        };
        $.post("/cooka-user-web/center/msgChangeStatus", data, callback, 'html');
    }

    // 批量读
    function batchRead(){
    	var arr = [];
        var $checkedSelTr = module.find('tbody').find('.select:checked').closest('tr');
        if ($checkedSelTr.length) {
            $checkedSelTr.each(function(index, elem) {
                var $elem = $(elem);
                var mid = $elem.find('.msg-id').text();
                arr.push(mid);
            });

            postMsgChange(arr, 7, function() {
                $checkedSelTr.each(function(index, elem) {
                    var $elem = $(elem);
                    var m = $elem.find('.m-read');
                    if (m.hasClass('icon-email')) {
                        m.removeClass('icon-email').addClass('icon-email-o');
                    }
                });
            });
        } else {
            alert(__('Please choose some item'));
        }
    }

    // 批量标记
    function batchStar() {
    	var arr = [];
        var $checkedSelTr = module.find('tbody').find('.select:checked').closest('tr');
        if ($checkedSelTr.length) {
            $checkedSelTr.each(function(index, elem) {
                var $elem = $(elem);
                var mid = $elem.find('.msg-id').text();
                arr.push(mid);
            });

            postMsgChange(arr, 3, function() {
                $checkedSelTr.each(function(index, elem) {
                    var $elem = $(elem);
                    var m = $elem.find('.m-collect');
                    if (m.hasClass('icon-star')) {
                        m.removeClass('icon-star').addClass('icon-star-solid');
                    }
                });
                checkEmpty();
            });
        } else {
            alert(__('Please choose some item'));
        }
    }

    // 批量删除
    function batchRemove() {
    	var arr = [];
        var $checkedSelTr = module.find('tbody').find('.select:checked').closest('tr');
        if ($checkedSelTr.length) {
            $checkedSelTr.each(function(index, elem) {
                var $elem = $(elem);
                var mid = $elem.find('.msg-id').text();
                arr.push(mid);
            });

            postMsgChange(arr, 1, function() {
                $checkedSelTr.remove();
                checkEmpty();
            });
        } else {
            alert(__('Please choose some item'));
        }
    }
    
    // 永久删除
    function batchRemoveCom() {
    	var arr = [];
        var $checkedSelTr = module.find('tbody').find('.select:checked').closest('tr');
        if ($checkedSelTr.length) {
            $checkedSelTr.each(function(index, elem) {
                var $elem = $(elem);
                var mid = $elem.find('.msg-id').text();
                arr.push(mid);
            });

            postMsgChange(arr, 5, function() {
                $checkedSelTr.remove();
                checkEmpty();
            });
        } else {
            alert(__('Please choose some item'));
        }
    }

    // 批量恢复
    function batchRecovery() {
        var arr = [];
        var $checkedSelTr = module.find('tbody').find('.select:checked').closest('tr');
        if ($checkedSelTr.length) {
            $checkedSelTr.each(function(index, elem) {
                var $elem = $(elem);
                var mid = $elem.find('.msg-id').text();
                arr.push(mid);
            });

            postMsgChange(arr, 2, function() {
                $checkedSelTr.remove();
                checkEmpty();
            });
        } else {
            alert(__('Please choose some item'));
        }
    }

    // 批量撤销标记
    function batchCancelCol() {
        var arr = [];
        var $checkedSelTr = module.find('tbody').find('.select:checked').closest('tr');
        var $isDustbin = module.parents('.bulletins-dustbin-module').length;

        if ($checkedSelTr.length) {
            $checkedSelTr.each(function(index, elem) {
                var $elem = $(elem);
                var mid = $elem.find('.msg-id').text();
                arr.push(mid);
            });

            postMsgChange(arr, 4, function() {
                if(!$isDustbin) {
                    $checkedSelTr.remove();
                } else {
                    $checkedSelTr.each(function(index, elem) {
                        var $e = $(elem);
                        var n = $e.find('.m-collect');
                        if (n.hasClass('icon-star-solid')) {
                            n.removeClass('icon-star-solid').addClass('icon-star');
                        }
                    });
                }
                checkEmpty();
            });
        } else {
            alert(__('Please choose some item'));
        }
    }

    return {
        init: function () {

        	CKF.listen({
        		'batch-read': batchRead,
        		'batch-star': batchStar,
        		'batch-remove': batchRemove,
        		'batch-remove-com': batchRemoveCom,
                'batch-recovery': batchRecovery,
                'batch-cancelCol': batchCancelCol
        	}, moduleName);

            checkEmpty();

        	// 全选－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
        	$allSelect.on('change', function(event) {
        		var $this = $(this);
        		var $state = $this.prop('checked');
				var $select = module.find('tbody').find('tr > td').find('.select');

    			$select.prop('checked', $state);
        	});

        	module.find('.select').on('change', function(){
        		var $this = $(this);
        		var $state = $this.prop('checked');
        		// 如果有一个没有选择，全选按钮不选中
        		if(!$state){
        			$allSelect.prop('checked', $state);
        		}

        		// 如果全部选择，全选按钮选中
        		var $isAllSelect = true;
        		var $select = module.find('tbody').find('tr > td').find('.select');
        		$select.each(function(index, el) {
        			var $this = $(this);
        			var $state = $this.prop('checked');
        			if(!$state) {
        				$isAllSelect = false;
        				return;
        			}
        		});

        		if(!$isAllSelect){
        			$allSelect.prop('checked', false);
        		} else {
        			$allSelect.prop('checked', true);
        		}
        	});

            

            // ---------------------------------------------------------------------
            
        	/*
			 * 删除  	  annnonStatus=1
			 * 撤销删除	  annnonStatus=2
			 * 标记	  annnonStatus=3
			 * 取消标记         announStatus=4
			 * 永久删除         annnonStatus=5
			 * 未读		annnonStatus=6
			 * 已读		annnonStatus=7
			 * icon-email: 6
			 * icon-email-o: 7
			 * icon-star: 4
			 * icon-star-solid: 3
			 */
			module.find('tbody')
            // 已读和未读转换
			.on('click', '.m-read', function(event) {
				event.preventDefault();
				var $this = $(this);
		        var $tr = $this.closest('tr');
		        var mid = $tr.find('.msg-id').text();
		        var arr = [mid];

		        // 如果为 .icon-email-o(已读)，发送未读信号；否则(.icon-email)，发送已读信号
		        if ($this.hasClass('icon-email-o')) {
		            postMsgChange(arr, 6, function() {
		                $this.removeClass('icon-email-o').addClass('icon-email');
		            });
		        } else {
		            postMsgChange(arr, 7, function() {
		                $this.removeClass('icon-email').addClass('icon-email-o');
		            });
		        }
			})
            // 标记和取消标记转换
			.on('click', '.m-collect', function(event) {
				event.preventDefault();
				/* Act on the event */
		        var $this = $(this);
		        var $tr = $this.closest('tr');
		        var mid = $tr.find('.msg-id').text();
		        var arr = [mid];

		        // 如果为 .icon-star(未标记)，发送标记信号；否则(.icon-star-solid)，发送取消标记信号
		        if ($this.hasClass('icon-star')) {
		            postMsgChange(arr, 3, function() {
		                $this.removeClass('icon-star').addClass('icon-star-solid');
		            });
		        } else {
		            postMsgChange(arr, 4, function() {
		                $this.removeClass('icon-star-solid').addClass('icon-star');
		            });
		        }
			});
        }
    };
})();