const URLS = {
	updateDeviceRate: '/dadaoapi/v1/deviceDetail'
};

export default {
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
	}
}