import axios from 'axios';
const URLS = {
	getGeneralInfo: '/dadaoapi/v1/generalInfo',
	generalTrailTrend: '/dadaoapi/v1/generalTrail/trend',
	getStatistics: 'dadaoapi/v1/statisticAnalysis',
	getAlertTrail: '/dadaoapi/v1/alertTrail',
	remoteControl: '/dadaoapi/v1/eleDevice/remoteControl'
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
		const urlExtra = typeof deviceAlertTrailIds === "number" ? `/${alertTrailId}` : ``;
		return $http({
			url: `${URLS.getAlertTrail}${urlExtra}`,
			method: 'put',
			data: {
				...(urlExtra === "" ? {deviceAlertTrailIds} : {}),
				updatedTime: $tools.dateFormat("YYYY-mm-dd HH:MM:SS", new Date()),
				processingSts: "solved",
				...rest
			}
		});
	},
	exportGeneralTrailsIntoExcel(params) {
		return axios.get(
			`${URLS.getGeneralInfo}/${params.deviceId}/generalTrail/export`,
			{
				params: {
					start: params.start,
					end: params.end
				},
				headers: {
					Authorization: `Bearer ${JSON.parse(window.sessionStorage.getItem("user")).jwtToken}`
				},
				responseType:"blob"
			}
		);
	},
	remoteControl(params, url = "") {
		return $http({
			url: `${URLS.remoteControl}/${url !== "" ? url : ""}`,
			type: 'query',
			method: 'post',
			data: params
		});
	}
}