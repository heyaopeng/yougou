var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'); // 默认返回 en_US

//require('./js/libs/jquery-1.11.2.min.js') // you should not see me
require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');
require('./ck_page.js');
require('./p_star_load.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

/*add_comment*/
  $(document).ready(function() {
        $('#f-evaluation-form').formValidation({
            framework: 'bootstrap',
            addOns: {
                i18n: {}
            },
            excluded: [':disabled'],
            fields: {
                'f-pro-eval': {
                    selector: '.f-pro-eval',
                    validators: {
                        notEmpty: {
                            message: {
                                en_US: 'The evaluation is required',
                                zh_CN: '评价不能为空'
                            }
                        },
                        stringLength: {
                            min: 10,
                            max: 500,
                            message: {
                                en_US: 'The evaluation must be %s to %s characters',
                                zh_CN: '评价必须在%s到%s个字数之间'
                            }
                        }
                    }
                },

                'f-satisfaction': {
                    selector: '.f-satisfaction',
                    validators: {
                        notEmpty: {
                            message: {
                                en_US: ' ',
                                zh_CN: ' '
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
                        fv    = $form.data('formValidation');

                    // Use Ajax to submit form data
                    $.ajax({
                        url: $form.attr('action'),
                        type: 'POST',
                        data: $form.serialize(),
                        success: function(result) {
                            console.log(result);
                            window.location.reload();
                        }
                    });
                    $('.f-evaluation').slideUp();
                })
                .on('click', '.f-comstars span', function() {
                    var $this=$(this);
                    $this.addClass('active').siblings('span').removeClass('active');
                    var inputVal=$this.data('val');
                    $this.parents('.f-comstars').siblings('.form-group').find('input').attr('value',inputVal);
                    $('#f-evaluation-form').data('formValidation').revalidateField('f-satisfaction');
                });

        $('.scores-load').starLoad();
        $('#f-evaluation-form').formValidation('setLocale', lang);
    });