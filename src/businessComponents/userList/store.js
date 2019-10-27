const URLS = {
	getUsers: '/dadaoapi/v1/dadaoUser',
	bindBatchGeneralInfoResponsibleAccts: '/dadaoapi/v1/generalInfo'
};

export default {
	getUserList(params) {
		return $http({
			url: URLS.getUsers,
			type: 'query',
			data: params
		});
	},
	bindBatchGeneralInfoResponsibleAccts(params) {
		return $http({
			url: `${URLS.bindBatchGeneralInfoResponsibleAccts}`,
			method: 'put',
			data: params
		});
	}
}