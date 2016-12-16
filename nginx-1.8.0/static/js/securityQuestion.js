var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'); 

require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

$(document).ready(function() {
    $('.return-to-change').on('click', function() {
        $('.confirm-table').hide();
        $('.form-area').show();
    });

    $('.certain').on('click', function() {
    	console.log('gg');
        var $formSuccessField = $('.form-area').find('.has-success');
        if ($formSuccessField.length === 6) {
            $('#validateButton').removeClass('disabled');
            $('#validateButton').attr('disabled', false);
            $('.form-area').hide();
            $('.confirm-table').show();

            var $questionString = $('#answerForm').find("option:selected").text();
            console.log($questionString);
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
            alert(__('Please input completely'));
        }
    });
    
    // mobile input form formvalidation
    $('#mobileInputForm')
    .formValidation({
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
            "password": {
                selector: '.f-password',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'Password can not be empty',
                            zh_CN: '密码不能为空'
                        }
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: {
                            en_US: 'The length of password should be more than 6 but less than 30.',
                            zh_CN: '密码长度要大于6个并且少于30'
                        }
                    }
                }
            }
        }
    })
    .on('success.field.fv', function(e, data) {
        if (data.fv.getInvalidFields().length > 0) { // There is invalid field
            data.fv.disableSubmitButtons(true);
        }
    })
    .on('err.validator.fv', function(e, data) {
        data.element
            .data('fv.messages')
            .find('.help-block[data-fv-for="' + data.field + '"]').hide()
            .filter('[data-fv-validator="' + data.validator + '"]').show();
    });
    $('#mobileInputForm').formValidation('setLocale', lang);

    // security question setting form formvalidation
    $('#answerForm')
    .formValidation({
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
});
