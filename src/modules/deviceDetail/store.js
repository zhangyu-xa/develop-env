const URLS = {
	getGeneralInfo: '/dadaoapi/v1/generalInfo',
	generalTrailTrend: '/dadaoapi/v1/generalTrail/trend',
	getStatistics: 'dadaoapi/v1/statisticAnalysis'
};

export default {
	getGeneralInfoListByParam(params) {
		return $http({
			url: URLS.getGeneralInfo,
			type: 'query',
			data: params
		});
	},
	getStatistics(params, url) {
		return $http({
			url: `${URLS.getStatistics}/${params.deviceId}/${url}`,
			type: 'query',
			data: Object.assign({
				start: '2019-10-22 20:10:19',
				end: '2019-10-23 20:10:19'
			}, params)
		});
	}
}