const URLS = {
	updateDeviceRate: '/dadaoapi/v1/eleDevice/threshold/setAll',
	batchUpdateDeviceRate:'/dadaoapi/v1/eleDevice/threshold/batchSetAll'
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
			url: `${URLS.batchUpdateDeviceRate}`,
			method: 'post',
			data: params
		});
	}
}