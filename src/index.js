/**
 * Created by Zhangyu on 2018/4/19.
 */

import "./css/index.less";
import ss from "component/tool";

function log(...args){

}

console.log("this is a demo",       process.env.NODE_ENV);

function mySyncFun() {
	var p = new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve("this is 数据，当前版本是:");
		}, 2000);
	});
	return p;
}

setTimeout(function () {
	mySyncFun().then(function (data) {
		console.log(data);
	});
}, 100);

var DivObj = document.getElementsByClassName("demo");

DivObj[0].innerText = "demo";

window.onload = function () {
	//console.log("window onload is finished.");
}