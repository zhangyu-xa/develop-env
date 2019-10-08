import './styles/index.less';

import router from "./router/router";

import App from "./app.vue";

new Vue({
	el: "#app",
	router,
	render: h => h(App)
});