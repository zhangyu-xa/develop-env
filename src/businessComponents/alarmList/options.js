export default function (context) {
	return {
		tableOptions: {
			hasSelect: true,
			cellClick: context.getProcessDetails,
			columns: [{
				label: "处理状态",
				prop: "processingSts"
			}, {
				label: "告警故障详情",
				prop: "faultDetails",
				tips: true
			}, {
				label: "最近告警时间",
				prop: "createdTime"
			}, {
				label: "处理日志",
				prop: "processingDetails"
			}],
			operators: {
				label: "操作",
				prop: "deviceId",
				operas: [{
					title: "推送记录",
					icon: "fa fa-list-ul",
					operaType: "send-log",
					operator: context.operators
				}, {
					title: "告警处理",
					icon: "fa fa-check-square-o",
					operaType: "process",
					operator: context.operators
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
				selOptions: Object.keys(Dict.processingSts).map(k => {
					return {
						label: Dict.processingSts[k],
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