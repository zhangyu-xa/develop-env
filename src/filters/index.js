
const filters = {
	currentSts(val) {
		return Dict.currentSts[val];
	},
	tableFilter(val, key) {
		console.log(val, key, Dict[key] && Dict[key][val] && Dict[key][val]);
		return Dict[key] && Dict[key][val] ? Dict[key][val] : val;
	}
}

export default function (Vue) {
	Object.keys(filters).forEach(key => {
		Vue.filter(key, filters[key])
	});
}