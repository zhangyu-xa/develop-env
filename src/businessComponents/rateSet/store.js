const URLS = {
	updateDeviceRate: '/dadaoapi/v1/eleDevice/threshold/setAll'
};

export default {
	updateDeviceRateById(params) {
		return $http({
			url: `${URLS.updateDeviceRate}`,
			method: 'post',
			data: params
		});
	},
	updateDevicesRate(params) {
		return $http({
			url: `${URLS.updateDeviceRate}`,
			method: 'put',
			data: params
		});
	}
}