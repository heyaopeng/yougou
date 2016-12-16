(function() {
	var template = Handlebars.template,
		templates = Handlebars.templates = Handlebars.templates || {};
	templates['h'] = template({
		"compiler": [6, ">= 2.0.0-beta.1"],
		"main": function(depth0, helpers, partials, data) {
			var helper, alias1 = helpers.helperMissing,
				alias2 = "function",
				alias3 = this.escapeExpression;
			return "\r\n<p>" + __('my info') + "</p>\r\n<h1>" + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1), (typeof helper === alias2 ? helper.call(depth0, {
				"name": "name",
				"hash": {},
				"data": data
			}) : helper))) + "</h1>\r\n<h2>" + alias3(((helper = (helper = helpers.phone || (depth0 != null ? depth0.phone : depth0)) != null ? helper : alias1), (typeof helper === alias2 ? helper.call(depth0, {
				"name": "phone",
				"hash": {},
				"data": data
			}) : helper))) + "</h2>";
		},
		"useData": true
	});
})();