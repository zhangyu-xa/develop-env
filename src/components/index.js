import table from "./table/index.vue";
import filter from "./filter/index.vue";
import dialog from "./dialog/index.vue";
import map from "./map/index.vue";

export default function (Vue) {
	Vue.component("compsTable", table);
	Vue.component("compsFilter", filter);
	Vue.component("compsDialog", dialog);
	Vue.component("compsMap", map);
}