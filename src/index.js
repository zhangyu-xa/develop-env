import './styles/index.less';/*
import 'element-ui/lib/theme-chalk/index.css';*/

//import Vue from "vue";
//import element from "element-ui/lib/element-ui.common";

//Vue.use(element);

import App from "./app.vue";

new Vue({
	el: "#app",
	render: h => h(App)
});