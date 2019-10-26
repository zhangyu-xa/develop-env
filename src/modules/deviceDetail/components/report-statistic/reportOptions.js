export default function (context) {
	return {
		hasIndex: true,
		columns: [{
			label: "时间",
			prop: "createdTime"
		}, {
			label: "A相电压",
			prop: "phAVolt"
		}, {
			label: "B相电压",
			prop: "phBVolt"
		}, {
			label: "C相电压",
			prop: "phCVolt"
		}, {
			label: "A相电流",
			prop: "phACurr"
		}, {
			label: "B相电流",
			prop: "phBCurr"
		}, {
			label: "C相电流",
			prop: "phCCurr"
		}, {
			label: "A相线缆温度",
			prop: "phACableTemp"
		}, {
			label: "B相线缆温度",
			prop: "phBCableTemp"
		}, {
			label: "C相线缆温度",
			prop: "phCCableTemp"
		}, {
			label: "剩余电流",
			prop: "leftCurr"
		}, {
			label: "环境温度",
			prop: "envTemp"
		}, {
			label: "总电量",
			prop: "totalPower"
		}],
		async: {
			notAutoAjax: true,
			fresh: "",
			pagination: true,
			pageSize: 10,
			getData: context.getGeneralInfoList
		}
	};
}