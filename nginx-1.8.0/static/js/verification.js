var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'); 

require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');

require('./p_take_count.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

$(document).ready(function() {

    $('.time-count').on('click', function() {
        $(this).attr('disabled', true);
        $.ajax({
            type: "post",
            url: "/cooka-user-web/center/sendNum.do",
            data: "type=email",
            dataType: "html",
            async: true,
            success: function(data) {
                $(this).takeCount();
            }
        });
    });

    $('.certain').on('click', function() {
        var $formSuccessField = $('.form-area').find('.has-success');
        if ($formSuccessField.length === 6) {
            $('#validateButton').removeClass('disabled');
            $('#validateButton').attr('disabled', false);
            $('.form-area').hide();
            $('.confirm-table').show();

            var $questionString = $('#answerForm').find("option:selected").text();
            var questionArray = $questionString.split("?");
            var $answerList = $('#answerForm').find('.answer');
            var answerArray = [];
            for (var i = 0; i < $answerList.length; i++) {
                answerArray[i] = $answerList[i].value;
            }

            var $tableQuestion = $('.confirm-table').find('tbody tr').find('td:nth-child(even)');
            var $tableAnswer = $('.confirm-table').find('tbody tr').find('td:nth-child(odd)');

            $tableQuestion.map(function(index, elem) {
                return $(elem).text(questionArray[index]);
            });

            $tableAnswer.map(function(index, elem) {
                return $(elem).text(answerArray[index]);
            });
        } else {
            alert(__('Complete the questions and the answers'));
        }
    });

    $('.return-to-change').on('click', function() {
        $('.confirm-table').hide();
        $('.form-area').show();
    });

    $('#answerForm').formValidation({
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
            'problem': {
                selector: '.f-problem',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'Please select a question',
                            zh_CN: '请选择安全问题'
                        }
                    }
                }
            },
            'answer': {
                selector: '.f-answer',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'Please answer the question',
                            zh_CN: '请回答安全问题'
                        }
                    },
                    stringLength: {
                        min: 3,
                        max: 50,
                        message: {
                            en_US: 'The answer should no longer than 50,but more than 3',
                            zh_CN: '答案不能少于3个长度，但是要少于50个长度'
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
    
    $('#answerForm').formValidation('setLocale', lang);

    $('#confirmCodeForm').formValidation({
        framework: 'bootstrap',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        addOns: {
            i18n: {}
        },
        button: {
            selector: '#validateButton',
            disabled: 'disabled'
        },
        fields: {
            "confirm_code": {
                selector: '.f-confirmCode',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The verification code is required and cannot be empty',
                            zh_CN: '验证码不能为空'
                        }
                    },
                    stringLength: {
                        min: 6,
                        max: 6,
                        message: {
                            en_US: 'The verification code must be 6 characters long',
                            zh_CN: '验证码为6个字符长度'
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
    .on('success.field.fv', function(e, data) {
        if (data.fv.getInvalidFields().length > 0) { // There is invalid field
            data.fv.disableSubmitButtons(true);
        }
    });
    
    $('#confirmCodeForm').formValidation('setLocale', lang);
});
