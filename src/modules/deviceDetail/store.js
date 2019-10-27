const URLS = {
	getGeneralInfo: '/dadaoapi/v1/generalInfo',
	generalTrailTrend: '/dadaoapi/v1/generalTrail/trend',
	getStatistics: 'dadaoapi/v1/statisticAnalysis',
	getAlertTrail: '/dadaoapi/v1/alertTrail',
	updateDeviceRate: '/dadaoapi/v1/deviceDetail'
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
	},
	getAlertPushHistory(params) {
		return $http({
			url: `${URLS.getAlertTrail}/${params.alertTrailId}/alertPushHistory`,
			type: 'query',
			data: params
		});
	},
	updateAlertTrail({alertTrailId, deviceAlertTrailIds, ...rest}) {
		const urlExtra = typeof deviceAlertTrailIds === "string" ? `/${alertTrailId}` : ``;
		return $http({
			url: `${URLS.getAlertTrail}${urlExtra}`,
			method: 'put',
			data: {
				...(urlExtra !== '' ? {alertTrailId} : {}),
				deviceAlertTrailVO: {
					...(urlExtra === "" ? {deviceAlertTrailIds} : {}),
					...rest
				}
			}
		});
	},
	updateDeviceRateById(params) {
		return $http({
			url: `${URLS.updateDeviceRate}/${params.deviceDetailId}`,
			method: 'put',
			data: params
		});
	},
	updateDevicesRate(params) {
		return $http({
			url: `${URLS.updateDeviceRate}`,
			method: 'put',
			data: params
		});
	},
	exportGeneralTrailsIntoExcel(params) {
		return $http({
			url: `${URLS.getGeneralInfo}/${params.deviceId}/generalTrail/export`,
			type: 'query',
			data: params
		});
	}
}