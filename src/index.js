import './styles/index.less';

if(process.env.NODE_ENV === 'development') {
	require('./hot');
}

import router from "./router/router";

import components from "./components/index";
Vue.use(components);

import App from "./app.vue";

new Vue({
	el: "#app",
	router,
	render: h => h(App)
});