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
				width: 120
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
					title: "明细统计",
					icon: "el-icon-s-custom"
				}, {
					title: "报警统计",
					icon: "el-icon-tickets"
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
				acct: '',
				bindSts:'',
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
				prop: 'netSts',
				type: 'el-select',
				placeholder: '联网状态',
				isShow: true,
				selOptions: Object.keys(Dict.netStatus).map(k => {
					return {
						label: Dict.netStatus[k],
						val: k
					}
				})
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