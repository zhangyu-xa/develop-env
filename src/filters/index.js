
const filters = {
	currentSts(val) {
		return Dict.currentSts[val];
	},
	tableFilter(val, key) {
		if(Dict[key] && Dict[key][val]) {
			return `<span class='${val}'>${Dict[key][val]}</span>`
		}
		return val;
	}
}

export default function (Vue) {
	Object.keys(filters).forEach(key => {
		Vue.filter(key, filters[key])
	});
}