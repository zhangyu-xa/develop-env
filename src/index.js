import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

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
import stores from "./stores";

const store = new Vuex.Store(stores);

new Vue({
	el: "#app",
	store,
	router,
	render: h => h(App)
});