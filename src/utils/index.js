import { routes } from "../router/router";
export * from "./http";

const deviceTypes = {
	all: "设备总数",
	normal: "正常设备",
	alarm: "告警设备",
	fault: "故障设备",
	offline: "断网设备"
};
const statisticTypes = {
	"alarm-statistics": "报警统计",
	"detail-statistics": "明细统计",
	"device-details": "设备详情",
	"device-contrl": "远程设置",
	"alarm-logs": "告警处理"
};

export const $tools = {
	getBreadCrumb(to, from) {
		const toPathArr = [];
		const curPathArr = to.path.split("/").filter(v => v);

		if(to.name === "deviceList") {
			toPathArr.push({
				name: to.name,
				label: routes.filter(r => r.name === to.name)[0].label
			}, {
				name: "deviceList",
				label: deviceTypes[to.params.type]
			});
			return toPathArr;
		}

		curPathArr.reduce((res, v) => {
			console.log(res);
			let temp = res.filter(r => r.name === v)[0];
			if (!temp) {
				if(v === "deviceDetail") toPathArr.push({
					name: "deviceDetail",
					label: statisticTypes[to.params.operatype]
				});
				return [{}];
			}
			if (temp.name === "deviceDetail") {
				toPathArr.push({
					name: "deviceDetail",
					label: statisticTypes[to.params.operatype]
				});
			} else if (temp.name !== "main") {
				temp.name && toPathArr.push({
					name: temp.name,
					label: temp.label
				});
			}
			return temp.children || [{}];
		}, routes);
		console.log("toPathArr:", toPathArr);
		return toPathArr;
	}
};