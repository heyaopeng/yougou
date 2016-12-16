var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'); // 默认返回 en_US
require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');
require('./p_freight_interval.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');
// var data = {
//     "url":"/cooka-user-web/center/selectcity",
//     "item":[
//             {
//                 "name":"廣東省",
//                 "id":"1",
//             }, {
//                 "name":"貴州省",
//                 "id":"2",
//             }, {
//                 "name":"江西省",
//                 "id":"3",
//             }, {
//                 "name":"福建省",
//                 "id":"4",
//             }
//         ]
// };
$(document).ready(function() {
    var $form = $('.freight-template-edit-form');
    var $addBtn = $form.find('.js-add-block-btn');

    $('.freight-template-edit-interval').freightInterval();
    formValidateInit($('.freight-template-edit-form'));
    $('body').on('click blur','.form-control',function(){
        formValidateInit($('.freight-template-edit-form'));
    });                     
        
    $addBtn.on('click',function(e){
        e.preventDefault();
        var $clone = $form.find('.clone-tr');
        var $newItem = $clone.clone(true).insertAfter($form.find('tr:last()'));
        $newItem.removeClass('clone-tr').addClass('js-append-tr');
        $form.formValidation('addField', $newItem.find('.f-day'));
        $form.formValidation('addField', $newItem.find('.f-country'));
        $form.formValidation('addField', $newItem.find('.f-piece'));
        $form.formValidation('addField', $newItem.find('.f-first-piece'));
        $form.formValidation('addField', $newItem.find('.f-first-price'));
        $form.formValidation('addField', $newItem.find('.f-price'));
        $form.formValidation('addField', $newItem.find('.f-address'));
    });

  /*  $('.freight-template-edit-form-cost li').on('click', function(event) {
        var $radio = $(this).find('input');
        $radio.prop('checked',true);
        $('.freight-template-edit-form').data('formValidation').resetField('f-select',true);
    });*/

        $('.js-area-remove').on('click',function(e){
        e.preventDefault(); 
        var $parent = $(this).closest('tr');
        if (window.confirm('确定删除？')) {
            if($parent.hasClass('tr-static')){                
                $.ajax({
                    url: '/cooka-backend-web/deleChargeRen?chargeId='+$parent.data('id'),
                    success: function (ret) {
                        $parent.remove();
                        $form.formValidation('removeField', $parent.find('.f-day'));                      
                        $form.formValidation('removeField', $parent.find('.f-country'));                      
                        $form.formValidation('removeField', $parent.find('.f-piece'));                      
                        $form.formValidation('removeField', $parent.find('.f-first-piece'));                      
                        $form.formValidation('removeField', $parent.find('.f-first-price'));                      
                        $form.formValidation('removeField', $parent.find('.f-price'));                      
                        $form.formValidation('removeField', $parent.find('.f-address'));                      
                    }
                });
            }
            else{
                $parent.remove();
                $form.formValidation('removeField', $parent.find('.f-day'));                      
                $form.formValidation('removeField', $parent.find('.f-country'));                      
                $form.formValidation('removeField', $parent.find('.f-piece'));                      
                $form.formValidation('removeField', $parent.find('.f-first-piece'));                      
                $form.formValidation('removeField', $parent.find('.f-first-price'));                      
                $form.formValidation('removeField', $parent.find('.f-price'));                      
                $form.formValidation('removeField', $parent.find('.f-address'));                  
            }
        }        
    });

    var $select = $('select.f-address');
    $select.on('change',function() {
        var $this = $(this);
        var value = $this.val();

        var url = $this.data('url');
            var hasParent = $this.data('parent');
            var parentId = "parentId=" + $this.find('option:selected').data('parentid');
            if($this.nextAll()!==null){                             
                $this.nextAll('select:visible').remove();
            }
            if(url!==null&&value!=='') {
                var html = '';                
                $.ajax({
                    type: "post",
                    url: url+parentId,
                    async: true,
                    success: function(data) {
                        if(data.item){
                            var $clone = $form.find('.clone-add-select');
                            var $newItem = $clone.clone(true).insertAfter($this).removeClass('clone-add-select').data('url',data.url);               
                            $.each(data.item, function(index, elem) {
                                html += '<option value="' + elem.name + '" data-parentid="' + elem.id + '">' + elem.name + '</option>\n';
                            });
                            $this.next()[0].length = 1;
                            $this.next().append(html);
                        }
                        $this.trigger('address.change');
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        console.log("gg");
                    },
                });
            }

            $form.data('formValidation').revalidateField($(this));
        buildAddressInput($this.closest('.js-change'));
    });

    function buildAddressInput($ele){
        var arr=[];
        $ele.find('.f-address').each(function(idx,ele){
            var $ele =$(ele);
            var $eleVal = $ele.find('option:selected').val();
            if($eleVal!==''){
                arr.push($eleVal);
            }
        });
        var addr = arr.join(':');
        $ele.find('.js-address-hidden').val(addr);
    }
    
    $('.js-change-btn').on('click',function(){
        var $this = $(this);
        $this.closest('.js-init').next('.js-change').removeClass('hidden').find('select.f-address:first()').nextAll('select:visible').remove();
        $this.closest('.js-init').addClass('hidden');
        buildAddressInput($('.freight-template-edit-form').find('.js-shipping-address'));
    });
    $('.js-cancel-btn').on('click',function(){
        var $this = $(this);
        var $parent = $this.closest('.js-change');
        $parent.prev('.js-init').removeClass('hidden');
        $parent.addClass('hidden');
        $parent.find('.js-address-hidden').val($parent.prev('.js-init').find('.init-addr').text());
    });

    $('.js-submit').on('click',function(e){
        var $this = $(this).closest('form');
        var $tbody = $this.find('table tbody');
        $this.data('formValidation').validate();
        if($this.data('formValidation').isValid()){
            var nameStart = $this.find('.tr-static:last()').data('count');
            // buildAddressInput($this.find('.js-shipping-address'));
            if($tbody.find('.js-append-tr').length>0){   
                $tbody.find('.js-append-tr').each(function(idx,ele){
                    var $ele = $(ele);
                     buildAddressInput($ele);
                    $ele.find('.f-day').attr('name','chargeRenewals[\''+(idx*1+nameStart*1+1)+'\'].deliverTime');
                    $ele.find('.f-first-piece').attr('name','chargeRenewals[\''+(idx*1+nameStart*1+1)+'\'].first');
                    $ele.find('.f-first-price').attr('name','chargeRenewals[\''+(idx*1+nameStart*1+1)+'\'].firstPrice');
                    $ele.find('.js-isnew').attr('name','chargeRenewals[\''+(idx*1+nameStart*1+1)+'\'].isNew');
                    $ele.find('.f-piece').attr('name','chargeRenewals[\''+(idx*1+nameStart*1+1)+'\'].addition');
                    $ele.find('.f-price').attr('name','chargeRenewals[\''+(idx*1+nameStart*1+1)+'\'].additionPrice');
                    $ele.find('.js-address-hidden').attr('name','chargeRenewals[\''+(idx*1+nameStart*1+1)+'\'].destination');
                }); 
            }
             $this[0].submit();
        }
    });
    function formValidateInit($elem) {
        $elem.formValidation({
            framework: 'bootstrap',
            addOns: {
                i18n: {}
            },
            fields: {
                'f-name': {
                    selector: '.f-name',
                    validators: {
                        notEmpty: {
                            message: {
                                en_US: 'The name is required',
                                zh_CN: '请填写名称'
                            }
                        },
                        stringLength: {
                            max: 30,
                            message: {
                                en_US: 'The name must be less than 30 characters',
                                zh_CN: '名称过长'
                            }
                        }
                    }
                },
              /*  'f-address': {
                    selector: '.f-address',
                    validators: {
                        notEmpty: {
                            message: {
                                en_US: 'The address is required',
                                zh_CN: '请填写名称'
                            }
                        }
                    }
                },*/
                'f-select': {
                    selector: '.f-select',
                    validators: {
                        notEmpty: {
                            message: {
                                en_US: 'The contains is required',
                                zh_CN: '请填写计量单位'
                            }
                        }
                    }
                },
                'f-company': {
                    selector: '.f-company',
                    validators: {
                        notEmpty: {
                            message: {
                                en_US: 'The contains is required',
                                zh_CN: '请填写物流公司'
                            }
                        }
                    }
                },
                'f-cost': {
                    selector: '.f-cost',
                    validators: {
                        notEmpty: {
                            message: {
                                en_US: 'The contains is required',
                                zh_CN: '请选择货币种类'
                            }
                        }
                    }
                },
                'f-day': {
                    selector: '.f-day',
                    validators: {
                        notEmpty: {
                            message: {
                                en_US: 'The contains is required',
                                zh_CN: '请填写送达时间'
                            },
                            digits:{
                                message: {
                                    en_US: 'Please enter a valid number',
                                    zh_CN: '请输入有效数字'
                                }
                            }
                        }
                    }
                },
                'f-piece': {
                    selector: '.f-piece',
                    validators: {
                        notEmpty: {
                            message: {
                                en_US: 'The contains is required',
                                zh_CN: '请填写内容'
                            }
                        },
                        numeric:{
                            message: {
                                en_US: 'Please enter a valid number',
                                zh_CN: '请输入有效数字'
                            }
                        }
                    }
                },
                'f-first-piece': {
                    selector: '.f-first-piece',
                    validators: {
                        notEmpty: {
                            message: {
                                en_US: 'The contains is required',
                                zh_CN: '请填写内容'
                            }
                        }
                    }
                },
                'f-country': {
                    selector: '.f-country',
                    validators: {
                        notEmpty: {
                            message: {
                                en_US: 'The contains is required',
                                zh_CN: '请选择国家'
                            }
                        }
                    }
                },
                'f-price': {
                    selector: '.f-price',
                    validators: {
                        notEmpty: {
                            message: {
                                en_US: 'The contains is required',
                                zh_CN: '请填写价格'
                            }
                        },
                        regexp: {
                            regexp: /^\d*(\.\d{1,2})?$/,
                            message: {
                                en_US: 'Not a correct price,eg,12.00',
                                zh_CN: '价钱格式不正确,例如12.00'
                            }
                        }
                    }
                },
                'f-first-price': {
                    selector: '.f-first-price',
                    validators: {
                        notEmpty: {
                            message: {
                                en_US: 'The contains is required',
                                zh_CN: '请填写价格'
                            }
                        },
                        regexp: {
                            regexp: /^\d*(\.\d{1,2})?$/,
                            message: {
                                en_US: 'Not a correct price,eg,12.00',
                                zh_CN: '价钱格式不正确,例如12.00'
                            }
                        }
                    }
                },
                'f-phone': {
                    selector: '.f-phone',
                    validators: {
                        notEmpty: {
                            message: {
                                en_US: 'Phone number is required',
                                zh_CN: '请填写电话号码'
                            }
                        },
                        regexp: {
                            regexp: /^[0-9]+([\-][0-9]+)*$/,
                            message: {
                                en_US: 'Not a correct phone number',
                                zh_CN: '电话号码格式不正确'
                            }
                        },
                        stringLength: {
                            max: 32,
                            message: {
                                en_US: 'Phone number is too long',
                                zh_CN: '电话号码过长'
                            }
                        }
                    }
                }
            }
        }).on('err.validator.fv', function(e, data) {
            data.element.data('fv.messages').find(
                '.help-block[data-fv-for="' + data.field + '"]').hide().filter(
                '[data-fv-validator="' + data.validator + '"]').show();
        });
        $elem.formValidation('setLocale', lang);
    }
});