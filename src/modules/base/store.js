
const URLS = {
	login: '/dadaoapi/v1/dadaoUser/logout',
	updateUser: '/dadaoapi/v1/dadaoUser',
	generalInfo: '/dadaoapi/v1/generalInfo'
};

export default {
	loginOut(params) {
		return $http({
			url: URLS.login,
			type: 'query',
			method: 'post',
			data: params
		});
	},
	changePwd(params) {
		return $http({
			url: URLS.updateUser + "/" + params.userId,
			method: 'put',
			data: params
		});
	},
	getGeneralInfo(params) {
		return $http({
			url: URLS.generalInfo,
			type: 'query',
			data: Object.assign({
				limit: 1,
				pageNum: 1
			}, params)
		});
	}
}