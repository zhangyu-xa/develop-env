function tsFun(x, y) {
    if (y === void 0) { y = 2; }
    return x + y;
}
console.log(tsFun(1));
var testFun = function (x, y) {
    if (y === void 0) { y = 2; }
    return x + (y ? y : 1);
};
var ifFun;
ifFun = function (x, y) {
    if (y === void 0) { y = 2; }
    return x + y;
};
console.log(ifFun(1));
console.log(testFun(4));
var a = [1];
function push(array) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    array.push.apply(array, rest);
}
push(a, 2, 3, 4, "");
console.log(a);
//# sourceMappingURL=function.js.map