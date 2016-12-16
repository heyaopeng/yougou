Handlebars.registerHelper('ifEq', function(a, b, options) {
	if (a === b) {
		return options.fn(this);
	}
	return options.inverse(this);
});

Handlebars.registerHelper('json', function(obj) {
	return JSON.stringify(obj);
});

Handlebars.registerHelper('pageDiv', function(p) {
	var head = '<div data-j="pagination"><ul class="pagination">';
	var pre = '';
	var mid = '';
	var post = '';

	if (!p.isFirstPage) {
		pre = '<li><a href="{{PAGE_URL}}" data-page="' + p.prePage + '">&laquo;</a></li>';
	}
	if (!p.isLastPage && p.size !== 0) {
		post = '<li><a href="{{PAGE_URL}}" data-page="' + p.getNextPage() + '">&raquo;</a></li>';
	}

	for (var i = 0; i < p.navigatepageNums.length; i++) {
		if (p.navigatepageNums[i] === p.pageNum) {
			mid += '<li class="active"><span>' + p.navigatepageNums[i] + '</span></li>';
		}
		else {
			mid += '<li><a href="{{PAGE_URL}}" data-page="' + p.navigatepageNums[i] + '">"' + p.navigatepageNums[i] + '</a></li>';
		}
	}

	post += '</ul>\n' +
		'<div class="pagination-control" data-max="' + p.pages + '">\n' +
		'<span>Total: ' + p.pages + '</span>\n' +
		'<span><input type="text" class="pagination-input" maxlength="10"></span>\n'+
		'<span><button type="button" class="btn btn-secondary pagination-go">Go</button></span>\n'+
		'</div>\n</div>';

	return head + pre + mid + post;
});

Handlebars.registerHelper('toTime', function(timestamp) {

	function fixZero(f) {
		if (f < 10) {
			return '0' + f;
		}
		return f;
	}

	var t = new Date(timestamp);
	var year = t.getFullYear();
	var month = t.getMonth() + 1;
	var day = t.getDate();
	var hour = fixZero(t.getHours());
	var min = fixZero(t.getMinutes());
	var sec = fixZero(t.getSeconds());

	return year + '/' + month + '/' + day + ' ' + hour + ':' + min + ':' + sec;
});

