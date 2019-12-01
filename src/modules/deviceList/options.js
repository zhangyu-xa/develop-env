export default function (context) {
	return {
		tableOptions: {
			hasSelect: true,
			columns: [{
				label: "设备ID",
				prop: "deviceSerialId",
				width: 140
			}, {
				label: "设备名称",
				prop: "deviceName",
				width: 120,
				tips: true
			}, {
				label: "联网状态",
				prop: "netStatus",
				width: 80,
				align: "center"
			}, {
				label: "设备状态",
				prop: "currentStatus",
				width: 80,
				align: "center"
			}, {
				label: "设备类型",
				prop: "deviceType",
				width: 120
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
				label: "SIM卡串码",
				prop: "simCode",
				width: 100
			}, {
				label: "安装位置",
				prop: "deviceLocation",
				tips: true
			}],
			operators: {
				label: "操作",
				prop: "deviceId",
				width: 150,
				operas: [{
					title: "报警推送",
					icon: "el-icon-s-custom",
					operaType: "alarmsend",
					operator: context.operators
				}, {
					title: "设备详情",
					operaType: "device-details",
					icon: "el-icon-document",
					operator: context.operators
				}, {
					title: "告警日志",
					operaType: "alarm-logs",
					icon: "fa fa-warning",
					operator: context.operators
				}, {
					title: "设备操作",
					operaType: "device-contrl",
					icon: "el-icon-setting",
					operator: context.operators
				}, {
					title: "编辑",
					operaType: "edit",
					icon: "el-icon-edit",
					operator: context.operators
				}]
			},
			async: {
				fresh: "",
				pagination: true,
				pageSize: $tools.getDeviceListPageSize(),
				getData: context.getGeneralInfoList
			}
		},
		filterOptions: {
			params: {
				deviceSerialId: '',
				acct: '',
				bindSts:'',
				currentSts: ''
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
				prop: 'bindSts',
				type: 'el-select',
				placeholder: '绑定状态',
				isShow: true,
				selOptions: Object.keys(Dict.bingStatus).map(k => {
					return {
						label: Dict.bingStatus[k],
						val: k
					}
				})
			}, {
				prop: 'currentSts',
				type: 'el-select',
				placeholder: '设备状态',
				isShow: true,
				selOptions: Object.keys(Dict.currentStatus).map(k => {
					return {
						label: Dict.currentStatus[k],
						val: k
					}
				})
			}]
		}
	}
}