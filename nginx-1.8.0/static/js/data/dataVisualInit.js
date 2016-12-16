$(document).ready(function(){
	var $isUserData = $('body').find('.userData-analysis-module').length;

    if ($isUserData) {
        $('.side-bar-left').find('.item-userData').addClass('active');
    }

    var $isTradingData = $('body').find('.tradingData-analysis-module').length;

    if ($isTradingData) {
        $('.side-bar-left').find('.item-tradingData').addClass('active');
    }

    var $isProductData = $('body').find('.productData-analysis-module').length;

    if ($isProductData) {
        $('.side-bar-left').find('.item-productData').addClass('active');
    }

    var $isRankingData = $('body').find('.rankingData-analysis-module').length;

    if ($isRankingData) {
        $('.side-bar-left').find('.item-rankData').addClass('active');
    }

    $('.period-select').find('.btn').on('click', function(event) {
    	event.preventDefault();
    	var $this = $(this);
    	$this.siblings().removeClass('active');
    	$this.addClass('active');
    });
    $('.period-select').find('.default-active').trigger('click');
});