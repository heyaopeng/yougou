console.log(__('this is page 1'));

var getCookie = require('./getCookie.js');
var lang = getCookie('lang');


console.log(lang);

//require("imports?define=>false!blueimp-file-upload");

$(document).ready(function() {
	console.log(__('my info'));
});