// this file can do i18n stuff for precompliled handlebars file
// run cmd type "node h2i18n.js <file>"


var fs = require('fs');
var pFile = process.argv[2];
var gFile = pFile.slice(0, -3) + '_i18n.js';
fs.readFile(pFile, 'utf-8', function (err, text) {
	var newText;

	if (err) {
		console.log(err);
	}
	else {
		newText = text.replace(/__\('([a-zA-Z0-9 ]+)'\)/g, '" + __("$1") + "');
	
		fs.writeFile(gFile, newText, function (err) {
			if (err) {
				console.log(err);
			}
			else {
				console.log(pFile, '>>>[Handlebars_i18n]>>>', gFile);
			}
		});
	}
});
