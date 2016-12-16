//in backendRefundHandle.vm
var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'); 

require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js'); 
require('./ck_lang.js');
require('./ck_ajax_setup.js');

$(document).ready(function() {
    $('#f-message-form').formValidation({
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
            'f-mess-input': {
                selector: '.f-mess-input',
                validators: {
                    notEmpty: {
                        message:{
                            en_US: 'The content is required',
                            zh_CN: '内容不能为空'
                        }
                    },
                    stringLength: {
                        min: 10,
                        max: 500,
                        message: {
                            en_US: 'The content must be %s to %s characters',
                            zh_CN: '回复必须在%s到%s个字数之间'
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
    .on('click','.f-mess-dynamic',function() {
        var $this = $(this);
        var $origin = $('#f-mess-block');
        var $clone = $origin.clone()
            .addClass('f-mess-clone')
            .removeAttr('id')
            .insertBefore($origin);
        $clone.slideDown('fast');
        var	$option = $clone.find('.f-mess-input');
        $('#f-message-form').formValidation('addField', $option);
        $this.attr('disabled', 'disabled');
    })
    .on('click', '.f-mess-cancel', function(e) {
        var $clone = $('.f-mess-clone');
        $('.f-mess-dynamic').removeAttr('disabled');
        var $option = $clone.find('.f-mess-input');
        $('#f-message-form').formValidation('removeField', $option);
        $clone.remove();
    })
    .on('success.form.fv', function() {
        var $clone = $('.f-mess-clone');
        $('.f-mess-dynamic').removeAttr('disabled');
        var $option = $clone.find('.f-mess-input');
        $('#f-message-form').formValidation('removeField', $option);
        $clone.remove();
    });

    $('#f-message-form').formValidation('setLocale', lang);
});
