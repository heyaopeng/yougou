module.exports = function(timestamp) {
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
};