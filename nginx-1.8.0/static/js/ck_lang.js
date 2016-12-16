$(document).on('click', 'a[data-lang]', function(e) {
	e.preventDefault();
	var $this = $(this);
	var lang = $this.data('lang');

	function setCookie(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
		if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
			return false;
		}
		var sExpires = "";
		if (vEnd) {
			switch (vEnd.constructor) {
				case Number:
					sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
					break;
				case String:
					sExpires = "; expires=" + vEnd;
					break;
				case Date:
					sExpires = "; expires=" + vEnd.toUTCString();
					break;
			}
		}
		sPath = '/';
		document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
		return true;
	}

	setCookie('language', lang, Infinity);
	window.location.reload();
});

function getLang() {

	var DEFAULT = 'zh_CN';

	var cMatch = document.cookie.replace(/(?:(?:^|.*;\s*)language\s*\=\s*([^;]*).*$)|^.*$/, "$1") || null;

	if (cMatch !== null) {
		return cMatch;
	}

	return DEFAULT;
}
$(function() {
	$('#admin-side-menu')
		.find('a[href^="' + window.location.pathname + '"]')
		.closest('.sidebar-section')
		.find('a[data-toggle="collapse"]')
		.click();
});