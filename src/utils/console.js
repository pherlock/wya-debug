export const objToStr = (val) => {
	let Obj2Str = Object.prototype.toString;
	return Obj2Str.call(val);
};

export const isStr = (val) => {
	return objToStr(val) === '[object String]';
};

export const isErr = (val) => {
	return objToStr(val) === '[object Error]';
};

export const isWin = (val) => {
	return objToStr(val) === '[object Window]';
};

export const isDate = (val) => {
	return objToStr(val) === '[object Date]';
};

export const escape = ((exports) => {
	exports.map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#x27;',
		'`': '&#x60;'
	};
	let map = exports.map;
	let regSrc = '(?:' + Object.keys(map).join('|') + ')';
	let regTest = new RegExp(regSrc);
	let regReplace = new RegExp(regSrc, 'g');
	let replaceFn = (match) => {
		return map[match];
	};
	exports = (val) => {
		return regTest.test(val) ? val.replace(regReplace, replaceFn) : val;
	};
	return exports;
})({});

export const isEl = (val) => {
	return !!(val && val.nodeType === 1);
};

export const isObj = (val) => {
	let type = typeof val;
	return !!val && (type === 'function' || type === 'object');
};

export const isUndef = (val) => {
	return typeof (val) === "undefined";
};

export const isNull = (val) => {
	return val === null;
};

export const isNum = (val) => {
	return objToStr(val) === '[object Number]';
};

export const isFn = (val) => {
	const objStr = objToStr(val);
	return (
		objStr === '[object Function]'
		|| objStr === '[object GeneratorFunction]'
		|| objStr === '[object AsyncFunction]'
	);
};

export const isArray = (val) => {
	if (Array.isArray && !false) {
		return Array.isArray(val);
	} else {
		return objToStr(val) === '[object Array]';
	}
};
export const toStr = (val) => {
	return val == null ? '' : val.toString();
};

export const toNum = (val) => {
	if (isNum(val)) return val;

	if (isObj(val)) {
		let temp = isFn(val.valueOf) ? val.valueOf() : val;
		val = isObj(temp) ? temp + '' : temp;
	}

	if (!isStr(val)) return val === 0 ? val : +val;
	return +val;
};
export const toInt = (val) => {
	if (!val) return val === 0 ? val : 0;
	val = toNum(val);
	return val - (val % 1);
};

export const upperFirst = (val) => {
	if (val.length < 1) return val;
	return val[0].toUpperCase() + val.slice(1);
};
export const getObjType = (obj) => {
	if (obj.constructor && obj.constructor.name) return obj.constructor.name;
	return upperFirst({}.toString.call(obj).replace(/(\[object )|]/g, ''));
};
export const optimizeCb = (fn, ctx, argCount) => {
	if (isUndef(ctx)) return fn;

	switch (argCount == null ? 3 : argCount) {
		case 1:
			return function (val) {
				return fn.call(ctx, val);
			};

		case 3:
			return function (val, idx, collection) {
				return fn.call(ctx, val, idx, collection);
			};

		case 4:
			return function (accumulator, val, idx, collection) {
				return fn.call(ctx, accumulator, val, idx, collection);
			};
		default:
			break;
	}

	return function () {
		return fn.apply(ctx, arguments);
	};
};

export const isArrLike = (val) => {
	let MAX_ARR_IDX = 2 ** 53 - 1;
	if (!val) return false;
	let len = val.length;
	return isNum(len) && len >= 0 && len <= MAX_ARR_IDX && !isFn(val);
};

export const each = (obj, iterator, ctx) => {
	iterator = optimizeCb(iterator, ctx);
	let i; let len;
	if (isArrLike(obj)) {
		for (i = 0, len = obj.length; i < len; i++) {
			iterator(obj[i], i, obj);
		}
	} else {
		let _keys = Object.keys(obj);

		for (i = 0, len = _keys.length; i < len; i++) {
			iterator(obj[_keys[i]], _keys[i], obj);
		}
	}
	return obj;
};
