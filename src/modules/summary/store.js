const URLS = {
	getDeviceCount: '/dadaoapi/v1/generalInfo/count',
	generalTrail: '/dadaoapi/v1/generalTrail',
	generalTrailTrend: '/dadaoapi/v1/generalTrail/trend',
	getCoordinate: '/dadaoapi/v1/coordinateAxis',
	getGeneralInfo: '/dadaoapi/v1/generalInfo'
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
				limit: 7
			}, params)
		});
	},
	getCoordinate() {
		return $http({
			url: URLS.getCoordinate,
			type: 'query'
		});
	},
	getGeneralDeviceInfo(params) {
		return $http({
			url: `${URLS.getGeneralInfo}/${params.deviceId}`,
			type: 'query',
			data: params
		});
	}
}