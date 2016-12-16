$(document).ready(function() {
    var aid = -1;

    var $allChildPathSelect = $('.photo-show-area').find('.distance-child-path').find('.select');
    var $allPhotoSelect = $('.photo-show-area').find('.distance-photo').find('.select');

    var options = {
        valueNames: [ 'album-name' ]
    };

    var albumList = new List('store-menu', options);

    var options = {
        valueNames: [ 'album-name' ]
    };

    var albumList = new List('store-menu', options);

    // form 初始化
    function formInit(form) {
    	var f = form;
    	f.find('input').val('');
    	f.data('formValidation').resetForm();
    }

    $('.modal-header').find('.close').on('click', function(e){
    	e.preventDefault();
    	var $this = $(this);
    	var $tf = $this.closest('.modal-header').siblings('form');

    	formInit($tf);

    });

    // select all pictures
    $('.addon-all-select').on('click', function() {
        event.preventDefault();
        $allPhotoSelect.each(function(index, el) {
            $(this).prop("checked", true);
        });
    });
    // cancel select pictures
    $('.addon-cancel-select').on('click', function() {
        event.preventDefault();
        $allPhotoSelect.each(function(index, el) {
            $(this).prop("checked", false);
        });
    });

    // delete album
    $('.del-album').on('click', function() {
        var $operation = $(this).parent('.operation');
        var $photoShowArea = $operation.siblings('.photo-show-area');
        var $getalbumName = $('.new-change-albumName').val();
        var certain = confirm("Will you delete " + $getalbumName + " album" + "?");
        var $getImageZoneLength = $('.main-show-area').find('.zoneImages').data('content');
        var $getImageDefault = $('.photos-management-block').find('.imageDefault').data('content');

        if (certain === true) {
            if ($getImageDefault === "default") {
                confirm("The default photo album, prohibit to delete!");
            } else {
                var data = "albumId=" + $('.getAlbumId').val();
                /* AJAX */
                $.ajax({
                    type: "post",
                    url: "/cooka-store-web/deleteAlbum",
                    data: data,
                    dataType: "html",
                    async: true,
                    success: function(data) {
                        if (data === "havaSomething") {
                            confirm("The album contains albums or images, prohibit to delete!");
                        } else if (data === "delAlbumSuccess") {
                            var isGrid = $('.main-show-area').find('.photo-show-area-grid').length;
                            if(isGrid) {
                                window.location.href = "/cooka-store-web/imageZone";
                            } else {
                                window.location.href = "/cooka-store-web/imageZoneList";
                            }
                        }
                    }
                });
            }
        }
    });

    // delete photo
    $('.del-photo').on('click', function() {
        var data = [];
        $('.check-img-id:checked').each(function(index, item) {
            data.push($(item).val());
        });
        /* AJAX */
        if (data.length > 0) {
            var getConfirm = confirm("Are you sure to delete these photos?");
            if (getConfirm) {
                $.ajax({
                    type: "post",
                    url: "/cooka-store-web/deleteImages",
                    data: {
                        "datas": data
                    },
                    dataType: "html",
                    async: true,
                    success: function(data) {
                        var isGrid = $('.main-show-area').find('.photo-show-area-grid').length;
                        if (isGrid) {
                            $('.photo-show-area-grid').find('.caption input[type="checkbox"]:checked').closest('.col-md-2').remove();
                        } else {
                            $('.photo-show-area-line').find('.check-img-id.select:checked').closest('.distance-photo').remove();
                        }
                    }
                });
            }
        } else {
            alert('No picture chosen');
        }
    });

    // delete child path
    $('.delete-child-path').on('click', function() {
        event.preventDefault();
        var $confirmDel = confirm("Are you sure to delete the child directory ?");
        if ($confirmDel) {
            var $allSelectedPaths = $('.photo-show-area').find('.distance-child-path input[type="checkbox"]:checked'); // 已经选择对目录
            if ($allSelectedPaths.length > 0) {
                var datas = [];
                $allSelectedPaths.each(function() {
                    var $thisAid = $(this).closest('.distance-child-path').data("aid");
                    datas.push($thisAid);
                });
                $.ajax({
                    type: "post",
                    data: {
                        "datas": datas
                    },
                    url: "/cooka-store-web/deleteSubImageAlbums",
                    dataType: "html",
                    success: function(data) {
                        if (data === "havaSomething") {
                            alert("These albums contains images or subAlbums");
                            $allSelectedPaths.prop("checked", false);
                        } else if (data === "delSubImageAlbumsSuccess") {
                            var isGrid = $('.main-show-area').find('.photo-show-area-grid').length;
                            if(isGrid) {
                                $allSelectedPaths.closest('.col-md-2').remove();
                            } else {
                                $allSelectedPaths.closest('.distance-child-path').remove();
                            }
                        }
                    }
                });
            } else {
                alert('No derectory chosen.');
            }
        }

    });


    // create album
    $('#containerForm').formValidation({
        framework: 'bootstrap',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        addOns: {
            i18n: {}
        },
        fields: {
            'f-albumName': {
            	selector: '.f-albumName',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The album name is required',
                            zh_CN: '相册名称不能为空'
                        }
                    },
                    regexp: {
                        regexp: /^[A-Za-z0-9\u4E00-\u9FA5_-]+$/,
                        message: {
                            en_US: 'Please enter a name without special char.',
                            zh_CN: '名字不能包含特殊字符.'
                        }
                    },
                    stringLength: {
                        max: 30,
                        message: {
                            en_US: 'The album name length less than 30 characters',
                            zh_CN: '相册名称长度小于30'
                        }
                    },
                    blank: {
                        message: {
                            en_US: '_',
                            zh_CN: '_'
                        }
                    }
                }
            }
        }
    })
    .on('err.validator.fv', function(e, data) {
        data.element
            .data('fv.messages')
            .find('.help-block[data-fv-for="' + data.field + '"]').hide()
            .filter('[data-fv-validator="' + data.validator + '"]').show();
    })
    .on('success.form.fv', function(e) {
        e.preventDefault();
        var $this = $(this);

        var $form = $(e.target),
        fv = $(e.target).data('formValidation');

        var newName = $this.find('input.f-albumName').val();
        var datas = "albumName=" + newName ;
        $.ajax({
            type: "post",
            url: "/cooka-store-web/isExitedAlbumName",
            data: datas,
            dataType: "html",
            success: function(data) {
            	if(data === "exist") {
            		fv
            		.updateMessage('f-albumName', 'blank', 'Album has existed')
            		.updateStatus('f-albumName', 'INVALID', 'blank');
            	} else {
            		$('#containerForm')[0].submit();
            	}
            }
        });
    });
    $('#containerForm').formValidation('setLocale', $.getUrlArg('lang'));

    // new child path formvalidation
    $('#newChildPathForm').formValidation({
        framework: 'bootstrap',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        addOns: {
            i18n: {}
        },
        fields: {
            'child-path-name': {
                selector: '.child-path-name',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'Child path name is required',
                            zh_CN: '子目录名称不能为空'
                        }
                    },
                    stringLength: {
                        max: 30,
                        message: {
                            en_US: 'Child path name length is less than 30',
                            zh_CN: '子目录名称至多30个字符'
                        }
                    },
                    regexp: {
                        regexp: /^[A-Za-z0-9\u4E00-\u9FA5_-]+$/,
                        message: {
                            en_US: 'Please enter a name without special char.',
                            zh_CN: '名字不能包含特殊字符.'
                        }
                    },
                    blank: {
                        message: {
                            en_US: '_',
                            zh_CN: '_'
                        }
                    }
                }
            }
        }
    })
    .on('err.validator.fv', function(e, data) {
        data.element
            .data('fv.messages')
            .find('.help-block[data-fv-for="' + data.field + '"]').hide()
            .filter('[data-fv-validator="' + data.validator + '"]').show();
    })
    .on('success.form.fv', function(e) {
        e.preventDefault();
        var $this = $(this);

        var $form = $(e.target),
        fv = $(e.target).data('formValidation');

        var $pId = $('.main-show-area').data('pid');

        var newName = $('#newChildPathForm').find('input.child-path-name').val();
        var datas = "parentAlbumId="+ $pId +"&albumName=" + newName ;
        $.ajax({
            type: "post",
            url: "/cooka-store-web/isExitedAlbumName",
            data: datas,
            dataType: "html",
            success: function(data) {
            	if(data === "exist") {
            		fv
            		.updateMessage('child-path-name', 'blank', 'Album has existed')
            		.updateStatus('child-path-name', 'INVALID', 'blank');
            	} else {
            		$('#newChildPathForm')[0].submit();
            	}
            }
        });
    });
    $('#newChildPathForm').formValidation('setLocale', $.getUrlArg('lang'));

    // change album name formvalidation
    $('#changeAlbumNameForm').formValidation({
        framework: 'bootstrap',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        addOns: {
            i18n: {}
        },
        fields: {
            'new-change-albumName': {
                selector: '.new-change-albumName',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'Album name is required',
                            zh_CN: '相册名称不能为空'
                        }
                    },
                    regexp: {
                        regexp: /^[A-Za-z0-9\u4E00-\u9FA5_-]+$/,
                        message: {
                            en_US: 'Please enter a name without special char.',
                            zh_CN: '名字不能包含特殊字符.'
                        }
                    },
                    stringLength: {
                        max: 30,
                        message: {
                            en_US: 'Album name length is less than 30',
                            zh_CN: '相册名称至多30个字符'
                        }
                    },
                    blank: {
                        message: {
                            en_US: '_',
                            zh_CN: '_'
                        }
                    }
                }
            }
        }
    })
    .on('err.validator.fv', function(e, data) {
        data.element
            .data('fv.messages')
            .find('.help-block[data-fv-for="' + data.field + '"]').hide()
            .filter('[data-fv-validator="' + data.validator + '"]').show();
    })
    .on('success.form.fv', function(e) {
        e.preventDefault();
        var $this = $(this);

        var $form = $(e.target),
        fv = $(e.target).data('formValidation');

        var $aId = $('.main-show-area').data('pid');

        var newName = $('#changeAlbumNameForm').find('input.new-change-albumName').val();

        var datas = "albumId="+ $aId +"&albumName=" + newName ;
        $.ajax({
            type: "post",
            url: "/cooka-store-web/isExitedAlbumName",
            data: datas,
            dataType: "html",
            success: function(data) {
            	if(data === "exist") {
            		fv
            		.updateMessage('new-change-albumName', 'blank', 'Album has existed')
            		.updateStatus('new-change-albumName', 'INVALID', 'blank');
            	} else {
            		$('#changeAlbumNameForm')[0].submit();
            	}
            }
        });
    });
    $('#changeAlbumNameForm').formValidation('setLocale', $.getUrlArg('lang'));

    // change child path name
    $('a.change-child-name').on('click', function() {
        var $this = $(this);
        var isGrid = $('.main-show-area').find('.photo-show-area-grid').length;
        var folderName;
        if(isGrid) {
            folderName = $this.closest('.distance-child-path').find('.caption > h4').text();
        } else {
            folderName = $this.closest('.distance-child-path').find('.target-albumName').text();
        }
        aid = $this.closest('.distance-child-path').data('aid');
        $('#changeChildName').find('input.change-child-name').val($.trim(folderName));
    });

    // change child path name formvalidation
    $('#changeChildNameForm').formValidation({
        framework: 'bootstrap',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        addOns: {
            i18n: {}
        },
        fields: {
            'change-child-name': {
                selector: '.change-child-name',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'Child path name is required',
                            zh_CN: '子目录名称不能为空'
                        }
                    },
                    stringLength: {
                        max: 30,
                        message: {
                            en_US: 'Child path name is less than 30',
                            zh_CN: '子目录名称至多30个字符'
                        }
                    },
                    regexp: {
                        regexp: /^[A-Za-z0-9\u4E00-\u9FA5_-]+$/,
                        message: {
                            en_US: 'Please enter a name without special char.',
                            zh_CN: '名字不能包含特殊字符.'
                        }
                    },
                    blank: {
                        message: {
                            en_US: '_',
                            zh_CN: '_'
                        }
                    }
                }
            }
        }
    })
    .on('err.validator.fv', function(e, data) {
        data.element
            .data('fv.messages')
            .find('.help-block[data-fv-for="' + data.field + '"]').hide()
            .filter('[data-fv-validator="' + data.validator + '"]').show();
    })
    .on('success.form.fv', function(e) {
        e.preventDefault();
        var $form = $(e.target),
        	fv = $(e.target).data('formValidation');
        var $this = $(this);
        var newName = $this.find('input.change-child-name').val();
        var $pid = $('.main-show-area').data('pid');
        var datas = "albumId=" + aid + "&albumName=" + newName;
        var $exitedDatas = datas + "&parentAlbumId=" + $pid;
        $.ajax({
            type: "post",
            url: "/cooka-store-web/isExitedAlbumName",
            data: $exitedDatas,
            dataType: "html",
            success: function(data) {
            	if(data === "exist") {
            		fv
            		.updateMessage('change-child-name', 'blank', 'Album has existed')
            		.updateStatus('change-child-name', 'INVALID', 'blank');
            	} else {
            		$.ajax({
                        type: "post",
                        url: "/cooka-store-web/editSubImageAlbum",
                        data: datas,
                        dataType: "html",
                        success: function(data) {
                        	formInit($form);
                            $('#changeChildName').modal('hide');
                            var isGrid = $('.main-show-area').find('.photo-show-area-grid').length;
                            if (isGrid) {
                                $('.distance-child-path[data-aid="' + aid + '"]').find('.caption > h4').find('span').text(newName);
                            } else {
                                $('.distance-child-path[data-aid="' + aid + '"]').find('.target-albumName').text(newName);
                            }
                        }
                    });
            	}
            }
        });

    });

    $('#changeChildNameForm').formValidation('setLocale', $.getUrlArg('lang'));

    // line模式下
    $('.photo-delete-single').on('click', function(event) {
        event.preventDefault();
        var $this = $(this);
        var $thisId = $this.closest('.distance-photo').find('.check-img-id').val();
        var data = [];
        data.push($thisId);

        var getConfirm = confirm("Are you sure to delete these photos?");
        if (getConfirm) {
            $.ajax({
                type: "post",
                url: "/cooka-store-web/deleteImages",
                data: {
                    "datas": data
                },
                dataType: "html",
                async: true,
                success: function(data) {
                    $this.closest('.distance-photo').remove();
                }
            });
        }
    });
});
