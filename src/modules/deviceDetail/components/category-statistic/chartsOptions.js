export default function (data) {

	return {
		title: {
			text: data.title,
			x: 'center'
		},
		tooltip: {
			trigger: 'item',
			formatter: "{b} : {c} ({d}%)"
		},
		legend: {
			x : 'center',
			y : 'bottom',
			data: data.legendData,
			selected: data.selected
		},
		series: [
			{
				name: "",
				type: 'pie',
				radius: '60%',
				center: ['50%', '50%'],
				data: data.seriesData,
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	};
}