import VueRouter from "vue-router";
import modules from './modules';

export const routes = [
	{ name: 'default', path: '/', redirect: '/login' },
	{ name: 'login', path: '/login', component: modules.login },
	{ name: 'index', path: '/index', component: modules.index },
	{ name: 'summary', path: '/summary', component: modules.summary },
	{ name: 'deviceList', path: '/deviceList/:type', component: modules.deviceList, redirect: '/deviceList/:type/', label: "设备列表",
		children: [
			{ name: 'main', path: '/', component: modules.listMain },
			{ name: 'deviceDetail', path: 'deviceDetail/:operatype', component: modules.deviceDetail }
		]
	},
	{ name: 'realAlarm', path: '/realAlarm', component: modules.realAlarm, redirect: '/realAlarm/', label: "实时报警",
		children: [
			{ name: 'main', path: '/', component: modules.alarmMain },
			{ name: 'deviceDetail', path: 'deviceDetail/:operatype', component: modules.deviceDetail }
		]
	},
	{ name: 'statistic', path: '/statistic', component: modules.statistics, redirect: '/statistic/', label: "统计分析",
		children: [
			{ name: 'main', path: '/', component: modules.statisticsMain },
			{ name: 'deviceDetail', path: 'deviceDetail/:operatype', component: modules.deviceDetail }
		]
	}
];

export default new VueRouter({
	routes
});