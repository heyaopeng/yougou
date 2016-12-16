var getCookie = require('./getCookie.js');
var lang = getCookie('language'); // 默认返回 en_US
//require('./js/libs/jquery-1.11.2.min.js') // you should not see me

require('./libs/bootstrap.min.js');
require('./libs/bootstrap-datepicker.min.js');

require('./libs/jquery.form.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');

require('./libs/datepicker_locales/bootstrap-datepicker.' + lang + '.min.js');

require('./ck_lang.js');
require('./ck_ajax_setup.js');


/*withdrawals_index*/
$(document).ready(function() {
    $('#withDrawForm').formValidation({
    	 icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        addOns: {
            i18n: {}
        },
        fields: {
            'currentAccount': {
                selector: '.currentAccount',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The Current account is required',
                            zh_CN: '提现帐号不能为空'
                        }
                    }
                }
            },
            'password': {
                selector: '.password',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The password is required and can\'t be empty',
                            zh_CN: '密码不允许为空'
                        }
                    }
                }
            },
            'withAmount': {
                selector: '.withAmount',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The amount is required',
                            zh_CN: '金额不能为空'
                        }
                    },
                    greaterThan: {
                        value: 15.0,
                        message: {
                            en_US: 'The amount must greater than or equal to %s',
                            zh_CN: '金额必须大于或等于%s'
                        }
                    },
                    lessThan: {
                        value: $('.available-amount').text(),
                        message: {
                            en_US: 'The amount can not be greater than %s',
                            zh_CN: '金额不能超过%s'
                        }
                    },
                    regexp: {
                        regexp: /^\d{0,8}(\.\d{1,4})?$/,
                        message: {
                            en_US: 'Please enter the correct amount.',
                            zh_CN: '请输入正确的金额格式.'
                        }
                    }
                }
            },
            'newAccount': {
                selector: '.newAccount',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The Current account is required',
                            zh_CN: '提现帐号不能为空'
                        }
                    },
		            regexp: {
		                regexp: /[0-9]+/,
		                message: {
		                    en_US: 'Please enter the correct card number',
		                    zh_CN: '请输入正确的卡号格式'
		                }
		            },
		            remote: {
		            	verbose: false,
		            	url: '/cooka-finance-web/verifyCardNum',
		                type: 'POST',
			            data: function(validator, $field, value) {
	                        return {
	                            cardNum: validator.getFieldElements('newAccount').val()
	                        };
	                    },
	                    message: {
		                    en_US: 'Please enter the card number',
		                    zh_CN: '请输入正确的卡号格式'
		                }
		            }
                }
            },
            'dueDate': {
                selector: '.dueDate',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The due date is required',
                            zh_CN: '到期日期不能为空'
                        }
                    }/*,
                    remote: {
                        regexp: /^[0-9]{2}\/[0-9]{2}$/,
                        message: {
                            en_US: 'The value of the input is xx/xx, such as 09/93',
                            zh_CN: '输入的值格式为xx/xx,例如09/93'
                        }
                    }*/

                }
            },
            'cccNumber': {
                selector: '.cccNumber',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The value is required',
                            zh_CN: '输入不能为空'
                        }
                    },
                    regexp: {
                        regexp: /^[0-9]{3}$/,
                        message: {
                            en_US: 'The value must consist of 3 number',
                            zh_CN: '输入的值必须由3位数字组成'
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
    }).on('success.field.fv', '.withAmount', function(e) {
        //计算手续费

        var $this = $(this);
        var amount = $this.val();
        var result = 0.1 * amount;
        var end = Math.round(result * 10) / 10;
        $this.parents('.bottom-area').find('.calculate').text(end);
        $this.parents('.bottom-area').find('.calculate').next().val(end);
        //计算实际金额
        var rateValue = $this.parents('.bottom-area').find('.ex-rate').text();
        var actual = (amount - end) * rateValue;
        var endActual = big(actual).toFixed(currencyConfig[lang]);
        /*var endActual = Math.round(actual * 100) / 100;*/
        $this.parents('.bottom-area').find('.calculate-actual').text(endActual);

        
    }).on('click', '.add-button', function() {
    	var $newBlock = $('.add-account');
    	 $('#withDrawForm').data('formValidation').resetField('newAccount',true);
         $('#withDrawForm').data('formValidation').resetField('dueDate',true);
         $('#withDrawForm').data('formValidation').resetField('cccNumber',true);
   	 	var $optionfirst = $newBlock.find('.newAccount');
        var $optionsecond = $newBlock.find('.dueDate');
        var $optionthree = $newBlock.find('.cccNumber');
    	 $optionfirst.val('');
         $optionsecond.val('');
         $optionthree.val('');
        var $this = $(this);
        $newBlock.slideDown('fast');
        $('#withDrawForm').formValidation('addField', $optionfirst)
            .formValidation('addField', $optionsecond)
            .formValidation('addField', $optionthree);
        $this.attr('disabled', 'disabled');
	    	$('#with-time input').datepicker({
	            format: "yyyy/mm",
	            startView: "years",
	            minViewMode: "months",
	            autoclose : true,
	            orientation: "top right",
	            language: lang
	        })
	        .on('changeDate', function () {
	            $('#withDrawForm').formValidation('revalidateField', 'dueDate');
	        });
    }).on('click', '.edit-cancel', function() {
    	var $newBlock = $('.add-account');
    	 var $optionfirst = $newBlock.find('.newAccount');
         var $optionsecond = $newBlock.find('.dueDate');
         var $optionthree = $newBlock.find('.cccNumber');
        $('.add-button').removeAttr('disabled');     
        	$newBlock.slideUp('fast');       	
    }).on('click', '.edit-confirm', function() {
    	var $newBlock = $('.add-account');
        $('#withDrawForm').data('formValidation').validateField('newAccount');
        $('#withDrawForm').data('formValidation').validateField('dueDate');
        $('#withDrawForm').data('formValidation').validateField('cccNumber');
        var isVfirst = $('#withDrawForm').data('formValidation').isValidField('newAccount');
        var isVsecond = $('#withDrawForm').data('formValidation').isValidField('dueDate');
        var isVthree = $('#withDrawForm').data('formValidation').isValidField('cccNumber');
        if (isVfirst && isVsecond && isVthree) {
        	             
        	var $parent = $('.currentAccount');
            $parent.find('option').removeAttr('selected');
            var text = $newBlock.find('.newAccount').val();
            var html = '<option value="' + text + '" selected>' + text + '</option>';
            $(html).appendTo($parent);
            var $optionfirst = $newBlock.find('.newAccount');
            var $optionsecond = $newBlock.find('.dueDate');
            var $optionthree = $newBlock.find('.cccNumber');
            
            $newBlock.slideUp('fast');
            $('.add-button').removeAttr('disabled');   

            $('#withDrawForm').data('formValidation').revalidateField('currentAccount',true);
        }	
    }).on('success.field.fv', '.newAccount', function(e, data) {
    	console.log(data.result);
		$('#cardType-image').prop('src','/images/'+data.result.cardType+'.png');
		$('#cardType-image').prop('width','50');
		$('#cardType-image').prop('height','35');
		$('.calculate').html(data.result.handlingCharge);
		$('#handling-charge').val(data.result.handlingCharge);
				
    });
    
    
    $('#withDrawForm').formValidation('setLocale', lang);
	 $('#withDrawForm').on('click','.add-card',function(){
	    	var options = { 
			        type: "POST",
					url: '/cooka-finance-web/addBankCard',
					cache: false,
					contentType: false,
					processData: false,
					success: function(result) {
						if(result!= "failed" && result!= "success"){}
					},
					error: function(status) {
						alert('add card Error!!!');
					}
			    }; 
	    	console.log('addBankCCC');
			$('#withDrawForm').ajaxSubmit(options); 
	    });
    $(document).on('change', '#card-num', function(){
    	
    });
    $('.currentAccount').on('change',function(){
    	var cardNum = $(this).val(); 
    	$.ajax({
			type: "GET",
			url: '/cooka-finance-web/getCardType?cardNum=' + cardNum,
			cache: false,
			contentType: false,
			processData: false,
			success: function(result) {
				if(result!="error"){
					var obj = $.parseJSON(result);
					console.log(obj);
					$('.calculate').html(obj.handlingCharge);
					$('#handling-charge').val(obj.handlingCharge);
				}	
			},
			error: function(status) {
				alert('get cardtype error!!!');
			}
		});
    });
});
