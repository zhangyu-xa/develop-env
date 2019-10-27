export default function (routePath) {
	const routePathArr = routePath.split("/");
	return [{
		label: "报警日志",
		name: "alarm-logs",
		type: "alarmLogs",
		isShow: routePathArr.includes('realAlarm') || routePathArr.includes('deviceList')
	}, {
		label: "设备详情",
		name: "device-details",
		type: "deviceDetails",
		isShow: routePathArr.includes('realAlarm') || routePathArr.includes('deviceList')
	}, {
		label: "远程设置",
		name: "device-contrl",
		type: "remoteContrl",
		isShow: routePathArr.includes('deviceList')
	}, {
		label: "报警统计",
		name: "alarm-statistics",
		type: "alarmStatistics",
		isShow: routePathArr.includes('statistic')
	}, {
		label: "明细统计",
		name: "detail-statistics",
		type: "detailStatistics",
		isShow: routePathArr.includes('statistic')
	}];
}