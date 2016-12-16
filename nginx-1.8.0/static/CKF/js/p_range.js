var CKF = require('./CKF.js');
require('../less/range.less');
// other dependencies ...

module.exports = (function () {
	var moduleName = 'range';
	var module = CKF.create(moduleName);

	var SelectRange = function () {
		// locals
		var options;
		var $input;
		var $rail;
		var $handle;
		var $handle2;
		var $selection;
		var $dragging;
		var $original; // store the handle value;
		var jump;
		var size;
		var defaults = {
			orientation: 'horizontal', // todo
			range: true, // decide to one or two handles
			values: false,
			snap: false, // whether make step
			change: function () {},
			blur: function () {}
		};

		// jump handle
		var jumpHandle = function (ev) {
			ev.pageX = ev.pageX - $input.offset().left;

			// get closest handle
			var x1 = $handle.position().left;
			var dist = ev.pageX - x1;

			var dist2, x2;

			if ($handle2) {
				x2 = $handle2.position().left;
				dist2 = ev.pageX - x2;
			}

			// move towards click
			if (!$handle2 || Math.abs(dist) < Math.abs(dist2)) {
				if (dist > 0) {
					moveHandle($handle, valueToPx(jump) + x1);
				}
				if (dist < 0) {
					moveHandle($handle, -valueToPx(jump) + x1);
				}
			} else {
				if (dist2 > 0) {
					moveHandle($handle2, valueToPx(jump) + x2);
				}
				if (dist2 < 0) {
					moveHandle($handle2, -valueToPx(jump) + x2);
				}
			}
		};

		// move handle
		var moveHandle = function ($h, p, update) {

			var boundR = $input.width() - size;
			var boundL = 0;

			if (options.range) {
				if ($h[0] === $handle[0]) {
					boundR = $handle2.position().left;
				} else {
					boundL = $handle.position().left;
				}
			}

			if (p >= boundR) {
				p = boundR;
			} else if (p <= boundL) {
				p = boundL;
			}

			if (options.snap && p !== boundR) {
				var snapPx = valueToPx(options.snap);
				p = Math.round(p / snapPx) * snapPx;
			}

			$h.css({
				'left': p,
				'position': 'absolute'
			});
			if (options.range) updateSelection();
			if (update !== false) updateValues();
		};

		var dragStart = function (ev) {
			ev.stopPropagation();
			ev.preventDefault();

			$dragging = $(this);
		};

		var dragEnd = function (ev) {
			if ($dragging) {
				$dragging = null;
				options.blur(options.values);
			}
		};

		var drag = function (ev) {

			if ($dragging) {
				ev.preventDefault();
				var pos = ev.pageX - $input.offset().left;

				moveHandle($dragging, pos);
			}
		};

		// 更新选择范围
		var updateSelection = function () {

			var p = $handle.position().left;
			var w = $handle2.position().left - p;
			$selection.css({
				'left': p,
				'width': w,
				'position': 'absolute'
			});
		};

		var updateValues = function () {

			var prev;
			if (options.range) {

				prev = options.values.slice(); // clone
				options.values[0] = pxToValue($handle);
				options.values[1] = pxToValue($handle2);

				// set value on original element
				$original.val(options.values[0] + ',' + options.values[1]);
				$original.attr('value', options.values);

			} else {

				prev = options.values;
				options.values = pxToValue($handle);

				// set value on original element
				$original.val(options.values);
				$original.attr('value', options.values);
			}

			if (options.values !== prev) options.change(options.values);
		};

		var updateHandles = function () {

			if (options.values) {
				if (options.range) {
					moveHandle($handle2, valueToPx(options.values[1]), false);
					moveHandle($handle, valueToPx(options.values[0]), false);
				} else {
					moveHandle($handle, valueToPx(options.values), false);
				}
			}

			updateValues();
		};

		var pxToValue = function ($h) {
			var w = $input.width() - size;
			var p = $h.position().left;

			var v = p * (options.max - options.min) / w + options.min;

			// var v = (p / (w / (options.max - options.min))) + options.min;

			if (options.snap) return Math.floor(v / options.snap) * options.snap;

			return Math.round(v);
		};

		var valueToPx = function (val) {
			var w = $input.width() -size ;
			var v = (val * (w / (options.max - options.min))) - options.min;

			return v;
		};

		// dragging bound limit;
		var bound = function (input) {

			return Math.max(Math.min(input, options.max), options.min);

		};

		var methods = {
			init: function (o) {

				// element already replaced
				if ($(this).data('SelectRange')) return this;

				// options
				defaults.min = parseFloat($(this).attr('min'));
				defaults.max = parseFloat($(this).attr('max'));
				defaults.snap = parseFloat($(this).attr('step'));

				// options passed into plugin override input attributes
				options = $.extend(defaults, o);

				if (options.values) {
					//
				} else if (options.range) {
					options.values = [0, options.max];
				} else {
					options.values = parseFloat($(this).attr('value'));
				}

				// how far do handles jump on click, default to step value
				jump = options.snap ? options.snap : options.max / 10;

				// create dom elements`
				$input = $('<div/>', {
					'class': 'range-input'
				}).mousedown(jumpHandle);
				$rail = $('<div/>', {
					'class': 'range-rail'
				}).appendTo($input);
				if (options.range) $selection = $('<div/>', {
					'class': 'range-selection'
				}).appendTo($input);
				$handle = $('<a/>', {
					'class': 'range-handle'
				}).appendTo($input).mousedown(dragStart);
				if (options.range) $handle2 = $handle.clone(true).appendTo($input);

				// replace dom element
				$(this).after($input);
				// $(this).hide();
				$original = $(this);

				// attach events
				$(document).bind('mouseup', dragEnd);
				$(document).bind('mousemove', drag);

				// position handles
				size = $handle.width();
				updateHandles();

				return this;
			},
			set: function (input) {

				if (typeof input === 'string') {
					options.values = bound(input);
				} else if (typeof input === 'object' && input.length === 2) {
					options.values[0] = bound(input[0]);
					options.values[1] = bound(input[1]);
				}

				updateHandles();
			},

			destroy: function () {

				$input.remove();
				$(this).show().data('SelectRange', false);
				$(document).unbind('mouseup', dragEnd);
				$(document).unbind('mousemove', drag);

				return this;
			}
		};

		var getHandleV = function () {
			return options.value;
		};

		return methods;
	};

	return {
		init: function () {

			// so that arguments are accessible within each closure
			var args = arguments;

			module.each(function (index, elem) {

				var state = $(this).data('SelectRange');
				var method = elem.method;

				// Method calling logic
				if (state && state[method]) {
					state[method].apply(this, Array.prototype.slice.call(args, 1));
				} else if (typeof method === 'object' || !method) {

					// create new SelectRange

					var tr = (new SelectRange(this));
					var $getSet = $(this).data('set').split('-');
					tr.init.apply(this, args);
					tr.set($getSet);

					// save state in jquery data
					$(this).data('SelectRange', tr);

				} else {
					$.error('Method ' + method + ' does not exist on p_range');
				}
			});

			var prDrag = false;		// 价格选择是否正处于拖动
			var scDrag = false;		// 评价等级是否正处于拖动
			var intervalName; // 定时器
			var $handleT;	// 响应事件的handle
			var $getURL;	// data('url')
			var rsMin, rsMax;	// 评价等级
			var $getScoreV, $getPriceV;
			var isDragging = prDrag || scDrag;	// 是否处于拖动状态
			var $rangeInput = module.siblings('.range-input');	// 模拟的input
			var $rangeHandle = $rangeInput.find('.range-handle');	// input上左右两个handle

			$rangeInput.find('a:odd').hover(
				function(){
					var $this = $(this);
					var $siblingLeft = $this.siblings('.range-handle').css('left');
					var $rangeRailW = $this.siblings('.range-rail').css('width');
					$siblingLeft = parseInt($siblingLeft);
					$rangeRailW = parseInt($rangeRailW) - 10;
					if($siblingLeft === $rangeRailW) {
						$rangeInput.find('a:odd').css('z-index', 100);
						$rangeInput.find('a:even').css('z-index', 999);
					}
				},
				function(){
					$rangeInput.find('a:even').css('z-index', 0);
				}
			);

			// 显示所选价格
			function setPriveV(o) {
				$getPriceV = o.find('#range-price').val().split(',');
				o.find('.range-left-value').find('span').text($getPriceV[0]);	// 显示价格数值
				o.find('.range-right-value').find('span').text($getPriceV[1]);
			}

			// 显示所选评价等级
			function setRateV(o) {
				$rsMin = o.find('.min-rate');	// 最小评价等级
				$rsMin.find('.active').removeClass('active');
				$rsMin.find('.product-rate-star:nth-child(' + $getScoreV[0] + ')').addClass('active');

				$rsMax = o.find('.max-rate');	//最大评价等级
				$rsMax.find('.active').removeClass('active');
				$rsMax.find('.product-rate-star:nth-child(' + $getScoreV[1] + ')').addClass('active');
			}

			// 加载同步显示检测
			function ayncLoad() {
				var $rp = module.closest('.range-price');
				setPriveV($rp);

				var $rs = module.closest('.range-score');
				$getScoreV = $rs.find('#range-score').data('urlset').split('-');

				if($getScoreV[0] === ''){
					$getScoreV[0] = 1;
					$getScoreV[1] = parseFloat($('#range-score').attr('max'))+1;
				} else {
					$getScoreV[0] = parseFloat($getScoreV[0]);
					$getScoreV[1] = parseFloat($getScoreV[1]);
				}

				setRateV($rs);
			}

			// 拖动同步显示检测
			function handle() {
				var $target = $handleT.closest('.select-bar-property');
				var $isP = $target.children('.range-price').length;
				var $isS = $target.children('.range-score').length;
				if ($isP) {
					var $rp = $target.find('.range-price');
					setPriveV($rp);
				}
				if ($isS) {
					var $rs = $target.find('.range-score');
					$getScoreV = $('#range-score').val().split(',');
					$getScoreV[0] = parseFloat($getScoreV[0])+1;
					$getScoreV[1] = parseFloat($getScoreV[1])+1;

					setRateV($rs);
				}
			}

			// 鼠标按下模拟input监听
			function mousedownListen(o) {
				o.on('mousedown', function () {
					$handleT = $(this);
					var $target = $handleT.closest('.select-bar-property');
					var $isP = $target.children('.range-price').length;
					var $isS = $target.children('.range-score').length;
					if($isP){
						prDrag = true;
					}
					if($isS){
						scDrag = true;
					}

					isDragging = prDrag || scDrag;

					intervalName = setInterval(handle, 0);
				});
			}

			ayncLoad();

			mousedownListen($rangeInput);
			mousedownListen($rangeHandle);

			// 链接跳转；
			$(document).on('mouseup', function(){
				var $setRange, $getV;
				if(prDrag === true){
					$getURL = $('#range-price').data('url');
					$getV = $('#range-price').val().split(',');
					if($getURL.indexOf('?') !== -1){
						$setRange = $getURL + '&pr=' + (parseFloat($getV[0])) + '-' + (parseFloat($getV[1]));
					} else{
						$setRange = $getURL + '?pr=' + (parseFloat($getV[0])) + '-' + (parseFloat($getV[1]));
					}
					location.href = $setRange;
				}
				if(scDrag === true){
					$getURL = $('#range-score').data('url');
					$getV = $('#range-score').val().split(',');
					if($getURL.indexOf('?') !== -1){
						$setRange = $getURL + '&sc=' + (parseFloat($getV[0])+1) + '-' + (parseFloat($getV[1])+1);
					} else{
						$setRange = $getURL + '?sc=' + (parseFloat($getV[0])+1) + '-' + (parseFloat($getV[1])+1);
					}
					location.href = $setRange;
				}

				// prDrag = false;
				// scDrag = false;
				// isDragging = false;

				// clearInterval(intervalName);
			});
		}
	};
})();
