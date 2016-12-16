var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'); // 默认返回 en_US

//require('./js/libs/jquery-1.11.2.min.js') // you should not see me
require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');
//require('./libs/FV/intl_tel/intlTelInput.min.js');

$(document).ready(function (){
     $('.ajax-checkbox').on('click','.minus-click',function(){
            $this = $(this);
            var roleId = $this.parent('div').data('value');
            var userId= $('.minus-hidden').val();
            var $updateCheckbox =$(this).closest('.roles').find('.update-checkbox');
            $updateCheckbox.find('input').prop('value',roleId);
            $this.parent('div').remove();
            $updateCheckbox.removeClass('hide');
            
            $.ajax({
                type: "POST",
                url: "/cooka-backend-web/deleUserRole",
                data:"userId="+userId+"&roleId="+roleId,
                success: function(data){
                    if(data == "success"){
                        console.log('success');                 
                    }else{
                        console.log('fail')
                    }
                }
            });
        });
     
   
      // Define new validator
    FormValidation.Validator.intPhoneNumber = {
        html5Attributes: {
            message: 'message',
            autoplaceholder: 'autoPlaceholder',
            preferredcountries: 'preferredCountries',
            utilsscript: 'utilsScript'
        },

        init: function(validator, $field, options) {
            // Determine the preferred countries
            var autoPlaceholder    = options.autoPlaceholder === true || options.autoPlaceholder === 'true',
                preferredCountries = options.preferredCountries || 'us';
            if ('string' === typeof preferredCountries) {
                preferredCountries = preferredCountries.split(',');
            }

            // Attach the intlTelInput on field
            $field.intlTelInput({
                utilsScript: options.utilsScript || '',
                autoPlaceholder: autoPlaceholder,
                preferredCountries: preferredCountries
            });

            // Revalidate the field when changing the country
            var $form     = validator.getForm(),
                fieldName = $field.attr('data-fv-field');
            $form.on('click.country.intphonenumber', '.country-list', function() {
                $form.formValidation('revalidateField', fieldName);
            });
        },

        destroy: function(validator, $field, options) {
            $field.intlTelInput('destroy');

            validator.getForm().off('click.country.intphonenumber');
        },

        validate: function(validator, $field, options) {
            return $field.val() === '' || $field.intlTelInput('isValidNumber');
        }
    };
     
     $('#addNewUserForm').formValidation({
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
             container: function($field, validator) {
                 return $field.closest('.f-container').nextAll('.messageContainer');
             }
         },
         fields: {
             'f-name': {
                 selector: '.f-name',
                 validators: {
                     notEmpty: {
                         message:{
                             en_US: 'The name is required and can\'t be empty',
                             zh_CN: '姓名不能为空'
                         }
                     }
                 }
             },
             'f-email': {
                 selector: '.f-email',
                 validators: {
                    notEmpty: {
                         message: {
                             en_US: 'The email is required and can\'t be empty',
                             zh_CN: '邮箱不能为空'
                         }
                     },
                     emailAddress: {
                         message: {
                             en_US: 'The input is not a valid email address',
                             zh_CN: '输入不是有效的邮箱地址'
                         }
                     },
                     remote: {
                         type: 'POST',      
                         url: "/cooka-user-web/isExistAccount",
                         data: {
                            account: function () {
                                return $('.f-email').val()
                            }
                         },                                                     
                         message: {
                             en_US: 'The email is already exist',
                             zh_CN: '邮箱已注册'
                         },
                         delay: 1000
                     }
                 }
             },
             'f-phone': {
                 selector: '.f-phone',
                 validators: {
                    notEmpty: {
                         message: {
                             en_US: 'The phone is required and can\'t be empty',
                             zh_CN: '电话不能为空'
                         }
                     },
                     /* intPhoneNumber: {
                          utilsScript: '/js/libs/FV/intl_tel/utils.js',
                          autoPlaceholder: true,
                          preferredCountries: 'cn,us,gb',
                          message: {
                            en_US: 'The phone number is not valid',
                            zh_CN: '电话号码无效'
                          }
                      },*/
                      remote: {
                         type: 'POST',      
                         url: "/cooka-user-web/isExistAccount",
                         data: {
                            account: function () {
                                return $('.f-phone').val()
                            }
                         },                                         
                          message: {
                              en_US: 'The phone is already exist',
                              zh_CN: '电话已注存在'
                          },  
                          delay: 1000
                      }
                 }
             },
             'f-password': {
                 selector: '.f-password',
                 validators: {
                     notEmpty: {
                         message: {
                             en_US: 'The password is required and can\'t be empty',
                             zh_CN: '密码不能为空'
                         }
                     },
                     stringLength: {
                         min: 6,
                         max: 30,
                         message: {
                             en_US: 'Password length more than 6 but less than 30',
                             zh_CN: '密码长度大于6小于30'
                         }
                     }
                 }
             },
             'f-confirm-psd': {
                 selector: '.f-confirm-psd',
                 validators: {
                     notEmpty: {
                         message: {
                             en_US: 'The confirm password is required and can\'t be empty',
                             zh_CN: '确认密码不能为空'
                         }
                     },
                     identical: {
                         field: 'f-password',
                         message: {     
                             en_US: 'The password and its confirm are not the same',
                             zh_CN: '确认密码和密码不一致'
                         }
                     }
                 }
             },
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
     }).on('click', '.js-change-phone', function() {
            $('.f-email').attr('name','');
            $('.f-phone').attr('name','account');
            $('.js-email-input').addClass('hide');
            $('.js-phone-input').removeClass('hide');
            $('#addNewUserForm').formValidation('revalidateField','f-phone');
        })
         .on('click', '.js-change-email', function() {
                $('.f-phone').attr('name','');
                $('.f-email').attr('name','account');
                $('.js-phone-input').addClass('hide');
                $('.js-email-input').removeClass('hide');
                $('#addNewUserForm').formValidation('revalidateField', 'f-email');
         
            })
        .on('click', '.country-list', function() {
            $('#addNewUserForm').formValidation('revalidateField', 'f-phone');
           
        });/*.on('success.field.fv', '.f-phone', function(e, data) {
            // Do something ...
             var intlNumber = $(".f-phone").intlTelInput("getNumber");
            $(".f-phone").val(intlNumber);
        });*/

      $('#addNewUserForm').formValidation('setLocale', lang);
      /* edit form*/
     $('#editUserForm').formValidation({
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
             container: function($field, validator) {
                 return $field.closest('.f-container').next('.messageContainer');
             }
         },
         fields: {
             'f-password': {
                 selector: '.f-password',
                 validators: {
                     notEmpty: {
                         message: {
                             en_US: 'The password is required and can\'t be empty',
                             zh_CN: '密码不能为空'
                         }
                     }
                 }
             },
             'f-confirm-psd': {
                 selector: '.f-confirm-psd',
                 validators: {
                     notEmpty: {
                         message: {
                             en_US: 'The confirm password is required and can\'t be empty',
                             zh_CN: '确认密码不能为空'
                         }
                     },
                     identical: {
                         field: 'f-password',
                         message: {
                             en_US: 'The password and its confirm are not the same',
                             zh_CN: '确认密码和密码不一致'
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
 });
     $('#editUserForm').formValidation('setLocale', lang);
});