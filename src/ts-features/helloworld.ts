function sayHello(person:string) {
    return `hello ${person}`
}

let user:string = "zhangyu";

let booleanVar:Boolean = new Boolean(1);
let isRight:boolean = null;
let nullvar:null= null;
let undefinedVar:undefined= undefined;

let mySuperVar:any = "";

console.log(mySuperVar);

function myFun(params:object):void {
	if(!params) console.log("here is the output");
}

myFun(null)

let variable:string = "fdsaf";

console.log(sayHello(user));


let typeCheck: string | number;
typeCheck="zhangyu";
typeCheck=7;
console.log(typeCheck.toString());