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
		missingPhase: '缺相',
		powerSupplyStop: '供电中断',
		signalAlarm: '信号报警'
	},
	processingMethod: {
		observing: "继续观察",
		resetModule: "重置模块",
		tryToHandle: "排查处理",
		sysTest: "系统调试",
		misinformation: "误报"
	},
	deviceType: {
		eleDevice: "智能用电设备",
		smokeDevice: "烟感设备"
	},
	faultDetails: {
		"phAVoltSts-overVoltage": "A相电压过压",
		"phBVoltSts-overVoltage": "B相电压过压",
		"phCVoltSts-overVoltage": "C相电压过压",
		"phACurrSts-overCurrent": "A相电流过流",
		"phBCurrSts-overCurrent": "B相电流过流",
		"phCCurrSts-overCurrent": "C相电流过流",
		"leftCurrSts-overCurrent": "剩余电流过流",
		"phACableTempSts-overTemperature": "A相线缆超温",
		"phBCableTempSts-overTemperature": "B相线缆超温",
		"phCCableTempSts-overTemperature": "C相线缆超温",
		"phACableTempSensorSts-sensorFault": "A相线缆温度传感器故障",
		"phBCableTempSensorSts-sensorFault": "B相线缆温度传感器故障",
		"phCCableTempSensorSts-sensorFault": "C相线缆温度传感器故障",
		"envTempSts-overTemperature": "环境温度超温",
		"envTempSensorSts-sensorFault": "环境温度传感器故障",
		"fireSignalAlarmSts-signalAlarmv": "消防信号报警",
		"phLossAlarmSts-missingPhase": "缺相报警",
		"powerSupplySts-powerSupplyStop": "供电中断报警"
	}
}