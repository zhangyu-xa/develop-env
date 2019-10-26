
const filters = {
	currentSts(val) {
		return Dict.currentStatus[val];
	},
	netStatus(val) {
		return Dict.netStatus[val];
	},
	tableFilter(val, key) {
		if(Dict[key] && Dict[key][val]) {
			return `<span class='${val}'>${Dict[key][val]}</span>`
		}
		return val;
	},
	deviceStatus(val) {
		return Dict.deviceStatus[val] || val;
	}
}

export default function (Vue) {
	Object.keys(filters).forEach(key => {
		Vue.filter(key, filters[key])
	});
}