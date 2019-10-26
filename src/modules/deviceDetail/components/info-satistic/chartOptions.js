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
			data: category.legendData || []
		},
		xAxis: {
			type: 'category',
			data: category.keys.reverse()
		},
		yAxis: {
			type: 'value',
			scale: true
		},
		dataZoom: [{
			startValue: '0'    // 只需要将这一项设置为0即可
		}, {
			type: 'inside'
		}],
		series: category.values.map((item, i) => {
			return {
				name: category.legendData[i],
				data: category.values[i].reverse(),
				type: 'line',
				smooth: true,
				itemStyle: {
					normal: {
						color: category.colors[i],
						lineStyle: {
							color: category.colors[i]
						}
					}
				}
			};
		})
	};
}