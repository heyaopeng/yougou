function ckLoadScript(page, callback) {
	var DEFAULT_LANG = 'en_US';
	var script = document.createElement('script');
	var lang = document.cookie.replace(/(?:(?:^|.*;\s*)language\s*\=\s*([^;]*).*$)|^.*$/, "$1");

	if (lang === '') {
		lang = DEFAULT_LANG;
	}


	if (script.readyState){
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;

                if (typeof callback === 'function') {
                    callback();
                }
            }
        };
    } else {
        script.onload = function(){
            if (typeof callback === 'function') {
                callback();
            }
        };
    }

	script.type = 'text/javascript';
	script.src = '/js/build/' + lang + '.' + page + '.js';

	document.body.appendChild(script);
}