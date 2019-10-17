export * from "./http";
export const $tools = {
	filterBreadCrumb(val) {
		const deviceTypes = {
			all: "设备总数",
			normal: "正常设备",
			alarm: "告警设备",
			fault: "故障设备",
			offline: "断网设备"
		};
		return deviceTypes[val];
	},
	getBreadCrumb(to, from) {

	}
};