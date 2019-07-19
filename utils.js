Function.prototype.myCall = function (context, ...rest) {
	if(typeof this !== "function") throw "not support.";
	context.fn = this;
	let result = context.fn(...rest);
	delete context.fn;
	return result;
}

Function.prototype.myApply = function (context, args) {
	if(typeof this !== "function") throw "not support.";
	context.fn = this;
	let result = context.fn(...args);
	delete context.fn;
	return result;
}

Function.prototype.myBind = function (context, ...rest) {
	if(typeof this !== "function") throw "not support.";
	let fn = this;
	return function () {
		return fn.apply(context, [...rest, ...arguments]);
	}
}

var obj = {
	name: "zhangyu",
	arr: [3, 2, 1],
	toString: (function () {
		let temp = 0;
		return function () {
			return ++temp;
		};
	}()),
	[Symbol.toPrimitive]: (function () {
		let temp = 0;
		return function () {
			return ++temp;
		};
	}()),
	valueOf() {
		return this.arr.pop();
	}
};

function curry(fn, ...args) {
	if (fn.length === args.length) {
		return fn(...args);
	} else {
		return function () {
			return curry(fn, ...arguments, ...args);
		}
	}
}

function _new(func, ...args) {
	let target = {};
	target.__proto__ = func.prototype;
	let result = func.call(target, ...args);
	if(result && (typeof result === "function" || typeof result === "object")){
		return result;
	}
	return target;
}