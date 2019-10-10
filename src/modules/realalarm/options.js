export default function (context) {
	return {
		tableOptions: {
			hasSelect: true,
			columns: [{
				label: "设备ID",
				prop: "deviceSerialId",
				width: 150
			}, {
				label: "设备名称",
				prop: "deviceName",
				width: 150,
				tips: true
			}, {
				label: "负责人账号",
				prop: "responsibleAcct",
				align: "center",
				width: 100
			}, {
				label: "所属公司",
				prop: "belongedCorporation",
				tips: true
			}, {
				label: "设备状态",
				prop: "currentStatus",
				width: 80,
				align: "center"
			}, {
				label: "安装位置",
				prop: "deviceLocation",
				tips: true
			}, {
				label: "最近告警时间",
				prop: "updatedTime",
				width: 170
			}],
			operators: {
				label: "操作",
				prop: "deviceId",
				width: 150,
				operas: [{
					title: "设备详情",
					icon: "el-icon-tickets"
				}, {
					title: "告警处理",
					icon: "el-icon-document"
				}]
			},
			async: {
				fresh: "",
				pagination: true,
				pageSize: 15,
				getData: context.getGeneralInfoList
			}
		},
		filterOptions: {
			params: {
				deviceSerialId: '',
				deviceLocation: '',
				acct: '',
				currentSts: '',
				netSts: ''
			},
			fields: [{
				prop: 'deviceSerialId',
				type: 'el-input',
				placeholder: '设备ID',
				isShow: true
			}, {
				prop: 'acct',
				type: 'el-input',
				placeholder: '负责人账号',
				isShow: true
			}, {
				prop: 'deviceLocation',
				type: 'el-input',
				placeholder: '安装位置',
				isShow: true
			}, {
				prop: 'netSts',
				type: 'el-select',
				placeholder: '联网状态',
				isShow: true,
				selOptions: [{
					label: "在线",
					val: "online"
				}, {
					label: "离线",
					val: "offline"
				}]
			}, {
				prop: 'currentSts',
				type: 'el-select',
				placeholder: '设备状态',
				isShow: true,
				selOptions: [{
					label: "正常",
					val: "normal"
				}, {
					label: "告警",
					val: "alarm"
				}, {
					label: "故障",
					val: "fault"
				}]
			}]
		}
	}
}