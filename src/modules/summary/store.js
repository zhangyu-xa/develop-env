const URLS = {
	getDeviceCount: '/dadaoapi/v1/generalInfo/count',
	generalTrail: '/dadaoapi/v1/generalTrail',
	generalTrailTrend: '/dadaoapi/v1/generalTrail/trend'
};

export default {
	getDeviceCount(params) {
		return $http({
			url: URLS.getDeviceCount,
			type: 'query',
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
	},
	getGeneralTrailTrend(params) {
		return $http({
			url: URLS.generalTrailTrend,
			type: 'query',
			data: Object.assign({
				limit: 10
			}, params)
		});
	}
}