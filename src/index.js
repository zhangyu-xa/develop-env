/**
 * Created by Zhangyu on 2018/4/19.
 */

if (module.hot) {
	module.hot.accept();
}
import "./css/index.css";
import ss from "component/tool";

function log(...args){

}

console.log("this is a demo", process.env.NODE_ENV);

function mySyncFun() {
	var p = new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve("this is 数据，当前版本是:" + version);
		}, 2000);
	});
	return p;
}

setTimeout(function () {
	mySyncFun().then(function (data) {
		console.log(data);
	});
}, 100);

var divObj = document.getElementsByClassName("demo");

//divObj[0].innerText = "demo";

window.onload = function () {
	console.log(" onload is finished.");
}