export default function (category) {
	return {
		title: {
			text: category.title || "",
			left: 'center',
			textStyle: {
				color: category.color || "#67c23a",
				fontWeight: 'normal',
				fontFamily: 'microsoft yahei',
				fontSize: 24
			}
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: category.legendData.length !== 0 ? category.legendData : ["A相电压", "B相电压", "C相电压"]
		},
		xAxis: {
			type: 'category',
			data: category.keys.length !== 0 ? category.keys : $tools.getLatestTimeXAxis(10)
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
				name: category.legendData[i] || "",
				data: category.values[i].length !== 0 ? category.values[i] : Array(10).fill(0),
				type: 'line',
				smooth: true,
				itemStyle: {
					normal: {
						color: category.colors[i] || "#67c23a",
						lineStyle: {
							color: category.colors[i] || "#67c23a"
						}
					}
				}
			};
		})
	};
}