const URLS = {
	getDeviceAlertTrailByParam: '/dadaoapi/v1/generalInfo'
};

export default {
	getDeviceAlertTrailByParam(params) {
		return $http({
			url: `${URLS.getDeviceAlertTrailByParam}/${params.deviceId}/alertTrail`,
			type: 'query',
			data: params
		});
	},

}