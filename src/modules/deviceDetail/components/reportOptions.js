export default function (context) {
	return {
		hasIndex: true,
		columns: [{
			label: "时间",
			prop: "deviceSerialId"
		}, {
			label: "A相电压",
			prop: "deviceName"
		}, {
			label: "B相电压",
			prop: "updatedTime"
		}, {
			label: "C相电压",
			prop: "deviceName"
		}, {
			label: "A相电流",
			prop: "deviceName"
		}, {
			label: "B相电流",
			prop: "deviceName"
		}, {
			label: "C相电流",
			prop: "deviceName"
		}, {
			label: "A相线缆温度",
			prop: "deviceName"
		}, {
			label: "B相线缆温度",
			prop: "deviceName"
		}, {
			label: "C相线缆温度",
			prop: "deviceName"
		}, {
			label: "剩余电流",
			prop: "deviceName"
		}, {
			label: "环境温度",
			prop: "deviceName"
		}, {
			label: "总电量",
			prop: "deviceName"
		}],
		async: {
			fresh: "",
			pagination: true,
			pageSize: 10,
			getData: context.getGeneralInfoList
		}
	};
}