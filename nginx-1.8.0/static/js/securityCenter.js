require('./libs/bootstrap.min.js');
require('./ck_sidebar.js');
require('./ck_lang.js');
require('./ck_ajax_setup.js');

$(document).ready(function() {
    var $successSign = $('.security-table').find('tbody tr').find('th:first-child').find('span.glyphicon-ok-circle');
    var $progressShow = $('.panel-body').find('.progress-bar');
    var $successSignLength = $successSign.length;
    if ($successSignLength <= 2) {
        $progressShow.addClass('progress-bar-danger');
    }
    var $securityPer = $successSignLength / 5 * 100 + '%';
    $('.panel-body').find('.progress-bar').css('width', $securityPer);
});
