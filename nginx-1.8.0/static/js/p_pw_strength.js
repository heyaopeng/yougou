(function ($) {
        $.fn.pwStrength = function () {
            return this.each(function (idx, ele) {
                var $this = $(ele);
                var $showLevel = $this.closest('.pw-strength-group').find('.pw-strength');
                $this.keyup(function (e) {
                    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
                    var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[a-z])(?=.*\\W))|((?=.*\\W)(?=.*[0-9]))|((?=.*[A-Z])(?=.*\\W))).*$", "g");
                    var enoughRegex = new RegExp("(?=.{6,}).*", "g");
                    $showLevel.removeClass('pw-weak');
                    $showLevel.removeClass('pw-medium');
                    $showLevel.removeClass('pw-strong');
                    if (false === enoughRegex.test($this.val())) {
                        $showLevel.addClass(' pw-defule');	// 密码小于六位的时候，密码强度图片都为灰色
                    }
                    else if (strongRegex.test($this.val())) {
                        $showLevel.addClass(' pw-strong');	// 八位以上且大小写字母数字特殊字符四项都包括,强度最强
                    }
                    else if (mediumRegex.test($this.val())) {
                        $showLevel.addClass(' pw-medium');	// 七位及以上且大小写字母、数字、特殊字符四项中有两项，强度中等
                    }
                    else {
                        $showLevel.addClass('pw-weak');		// 如果密码为6位，就算字母、数字、特殊字符都包括，强度也是弱的
                    }
                    return true;
                });
            });
        };

    })(jQuery);