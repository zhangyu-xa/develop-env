export default {
	currentStatus: {
		normal: '正常',
		alarm: '告警',
		fault: '故障'
	},
	netStatus: {
		online: '在线',
		offline: '离线'
	},
	bingStatus: {
		'0': '未绑定',
		'1': '绑定'
	},
	processingSts: {
		unsolved: '未处理',
		solved: '已处理',
		checked: '已查看',
		unchecked: '未查看'
	},
	deviceStatus: {
		sensorFault: '传感器故障',
		hidden: '隐藏',
		overVoltage: '过压',
		underVoltage: '欠压',
		overCurrent: '过流',
		underCurrent: '欠流',
		overTemperature: '超温',
		underTemperature: '低温',
		normal: '正常',
		missingPhase: '缺相'
	},
	processingMethod: {
		observing: "继续观察",
		resetModule: "重置模块",
		tryToHandle: "排查处理",
		sysTest: "系统调试",
		misinformation: "误报"
	}
}