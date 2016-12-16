(function(namespace){
    'use strict';

    var V = window[namespace] = {},
        _onload = window.onload,
        _initialIframeWidth,
        _resizeEventHandler,
        _resizeLearnHandler,
        _popupWindow,
        _merchantOpts = {},
        _lockedButtonPathSmall = 'checkout-widget/resources/img/integration/v1/locked-button-s.png',
        _lockedButtonPathMedium = 'checkout-widget/resources/img/integration/v1/locked-button-m.png',
        _lockedButtonPathLarge = 'checkout-widget/resources/img/integration/v1/locked-button-l.png',
        _integrationError = 'Visa Checkout integration problem',
        _isLocked = false,
        _clickedLearnLink,
        _allowExoAB = false,

    // This is here as v1 integrations include js in the head.
    _browserCheck = function() {
        var unsupportedBrowserMessage = 'Detected browser version does not support Visa Checkout',
            unsupportedBrowser = (function () {
                // Want to banish ancient browsers we know our code will break for, like IE7
                return ! (
                    document.querySelectorAll &&  // Firefox 3.5+
                    window.JSON && // IE8+, Safari 4+
                    window.postMessage
                    );
            })();

        if (unsupportedBrowser) {
            _lockButton(unsupportedBrowserMessage, true);
        }

        return !unsupportedBrowser;
    },

        _isIE9Browser = function() {
            // Check for IE9.  ActiveXObject is IE, docuement.addEventListener is IE9+, window.atob is IE10+
            var isIE9 = (window.ActiveXObject && document.addEventListener && !window.atob) ? true : false;
            return isIE9;
        },

        _lockButton = function(message, handleClick) {
            var images = document.getElementsByTagName('img'),
                vButtonPattern = /\bv-button\b/,
                clickHandler = function() {
                    window.alert(message);
                },
                newWidth,
                i;

            for (i = 0; i < images.length; i++) {
                if (vButtonPattern.test(images[i].className)) {
                    newWidth =  _param('size',images[i].src) || 213;

                    if (handleClick) {
                        images[i].onclick = clickHandler;
                    }

                    images[i].title = message;
                    images[i].src = _getAssetsDomain();

                    switch (true) {
                        case parseInt(newWidth, 10) < 213:
                            images[i].src += _lockedButtonPathSmall;
                            break;
                        case parseInt(newWidth, 10) >= 425:
                            images[i].src += _lockedButtonPathLarge;
                            break;
                        default:
                            images[i].src += _lockedButtonPathMedium;
                    }
                }
            }

            _isLocked = true;
        },

        _addEvent = function(element, event, callback) {
            if (element.addEventListener) {
                element.addEventListener(event, callback, false);
            } else if (element.attachEvent)  {
                element.attachEvent('on' + event, callback);
            }
        },

        _removeEvent = function(element, event, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(event, handler, false);
            }
            if (element.detachEvent) {
                element.detachEvent('on' + event, handler);
            }
        },

        // Borrowed from http://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/
        _debounce = function(func, threshold, override) {
            var timeout;

            return function debounced () {
                var obj = this,
                    args = arguments;

                function delayed () {
                    if (!override) {
                        func.apply(obj, args);
                    }
                    timeout = null;
                }

                if (timeout) {
                    clearTimeout(timeout);
                } else if (override) {
                    func.apply(obj, args);
                }

                timeout = setTimeout(delayed, threshold || 100);
            };
        },

        _documentHeight = function() {
            var body = document.body,
                html = document.documentElement;

            return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        },

        _resize = function() {
            var iframe = _getIframe('VmeCheckout'),
                iframeMarginLeft,
                iframeTop = '0',
                iframeWidth,
                windowWidth = window.innerWidth,
                heightDiff = (window.innerHeight - 650) / 2;

            if (windowWidth <= _initialIframeWidth) {
                iframeWidth = windowWidth;
                iframeMarginLeft = ((windowWidth / 2) * -1);
            } else {
                if (heightDiff > 0 && heightDiff < 100) {
                    iframeTop = heightDiff + 'px';
                } else if (heightDiff >= 100){
                    iframeTop = '100px';
                }

                iframeWidth = _initialIframeWidth;
                iframeMarginLeft = ((_initialIframeWidth / 2) * -1);
            }

            iframe.style.top = iframeTop;
            iframe.style.marginLeft = iframeMarginLeft + 'px';
            iframe.style.width = iframeWidth + 'px';
        },

        _getOverlay = function(overlayId) {
            var overlay = document.getElementById(overlayId),
                overlayStyles = {
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    background: '#000',
                    opacity: '0.6',
                    filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=60)',
                    minWidth: '100%',
                    minHeight: '100%',
                    zIndex: '999998'
                };

            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = overlayId;

                // apply inline styles to our overlay
                for (var style in overlayStyles) {
                    overlay.style[style] = overlayStyles[style];
                }
            }

            return overlay;
        },

        _getDomain = function() {
            // Default origin is updated by a post-deploy script based on environment
            // see modules.DeployUtils for details
            return 'https://sandbox.secure.checkout.visa.com';
        },

        _getAssetsDomain = function() {
            return 'https://sandbox-assets.secure.checkout.visa.com';
        },

        _showIframeBackground = function(iframe) {
            var background = document.getElementById('VmeCheckoutBackground');

            if (!background) {
                background = document.createElement('div');
                background.innerHTML = '<div id="VmeCheckoutBackground" style="-ms-filter: \'progid:DXImageTransform.Microsoft.Alpha(Opacity=10)\'; opacity: 0.1; background: #000; position: absolute; left: 0; right: 0; top: 0; bottom: 0; min-height: 850px;"></div>';
                background = background.firstChild;
                if (document.addEventListener) {       // IE8 has strange z-index behavior
                    background.style.zIndex = "999998";
                }
                document.body.insertBefore(background, iframe);
            }
            background.style.display = 'block';
            background.style.height = _documentHeight() + "px";
        },

        _getIframe = function(iframeId) {
            var iframeReference = document.getElementById(iframeId);
            var iframeWrapper;

            if(iframeReference && iframeReference.tagName === 'IFRAME'){
                iframeReference.id = iframeId + '_inner';
                iframeWrapper = document.createElement('div');
                iframeWrapper.id = iframeId;
                iframeWrapper.appendChild(iframeReference);
            } else {
                iframeWrapper = iframeReference;
            }

            if (!iframeWrapper) {
                var iframe = document.createElement('iframe');
                iframe.frameBorder = 0;

                iframeWrapper = document.createElement('div');
                iframeWrapper.name = 'Checkout Window';
                iframeWrapper.id = iframeId;
                iframeWrapper.appendChild(iframe);
            }

            return iframeWrapper;
        },

        _copyKeys = function (destination, sources) {
            var sourceCount = arguments.length - 1,
                source,
                i,
                key;

            for (i = 0; i < sourceCount; i++) {
                source = arguments[i + 1];

                for (key in source) {
                    if (Object.hasOwnProperty.call(source, key)) {
                        destination[key] = source[key];
                    }
                }
            }

            return destination;
        },

        _getIframeSrc = function(config, route) {
            route = (typeof route === 'string' ? '/checkout-widget' + route : '/checkout-widget/');
            var iframeSrc = _getDomain() + route,
            // flatten "settings" into top level to shorten generated URL.
                params = _copyKeys({}, _merchantOpts, _merchantOpts['settings']),
                allowRXOFlag = _merchantOpts['allowRXO'],
                allowRXO = (allowRXOFlag == 'true' || allowRXOFlag == true),
                result;

            // Only use the start path once, not for subsequent calls to _getIframeSrc
            if (_merchantOpts['settings']) {
                delete _merchantOpts['settings'].startPath;
            }

            delete params['settings'];

            result = iframeSrc + (config ? 'config' : (allowRXO ? 'rxo' : '')) + '?' + _serialize(params);

            if (result.length > 2000) {
                window.console && console.error && console.error('Visa Checkout window URL is ' + result.length + ' characters long. This may cause problems in IE.');
            }

            return result;
        },

        _getMerchantConfig = function(options) {
            var iframeWrapper,
                iframe;

            if (!options.apikey) {
                _lockButton(_integrationError, false);
            }

            iframeWrapper = _getIframe('VmeCheckout');
            iframe = iframeWrapper.firstChild;
            iframe.src = _getIframeSrc(true);
            // cross browser iframe hide
            iframeWrapper.style.visibility = 'hidden';
            iframeWrapper.style.position = 'absolute';
            iframeWrapper.style.height = '1px';
            iframeWrapper.style.width = '1px';
            iframeWrapper.style.left = '-2000px';
            iframeWrapper.style.bottom = '0px';

            if (!document.getElementById('VmeCheckout')) {  // can cause double-loads in IE9 if appendChild when already there
                document.body.appendChild(iframeWrapper);
            }
        },

        _insertStyleTag = function() {
            var styleHolder, head = document.head || document.getElementsByTagName('head')[0];

            styleHolder = document.createElement('style');
            head.insertBefore(styleHolder, head.firstChild);

        },

        _addStyle = function (selector, rules) {
            var sheet = document.styleSheets[0];
            if(sheet) {
                if (sheet.insertRule) {
                    // For modern browsers
                    sheet.insertRule(selector + '{' + rules.join(';') + '}', sheet.cssRules.length);
                } else {
                    // For IE < 9
                    sheet.addRule(selector, rules.join(';'), -1);
                }
            }
        },

        _initLearn = function () {
            var learnElements = document.querySelectorAll('.v-learn');

            // If the merchant has no learn more link, do not add the logic for it.
            if (!learnElements.length) {
                return;
            }
            for (var i= 0, len=learnElements.length; i < len; i++){
                var learnElement = learnElements[i];
                learnElement.setAttribute('aria-label', 'Learn more about Visa Checkout');

                _addEvent(learnElement, 'click', _getLearnLink(learnElement));
                _insertStyleTag();
                _addStyle('.v-learn.v-learn-default', [
                    'float: right',
                    'margin-right: 4px',
                    'font-size: 12px',
                    'text-transform: capitalize',
                    'color: #003ea9',
                    'cursor: pointer',
                    'text-decoration: none'
                ]);

                // addStyle is neccessary to add styles to pseudo-selectors like :hover
                _addStyle('.v-learn.v-learn-default:hover', [ 'text-decoration: underline' ]);
                _addStyle('.v-learn.v-learn-default:visited', [ 'color: #003ea9' ]);
            }

        },

        _getLearnLink = function(learnLink){
            return function(event){
                _launchLearn(event, learnLink);
            };
        },

        _getBoundingClientRect = function (element) {
            var clientRect = element.getBoundingClientRect(),
            // IE8 does not allow you to modify the clientRect object, so here we create a new one.
                rectObject = {
                    top: clientRect.top,
                    bottom: clientRect.bottom,
                    left: clientRect.left,
                    right: clientRect.right,

                    // IE8 does not supply the rect.height or rect.width properties, so calculate them
                    width: clientRect.width || (clientRect.right - clientRect.left),
                    height: clientRect.height || (clientRect.bottom - clientRect.top)
                };

            return rectObject;
        },

        _resizeLearn = function () {
            var checkoutWindowName = 'VmeCheckout',
                iframeWrapper = _getIframe(checkoutWindowName),
                iframe = iframeWrapper.firstChild,
                pageRect = _getBoundingClientRect(document.querySelector('html')),
                learnLinkRect = _getBoundingClientRect(_clickedLearnLink),
                learnBoxRect = _getBoundingClientRect(iframe),
                leftPos,
            // Since getBoundingClientRect returns positions relative to the viewport,
            // subtract the page's position to get the element's absolute position on the page.
                learnLinkAbsolutePos = {
                    top: learnLinkRect.top - pageRect.top,
                    left: learnLinkRect.left - pageRect.left
                };

            // Position the Learn More box above the Learn More link if there is space available.
            // If not, position it beneath the Learn More link.
            if (learnLinkRect.top > learnBoxRect.height) {
                iframeWrapper.style.top = (learnLinkAbsolutePos.top - learnBoxRect.height - 5) + 'px';
            } else {
                iframeWrapper.style.top = (learnLinkAbsolutePos.top + learnLinkRect.height + 5) + 'px';
            }

            // Center the Learn More box above/below the Learn More link.
            // If part of the learn more box would go off the screen, center it in the window instead.
            leftPos = (learnLinkAbsolutePos.left - learnBoxRect.width/2 + learnLinkRect.width/2);
            if (leftPos + learnBoxRect.width > window.innerWidth || leftPos < 0) {
                iframeWrapper.style.marginLeft = '-153px';
                leftPos = '50%';
            } else {
                iframeWrapper.style.marginLeft = '';
                leftPos = leftPos + 'px';
            }
            iframeWrapper.style.left = leftPos;
        },
        
        _initEXO = function() {
            //Only support IE11
            try {
                if (window.ActiveXObject && "ActiveXObject" in window) {
                    return;
                }
                if (_merchantOpts.allowEXO === true && _allowExoAB  && !_isLocked) {
                    _launchExo();
                }
            } catch(error) {
                console.error(error);
            }
        },

        _launchExo = function () {
            var checkoutWindowName = 'ExoCheckout',
                params = _copyKeys({}, _merchantOpts, _merchantOpts['settings']),
                iframeSrc = _getDomain() + '/checkout-widget/exo/' + '?' + _serialize(params),
                vButtonRefs = document.getElementsByClassName("v-button");

            if (!document.getElementById(checkoutWindowName)) {  // can cause double-loads in IE9 if appendChild when already there

                var refs = [];

                for (var i=0;i<vButtonRefs.length;i++) {
                    var iframeWrapper = _getIframe(checkoutWindowName),
                        iframe = iframeWrapper.firstChild,
                        btnSrc = _getButtonImgSrc(vButtonRefs[i]);

                    iframe.src = iframeSrc + "&id=exoFrame-"+i;
                    iframe.style.width = '100%';
                    iframe.style.height='400px';
                    iframe.id="exoFrame-"+i;
                    iframe.scrolling="no";

                    if(!!btnSrc){
                        iframe.src += "&btnSrc=" + encodeURIComponent(btnSrc);
                    }

                    iframeWrapper.style.visibility = '';
                    iframeWrapper.style.position = 'relative';
                    iframeWrapper.style.height = '400px';
                    iframeWrapper.style.width = '340px';//213 + 16 + 'px'; // 16px for 8px shadow on each side
                    iframeWrapper.style.zIndex = '999990';
                    iframeWrapper.style.borderRadius = '2px';
                    iframeWrapper.style.display = 'none';
                    iframeWrapper.style.overflow='hidden';

                    iframe.onload = function() {
                        iframeWrapper.style.display = 'block';
                        _hideButton();
                        // Button is located at bottom of page - Move it up to top

                        iframe.style.overflow='hidden';
                        iframe.contentWindow.scrollTo( 0, 999999 );

                    }

                    //iframeWrapper.style.marginTop='-'+(vButtonRefs[i].clientHeight+9)+'px';
                    iframeWrapper.style.marginTop='-400px';
                    refs[i] = iframeWrapper;
                }

                for (var i=0;i<vButtonRefs.length;i++) {
                    vButtonRefs[i].parentNode.insertBefore(refs[i], vButtonRefs[i].nextSibling);
                }
            }
            event.preventDefault();
        },

        _getButtonImgSrc = function (btn) {
            return btn && btn.getAttribute('src');
        },

        _launchLearn = function (event, learnLink) {
            var checkoutWindowName = 'VmeCheckout',
                iframeWrapper = _getIframe(checkoutWindowName),
                iframe = iframeWrapper.firstChild,
                iframeSrc = _getDomain() + '/checkout-widget/learn?',
                learnLocale = (learnLink.getAttribute('data-locale') || '').replace('_', '-'), // our json files use - not _
                learnArgs = {
                    parentUrl: window.location.href
                };

            // the json for en-US is currently just called 'en'
            if (learnLocale.indexOf('en-US') === 0) {
                learnLocale = 'en';
            }
            learnArgs.locale = learnLocale;

            iframeSrc = iframeSrc + 'apikey=' + _merchantOpts.apikey + '&' + _serialize(learnArgs);

            iframeWrapper.style.visibility = '';
            iframeWrapper.style.position = 'absolute';
            iframeWrapper.style.height = '375px';
            iframeWrapper.style.width = '306px';
            iframeWrapper.style.left = '';
            iframeWrapper.style.boxShadow = 'rgba(0, 0, 0, 0.40) 5px 5px 16px';
            iframeWrapper.style.zIndex = '999999';
            iframeWrapper.style.borderRadius = '2px';

            iframe.src = iframeSrc;
            iframe.style.height = '375px';
            iframe.style.width = '100%';

            if (!document.getElementById(checkoutWindowName)) {  // can cause double-loads in IE9 if appendChild when already there
                document.body.appendChild(iframeWrapper);
            }

            _resizeLearnHandler = _debounce(_resizeLearn, 30);
            _addEvent(window, 'resize', _resizeLearnHandler);
            _clickedLearnLink = learnLink;
            _resizeLearn();
            event.preventDefault();
        },

        _launchRXO = function () {
            var checkoutWindowName = 'VmeCheckout',
                iframeWrapper = _getIframe(checkoutWindowName),
                iframe = iframeWrapper.firstChild,
                iframeSrc = _getIframeSrc(),
                isAndroidMobileChrome = ~navigator.userAgent.indexOf('Android') &&
                    navigator.userAgent.match(/Chrome\/[.0-9]* Mobile/);

            if (!_isLocked) {
                // IE9 has a bug which does not allow passing information from a "child" new window to a "parent" / merchant page
                // Force widgetStyle to be LIGHTBOX if browser is IE9
                if (_merchantOpts.settings && _merchantOpts.settings.widgetStyle === 'POPUP' && !_isIE9Browser()) {
                    (function () {
                        var height = 650,
                            width = 650,
                            left = (screen.width / 2) - (width / 2),
                            top = (screen.height / 2) - (height / 2),
                            windowOptions = "directories=no, location=yes, menubar=no, scrollbars=yes, status=no, toolbar=no, resizable=yes, width=" + width + ", height=" + height + ", top=" + top + ", left=" + left;
                        _popupWindow = window.open(iframeSrc, checkoutWindowName, windowOptions);
                    })();
                } else {
                    iframeWrapper.style.visibility = '';
                    iframeWrapper.style.position = 'absolute';
                    iframeWrapper.style.height = '100%';
                    iframeWrapper.style.width = '100%';
                    iframeWrapper.style.marginLeft = '-325px';
                    iframeWrapper.style.left = '50%';
                    iframeWrapper.style.zIndex = '999999';

                    // Don't apply "overflow: hidden" for Chrome on Android. see VME-6368
                    if (!isAndroidMobileChrome) {
                        iframeWrapper.style.overflow = 'hidden';
                    }

                    iframe.src = iframeSrc;
                    iframe.style.height = '100%';
                    iframe.style.width = '100%';

                    if (!document.getElementById(checkoutWindowName)) {  // can cause double-loads in IE9 if appendChild when already there
                        document.body.appendChild(iframeWrapper);
                    }

                    if (!_initialIframeWidth) {
                        _initialIframeWidth = iframeWrapper.offsetWidth;
                    }

                    _resizeEventHandler = _debounce(_resize, 30);
                    _addEvent(window, 'resize', _resizeEventHandler);
                    _resize();
                    window.scrollTo(0, 0);
                }

            }
        },

        _launch = function (route) {

            var allowRXOFlag = _merchantOpts['allowRXO'],
                allowRXO = (allowRXOFlag == 'true' || allowRXOFlag == true);

            if (allowRXO) {
                _launchRXO();
            } else {

                var checkoutWindowName = 'VmeCheckout',
                    iframeWrapper = _getIframe(checkoutWindowName),
                    iframe = iframeWrapper.firstChild,
                    iframeSrc = _getIframeSrc(false, route),
                    overlay = _getOverlay('VmeCheckoutBackground'),
                    isAndroidMobileChrome = ~navigator.userAgent.indexOf('Android') &&
                        navigator.userAgent.match(/Chrome\/[.0-9]* Mobile/);

                if (!_isLocked) {
                    // IE9 has a bug which does not allow passing information from a "child" new window to a "parent" / merchant page
                    // Force widgetStyle to be LIGHTBOX if browser is IE9
                    if (_merchantOpts.settings && _merchantOpts.settings.widgetStyle === 'POPUP' && !_isIE9Browser()) {
                        (function () {
                            var height = 650,
                                width = 650,
                                left = (screen.width / 2) - (width / 2),
                                top = (screen.height / 2) - (height / 2),
                                windowOptions = "directories=no, location=yes, menubar=no, scrollbars=yes, status=no, toolbar=no, resizable=yes, width=" + width + ", height=" + height + ", top=" + top + ", left=" + left;

                            _popupWindow = window.open(iframeSrc, checkoutWindowName, windowOptions);
                        })();
                    } else {
                        iframeWrapper.style.visibility = '';
                        iframeWrapper.style.position = 'absolute';
                        iframeWrapper.style.height = '650px';
                        iframeWrapper.style.width = '650px';
                        iframeWrapper.style.marginLeft = '-325px';
                        iframeWrapper.style.left = '50%';
                        iframeWrapper.style.boxShadow = 'rgba(0, 0, 0, 0.40) 5px 5px 16px';
                        iframeWrapper.style.zIndex = '999999';
                        iframeWrapper.style.borderRadius = '2px';

                        // Don't apply "overflow: hidden" for Chrome on Android. see VME-6368
                        if (!isAndroidMobileChrome) {
                            iframeWrapper.style.overflow = 'hidden';
                        }

                        iframe.src = iframeSrc;
                        iframe.style.height = '650px';
                        iframe.style.width = '100%';

                        document.body.appendChild(overlay);
                        if (!document.getElementById(checkoutWindowName)) {  // can cause double-loads in IE9 if appendChild when already there
                            document.body.appendChild(iframeWrapper);
                        }

                        if (!_initialIframeWidth) {
                            _initialIframeWidth = iframeWrapper.offsetWidth;
                        }

                        _resizeEventHandler = _debounce(_resize, 30);
                        _addEvent(window, 'resize', _resizeEventHandler);
                        _resize();
                        _showIframeBackground(document.getElementById(checkoutWindowName));
                        window.scrollTo(0, 0);
                    }

                }
            }
        },

        _hide = function() {
            var overlay,
                iframeWrapper;

            if (_popupWindow) {
                _popupWindow.close();
                _popupWindow = null;
            } else {
                overlay = _getOverlay('VmeCheckoutBackground');
                if (overlay.parentElement === document.body) {
                    document.body.removeChild(overlay);
                }

                iframeWrapper = _getIframe('VmeCheckout');
                if (iframeWrapper.parentElement === document.body) {
                    document.body.removeChild(iframeWrapper);
                }

                if (_resizeEventHandler) {
                    _removeEvent(window, 'resize', _resizeEventHandler);
                }
                if (_resizeLearnHandler) {
                    _removeEvent(window, 'resize', _resizeLearnHandler);
                }
            }

            _closeExoButton();
        },

        _closeExoButton = function () {
            var exoIframe = document.querySelector('#ExoCheckout > iframe');
            var exoWindow = exoIframe && exoIframe.contentWindow;

            if (exoWindow) {
                exoWindow.postMessage('closeButton', '*'); // TODO: change from * to the actual origin
            }
        },

        // These should be overridden by the merchant in V.on()
        _successCallback = function(data) {
            window.console && console.log("Success! However, no callback defined for success event. Data: ", data);
        },

        _cancelCallback = function(data) {
            window.console && console.log("Canceled. (No callback defined for cancel event.)");
        },

        _errorCallback = function(data, error) {
            window.console && console.error && console.error("Error occurred. (No callback defined for error event.) Error: ", error);
        },

        _lockCallback = function(data) {
            window.console && console.log("Lock event received. No callback defined for lock event");
        },

        _param = function(name, queryString) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results;

            queryString = queryString || window.location.search;
            results = regex.exec(queryString);

            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },

        _hideButton = function() {
            var buttonElements = window.parent.document.querySelectorAll('.v-button'),
                buttonElement,
                buttonIndex;

            for (buttonIndex = 0; buttonIndex < buttonElements.length; buttonIndex++) {
                buttonElement = buttonElements[buttonIndex];
                buttonElement.style.visibility = 'hidden';
            }
        },

        _merchantConfig = function(data) {
            var merchantConfig = data.merchantConfig;

            if (merchantConfig) {
                _updateMerchantOpts(_merchantOpts, merchantConfig, 'clientId');
                _updateMerchantOpts(_merchantOpts, data, 'allowEnrollment');
                _updateMerchantOpts(_merchantOpts, merchantConfig, 'externalClientId');
                //override the merchant override, only api can set ExoFlag
                if(data && data.allowEXO){
                    _merchantOpts.allowEXO = data.allowEXO;
                }
                _initEXO();

                if (merchantConfig.bannerURL) {
                    _updateMerchantOpts(_merchantOpts, merchantConfig, 'bannerURL');
                }

                _merchantOpts.settings = _merchantOpts.settings || {};
                _updateMerchantOpts(_merchantOpts.settings, merchantConfig, 'widgetStyle');

                if((merchantConfig.logo && merchantConfig.logo.displayName)) {
                    if(!_merchantOpts.settings.displayName || _merchantOpts.settings.displayName === ''){
                        _merchantOpts.settings.displayName = merchantConfig.logo.displayName;
                    }
                }

                if (merchantConfig.shippingConstraints) {
                    _merchantOpts.settings.shipping = _merchantOpts.settings.shipping || {};
                    _updateMerchantOpts(_merchantOpts.settings.shipping, merchantConfig.shippingConstraints, 'collectShipping');
                    if (merchantConfig.shippingConstraints.acceptedRegions) {
                        merchantConfig.shippingConstraints.acceptedRegions = merchantConfig.shippingConstraints.acceptedRegions.region || [];
                        _updateMerchantOpts(_merchantOpts.settings.shipping, merchantConfig.shippingConstraints, 'acceptedRegions', _extractRegions);
                    }
                }

                if (merchantConfig.billingConstraints) {
                    _merchantOpts.settings.payment = _merchantOpts.settings.payment || {};
                    if (merchantConfig.billingConstraints.acceptedRegions) {
                        merchantConfig.billingConstraints.acceptedRegions = merchantConfig.billingConstraints.acceptedRegions.region || [];
                        _updateMerchantOptsBilling(_merchantOpts.settings.payment, merchantConfig.billingConstraints, 'acceptedRegions', 'billingCountries', _extractRegions);
                    }
                }
            }
        },
        _updateMerchantOpts = function (merchantOptsBasePath, merchantConfigBasePath, merchantConfigKey, filter) {
            if (!(merchantConfigKey in merchantOptsBasePath) && merchantConfigKey in merchantConfigBasePath) {
                merchantOptsBasePath[merchantConfigKey] = merchantConfigBasePath[merchantConfigKey];
                if (filter && typeof filter === "function") {
                    merchantOptsBasePath[merchantConfigKey] = filter(merchantOptsBasePath[merchantConfigKey]);
                }
            }

        },

        _updateMerchantOptsBilling = function (merchantOptsBasePath, merchantConfigBasePath, merchantConfigKey, merchantOptsKey, filter) {
            if (!(merchantOptsKey in merchantOptsBasePath) && merchantConfigKey in merchantConfigBasePath) {
                merchantOptsBasePath[merchantOptsKey] = merchantConfigBasePath[merchantConfigKey];
                if (filter && typeof filter === "function") {
                    merchantOptsBasePath[merchantOptsKey] = filter(merchantOptsBasePath[merchantOptsKey]);
                }
            }
        },

        _extractRegions = function(regions) {
            var extractedRegions = [];
            if (regions instanceof Array) {
                for (var i = 0; i < regions.length; i++) {
                    if (regions[i] && regions[i].countryCode) {
                        extractedRegions.push(regions[i].countryCode);
                    }
                }
            }
            return extractedRegions;
        },
        _receiveMessage = function(event) {
            var message = event.data.split('--'),
                data = {},
                error,
                sdkOptions,
                hideWidget,
                v1Merchant;

            if (message.length > 1) {
                data = JSON.parse(message[1]);
                if (message.length > 2) {
                    error = JSON.parse(message[2]);
                }
                if (message.length > 3) {
                    sdkOptions = JSON.parse(message[3]);
                }
            }

            hideWidget = (!sdkOptions || sdkOptions.hideWidget);

            if (data.merchantType !== 'v1') {
                data.vInitRequest = _merchantOpts;
            }
            delete data.merchantType;

            if (event.origin === _getDomain()) {
                switch(message[0]) {
                    case "success" :
                        try {
                            _successCallback(data);
                        }finally{
                            _hide();
                        }
                        break;
                    case "cancel" :
                        try {
                            _cancelCallback(data);
                        }finally{
                            if (hideWidget) {
                                _hide();
                            }
                        }
                        break;
                    case "error" :
                        try {
                            _errorCallback(data, error);
                        }finally{
                            if (hideWidget) {
                                _hide();
                            }
                        }
                        break;
                    case "lock" :
                        _errorCallback(data);
                        if (hideWidget) {
                            _hide();
                        }
                        break;
                    case "hide" :
                        _hideButton();
                        break;
                    case "close" :
                        // just close the widget, no callback to merchant as we already did that earlier
                        _hide();
                        break;
                    case "launchFromLearn" :
                        _hide();
                        if (data && data.startPath) {
                            _merchantOpts['settings'] = _merchantOpts['settings'] || {};
                            _merchantOpts['settings'].startPath = data.startPath;
                        }
                        _launch();
                        break;
                    case "lockButton" :
                        _lockButton(_integrationError, false);
                        break;
                    case "merchantConfig":
                        if(sdkOptions.vInitRequest && sdkOptions.vInitRequest.browserLocale){
                            data.vInitRequest.browserLocale = sdkOptions.vInitRequest.browserLocale;
                        }
                        _merchantConfig(data);
                        break;
                    case "fitContent":
                        if (data && data.height) {
                            var iframe = _getIframe('VmeCheckout');
                            iframe.style.height = data.height + 'px';
                            iframe.firstChild.style.height = data.height + 'px';
                        }
                        _resizeLearn();
                        break;
                    case "fitExoContent":
                        if (data && data.height) {
                            var iframe = document.getElementById(data.id);
                            iframe.style.height = data.height + "px";
                            iframe.parentNode.style.height = data.height + "px";
                            iframe.parentNode.style.marginTop = "-" + data.height + "px";
                            iframe.parentNode.style.width =  data.width + "px";
                            iframe.parentNode.style.marginLeft = data.margin + "px";
                            iframe.contentWindow.scrollTo(0, 999999);
                        }
                        break;
                    case "exoAB":
                        if (data && data.allowEXO) {
                            _allowExoAB = true;
                        }else{
                            _allowExoAB = false;
                        }
                        _initEXO();
                        break;
                    case "fullCheckout":
                        if (data && data.route){
                            _launch(data.route);
                        }else{
                            _launch();
                        }
                        break;
                    default :
                }
            }
        },

        // TODO: Sanitize!
        _serialize = function(jsonObject, prefix) {
            var str = [];

            for (var property in jsonObject) {
                if (jsonObject.hasOwnProperty(property)) {
                    var propertyName = prefix ? prefix + "[" + property + "]" : property,
                        propertyValue = jsonObject[property];

                    if (typeof propertyValue === "object") {
                        str.push(_serialize(propertyValue, propertyName));
                    } else {
                        str.push(encodeURIComponent(propertyName) + "=" + encodeURIComponent(propertyValue));
                    }
                }
            }
            return str.join("&");
        },

    /** THIS BLOCK HANDLES LEGACY INTEGRATIONS. REMOVE WHEN ALL V1 MERCHANTS REINTEGRATE TO PIVOT **/
        _createLegacyButton = function(buyTag, locale) {
            var parentElement = buyTag.parentNode,
                button = document.createElement('img'),
                buttonSrc = _getAssetsDomain() + '/wallet-services-web/xo/button.png?size=154';

            if (locale) {
                buttonSrc += '&locale=' + locale;
            }

            button.setAttribute('src', buttonSrc);
            button.setAttribute('class', 'v-button');
            button.style.maxWidth = "154px";
            button.style.maxHeight = "34px";


            if (parentElement) {
                parentElement.appendChild(button);
            }
        },

        _setLegacyCallbacks = function(callback) {
            var successCallback,
                cancelCallback,
                errorCallback,
                mercahntCallback = _nameToFunc(callback, window);

            if (!!mercahntCallback) {

                successCallback = function(data) {
                    mercahntCallback('purchase.success', data);
                };

                cancelCallback = function(data) {
                    mercahntCallback('purchase.cancel', data);
                };

                errorCallback = function(data) {
                    mercahntCallback('purchase.error', data);
                };

                V.on("payment.success", successCallback);
                V.on("payment.cancel", cancelCallback);
                V.on("payment.error", errorCallback);

            } else {
                window.console && console.log('Error: No callback defined');
            }
        },

        _nameToFunc = function(callback, context){
            var namespaces = callback.split(".");
            var func = namespaces.pop();
            for(var i = 0; i < namespaces.length; i++) {
                context = context[namespaces[i]];
            }
            return context[func];
        },

        _getVInitTag = function(){
            var vInitTag = document.getElementsByTagName('v:init');
            if(!vInitTag || vInitTag.length === 0){
                vInitTag = document.getElementsByTagName('init'); // IE8 :(
            }
            return vInitTag.length && vInitTag.length > 0 ? vInitTag[0] : undefined;
        },

        _getVBuyTags = function(){
            var vBuyTags = document.getElementsByTagName('v:buy');
            if(!vBuyTags || vBuyTags.length === 0){
                vBuyTags = document.getElementsByTagName('buy'); // IE8 :(
            }
            return vBuyTags;
        },

        _getInitFunction = function(){
            return window.onVisaCheckoutReady || window.onVmeReady;
        },

        _initializeLegacyIntegration = function() {
            var vInitTag = _getVInitTag(),
                vBuyTagArray = _getVBuyTags(),
                vBuyTagArrayLength = vBuyTagArray.length,
                options,
                apikey,
                buttonAction,
                callback,
                collectShipping,
                countryCode,
                currencyCode,
                locale,
                logoUrl,
                merchantRequestId,
                orderId,
                total;

            if (!!vInitTag && vBuyTagArrayLength > 0) {
                for (var i = 0; i < vBuyTagArrayLength; ++i) {
                    var vBuyTag = vBuyTagArray[i];

                    try {
                        // apikey and callback in buy and init tags (required)
                        apikey = vBuyTag.getAttribute('apikey') || vInitTag.getAttribute('apikey');
                        callback = vBuyTag.getAttribute('callback') || vInitTag.getAttribute('callback');

                        // init tag values
                        countryCode = vInitTag.getAttribute('country') || '';
                        locale = vInitTag.getAttribute('locale') || '';
                        logoUrl = vInitTag.getAttribute('logo-url')|| '';

                        // buy tag values
                        total = vBuyTag.getAttribute('amount') || ''; // required
                        collectShipping = vBuyTag.getAttribute('collect-shipping') || '';
                        currencyCode = vBuyTag.getAttribute('currency')|| '';  // required
                        merchantRequestId = vBuyTag.getAttribute('product-id') || '';
                        orderId = vBuyTag.getAttribute('merch-trans') || '';
                        buttonAction = vBuyTag.getAttribute('reviewmode') || '';

                        options = {
                            "apikey": apikey,

                            "settings": {
                                "locale": locale,
                                "countryCode": countryCode,
                                "logoUrl": logoUrl,
                                "shipping": {
                                    "collectShipping": collectShipping
                                },

                                "review": {
                                    "buttonAction": buttonAction
                                }
                            },

                            "paymentRequest": {
                                "merchantRequestId": merchantRequestId,
                                "currencyCode": currencyCode,
                                "total": total,
                                "orderId" : orderId
                            }
                        };

                        _setLegacyCallbacks(callback);
                        _createLegacyButton(vBuyTag, locale);
                        V.init(options);
                    } catch(error) {
                        console.error(error);
                    }
                }

            } else {
                window.console && console.log('No valid Visa Checkout integrations');
            }
        };
    /** END LEGACY INTEGRATION BLOCK **/


    V.init = function(options) {
        var buttonElements = document.querySelectorAll('.v-button'),
            buttonElement,
            buttonIndex;

        options.parentUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + window.location.pathname;

        if (options.parentUrl.indexOf(';') > -1) {
            //some sites use cache-busting and add ;jsessionid={value} to the url. Remove all of this if present to prevent browser security errors.
            var semicolon = options.parentUrl.indexOf(';');
            options.parentUrl = options.parentUrl.slice(0, semicolon);
        }

        _isLocked = false;
        _merchantOpts = options;
        _getMerchantConfig(options);

        for (buttonIndex = 0; buttonIndex < buttonElements.length; buttonIndex++) {
            buttonElement = buttonElements[buttonIndex];
            buttonElement.style.cursor = 'pointer';

            _addEvent(buttonElement, 'click', _launch);
        }
        _initLearn();
        _addEvent(window, 'message', _receiveMessage);
    };

    V.on = function(event, callback) {
        // Assign callback function based on event type.
        if (callback && typeof(callback) === "function") {
            switch(event) {
                case "payment.success" :
                    _successCallback = callback;
                    break;
                case "payment.cancel" :
                    _cancelCallback = callback;
                    break;
                case "payment.error" :
                    _errorCallback = callback;
                    break;
                default :
                    window.console && console.error("Error - no callback named " + event + " is defined");
            }
        }
    };

    // TODO: Probably want to remove this before shipping
    V.setOptions = function(options) {
        var buttons = document.querySelectorAll('.v-button'),
            i;

        for (i = 0; i < buttons.length; i++) {
            buttons[i].src = _getAssetsDomain() + '/wallet-services-web/xo/button.png';
            buttons[i].title = '';
        }

        // need to pass this to iframe due to security policy
        options.parentUrl = window.location.href;
        _merchantOpts = options;
        _getMerchantConfig(options);
    };

    (function(init){

        var isReadyToInit = function(){
                return _getInitFunction() || !!_getVInitTag();
            }, states = {
                interactive : 1,
                complete : 1
            },
            initCalled = false,
            self = this;
        if(!!states[document.readyState] && isReadyToInit()){
            initCalled = true;
            init.apply(self);
        }else{
            _addEvent(document, 'readystatechange', function(){
                if(!!states[document.readyState] && isReadyToInit()){
                    if(!initCalled){
                        initCalled = true;
                        init.apply(self);
                    }
                }
            });
        }

    }(function(){
        if (_onload) {
            _onload();
        }

        if (_browserCheck()) {
            var initFunction = _getInitFunction();
            if (initFunction) {
                // Pivot Integration
                initFunction();
            } else {
                // Legacy Integration.
                _initializeLegacyIntegration();
            }
        }
    }));

}('V'));
