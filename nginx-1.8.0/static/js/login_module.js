$(document).ready(function() {
	define(function(require) {
		var getCookie = require('./getCookie.js');
		var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE');
		
		$('.link-fresh-captcha').on('click', function(){
	        event.preventDefault();
	        $('#captchaImage').hide().attr('src', '/cooka-user-web/captchaImage.do?' + Math.floor(Math.random() * 100)).fadeIn();
	        event.cancelBubble = true;
	    });

	    $(function() {
	        $('#captchaImage').click(function() {
	            $(this).hide().attr('src', '/cooka-user-web/captchaImage.do?' + Math.floor(Math.random() * 100)).fadeIn();
	            event.cancelBubble = true;
	        });
	    });

	    $('#toLoginForm').formValidation({
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
	            'email': {
	                selector: '.f-email',
	                validators: {
	                    notEmpty: {
	                        message: {
	                        	en_US: 'The username is required',
	                        	zh_CN: '用户名不能为空'
	                        }
	                    },
	                    emailAddress: {
	                        message: {
	                        	en_US: 'The input is not a valid email address',
	                        	zh_CN: '输入的不是有效邮箱'
	                        }
	                    },
	                    stringLength: {
	                        min: 6,
	                        max: 30,
	                        message: {
	                        	en_US: 'The email length is more than 6 but no more than 30',
	                        	zh_CN: '邮箱长度大于6并且小于30'
	                        }
	                    },
	                    callback: {
	                        callback: function(value, validator, $field) {
	                            $.get('/cooka-user-web/isNeedCaptcha.do', {
	                                "email": value
	                            }, function(data) {
	                                if (data) {
	                                    $('#captcha-block').removeClass('hide');
	                                }
	                            });
	                            return true;
	                        }
	                    }
	                }
	            },
	            'password': {
	                selector: '.f-password',
	                validators: {
	                    notEmpty: {
	                        message: {
	                        	en_US: 'The password is required',
	                        	zh_CN: '密码不能为空'
	                        }
	                    },
	                    stringLength: {
	                        min: 6,
	                        max: 30,
	                        message: {
	                        	en_US: 'The password length is more than 6 but no more than 30',
	                        	zh_CN: '密码长度大于6并且小于30'
	                        }
	                    }
	                }
	            },
	            'captcha': {
	                selector: '.f-captcha',
	                validators: {
	                    notEmpty: {
	                        message: {
	                        	en_US: 'The captcha is required',
	                        	zh_CN: '验证码不能为空'
	                        }
	                    },
	                    stringLength: {
	                        min: 4,
	                        max: 6,
	                        message: {
	                        	en_US: 'The captcha length is limit',
	                        	zh_CN: '验证码长度限制'
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
	    }).on('success.form.fv', function(e) {
            // Prevent form submission
            e.preventDefault();

            var $form = $(e.target),
                fv = $form.data('formValidation');
            
            console.log("do ajax login");
            // Use Ajax to submit form data
            $.ajax({
                url:"/cooka-user-web/ajaxLogin",
                //url:"http://127.0.0.1:8085/cooka-user-web/ajaxLogin",
                type: 'POST',
                data: $form.serialize(),
                success: function(result) {
                	console.log('服务器返回的结果为：'+result);
                	/*后台处理后的情况
    				wrongPassword
    				success
    				notActive
    				emptyCaptcha
    				wrongCaptcha
    				*/
                	if (result === 'success') {
                		console.log("login success ");
                		//fv.defaultSubmit(); //允许表单提交
                		$('#b-buy-now').click();
                	} else if (result === 'wrongPassword') {
                		//显示相应的提示信息
                		console.log("wrongPassword");  //允许表单提交
                		fv.updateStatus('password', 'INVALID');
                		$('#captcha-block').removeClass('hide');
                		document.getElementById('captchaImage').src= 'captchaImage.do';
                		return false;
                	} else if ( result === 'notActive') {
                		fv.updateStatus('password', 'INVALID');
                		$('#captcha-block').removeClass('hide');
                		document.getElementById('captchaImage').src= 'captchaImage.do';
                		console.log('notActive');
                		return false;
                	} else if ( result === 'emptyCaptcha') {
                		fv.updateStatus('password', 'INVALID');
                		document.getElementById('captchaImage').src= 'captchaImage.do';
                		console.log('emptyCaptcha');
                		return false;
                	} else {
                		fv.updateStatus('password', 'INVALID');
                		document.getElementById('captchaImage').src= 'captchaImage.do';
                		console.log('wrongCaptcha');
                		return false;
                	}
                }
            });
            
            // Then submit the form as usual
            
        });
	    
	    $('#toLoginForm').formValidation('setLocale', lang);
	    
	    $('#loginModal').on('hidden.bs.modal', function() {
	        $('#loginForm').formValidation('resetForm', true);
	    });
	});
});