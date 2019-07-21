let arr:(number|string)[] = [1, 2];

arr.push("2");

console.log(arr);

let numberArr: Array<number|string> = [1, 2];

numberArr.push("");


interface arrStyle {
	[index: number]:number|string;
}

let typeArr:arrStyle = [1, 2, 3, ""];

let commonArr: any[]=[1, "", {}];

function myFunTest() {
	let arraylike: IArguments = arguments;
}
