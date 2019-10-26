const URLS = {
	getGeneralInfo: '/dadaoapi/v1/generalInfo',
	generalTrailTrend: '/dadaoapi/v1/generalTrail/trend',
	getStatistics: 'dadaoapi/v1/statisticAnalysis'
};

export default {
	getGeneralInfoByDeviceId(params, url = "") {
		return $http({
			url: `${URLS.getGeneralInfo}/${params.deviceId}${url !== "" ? url : ""}`,
			type: 'query',
			data: params
		});
	},
	getStatistics(params, url) {
		return $http({
			url: `${URLS.getStatistics}/${params.deviceId}/${url}`,
			type: 'query',
			data: params
		});
	},
	getReportStatistics(params) {
		return $http({
			url: `${URLS.getGeneralInfo}/${params.deviceId}/generalTrail`,
			type: 'query',
			data: params
		});
	},
	getAlarmOrFaultReports(params, url) {
		return $http({
			url: `${URLS.getStatistics}/${params.deviceId}/${url}`,
			type: 'query',
			data: params
		});
	},
	getAlarmPie(params) {
		return $http({
			url: `${URLS.getStatistics}/${params.deviceId}/alarmCount`,
			type: 'query',
			data: params
		});
	},
	getFaultPie(params) {
		return $http({
			url: `${URLS.getStatistics}/${params.deviceId}/faultCount`,
			type: 'query',
			data: params
		});
	}
}