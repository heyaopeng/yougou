var formToObject = function() {

	if (!(this instanceof formToObject)) {
		var test = new formToObject();
		return test.init.call(test, Array.prototype.slice.call(arguments));
	}

	var formRef = null,
		settings = {
			includeEmptyValuedElements: false,
			w3cSuccesfulControlsOnly: false
		},
		// Currently matching only '[]'.
		keyRegex = /[^\[\]]+|\[\]/g,
		$form = null,
		$formElements = [];

	function isDomNode(node) {
		return typeof node === 'object' &&
			'nodeType' in node &&
			node.nodeType === 1;
	}

	function checkForLastNumericKey(o) {
		return Object.keys(o).filter(function(elem) {
			return !isNaN(parseInt(elem, 10));
		}).splice(-1)[0];
	}

	function getLastIntegerKey(o) {
		var lastKeyIndex = checkForLastNumericKey(o);
		return parseInt(lastKeyIndex, 10);
	}

	function getNextIntegerKey(o) {
		var lastKeyIndex = checkForLastNumericKey(o);
		if (typeof lastKeyIndex === 'undefined') {
			return 0;
		} else {
			return parseInt(lastKeyIndex, 10) + 1;
		}
	}

	function getObjLength(o) {
		var l, k;

		if (typeof Object.keys === 'function') {
			l = Object.keys(o).length;
		} else {
			for (k in o) {
				if (o.hasOwnProperty(k)) {
					l++;
				}
			}
		}

		return l;
	}

	function extend(oldObj, newObj) {
		var i;
		for (i in newObj) {
			if (newObj.hasOwnProperty(i)) {
				oldObj[i] = newObj[i];
			}
		}
		return oldObj;
	}

	function forEach(arr, callback) {

		if ([].forEach) {
			return [].forEach.call(arr, callback);
		}

		var i;
		for (i in arr) {
			if (Object.prototype.hasOwnProperty.call(arr, i)) {
				callback.call(arr, arr[i]);
			}
		}

		return;

	}

	function init(options) {

		if (!options || typeof options !== 'object' || !options[0]) {
			return false;
		}

		formRef = options[0];

		if (typeof options[1] !== 'undefined' && getObjLength(options[1]) > 0) {
			extend(settings, options[1]);
		}

		if (!setForm()) {
			return false;
		}
		if (!setFormElements()) {
			return false;
		}

		return convertToObj();
	}

	function setForm() {
		switch (typeof formRef) {
			case 'string':
				$form = document.getElementById(formRef);
				break;

			case 'object':
				if (isDomNode(formRef)) {
					$form = formRef;
				}
				break;
		}

		return $form;
	}

	function isUploadForm() {
		return ($form.enctype && $form.enctype === 'multipart/form-data' ? true : false);
	}

	function setFormElements() {
		$formElements = $form.querySelectorAll('input, textarea, select');
		return $formElements.length;
	}

	function isRadio($domNode) {
		return $domNode.nodeName === 'INPUT' && $domNode.type === 'radio';
	}

	function isCheckbox($domNode) {
		return $domNode.nodeName === 'INPUT' && $domNode.type === 'checkbox';
	}

	function isFileField($domNode) {
		return $domNode.nodeName === 'INPUT' && $domNode.type === 'file';
	}

	function isTextarea($domNode) {
		return $domNode.nodeName === 'TEXTAREA';
	}

	function isSelectMultiple($domNode) {
		return $domNode.nodeName === 'SELECT' && $domNode.type === 'select-multiple';
	}

	function isSubmitButton($domNode) {
		return $domNode.nodeName === 'BUTTON' && $domNode.type === 'submit';
	}

	function isChecked($domNode) {
		return $domNode.checked;
	}

	function isFileList($domNode) {
		return (window.FileList && $domNode.files instanceof window.FileList);
	}

	function getNodeValues($domNode) {

		if (isRadio($domNode)) {
			return isChecked($domNode) ? $domNode.value : false;
		}

		if (isCheckbox($domNode)) {
			return isChecked($domNode) ? $domNode.value : false;
		}

		if (isFileField($domNode)) {
			if (isUploadForm()) {
				if (isFileList($domNode) && $domNode.files.length > 0) {
					return $domNode.files;
				} else {
					return ($domNode.value && $domNode.value !== '' ? $domNode.value : false);
				}
			} else {
				return false;
			}
		}

		if (isTextarea($domNode)) {
			return ($domNode.value && $domNode.value !== '' ? $domNode.value : false);
		}

		if (isSelectMultiple($domNode)) {
			if ($domNode.options && $domNode.options.length > 0) {
				var values = [];
				forEach($domNode.options, function($option) {
					if ($option.selected) {
						values.push($option.value);
					}
				});
				if (settings.includeEmptyValuedElements) {
					return values;
				} else {
					return (values.length ? values : false);
				}

			} else {
				return false;
			}
		}

		if (isSubmitButton($domNode)) {
			if ($domNode.value && $domNode.value !== '') {
				return $domNode.value;
			}
			if ($domNode.innerText && $domNode.innerText !== '') {
				return $domNode.innerText;
			}
			return false;
		}
		if (typeof $domNode.value !== 'undefined') {
			if (settings.includeEmptyValuedElements) {
				return $domNode.value;
			} else {
				return ($domNode.value !== '' ? $domNode.value : false);
			}
		} else {
			return false;
		}

	}

	function processSingleLevelNode($domNode, arr, domNodeValue, result) {

		var key = arr[0];
		if (isRadio($domNode)) {
			if (domNodeValue !== false) {
				result[key] = domNodeValue;
				return domNodeValue;
			} else {
				return;
			}
		}

		if (isCheckbox($domNode)) {
			if (domNodeValue !== false) {
				if (!result[key]) {
					result[key] = [];
				}
				return result[key].push(domNodeValue);
			} else {
				return;
			}
		}
		if (isSelectMultiple($domNode)) {
			if (domNodeValue !== false) {
				result[key] = domNodeValue;
			} else {
				return;
			}
		}

		result[key] = domNodeValue;

		return domNodeValue;

	}

	function processMultiLevelNode($domNode, arr, value, result) {

		var keyName = arr[0];

		if (arr.length > 1) {
			if (keyName === '[]') {
				result[getNextIntegerKey(result)] = {};
				return processMultiLevelNode(
					$domNode,
					arr.splice(1, arr.length),
					value,
					result[getLastIntegerKey(result)]
				);
			} else {
				if (result[keyName] && getObjLength(result[keyName]) > 0) {
					//result[keyName].push(null);
					return processMultiLevelNode(
						$domNode,
						arr.splice(1, arr.length),
						value,
						result[keyName]
					);
				} else {
					result[keyName] = {};
				}
				return processMultiLevelNode($domNode, arr.splice(1, arr.length), value, result[keyName]);
			}
		}

		if (arr.length === 1) {
			if (keyName === '[]') {
				result[getNextIntegerKey(result)] = value;
				return result;
			} else {
				processSingleLevelNode($domNode, arr, value, result);
				return result;
			}
		}

	}

	function convertToObj() {

		var i = 0,
			objKeyNames,
			$domNode,
			domNodeValue,
			result = {},
			resultLength = 0;

		for (i = 0; i < $formElements.length; i++) {

			$domNode = $formElements[i];

			if (
					!$domNode.name ||
					$domNode.name === '' ||
					$domNode.disabled ||
					(isRadio($domNode) && !isChecked($domNode))
			) {
				continue;
			}

			domNodeValue = getNodeValues($domNode);

			if (domNodeValue === false && !settings.includeEmptyValuedElements) {
				continue;
			}

			objKeyNames = $domNode.name.match(keyRegex);

			if (objKeyNames.length === 1) {
				processSingleLevelNode(
					$domNode,
					objKeyNames,
					(domNodeValue ? domNodeValue : ''),
					result
				);
			}
			if (objKeyNames.length > 1) {
				processMultiLevelNode(
					$domNode,
					objKeyNames,
					(domNodeValue ? domNodeValue : ''),
					result
				);
			}


		}

		resultLength = getObjLength(result);

		return resultLength > 0 ? result : false;

	}

	return {
		init: init
	};

};

var isSafari = function() {
	var ua = navigator.userAgent,
		tem,
		M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	if (/trident/i.test(M[1])) {
		tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
		return 'IE ' + (tem[1] || '');
	}
	if (M[1] === 'Chrome') {
		tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
		if (tem !== null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
	}
	M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
	if ((tem = ua.match(/version\/(\d+)/i)) !== null) M.splice(1, 1, tem[1]);
	return M.join(' ').indexOf('safari');
};

var FormUtil = {
	formToObject: formToObject,
	isSafari: isSafari
};

module.exports = FormUtil;