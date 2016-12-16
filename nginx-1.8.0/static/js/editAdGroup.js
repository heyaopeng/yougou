var getCookie = require('./getCookie.js');
var lang = getCookie('org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'); // 默认返回 en_US
require('./libs/bootstrap.min.js');
require('./libs/FV/formValidation.min.js');
require('./libs/FV/bootstrap.min.js');
require('./libs/FV/i18n.min.js');
require('./p_freight_interval.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');
$(document).ready(function() {
    var cdata = $!categories;

    $('#category-node-pick').nodePick(cdata);
    $('#category-node-pick').on('leaf.selected', function () {
        var html = '';
        $(this).find('li.active').each(function (index, elem) {
            html += '<li>' + $(elem).text() + '</li>';
        });
        $('#selected-category').html(html);
    });
    $('#category-node-pick').on('node.selected', function () {
        $('#selected-category').empty();
    });

    $('form').formValidation({
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
            'leaf-val': {
                selector: '.leaf-val',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'The type is required',
                            zh_CN: '请选择分类'
                        }
                    }
                }                           
            },
            'f-position': {
                selector: '.f-position',
                validators: {
                    notEmpty: {
                        message: {
                            en_US: 'required',
                            zh_CN: '请选择排位'
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
        // $elem.formValidation('setLocale', lang);
});