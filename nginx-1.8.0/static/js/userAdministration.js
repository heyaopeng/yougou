var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'); // 默认返回 en_US

//require('./js/libs/jquery-1.11.2.min.js') // you should not see me
require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');
require('./ck_page.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

$(document).ready(function (){
    $('.user-action').on('click', '.single-action', function (e) {
        e.preventDefault();
        var action = {
            waitAudit: function () {
                var $this = $(this);
                $.ajax({
                    // ...
                    // 在这里发请求
                    success: function () {
                        updateMenu($this);
                    }
                });
            },

            completeAudit: function () {
                var $this = $(this);
                $.ajax({
                    // ...
                    success: function () {
                        updateMenu($this);
                    }
                });
            }
        };

        function updateMenu (elem) {
            var dText = elem.text();
            elem.closest('.status-action').find('[data-toggle="dropdown"]').html(dText + '\n<span class="caret"></span>');
        }
        var $this = $(this);
        var dAction = $this.data('action');

        action[dAction].call(this);
    });

    $('.edit-btn-click').click(function(){
        $this=$(this);
        var userId = $this.closest('tr').find('td:first').data('user');
        $('.ajax-modal').on('change','.ajax-checkbox input[type="checkbox"]',function(){
            $this = $(this);
            var roleList = new Array();
            var $chooseBox = $('.ajax-checkbox').find('input[type="checkbox"]:checked');
            $chooseBox.each(function(){
                var roleId = $(this).data('role');
                roleList.push({'userId':userId,'roleId':roleId})
            });
        });
        $.ajax({
            type: "POST",
            url: "/cooka-backend-web/addUserRoles",
            data: JSON.stringify(roleList),//将对象序列化成JSON字符串
            dataType:"json",
            contentType : 'application/json;charset=utf-8', //设置请求头信息
            success: function(data){
                if(data == "success"){
                    //成功
                }else{
                    //失败
                }
            }
        });
    });
    

    $('#role-choose-form').formValidation({
        framework: 'bootstrap',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        addOns: {
            i18n: {}
        },
        err: {
            container: '#f-error-message'
        },
        excluded: [':disabled'],
        fields: {
            'f-roles': {
                selector: '.f-roles',
                validators: {
                    choice: {
                        min: 1,
                        message: {
                            en_US: 'at least choose one role',
                            zh_CN: '至少选择一个角色'
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
        .on('success.form.fv', function() {
            $('#admModal').modal('hide');
        });

    $('#role-choose-form').formValidation('setLocale', lang);
});