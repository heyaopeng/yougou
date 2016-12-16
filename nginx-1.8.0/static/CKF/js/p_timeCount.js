var CKF = require('./CKF.js');
// other dependencies ...

module.exports = (function () {
	var moduleName = 'timeCount';
    var module = CKF.create(moduleName);

    var i; // clock;
    function takeCount(ob){
        var options = {
            hours: 0,
            minutes: 0,
            seconds: 59
        };

        ob.removeClass("time-count");
        ob.attr('disabled', true);
        var totalHours = options.hours;
        var totalMins = totalHours * 60 + options.minutes;
        var totalMilliSeconds = (totalMins * 60 + options.seconds) * 1000;

				clearInterval(i);

        i = setInterval(function(){
            // calculate
            var hour = Math.floor(totalMilliSeconds / (1000 * 60 * 60)) % 24;
            var minute = Math.floor(totalMilliSeconds / (1000 * 60)) % 60;
            var second = Math.floor(totalMilliSeconds / 1000) % 60;
            // count - 1s
            totalMilliSeconds -= 1000;
            // insert to the html
            ob.html(second + __("s left over"));
            if (second === 0) {
                clearInterval(i);
                ob.addClass('time-count');
                ob.attr('disabled', false);
                ob.html(__("Send again"));
            }
        }, 1000);
    }

    function stopTakeCount(){
        clearInterval(i);
        module.text(__('Get Code'));
        module.addClass('time-count');
        module.attr('disabled', false);
    }

    function useTakeCount(ob){
	    takeCount(ob);
	}

	return {
		init: function () {
			CKF.listen({
				'use-take-count': useTakeCount,
                'stop-take-count': stopTakeCount
			}, moduleName);
		}
	};
})();
