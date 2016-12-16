Handlebars.registerHelper('ifEq', function(a, b, options) {
	if (a === b) {
		return options.fn(this);
	}
	return options.inverse(this);
});

Handlebars.registerHelper('json', function(obj) {
	return JSON.stringify(obj);
});

Handlebars.registerHelper('i18n', function(str) {
	return __(str);
});