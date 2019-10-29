const URLS = {
	generalInfo: '/dadaoapi/v1/generalInfo',
	alertPushCfg: '/dadaoapi/v1/alertPushCfg'
};

export default {
	batchUnbindUser(params) {
		return $http({
			url: URLS.generalInfo,
			method: 'delete',
			data: params
		});
	},
	getDevicePushInfo(params) {
		return $http({
			url: `${URLS.generalInfo}/${params.deviceId}/alertPushCfg`,
			type: 'query',
			data: params
		});
	},
	updateDevicePushInfo({alertPushConfigId, ...params}) {
		return $http({
			url: `${URLS.alertPushCfg}/${alertPushConfigId}`,
			method: 'put',
			data: {
				...params,
				"alertPushConfigId": alertPushConfigId,
				"contactType": "N/A",
				"createdTime": $tools.dateFormat("YYYY-mm-dd HH:MM:SS", new Date()),
				"updatedTime": $tools.dateFormat("YYYY-mm-dd HH:MM:SS", new Date())
			}
		});
	},
	addDevicePushInfo({deviceId, ...params}) {
		return $http({
			url: `${URLS.generalInfo}/${deviceId}/alertPushCfg`,
			method: 'post',
			data: {
				...params,
				"alertPushConfigId": 0,
				"contactType": "",
				"createdTime": $tools.dateFormat("YYYY-mm-dd HH:MM:SS", new Date()),
				"deviceId": deviceId,
				"updatedTime": $tools.dateFormat("YYYY-mm-dd HH:MM:SS", new Date())
			}
		});
	},
	delDevicePushInfo(params) {
		return $http({
			url: `${URLS.alertPushCfg}/${params.alertPushCfgId}`,
			method: 'delete',
			data: params
		});
	},
	exportDeviceList(params) {
		return $http({
			url: `${URLS.generalInfo}/export`,
			method: 'post',
			data: params,
			responseType: 'blob'
		});
	},
	getGeneralInfoByDeviceId(params) {
		return $http({
			url: `${URLS.generalInfo}/${params.deviceId}`,
			type: 'query',
			data: params
		});
	},
	updateGeneralInfoByDeviceId(params) {
		return $http({
			url: `${URLS.generalInfo}/${params.deviceId}`,
			method: 'put',
			data: params
		});
	}
}