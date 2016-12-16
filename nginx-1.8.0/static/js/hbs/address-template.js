(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['addressForm'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=container.escapeExpression;

  return "	<div class=\"col-md-2\">\r\n		<select class=\"form-control f-"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + " address-select\" data-level=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" data-parent=\""
    + alias3(((helper = (helper = helpers.parent || (depth0 != null ? depth0.parent : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"parent","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias3(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"value","hash":{},"data":data}) : helper)))
    + "\" name=\""
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">\r\n			<option value=\"\">-- __('Select') --</option>\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</select>\r\n	</div>\r\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=helpers.helperMissing;

  return "				<option value=\""
    + alias2(alias1(depth0, depth0))
    + "\" data-parentid=\""
    + alias2(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias3),(typeof helper === "function" ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = (helpers.ifEq || (depth0 && depth0.ifEq) || alias3).call(depth0,depth0,(depths[1] != null ? depths[1].value : depths[1]),{"name":"ifEq","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + alias2(alias1(depth0, depth0))
    + "</option>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "selected";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=container.escapeExpression;

  return "<input type=\"hidden\" name=\"deliveraddrId\" value=\""
    + alias3(((helper = (helper = helpers.deliveraddrId || (depth0 != null ? depth0.deliveraddrId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"deliveraddrId","hash":{},"data":data}) : helper)))
    + "\">\r\n<div class=\"form-group\">\r\n	<label for=\"\" class=\"col-md-2 trim-right control-label\">\r\n		__('Receiver'):\r\n	</label>\r\n	<div class=\"col-md-4\">\r\n		<input type=\"text\" class=\"form-control f-receiver\" name=\"name\" value=\""
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">\r\n	</div>\r\n</div>\r\n<div class=\"form-group address-group\">\r\n	<label for=\"\" class=\"col-md-2 trim-right control-label\">\r\n		__('Address'):\r\n	</label>\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.address : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\r\n\r\n<div class=\"form-group\">\r\n	<label for=\"\" class=\"col-md-2 trim-right control-label\">__('Address Detail'):</label>\r\n	<div class=\"col-md-5\">\r\n		<textarea rows=\"3\" class=\"form-control f-addr-detail\" name=\"addrDetail\">"
    + alias3(((helper = (helper = helpers.addrDetail || (depth0 != null ? depth0.addrDetail : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"addrDetail","hash":{},"data":data}) : helper)))
    + "</textarea>\r\n	</div>\r\n</div>\r\n<div class=\"form-group\">\r\n	<label for=\"\" class=\"col-md-2 trim-right control-label\">__('Zip Code'):</label>\r\n	<div class=\"col-md-2\">\r\n		<input type=\"text\" class=\"form-control f-zipcode\" name=\"zipcode\" value=\""
    + alias3(((helper = (helper = helpers.zipcode || (depth0 != null ? depth0.zipcode : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"zipcode","hash":{},"data":data}) : helper)))
    + "\">\r\n	</div>\r\n</div>\r\n<div class=\"form-group\">\r\n	<label for=\"\" class=\"col-md-2 trim-right control-label\">__('Phone Number'):</label>\r\n	<div class=\"col-md-3\">\r\n		<input type=\"text\" class=\"form-control f-phone\" name=\"phone\" value=\""
    + alias3(((helper = (helper = helpers.phone || (depth0 != null ? depth0.phone : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"phone","hash":{},"data":data}) : helper)))
    + "\">\r\n	</div>\r\n</div>";
},"useData":true,"useDepths":true});
templates['addressItem'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "is-default";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=container.escapeExpression, alias3="function";

  return "<div class=\"address-mgr-item "
    + ((stack1 = helpers["if"].call(depth0,(depth0 != null ? depth0.isDefault : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-addr='"
    + alias2((helpers.json || (depth0 && depth0.json) || alias1).call(depth0,depth0,{"name":"json","hash":{},"data":data}))
    + "' data-addr-id='"
    + alias2(((helper = (helper = helpers.deliveraddrId || (depth0 != null ? depth0.deliveraddrId : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"deliveraddrId","hash":{},"data":data}) : helper)))
    + "'>\r\n	<span class=\"address-mgr-default\">__('Default')</span>\r\n	<dl class=\"dl-horizontal address-mgr-info\">\r\n		<dt>__('Receiver'):</dt>\r\n		<dd>"
    + alias2(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</dd>\r\n		<dt>__('Address'):</dt>\r\n		<dd>"
    + alias2(((helper = (helper = helpers.country || (depth0 != null ? depth0.country : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"country","hash":{},"data":data}) : helper)))
    + " "
    + alias2(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"state","hash":{},"data":data}) : helper)))
    + " "
    + alias2(((helper = (helper = helpers.city || (depth0 != null ? depth0.city : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"city","hash":{},"data":data}) : helper)))
    + " "
    + alias2(((helper = (helper = helpers.region || (depth0 != null ? depth0.region : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"region","hash":{},"data":data}) : helper)))
    + "</dd>\r\n		<dt>__('Address Detail'):</dt>\r\n		<dd>"
    + alias2(((helper = (helper = helpers.addrDetail || (depth0 != null ? depth0.addrDetail : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"addrDetail","hash":{},"data":data}) : helper)))
    + "</dd>\r\n		<dt>__('Zip Code'):</dt>\r\n		<dd>"
    + alias2(((helper = (helper = helpers.zipcode || (depth0 != null ? depth0.zipcode : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"zipcode","hash":{},"data":data}) : helper)))
    + "</dd>\r\n		<dt>__('Phone Number'):</dt>\r\n		<dd>"
    + alias2(((helper = (helper = helpers.phone || (depth0 != null ? depth0.phone : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"phone","hash":{},"data":data}) : helper)))
    + "</dd>\r\n	</dl>\r\n	<div class=\"address-mgr-option\">\r\n		<div class=\"btn-group btn-group-sm\">\r\n			<button type=\"button\" class=\"btn btn-default address-mgr-set-default\">__('Set as Default')</button>\r\n			<button type=\"button\" class=\"btn btn-default address-mgr-edit\" data-toggle=\"modal\" data-target=\"#edit-addr-modal\">__('Edit')</button>\r\n		</div>\r\n	</div>\r\n	<button type=\"button\" class=\"btn btn-danger btn-sm address-mgr-delete\">__('Delete')</button>\r\n</div>";
},"useData":true});
})();