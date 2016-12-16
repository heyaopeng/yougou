module.exports = function(c) {
	// defautl set
	var DEFAULT = {
		"language": "zh_CN"
	};

	var cMatch = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(c).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

	if (cMatch !== null) {
		return cMatch;
	}

	return DEFAULT[c];
};