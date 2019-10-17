import VueRouter from "vue-router";
import modules from './modules';

const routes = [
	{ name: 'default', path: '/', redirect: '/summary' },
	{ name: 'summary', path: '/summary', component: modules.summary },
	{ name: 'deviceList', path: '/deviceList/:type', component: modules.deviceList },
	{ name: 'realAlarm', path: '/realAlarm', component: modules.realAlarm },
	{ name: 'statistis', path: '/statistis', component: modules.statistics, redirect: '/statistis/',
		children: [
			{ name: 'main', path: '/', component: modules.statisticsMain },
			{ name: 'deviceDetail', path: 'deviceDetail', component: modules.deviceDetail }
		]
	}
];

const router = new VueRouter({
	routes
});

export default router;