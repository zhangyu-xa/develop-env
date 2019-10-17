export default {
	summary: () => import(/*webpackChunkName: 'summary'*/'../modules/summary/index.vue'),
	realAlarm: () => import(/*webpackChunkName: 'realAlarm'*/'../modules/realalarm/index.vue'),
	statistics: () => import(/*webpackChunkName: 'statistics'*/'../modules/statistics/index.vue'),
	statisticsMain: () => import(/*webpackChunkName: 'deviceDetail'*/'../modules/statistics/main.vue'),
	deviceList: () => import(/*webpackChunkName: 'deviceList'*/'../modules/devicelist/index.vue'),
	deviceDetail: () => import(/*webpackChunkName: 'deviceDetail'*/'../modules/deviceDetail/index.vue'),
};