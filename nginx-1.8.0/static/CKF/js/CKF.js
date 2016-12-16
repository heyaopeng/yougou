require('../less/CKF.less');
require('expose?jQuery!jquery');

if (location.href.indexOf('cookabuy.com') !== -1) {
	console.info('load piwik.js');
	require('expose?_paq!./piwik_import.js');
}

if (ENV.debug) {
	console.warn('CKF: You are in debug mode. Set "ENV.debug" to false when in  production.');
}

var CKF = (function() {

	var moduleData = {};

	function isObj(o) {
		return jQuery.isPlainObject(o);
	}

	function isArr(a) {
		return jQuery.isArray(a);
	}

	function registerEvents(evts, mod) {
		if (isObj(evts) && mod) {
			if (moduleData[mod]) {
				moduleData[mod].events = evts;
			}
		}
	}

	function triggerEvent(evt) {
		var mod;
		var hasListen = false;
		for (mod in moduleData) {
			if (moduleData.hasOwnProperty(mod)) {
				mod = moduleData[mod];
				if (mod.events && mod.events[evt.type]) {
					mod.events[evt.type](evt.data);
					if (ENV.debug) {
						console.info('CKF: module [data-j="' + mod.id + '"] respond event "' + evt.type + '"');
					}
					if (!hasListen) {
						hasListen = true;
					}
				}
			}
		}

		if (!hasListen) {
			console.warn('CKF: no module is listening "' + evt.type + '" now. You may need to listen an event before notify it.');
		}
	}

	function removeEvents(evts, mod) {
		if (isObj(evts) && mod && (mod = moduleData[mod]) && mod.events) {
			delete mod.events;
		}
	}

	function getDOM(mid) {
		return jQuery('[data-j="' + mid + '"]');
	}

	return {

		__ls: function() {
			if (ENV.debug) {
				return moduleData;
			}
		},

		util: {
			fixPrice: function(str) {
				// return Math.ceil(parseInt(str) / 1000) + '.000';
				return str;
			},
			setCookie: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
				if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
					return false;
				}
				var sExpires = '';
				if (vEnd) {
					switch (vEnd.constructor) {
						case Number:
							sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd;
							break;
						case String:
							sExpires = '; expires=' + vEnd;
							break;
						case Date:
							sExpires = '; expires=' + vEnd.toUTCString();
							break;
					}
				}
				// sPath should always set to '/'
				sPath = '/';
				document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '');
				return true;
			}
		},

		create: function(moduleID, optional) {
			var mod = null;
			if (typeof moduleID === 'string') {

				if (moduleData[moduleID] !== undefined) {
					console.error('CKF: you are trying to create a module twice. Use "CKF.rebuild" instead.');
					return;
				}

				mod = getDOM(moduleID);

				if (mod.length) {
					moduleData[moduleID] = {
						id: moduleID
					};
					return mod;
				} else {
					if (optional) {
						moduleData[moduleID] = {
							id: moduleID
						};
						return null;
					} else {
						console.error('CKF: can not find any module named [data-j="' + moduleID + '"]');
					}
				}

			} else {
				console.error('CKF: moduleID should be a string');
			}
		},

		rebuild: function(moduleID) {
			if (moduleData[moduleID]) {
				return getDOM(moduleID);
			} else {
				console.error('CKF: can not rebuild a module without "create" first.');
			}
		},

		destroy: function(moduleID) {
			if (moduleData[moduleID] !== undefined) {
				if (ENV.debug) {
					console.info('CKF: module [data-j="' + moduleID + '"] destroyed.');
				}
				delete moduleData[moduleID];
			} else {
				console.error('CKF: module [data-j="' + moduleID + '"] does not exist.');
			}

		},

		notify: function(evt) {
			if (isObj(evt) && evt.type) {
				if (ENV.debug) {
					console.info('CKF: notify ' + evt.type);
				}
				triggerEvent(evt);
			}
		},
		listen: function(evts, moduleID) {
			if (isObj(evts) && typeof moduleID === 'string') {
				registerEvents(evts, moduleID);
			}
		},
		ignore: function(evts, moduleID) {
			if (isArr(evts) && typeof moduleID === 'string') {
				removeEvents(evts, moduleID);
			}
		}
	};
})();

module.exports = CKF;