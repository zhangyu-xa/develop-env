import Vue from "vue";

import './styles/index.less';

if(process.env.NODE_ENV === 'development') {
	require('./hot');
}

import router from "./router/router";

import components from "./components/index";
Vue.use(components);

import filters from './filters';
Vue.use(filters);

import App from "./app.vue";

new Vue({
	el: "#app",
	router,
	render: h => h(App)
});