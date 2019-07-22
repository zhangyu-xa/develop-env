function getLength(param:number|string):number {
	if((<string>param).length) {
		return (<string>param).length;
	} else {
		return param.toString().length;
	}
}

console.log(getLength("zhangyu"));