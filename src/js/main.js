$( window ).scroll(function() {

	var scrollPos = $(window).scrollTop();
	var topBrands = $('.Sbrands').offset().top;

	if(scrollPos >=  topBrands) {
		$('.navbar').addClass('active');
	} else {
		$('.navbar').removeClass('active');
	}

});