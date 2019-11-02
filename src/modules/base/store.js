
const URLS = {
	login: '/dadaoapi/v1/dadaoUser/logout'
};

export default {
	loginOut(params) {
		return $http({
			url: URLS.login,
			type: 'query',
			method: 'post',
			data: params
		});
	}
}