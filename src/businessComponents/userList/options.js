export default function (context) {
	return {
		tableOptions: {
			hasSelect: false,
			cellClick: context.selectUserForBind,
			columns: [{
				label: "用户名",
				prop: "userName"
			}, {
				label: "手机号",
				prop: "phoneNum",
			}, {
				label: "创建时间",
				prop: "createdTime"
			}, {
				label: "操作",
				prop: "selectUser"
			}],
			async: {
				fresh: "",
				pagination: true,
				pageSize: 10,
				getData: context.getUserList
			}
		},
		filterOptions: {
			params: {
				userName: '',
				phoneNum: ''
			},
			fields: [{
				prop: 'userName',
				type: 'el-input',
				placeholder: '用户名'
			}, {
				prop: 'phoneNum',
				type: 'el-input',
				placeholder: '手机号'
			}]
		}
	}
}