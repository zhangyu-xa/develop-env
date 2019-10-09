import modules from './modules';

const routes = [
	{
		alias: '/summary',
		path: '/summary',
		component: modules.summary
	},
	{
		name: 'deviceList',
		path: '/deviceList/:type',
		component: modules.deviceList
	},
	{ path: '/realAlarm', component: modules.realAlarm },
	{ path: '/statistis', component: modules.statistics }
];

const router = new VueRouter({
	routes
});

export default router;