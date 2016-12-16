function generateLink(p) {
	var currentUrl = window.location.href;
	var qIndex = currentUrl.indexOf('?');
	var querys = null;
	var newUrl = currentUrl;

	if (qIndex > -1) {
		querys = currentUrl.slice(qIndex + 1);
		// only with question mark
		if (querys.length === 0) {
			newUrl += 'page=' + p;
		}
		// has page param
		else if (/page=[0-9]*/.test(querys)) {
			newUrl = currentUrl.replace(/page=[0-9]*/, 'page=' + p);
		}
		// no page param
		else {
			newUrl += '&page=' + p;
		}
	}
	// no question mark
	else {
		newUrl += '?page=' + p;
	}

	return newUrl;
}

$('.pagination').find('a[data-page]').each(function(index, elem) {

	var $elem = $(elem);
	var p = $(elem).data('page');

	var newUrl = generateLink(p);

	$elem.attr('href', newUrl);
});

var maxPage = parseInt($('.pagination-control').data('max'));
$('.pagination-control').on('click', '.pagination-go', function (e) {
	e.preventDefault();
	var inputPage = parseInt($('.pagination-input').val());

	if (isNaN(inputPage) || inputPage > maxPage) {
		return;
	}

	location.href = generateLink(parseInt(inputPage));
});