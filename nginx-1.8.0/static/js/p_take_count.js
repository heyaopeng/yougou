(function ($) {
    $.fn.takeCount = function (opts) {
        var defaults = {
            hours: 0,
            minutes: 0,
            seconds: 59
        };

        var options = $.extend(defaults, opts);
        
        return this.each(function (index, element) {
            $(this).removeClass("time-count");
            var totalHours = options.hours;
            var totalMins = totalHours * 60 + options.minutes;
            var totalMilliSeconds = (totalMins * 60 + options.seconds) * 1000;
            
            var i = setInterval(function(){
                // calculate
                var hour = Math.floor(totalMilliSeconds / (1000 * 60 * 60)) % 24;
                var minute = Math.floor(totalMilliSeconds / (1000 * 60)) % 60;
                var second = Math.floor(totalMilliSeconds / 1000) % 60;
                // count - 1s
                totalMilliSeconds -= 1000;
                // insert to the html
                $('.message-change').html(second + " seconds left over");
                if (second === 0) {
                    clearInterval(i);
                    $('.message-change').addClass('time-count');
                    $('.time-count').attr('disabled', false);
                    $('.message-change').html("Send again");
                }
            }, 1000);
        });
    };
})(jQuery);