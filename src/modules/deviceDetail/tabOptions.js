export default function (routePath) {

	const routePathArr = routePath.split("/");

	return [{
		label: "报警日志",
		name: "alarm-logs",
		component: "alarmLogs",
		isShow: routePathArr.includes('realAlarm') || routePathArr.includes('deviceList')
	},{
		label: "设备详情",
		name: "device-details",
		component: "deviceDetails",
		isShow: routePathArr.includes('realAlarm') || routePathArr.includes('deviceList')
	},{
		label: "远程控制",
		name: "device-contrl",
		component: "remoteContrl",
		isShow: routePathArr.includes('deviceList')
	},{
		label: "报警统计",
		name: "alarm-statistics",
		component: "alarmStatistics",
		isShow: routePathArr.includes('statistic')
	},{
		label: "明细统计",
		name: "detail-statistics",
		component: "detailStatistics",
		isShow: routePathArr.includes('statistic')
	}];
}