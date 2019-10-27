const getTableCellClass = function (key, val) {
	switch (key) {
		case "processingSts":
			if (val === "0") return "not-process";
			else return "already-process";
		case "processingDetails":
			if (!val) return "no-data";
			else return "click-to-see";
		case "selectUser":
			return "click-to-see";
		default:
			return val;
	}
}

const filters = {
	currentSts(val) {
		return Dict.currentStatus[val];
	},
	netStatus(val) {
		return Dict.netStatus[val];
	},
	tableFilter(val, key) {
		if (Dict[key] && Dict[key][val]) {
			return `<span class='${getTableCellClass(key, val)}'>${Dict[key][val]}</span>`
		}
		if (key === "processingDetails") {
			return `<span class='${getTableCellClass(key, val)}'>${!val ? '无' : '查看'}</span>`
		}
		if (key === "selectUser") {
			return `<span class='${getTableCellClass(key, val)}'>选择</span>`
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