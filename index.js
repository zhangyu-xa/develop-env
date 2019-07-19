console.log("this is begin");

var obj = {
	name: "zhangyu",
	age: 32,
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

var name = "pretty";

function myFun(a, b, c) {
	console.log(a, b, c, this.name);

	return a + b + c;
}

myFun(7, 8, 9);

myFun.call(obj, 4, 5, 6);

myFun.myCall(obj, 1, 2, 3);

myFun.apply(obj, ["a", "b", "c"]);

myFun.myApply(obj, ["x", "y", "z"]);

myFun.bind(obj, "l")("m", "n");

myFun.myBind(obj)("e", "f", "g");

console.log("obj==1&&obj==2&&obj==3:", obj == 1 && obj == 2 && obj == 3);

let sum = curry(myFun);
console.log("sum(1)(2)(3):", sum(1)(2)(3));