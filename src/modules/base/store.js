
const URLS = {
	login: '/dadaoapi/v1/dadaoUser/logout',
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