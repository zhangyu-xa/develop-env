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
	updateDevicePushInfo(params) {
		return $http({
			url: `${URLS.alertPushCfg}/${params.alertPushCfgId}`,
			method: 'put',
			data: params
		});
	},
	addDevicePushInfo(params) {
		return $http({
			url: `${URLS.generalInfo}/${params.deviceId}/alertPushCfg`,
			method: 'post',
			data: params
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
	}
}