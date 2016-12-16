var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'); // 默认返回 en_US
//require('./js/libs/jquery-1.11.2.min.js') // you should not see me
require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');
require('./p_star_load.js');
require('./ck_page.js');

/*commentList*/
 $(document).ready(function() {
        $('.scores-load').starLoad();
        $('#f-reply-form').formValidation({
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
                'f-reply-input': {
                    selector: '.f-reply-input',
                    validators: {
                        notEmpty: {
                            message:{
                                en_US: 'The reply is required',
                                zh_CN: '回复不能为空'
                            }
                        },
                        stringLength: {
                            min: 10,
                            max: 500,
                            message: {
                                en_US: 'The reply must be %s to %s characters',
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
        .on('click','.f-reply-dynamic',function() {
            var $this = $(this);
            var $parTr = $this.parents('tr');
            var $origin = $('#f-reply-origin');
            var $clone = $origin.clone()
                    .addClass('f-reply-clone')
                    .removeAttr('id')
                    .insertAfter($parTr);
            var productId =$this.data('product');;
            var orderSerialNum=$this.data('order');
            $('[name ="productId"]').val(productId);
            $('[name ="orderSerialNum"]').val(orderSerialNum);
            
            $clone.slideDown('fast');
            $parTr.addClass('border-bottom');
            var $option = $clone.find('.f-reply-input');
            $('#f-reply-form').formValidation('addField', $option);
            $this.attr('disabled', 'disabled');

            //其他回复的变化
            var $prevActive = $parTr.siblings('tr').find('.f-reply-dynamic:disabled');
            $prevActive.removeAttr('disabled');
            var $preTrBorder = $prevActive.parents('tr');
            var $nextTr = $preTrBorder.next('tr');
            var $prevOption =$nextTr.find('f-reply-input');
            $('#f-reply-form').formValidation('removeField', $prevOption);
            $nextTr.remove();
            $preTrBorder.removeClass('border-bottom');

        })
        .on('click', '.f-reply-cancel', function() {
            var $clone = $('.f-reply-clone');
            var $preTr = $clone.prev('tr');
            $preTr.removeClass('border-bottom');
            $preTr.find('.f-reply-dynamic').removeAttr('disabled');
            var $option = $clone.find('f-reply-input');
            $('#f-reply-form').formValidation('removeField', $option);
            $clone.remove();
        })
        .on('success.form.fv', function(e) {
            // Prevent form submission
                    e.preventDefault();

                    var $form = $(e.target),
                        fv    = $form.data('formValidation');

                    // Use Ajax to submit form data
                    $.ajax({
                        url: $form.attr('action'),
                        type: 'POST',
                        data: $form.serialize(),
                        success: function(result) {
                            console.log(result);
                            $('.scores-load-new').starLoad();
                            window.location.reload();
                        }
                    });
            var $clone = $('.f-reply-clone');
            var $preTr = $clone.prev('tr');
            $preTr.removeClass('border-bottom');
            $preTr.find('.f-reply-dynamic').removeAttr('disabled');
            var $option = $clone.find('f-reply-input');
            $('#f-reply-form').formValidation('removeField', $option);
            $clone.remove();

        });

        $('#f-reply-form').formValidation('setLocale',lang);
    });