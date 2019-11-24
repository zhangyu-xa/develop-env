export default function () {
	return {
		notInline: true,
		submitBtnText: "提交",
		params: {
			oldPwd: '',
			newPwd: '',
			comfirmNewPwd: ''
		},
		fields: [{
			prop: 'oldPwd',
			type: 'el-input',
			subType: 'password',
			placeholder: '请输入原密码',
			label: '原密码:'
		}, {
			prop: 'newPwd',
			type: 'el-input',
			subType: 'password',
			placeholder: '请输入新密码',
			label: '新密码:'
		}, {
			prop: 'comfirmNewPwd',
			type: 'el-input',
			subType: 'password',
			placeholder: '请输入新密码',
			label: '确认新密码:'
		}]
	}
}