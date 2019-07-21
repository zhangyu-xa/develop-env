interface Person {
	name:string;
	age?:number;
	[propName:string]:string|number;
	readonly salary: number;
}

let me:Person = {
	name: "zhangyu",
	age: 31,
	sex: "",
	salary: 50
}; 

//me.salary = 60;
me.age = 30;

export default me;