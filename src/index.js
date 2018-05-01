/**
 * Created by Zhangyu on 2018/4/19.
 */
import "./css/index.css";
import ss from "component/tool";

console.log("this is a demo");

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
