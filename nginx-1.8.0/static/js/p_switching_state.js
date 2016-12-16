(function ($) {

	$.fn.switchingState = function () {
		return this.each(function (idx, ele) {
			var elem=$(ele);
			var btn = elem.find("span");
			var ipt = elem.find("input");
			if (ipt.val()==="true") {
				btn.last().addClass('hidden');
				elem.addClass('btn-primary');
			}
			if (ipt.val()==="false"){
				btn.first().addClass('hidden');
				elem.addClass('btn-default');
			}
			elem.on('click',function(){
				elem.toggleClass('btn-default');
				elem.toggleClass('btn-primary');
				if(elem.hasClass('btn-default') ) {
					ipt.val("false");
				} else {
					ipt.val("true");
				}



				btn.toggleClass('hidden');
				return false;
			});
		});
	};
})(jQuery);