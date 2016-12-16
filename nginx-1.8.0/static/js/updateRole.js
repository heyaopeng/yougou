var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'); // 默认返回 en_US

//require('./js/libs/jquery-1.11.2.min.js') // you should not see me
require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

$(document).ready(function (){
    $('#editRoleForm').formValidation({
        framework: 'bootstrap',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        err: {
            container: function($field, validator) {
                return $field.closest('.f-container').next('.messageContainer');
            }
        },
        addOns: {
            i18n: {}
        },
        fields: {
            'f-role-name': {
                selector: '.f-role-name',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The role name is required and can not be empty',
                            zh_CN: '角色名不允许为空'
                        }
                    }
                }
            },
            'f-perimissions': {
                selector: '.f-perimissions',
                validators: {
                    choice: {
                        min: 1,
                        message: {
                            en_US: 'at least choose one permission',
                            zh_CN: '至少选择一个权限'
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
            // Prevent form submission
            e.preventDefault();
            var $form = $(e.target),
                fv = $form.data('formValidation');

            var jurArray = new Array();
            var $chooseBox = $('.ajax-checkbox').find('input[type="checkbox"]:checked');
            $chooseBox.each(function(){
                var jurId = $(this).data('id');
                console.log(jurId);
                jurArray.push(jurId);
            });
            // Use Ajax to submit form data
           /* $.ajax({
                url: $form.attr('action'),
                type: 'POST',
                data: $form.serialize(),
                success: function(result) {
                    // ... Process the result ...
                }
            });*/

            // Then submit the form as usual
            fv.defaultSubmit();
        });


    $('#editRoleForm').formValidation('setLocale', lang);
    
    $('.ajax-checkbox').on('click','.minus-click',function(){
    	var $this = $(this);
    	var permissionId = $this.parent('div').data('value');
	  	var roleId =  $('.minus-hidden').val();
		var $updateCheckbox =$(this).closest('.permission').find('.update-checkbox');
	  	$updateCheckbox.find('input').prop('value',permissionId);
	  	$this.parent('div').remove();
	  	$updateCheckbox.removeClass('hide');
	  	$.ajax({
            type: "POST",
            url: "/cooka-backend-web/deleRolePermission",
            data:"roleId="+roleId+"&permissionId="+permissionId,
            success: function(data){
                if(data == "success"){
                    //成功
                	console.log('success');	
                }else{
                    //失败
                	console.log('fail')
                }
            }
        });
    });
});