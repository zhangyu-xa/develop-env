export default function () {
	return {
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