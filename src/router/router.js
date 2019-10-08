import modules from './modules';

const routes = [
	{ path: '/summary', component: modules.summary },
	{ path: '/realAlarm', component: modules.realAlarm },
	{ path: '/statistis', component: modules.statistics }
];

const router = new VueRouter({
	routes
});

export default router;