export default function (category) {
	return {
		title: {
			text: category.title,
			left: 'center',
			textStyle: {
				color: category.color,
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
			data: category.keys
		},
		yAxis: {
			type: 'value'
		},
		series: [{
			data: category.values,
			type: 'line',
			itemStyle: {
				normal: {
					color: category.color,
					lineStyle: {
						color: category.color
					}
				}
			}
		}]
	};
}