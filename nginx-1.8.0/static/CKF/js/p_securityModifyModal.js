var CKF = require('./CKF.js');
require('../less/security-modify-modal.less');
// other dependencies ...
var getCookie = require('./getCookie.js');
var lang = getCookie('language');

// form validation
require('../css/formValidation.min.css');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');

require('../css/intlTelInput.css');
require('./libs/intl_tel/intlTelInput.min.js');

// bootstrap
require('bootstrap/js/transition.js');
require('bootstrap/js/modal.js');

module.exports = (function () {
	var moduleName = 'securityModifyModal';
    var module = CKF.create(moduleName);

    // 验证表单
    var $mobileVerForm = module.find('#security-mobile-verification-form');
    var $emailVerForm = module.find('#security-email-verification-form');
    var $questionVerForm = module.find('#security-question-verification-form');
    // 重设表单
    var $resetPwdForm = module.find('#security-reset-pwd-form');
    var $resetEmailForm = module.find('#security-reset-email-form');
    var $resetQuestionFrom = module.find('#security-reset-question-form');
    var $resetMobileForm = module.find('#security-reset-mobile-form');
    var $resetPayForm = module.find('#security-reset-pay-form');

    var $successWin = module.find('.security-modify-modal-success');
    var $close = module.find('.close');

    var $wayId; // 选择修改的内容

    function openModifyModal(wayId){

        $wayId = wayId;

        module.modal({
            backdrop: 'static',
            show: true
        });
    }

    // 打开对应的重设表单
    function openResetForm(wayId) {
        /**
         * wayId: int
         * 1: 邮箱
         * 2: 登录密码
         * 3: 手机号码
         * 4: 安全问题
         * 5: 支付密码
         */

         switch(wayId) {
            case 1:
                $resetEmailForm.slideDown('fast');
                $resetEmailForm.find('.time-count').attr('disabled', true);
                break;

            case 2:
                $resetPwdForm.slideDown('fast');
                break;

            case 3:
                $resetMobileForm.slideDown('fast');
                $resetMobileForm.find('.time-count').attr('disabled', true);
                break;

            case 4:
                $resetQuestionFrom.slideDown('fast');
                break;

            case 5:
                $resetPayForm.slideDown('fast');
                break;

            default:
         }
    }

    // 打开对应的验证表单
    function openVerForm(verId){
        /**
         * verId: int
         * 1: 邮箱验证
         * 2: 密保验证
         * 3: 手机验证
         */
        switch(verId) {
            case 1:
                $emailVerForm.show();
                break;

            case 2:
                $questionVerForm.show();
                break;

            case 3:
                $mobileVerForm.show();
                break;

            default:
        }
    }

    // 关闭按钮，重置
    function closeClick(){
        $close.on('click', function(event) {
            event.preventDefault();

            // 还原step-flow
            CKF.notify({
                type: 'step-init',
                data: null
            });

            module.find('form').each(function(index, el) {
                var $this = $(this);
                $this.show();
                $this.find('input').not(':disabled').not(':hidden').val('');
                $this.data('formValidation').resetForm();
                var $hasTakeCount = $this.find('.message-change');
                if($hasTakeCount.length){
                    CKF.notify({
                        type: 'stop-take-count',
                        data: null
                    });
                }
                $this.hide();
            });
        });
    }

    // 重设成功
    function resetAjaxSuccess(cl, f, win) {
        cl.hide();
        CKF.notify({
            type: 'next-active',
            data: null
        });
        f.slideUp('fast');
        win.slideDown('fast');
    }

    return {
    	init: function(){

            CKF.listen({
                'open-modify-modal': openModifyModal,
                'open-ver-form': openVerForm
            }, moduleName);

            closeClick();

            /**
             * 验证类表单通过时：
             * 1. 流程要跳到下一步： next-active
             * 2. 当前验证表单关闭： hide()
             * 3. 打开要修改的表单： openResetForm()
             */

            //----------------------------------------------------------------------------------

            // 邮箱验证
            $emailVerForm.formValidation({
                framework: 'bootstrap',
                icon: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    "f-confirm-code": {
                        selector: '#security-email-verification-form .f-confirm-code',
                        validators: {
                            notEmpty: {
                                message: __('Please input verify code')
                            },
                            stringLength: {
                                min: 4,
                                max: 9,
                                message: __('Wrong verify code length')
                            },
                            blank: {
                                message: '_'
                            }
                        }
                    }
                }
            })
            .on('click', '.time-count', function(){
                var $this = $(this);
								$this.attr('disabled', true);
                var $emailAddr = $emailVerForm.find('strong').text();

                // ajax content: 本地测试用
                // CKF.notify({
                //     type: 'use-take-count',
                //     data: $this
                // });
                // $this.closest('.form-group').find('input').removeAttr('disabled');

                $.ajax({
                    url: "/cooka-user-web/center/sendEmailRandNum",
                    type: 'POST',
                    data: "email="+$emailAddr,
                    success: function(result) {
												CKF.notify({
														type: 'use-take-count',
														data: $this
												});
                        if(result == "success"){
                            $this.closest('.form-group').find('input').removeAttr('disabled');
                        }else if(result == "frequently"){
                        	alert(__("Frequent Operation"));
                        }else{
                            alert(__("send failed"));
                        }
                    },
										fail: function () {
											$this.attr('disabled', false);
										}
                });
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

                // ajax content： 本地测试用
                // $form.slideUp('fast');

                // CKF.notify({
                //     type: 'next-active',
                //     data: null
                // });

                // openResetForm($wayId);

                $.ajax({
                    url: $form[0].action,
                    type: 'POST',
                    data: $form.serialize(),
                    success: function(result) {
                        if(result == "success"){

                            $form.slideUp('fast');

                            CKF.notify({
                                type: 'next-active',
                                data: null
                            });

                            openResetForm($wayId);

                        }else if(result == "wrongCaptcha"){
                            fv
                            .updateMessage('f-confirm-code', 'blank', __('Wrong confirm code'))
                            .updateStatus('f-confirm-code', 'INVALID', 'blank');
                            updateCaptcha($form);
                        }else{
                            alert(__("Unknown error"));
                        }
                    }
                });
            });

            //-----------------------------------------------------------------------------------

            // 手机验证
            $mobileVerForm.formValidation({
                framework: 'bootstrap',
                icon: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    "f-confirm-code": {
                        selector: '#security-mobile-verification-form .f-confirm-code',
                        validators: {
                            notEmpty: {
                                message: __('Please input verify code you got')
                            },
                            stringLength: {
                                min: 4,
                                max: 9,
                                message: __('Wrong verify code length')
                            },
                            blank: {
                                message: '_'
                            }
                        }
                    }
                }
            })
            .on('click', '.time-count', function(){
                var $this = $(this);
								$this.attr('disabled', true);

                $.ajax({
                    url: "/cooka-user-web/center/sendPhoneRandNum",
                    type: 'POST',
                    data: "phone=default",
                    success: function(result) {
												CKF.notify({
														type: 'use-take-count',
														data: $this
												});
                        if(result == "success"){
                            $this.closest('.form-group').find('input').removeAttr('disabled');
                        }else if(result == "frequently"){
                        	alert(__("Frequent Operation"));
                        }else{
                            alert(__("send failed"));
                        }
                    },
										fail: function () {
											$this.attr('disabled', false);
										}
                });
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

                 $.ajax({
                    url: $form[0].action,
                    type: 'POST',
                    data: $form.serialize(),
                    success: function(result) {
                        if(result == "success"){
                            $form.slideUp('fast');
                            CKF.notify({
                                type: 'next-active',
                                data: null
                            });
                            openResetForm($wayId);
                        }else if(result == "WrongCode"){
                            fv
                            .updateMessage('f-confirm-code', 'blank', __('Wrong confirm code'))
                            .updateStatus('f-confirm-code', 'INVALID', 'blank');
                            updateCaptcha($form);
                        }else{
                            alert(__("Unknown error"));
                        }
                    }
                 });
            });

            //-----------------------------------------------------------------------------------

            // 密保验证
            $questionVerForm.formValidation({
                framework: 'bootstrap',
                icon: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    'f-answer': {
                        selector: '#security-question-verification-form .f-answer',
                        validators: {
                            notEmpty: {
                                message: __('Please answer the question')
                            },
                            stringLength: {
                                max: 50,
                                min: 3,
                                message: __('The answer should no longer than %s,but more than %s')
                            },
                            blank: {
                                message: '_'
                            }
                        }
                    }
                }
            })
            .on('click', '.f-problem', function(){
                var $dataId = $(this).data('id');
                $oldSelected[$dataId] = this.selectedIndex;
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

                $.ajax({
                    url: $form[0].action,
                    type: 'POST',
                    data: $form.serialize(),
                    success: function(result) {
                        if(result == "success"){
                            $form.slideUp('fast');
                            CKF.notify({
                                type: 'next-active',
                                data: null
                            });
                            openResetForm($wayId);
                        } else {
                            $form.find('.f-answer').val('');

                            fv
                            .updateMessage('f-answer', 'blank', __('Wrong answer, please answer again'))
                            .updateStatus('f-answer', 'INVALID', 'blank');
                        }
                    }
                 });
            });

            //-----------------------------------------------------------------------------------

            /**
             * 重设成功时：resetAjaxSuccess($close, $form, $successWin)
             * 1. 隐藏模态框关闭按钮：$close.hide();
             * 2. 当前重设表单隐藏：$form.slideUp();
             * 3. 流程下一步：'next-active'
             * 4. 成功提示窗口显示: $successWin.slideDown();
             */

            var $emailNum;
            var $confirmCode; // 校验码：绑定手机或者邮箱用到

            // 邮箱重设
            $resetEmailForm.formValidation({
                framework: 'bootstrap',
                icon: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    'f-email': {
                        selector: '#security-reset-email-form .f-email',
                        validators: {
                            notEmpty: {
                                message: __('Please enter your email')
                            },
                            emailAddress: {
                                message: __('The input is not a valid email address')
                            },
                            stringLength: {
                                min: 6,
                                max: 30,
                                message: __('Email length must be more than %s less than %s')
                            },
                            regexp: {
                                regexp: /^[a-z0-9][-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
                                message: __('Invalid Email')
                            },
                            remote: {
                                url: "/cooka-user-web/isExistEmail",
                                type: 'GET',
                                delay: 1000,
                                data: function(validator, $field, value) {
                                    return {
                                        email: validator.getFieldElements('f-email').val()
                                    };
                                },
                                message: __('Email is already exist')
                            },
                            blank: {
                                message: '_'
                            }
                        }
                    },
                    'f-confirm-code': {
                        selector: '#security-reset-email-form .f-confirm-code',
                        validators: {
                            notEmpty: {
                                message: __('Please input verify code you got')
                            },
                            stringLength: {
                                min: 4,
                                max: 9,
                                message: __('Wrong verify code length')
                            },
                            callback: {
                                message: __('Please input verify code you got'),
                                callback: function(value, validator, $field) {
                                    $confirmCode = value;
                                    if (value === '') {
                                        return false;
                                    }
                                    return true;
                                }
                            },
                            blank: {
                                message: '_'
                            }
                        }
                    }
                }
            })
            .on('click', '.time-count', function() {
                var $this = $(this);
                $.ajax({
                    url: "/cooka-user-web/center/sendEmailRandNum",
                    type: 'POST',
                    data: {
                        'email': $resetEmailForm.find('.f-email').val()
                    },
                    success: function(result) {
                        if (result == "success") {
                            CKF.notify({
                                type: 'use-take-count',
                                data: $this
                            });
                            $this.closest('.form-group').find('input').removeAttr('disabled');
                        } else if (result == "frequently") {
                            alert(__("Frequent Operation"));
                        } else {
                            alert(__("Send Failed"));
                        }
                    }
                });
            })
            .on('success.field.fv', function(e, data) {
                if (data.field === 'f-email') {
                    $resetEmailForm.find('.time-count').attr('disabled', false);
                }
            })
            .on('err.field.fv', function(e, data) {
                if (data.field === 'f-email') {
                    $resetEmailForm.find('.time-count').attr('disabled', true);
                    data.fv.resetField('f-confirm-code');
                }
            })
            .on('err.validator.fv', function(e, data) {
                data.element
                    .data('fv.messages')
                    .find('.help-block[data-fv-for="' + data.field + '"]').hide()
                    .filter('[data-fv-validator="' + data.validator + '"]').show();
            }).on('success.form.fv', function(e) {
                e.preventDefault();

                var $form = $(e.target),
                    fv = $(e.target).data('formValidation');
                //reset Email
                $.ajax({
                    url: $form[0].action,
                    type: 'POST',
                    //Content-Type:text/html; charset=utf-8,
                    data: {
                        'account': $form.find('.f-email').val(),
                        'randomNum': $form.find('.f-confirm-code').val()
                    },
                    success: function(result) {
                        if (result == "success") {
                            resetAjaxSuccess($close, $form, $successWin);
                        } else if (result == "wrongCaptcha") {
                            fv
                                .updateMessage('f-confirm-code', 'blank', __('Wrong confirm code'))
                                .updateStatus('f-confirm-code', 'INVALID', 'blank');
                            updateCaptcha($form);
                        } else {
                            alert(__("Unknown error"));
                        }
                    }
                });
            });

            // 重设密码
            $resetPwdForm.formValidation({
                framework: 'bootstrap',
                icon: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    "f-password": {
                        selector: '#security-reset-pwd-form .f-password',
                        validators: {
                            notEmpty: {
                                message: __('Please enter your password')
                            },
                            stringLength: {
                                min: 6,
                                max: 30,
                                message: __('Password length more than %s but less than %s')
                            },
                            regexp: {
                                regexp: /^[^\s]*$/,
                                message: __('Password can not contain space')
                            }
                        }
                    },
                    "f-confirm-password": {
                        selector: '#security-reset-pwd-form .f-confirm-password',
                        validators: {
                            notEmpty: {
                                message: __('The confirm password is required and can not be empty')
                            },
                            identical: {
                                field: 'f-password',
                                message: __('The password and its confirm are not the same')
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

                $.ajax({
                    url: $form[0].action,
                    type: 'POST',
                    //Content-Type:text/html; charset=utf-8,
                    data: $form.serialize(),
                    success: function(result) {
                        if(result == "success"){

                            resetAjaxSuccess($close, $form, $successWin);

                        }else{
                            alert(__("Unknown error"));
                        }
                    }
                 });
            });

            //-----------------------------------------------------------------------------------

            // 重设支付密码
            $resetPayForm.formValidation({
                framework: 'bootstrap',
                icon: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    "f-password": {
                        selector: '#security-reset-pay-form .f-password',
                        validators: {
                            notEmpty: {
                                message: __('Please enter your password')
                            },
                            stringLength: {
                                min: 6,
                                max: 30,
                                message: __('Password length more than %s but less than %s')
                            },
                            regexp: {
                                regexp: /^[^\s]*$/,
                                message: __('Password can not contain space')
                            },
                            callback: {
                                message: __('The password is weak'),
                                callback: function(value, validator, $field) {
                                    var score = 0;

                                    if (value === '') {
                                        return {
                                            valid: true,
                                            score: null
                                        };
                                    }

                                    // Check the password strength
                                    score += ((value.length >= 8) ? 1 : -1);

                                    // The password contains uppercase character
                                    if (/[A-Z]/.test(value)) {
                                        score += 1;
                                    }

                                    // The password contains uppercase character
                                    if (/[a-z]/.test(value)) {
                                        score += 1;
                                    }

                                    // The password contains number
                                    if (/[0-9]/.test(value)) {
                                        score += 1;
                                    }

                                    // The password contains special characters
                                    if (/[!#$%&^~*_]/.test(value)) {
                                        score += 1;
                                    }

                                    return {
                                        valid: true,
                                        score: score    // We will get the score later
                                    };
                                }
                            }
                        }
                    },
                    "f-confirm-password": {
                        selector: '#security-reset-pay-form .f-confirm-password',
                        validators: {
                            notEmpty: {
                                message: __('The confirm password is required and can not be empty')
                            },
                            identical: {
                                field: 'f-password',
                                message: __('The password and its confirm are not the same')
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
            .on('success.validator.fv', function(e, data) {
                // The password passes the callback validator
                if (data.field === 'f-password' && data.validator === 'callback') {
                    // Get the score
                    var score = data.result.score,
                        $bar  = $resetPayForm.find('#passwordMeter').find('.progress-bar');

                    switch (true) {
                        case (score === null):
                            $bar.html('').css('width', '0%').removeClass().addClass('progress-bar');
                            break;

                        case (score <= 0):
                            $bar.html(__('Very weak')).css('width', '25%').removeClass().addClass('progress-bar progress-bar-danger');
                            break;

                        case (score > 0 && score <= 2):
                            $bar.html(__('Weak')).css('width', '50%').removeClass().addClass('progress-bar progress-bar-warning');
                            break;

                        case (score > 2 && score <= 4):
                            $bar.html(__('Medium')).css('width', '75%').removeClass().addClass('progress-bar progress-bar-info');
                            break;

                        case (score > 4):
                            $bar.html(__('Strong')).css('width', '100%').removeClass().addClass('progress-bar progress-bar-success');
                            break;

                        default:
                            break;
                    }
                }
            })
            .on('success.form.fv', function(e) {
                e.preventDefault();

                var $form = $(e.target),
                    fv = $(e.target).data('formValidation');

                $.ajax({
                    url: $form[0].action,
                    type: 'POST',
                    //Content-Type:text/html; charset=utf-8,
                    data: $form.serialize(),
                    success: function(result) {
                        if(result == "success"){

                            resetAjaxSuccess($close, $form, $successWin);

                        }else{
                            alert(__("Unknown error"));
                        }
                    }
                 });
            });

            //-----------------------------------------------------------------------------------

            // 重设密保
            module.find('.btn-check').on('click', function(){
                var $resetQuestionArea = module.find('.security-question-form-area');
                var $resetQuestionConfirm = module.find('.security-question-confirm');
                var $formSuccessField = $resetQuestionArea.find('.has-success');
                if ($formSuccessField.length === 6) {
                    module.find('#validateButton').removeClass('disabled');
                    module.find('#validateButton').attr('disabled', false);

                    var $questionString = $resetQuestionArea.find("option:selected").text();
                    var questionArray = $questionString.split("?");
                    var $answerList = $resetQuestionArea.find('.f-answer');
                    var answerArray = [];
                    for (var i = 0; i < $answerList.length; i++) {
                        answerArray[i] = $answerList[i].value;
                    }

                    var $tableQuestion = $resetQuestionConfirm.find('tbody tr').find('td:nth-child(even)');
                    var $tableAnswer = $resetQuestionConfirm.find('tbody tr').find('td:nth-child(odd)');

                    $tableQuestion.map(function(index, elem) {
                        return $(elem).text(questionArray[index]);
                    });

                    $tableAnswer.map(function(index, elem) {
                        return $(elem).text(answerArray[index]);
                    });

                    $resetQuestionArea.slideUp('fast');
                    $resetQuestionConfirm.slideDown('fast');
                } else {
                    alert(__('Please finish the form first'));
                }

                module.find('.btn-return').on('click', function(){
                    $resetQuestionConfirm.slideUp('fast');
                    $resetQuestionArea.slideDown('fast');
                });
            });

            var $nowSlected = [];   // 记录现在的选择
            var $oldSelected = [];  // 记录旧的选择
            var $selected = [];     // 记录已经选择的选择

            function updateNowSel(){
                var $allSel = $resetQuestionFrom.find('select');
                $allSel.each(function(index, el) {
                    $nowSlected[index] = this.selectedIndex;
                });
            }

            updateNowSel(); // 初始化现在的选择

            $resetQuestionFrom.formValidation({
                framework: 'bootstrap',
                icon: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    'f-problem': {
                        selector: '#security-reset-question-form .f-problem',
                        validators: {
                            notEmpty: {
                                message: __('Please select a question')
                            },
                            callback: {
                                message: __('You had selected this question or you do not select the question'),
                                callback: function(value, validator, $field) {
                                    var $new = $field[0].selectedIndex;

                                    if ($new === 0) {
                                        updateNowSel();
                                        return false;
                                    } else {
                                        if($.inArray($new, $nowSlected) >=0) {
                                            updateNowSel();
                                            return false;
                                        } else {
                                            updateNowSel();
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'f-answer': {
                        selector: '#security-reset-question-form .f-answer',
                        validators: {
                            notEmpty: {
                                message: __('Please answer the question')
                            },
                            stringLength: {
                                min: 3,
                                max: 50,
                                message: __('The answer should no longer than %s,but more than %s')
                            }
                        }
                    }
                }
            })
            .on('click', '.f-problem', function(){
                var $dataId = $(this).data('id');
                $oldSelected[$dataId] = this.selectedIndex;
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

                $.ajax({
                    url: $form[0].action,
                    type: 'POST',
                    data: $form.serialize(),
                    success: function(result) {
                        if(result == "success"){

                            resetAjaxSuccess($close, $form, $successWin);

                        }else{
                            alert(__("Unknown error"));
                        }
                    }
                 });
            });

            //--------------------------------------------------------------------------------

            // 重设手机
            var $mobileNum;

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

            $resetMobileForm.find('.time-count').attr('disabled', true);
            $resetMobileForm.formValidation({
                framework: 'bootstrap',
                icon: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    "f-phone": {
                        selector: '#security-reset-mobile-form .f-phone',
                        validators: {
                            notEmpty: {
                                message: __('Please input the mobile number you wanna to bind')
                            },
                            intPhoneNumber: {
		                        utilsScript: '/CKF/js/libs/intl_tel/utils.js',
		                        autoPlaceholder: true,
		                        preferredCountries: 'cn,us,vn',
		                        message: __('The phone number is not valid')
		                    },
                            callback: {
                                message: __('Please input the mobile number you wanna to bind'),
                                callback: function (value, validator, $field) {
                                	$mobileNum = $field.intlTelInput("getNumber");
                                    if(value === ''){
                                        return false;
                                    }
                                    if($field.closest('.form-group').hasClass('has-error')){
                                        $resetMobileForm.find('.time-count').attr('disabled', true);
                                    } else {
                                        $resetMobileForm.find('.time-count').attr('disabled', false);
                                    }
                                    return true;
                                }
                            }
                        }
                    },
                    "f-confirm-code": {
                        selector: '#security-reset-mobile-form .f-confirm-code',
                        validators: {
                            notEmpty: {
                                message: __('Please input verify code you got')
                            },
                            stringLength: {
                                min: 4,
                                max: 9,
                                message: __('The captcha is wrong')
                            },
                            callback: {
								message: __('Please input verify code you got'),
	                            callback: function (value, validator, $field) {
	                            	$confirmCode = value;
	                            	if(value === '') {
	                            		return false;
	                            	}
	                                return true;
	                            }
	                        },
                            blank: {
                                message: '_'
                            }
                        }
                    }
                }
            })
            .on('click', '.time-count', function(){
                var $this = $(this);
								$this.attr('disabled', true);
                $.ajax({
                    url: "/cooka-user-web/center/sendPhoneRandNum",
                    type: 'POST',
                    data: {
                    	phone: $mobileNum
                    },
                    success: function(result) {
												CKF.notify({
														type: 'use-take-count',
														data: $this
												});
                        if(result == "success"){
                            $this.closest('.form-group').find('input').removeAttr('disabled');
                        }else if(result == "frequently"){
                            alert(__("Frequent Operation"));
                        }else{
                            alert(__("Send Failed"));
                        }
                    },
										fail: function () {
											$this.attr('disabled', false);
										}
                });
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

                 $.ajax({
                    url: $form[0].action,
                    type: 'POST',
                    data: {
                    	phone: $mobileNum,
                    	randomNum: $confirmCode
                    },
                    success: function(result) {
                        if(result == "success"){

                            resetAjaxSuccess($close, $form, $successWin);

                        }else if(result == "wrongCaptcha"){
                            fv
                            .updateMessage('f-confirm-code', 'blank', __('Wrong confirm code'))
                            .updateStatus('f-confirm-code', 'INVALID', 'blank');
                            updateCaptcha($form);
                        }else{
                            alert(__("Unknown error"));
                        }
                    }
                 });
            });
    	}
    };
})();
