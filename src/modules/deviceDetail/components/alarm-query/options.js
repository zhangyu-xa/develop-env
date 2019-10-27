export default function (context) {
	return {
		sendLogTableOptions: {
			columns: [{
				label: "联系人",
				prop: "contactPerson"
			}, {
				label: "联系电话",
				prop: "contactPhone"
			}, {
				label: "电话呼叫时间",
				prop: "phoneCalledTime"
			}, {
				label: "处理方式",
				prop: "processingMethod"
			},{
				label: "通话开始时间",
				prop: "phoneStartedTime"
			}, {
				label: "通话结束时间",
				prop: "phoneEndedTime"
			}, {
				label: "通话时长",
				prop: "callDurationTime"
			}, {
				label: "挂断方向",
				prop: "hangUpDirection"
			}, {
				label: "呼叫结束状态",
				prop: "callEndSts"
			}],
			async: {
				fresh: "",
				pagination: true,
				pageSize: 10,
				getData: context.getSendlogs
			}
		},
		processFilterOptions: {
			notInline: true,
			submitBtnText: "提交",
			params: {
				processingPerson: '',
				processingMethod: '',
				processingDetails: ''
			},
			fields: [{
				prop: 'processingPerson',
				type: 'el-input',
				placeholder: '处理人员',
				label: '处理人员:'
			}, {
				prop: 'processingMethod',
				type: 'el-select',
				placeholder: '处理方法',
				label: '处理方法:',
				selOptions: Object.keys(Dict.processingMethod).map(k => {
					return {
						label: Dict.processingMethod[k],
						val: k
					};
				})
			}, {
				prop: 'processingDetails',
				type: 'el-input',
				subType: 'textarea',
				placeholder: '处理信息',
				label: '处理信息:'
			}]
		}
	}
}