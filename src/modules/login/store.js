
const URLS = {
	login: '/dadaoapi/v1/dadaoUser/login'
};

export default {
	login(params) {
		return $http({
			url: URLS.login,
			type: 'query',
			method: 'post',
			data: params,
			isLogin: true
		});
	}
}