function tsFun(x: number, y:number=2):number {
	return x+y;
}
console.log(tsFun(1));

let testFun:(x:number, y?:number) => number = function(x: number, y:number=2):number {
	return x+(y?y: 1);
}

interface funInterface {
	(x:number, y?:number):number
}

let ifFun:funInterface;

ifFun = function(x:number, y:number=2){
	return x+y;
}


console.log(ifFun(1));
console.log(testFun(4));

let a:number[] = [1];

function push(array:any[], ...rest:any[]):void {
	array.push(...rest);
}

push(a,2, 3, 4, "");

console.log(a);