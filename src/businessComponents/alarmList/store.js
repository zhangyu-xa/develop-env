const URLS = {
	getGeneralInfo: '/dadaoapi/v1/generalInfo'
};

export default {
	getGeneralInfoListByParam(params) {
		return $http({
			url: URLS.getGeneralInfo,
			type: 'query',
			data: params
		});
	}
}