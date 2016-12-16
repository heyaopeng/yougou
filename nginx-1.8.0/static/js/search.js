$(document).ready(function() {
	// .select-value hover behave
	$('.add-to-bread').find('.select-value').hover(function(){
        var $this = $(this);
        $this.addClass('fix-style-select');
        $this.find('span').addClass('fix-style-span');
        $this.find('i').fadeIn(function(){
            $(this).removeClass('ck-hide');
        });
    }, function(){
        var $this = $(this);
        $this.removeClass('fix-style-select');
        $this.find('span').removeClass('fix-style-span');
        $this.find('i').hide().stop();
    });
	
	// remove category selected
    $('.search-breadcrumb').find('.select-value').on('click', function() {
    	/* Act on the event */
    	var $this = $(this);
    	var $span1 = $this.closest('.select-value').find('span');
    	
    	var cat = $span1.text();	// get the value clicked;
    	console.log('点击的值:'+cat);
    	cat = $.trim(cat);	// remove the space
    	cat = cat.replace(/ /g,'+');
    	var key = 'fq='+cat;
    	var search = (window.location.href);
    	var keyLocation = search.indexOf(key);
    	var charBefore = search.charAt(keyLocation-1);	// get the char before the value;
    	var charAfter = search.charAt(keyLocation+key.length);
    	switch(charBefore) {
    		case '?':
    			if(charAfter === '&'){
    				key = key+'&';
    			} else {
    				key = '?'+key;
    			}
    			break;
    		case '&':
    			key = '&'+key;
    			break;
    	}
    	key = key.replace(/ /g,'+');
    	console.log('替换内容:'+key);
    	console.log('未替换的search:'+search);
    	search = search.replace(key,'');
    	console.log(search);
    	window.location.href = search; 
    });
    
 // redirection funciton
    function redirection(allInputs) {
    	var $allCheckboxies = allInputs;
        var $checkboxies = [];
        for(var n=0; n<$allCheckboxies.length; n++){
        	if($allCheckboxies[n].checked){
        		$checkboxies.push($allCheckboxies[n]);
        	}
        }
        var len = $checkboxies.length;
        var searchURL = window.location.href;
        var s = searchURL.indexOf('?')>=0 ? '&':'?';
        var $fq=s+"fq=";
        var fqs="";
        if(len>0){
        	var map = [];
        	for(var i=0; i<len; i++){
        		var $cb = $checkboxies[i];
        		var s = searchURL.indexOf('?')>=0?'&':'?';
        		searchURL = searchURL + s + 'fq='+$cb.value;
        		
        	}
        	searchURL = searchURL.replace(/ /g, '+');
        	window.location=searchURL;
        }
        console.log(searchURL);
    }
    // Confirm btn submit
    $('.confirm-btn').on('click', function(event) {
        /* Act on the event */
        var $this = $(this);
        var $allInputs = $this.closest('.search-condition-group').find('.feature-items').find('ul > li').find('input');
        redirection($allInputs);
    });
	
    var MAX_FEATURE_ITEM = 5; // feature-items could has no more than 5 children;

    // if feature items more than 5 in each feature group, than add the show-more button
    $('.feature-items').each(function() {
        var $this = $(this);
        var featureItems = $this.find('ul li');
        if (featureItems.length > MAX_FEATURE_ITEM) {
            $this.closest('.row').find('.feature-control .show-more').addClass('btn-active');
        }
    });

    // show-more button event;
    $('.show-more').on('click', function(event) {
        // Act on event
        var $this = $(this);
        var $hideOrShow = $this.find('i');
        $hideOrShow.toggleClass('ck-hide');	//switch MORE or HIDDEN
        $this.find('span').toggleClass('glyphicon-menu-up');
        $this.closest('.search-condition-group').find('.feature-items').toggleClass('feature-items-height');
    });

    // .choose-more click event
    $('.choose-more').on('click', function(event) {
        event.preventDefault();
        // Act on event
        var $this = $(this);
        var $featureItems = $this.closest('.search-condition-group').find('.feature-items').find('ul > li');
        $featureItems.find('a').addClass('btn-unactive');
        $featureItems.find('label').show();
        $this.hide();
        $this.siblings().hide();
        $this.siblings('.more-click-addon').show();
    });

    // Confirm btn or Cancel btn event
    $('.more-click-addon').on('click', 'button', function(event) {
        /* Act on the event */
        var $this = $(this);
        var $featureItems = $this.closest('.search-condition-group').find('.feature-items').find('ul > li');
        $featureItems.find('a').removeClass('btn-unactive');
        var $showMore = $this.closest('.feature-control').find('.show-more');

        $this.closest('.more-click-addon').hide();
        $this.closest('.feature-control').find('.choose-more').show();
        $this.closest('.search-condition-group').find('.feature-items').find('ul > li > label').hide();

        if ($showMore.hasClass('btn-active')) {
            $showMore.show();
        }
    });
    
    // show select search condition box;
    $('.search-result-breif').find('.glyphicon').on('click', function() {
        /* Act on the event */
        $(this).toggleClass('glyphicon-collapse-up');
        $('.search-condition-box').stop().slideToggle('normal');
    });

    // .prop-choose-more click event
    $('.hover-show-more-list').find('.prop-choose-more').on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        var $this = $(this);
        var $propFeatureItems = $this.closest('.hover-show-more-list').find('ul');

        $propFeatureItems.find('li > label').show();
        $propFeatureItems.find('li > a').hide();
        $this.hide();
        $this.siblings('.multi-click-addon').show();

        $('.multi-click-addon').find('button').on('click', function(event) {
            event.preventDefault();
            /* Act on the event */
            var $this = $(this);
            $this.closest('.multi-click-addon').hide();
            var $parentList = $this.closest('.hover-show-more-list');
            $parentList.find('ul').find('li > label').hide();
            $parentList.find('.prop-choose-more').show();
            $parentList.find('ul').find('li > a').show();
        });
    });

    // more properties items li:hover
    $('.more-properties').find('.property-items-box .property-item').hover(function() {
        var $this = $(this);
        $this.find('span > span.glyphicon.glyphicon-menu-down').addClass('glyphicon-menu-up');
        $this.addClass('property-item-shadow');
        /* Stuff to do when the mouse enters the element */
        var $hoverList = $this.find('.hover-show-more-list');
        $hoverList.addClass('hover-list-shadow');
        $hoverList.stop().show('700');
    }, function() {
        /* Stuff to do when the mouse leaves the element */
        var $this = $(this);
        var $hoverList = $this.find('.hover-show-more-list');
        $hoverList.stop().hide('700');
        $hoverList.removeClass('hover-list-shadow');
        $this.removeClass('property-item-shadow');
        $this.find('span > span.glyphicon.glyphicon-menu-down').removeClass('glyphicon-menu-up');
    });
    
    // goods li hover event : change the border color
    $('.goods-distance').hover(function() {
        /* Stuff to do when the mouse enters the element */
        $(this).addClass('bold-border');
        $(this).find('.hover-content').show();
    }, function() {
        /* Stuff to do when the mouse leaves the element */
        $(this).removeClass('bold-border');
        $(this).find('.hover-content').hide();
    });
    
    $('.price-order').on('click', function(){
    	event.preventDefault();
    });
    
    // goto page
    $('.go-to-page').find('.btn-default').on('click', function(event) {    	
        /* Act on the event */
        var $this = $(this);
        var $input =$this.closest('.go-to-page').find('input');

        var goPage = $input.val()-1;
        var wPathname = window.location.pathname;
        var wSearch = window.location.search;

        var params = wSearch.slice(1).split('&');
        
        if (params[0] === '') {
        	params = [];
        }
        
        var hasPage = false;
        for (var i = 0, len = params.length; i < len; i++) {
        	if (params[i].indexOf('page=') > -1) {
        		params[i] = 'page=' + goPage;
        		hasPage = true;
        		break;
        	}
        }
        
        if (!hasPage) {
        	params.push('page=' + goPage);
        }
        
        var newUrl = wPathname + '?' + params.join('&');
        // this is the new url
        console.log(newUrl);
        location.href=newUrl;
    });
});

$.extend({
	getUrlVars: function(){
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++){
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	},
	getUrlVar: function(name){
		return $.getUrlVars()[name];
	}
});

$.UrlParams = function ( url , name , value ) {
    var reg=new RegExp( "( \\\? | & )" + name + " = ( [ ^& ]+ )(&|$)"  , "i");
    var m = url.match( reg );
    if( typeof value != ' undefined'){ //赋值
        if(m){
            return ( url.replace(reg,function($0,$1,$2){
                return ($0.replace($2,value));
            }));
        } else {
            if(url.indexof('?')==-1){
                return (url+'?'+name+'='+value);
            }else{
                return (url+'&'+name+'='+value);
            }
        }
    } else { //取值
        if(m) {
            return m[2];
        }else{
            return '';
        }
    }
}

//删除url指定名称的参数
$.UrlParamDel=function(url ,name ){
    var reg=new RegExp("\\\? | &"+name+"= ([^&]+)(&|&)","i");
    return url.replace(reg,"");
}