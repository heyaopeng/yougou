$('.my-cooka-sidebar').on('click', '.sub-side-title', function (e) {
	e.preventDefault();
	$(this).closest('.has-sub-side').find('.sub-side').stop().slideToggle();
});