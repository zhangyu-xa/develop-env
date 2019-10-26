export default function (context) {
	return {
		tableOptions: {
			hasSelect: true,
			columns: [{
				label: "处理状态",
				prop: "deviceSerialId"
			}, {
				label: "告警故障详情",
				prop: "deviceName",
				tips: true
			}, {
				label: "最近告警时间",
				prop: "updatedTime"
			}],
			operators: {
				label: "操作",
				prop: "deviceId",
				width: 150,
				operas: [{
					title: "推送记录",
					icon: "el-icon-s-custom"
				}, {
					title: "处理日志",
					icon: "el-icon-tickets"
				}, {
					title: "告警处理",
					icon: "el-icon-document"
				}]
			},
			async: {
				fresh: "",
				pagination: true,
				pageSize: 10,
				getData: context.getGeneralInfoList
			}
		},
		filterOptions: {
			params: {
				processingSts: '',
				alarmDetail: '',
				timeRange: [
					$tools.getCurDate().startTime,
					$tools.getCurDate().endTime
				]
			},
			fields: [{
				prop: 'processingSts',
				type: 'el-select',
				placeholder: '处理状态',
				selOptions: Object.keys(Dict.alarmStatus).map(k => {
					return {
						label: Dict.alarmStatus[k],
						val: k
					};
				})
			}, {
				prop: 'alarmDetail',
				type: 'el-input',
				placeholder: '告警详情'
			}, {
				prop: 'timeRange',
				type: 'el-date-picker',
				placeholder: ''
			}]
		}
	}
}