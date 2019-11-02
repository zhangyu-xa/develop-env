export default function (category) {
	return {
		title: {
			text: category.title || "",
			left: 'center',
			textStyle: {
				color: category.color || "#edb247",
				fontWeight: 'normal',
				fontFamily: 'microsoft yahei',
				fontSize: 24
			}
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: ['数量']
		},
		xAxis: {
			type: 'category',
			data: category.keys.length !== 0 ? category.keys.reverse() : $tools.getLatestDateXAxis(7),
			splitLine: {
				show: true
			}
		},
		yAxis: {
			type: 'value',
			minInterval: 1,
			axisLine: {show: false},
			splitLine: {
				show: true
			}
		},
		series: [{
			data: category.values.length !== 0 ? category.values.reverse() : Array(7).fill(0),
			type: 'line',
			itemStyle: {
				normal: {
					color: category.color || "#edb247",
					lineStyle: {
						color: category.color || "#edb247"
					}
				}
			}
		}]
	};
}