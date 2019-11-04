
const URLS = {
	login: '/dadaoapi/v1/dadaoUser/logout',
	generalTrail: '/dadaoapi/v1/generalTrail'
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
	getGeneralTrail(params) {
		return $http({
			url: URLS.generalTrail,
			type: 'query',
			data: Object.assign({
				limit: 5
			}, params)
		});
	}
}