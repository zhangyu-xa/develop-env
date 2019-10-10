import './styles/index.less';

import router from "./router/router";

import components from "./components/index";
Vue.use(components);

import App from "./app.vue";

new Vue({
	el: "#app",
	router,
	render: h => h(App)
});