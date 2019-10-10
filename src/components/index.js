import * as tool from "./tool";
import * as tree from "./tree";

import table from "./table/index.vue";
import filter from "./filter/index.vue";

export default function (Vue) {
	Vue.component("compsTable", table);
	Vue.component("compsFilter", filter);
}