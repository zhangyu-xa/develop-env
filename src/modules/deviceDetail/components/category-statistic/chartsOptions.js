export default function (data) {
	const defaultData = [{
		name: "漏电流报警",
		value: 0
	}, {
		name: "设备离线警告",
		value: 0
	}, {
		name: "缺相报警",
		value: 0
	}, {
		name: "",
		value: ""
	}];
	const defaultLegendData = ["", "漏电流报警", "设备离线警告", "缺相报警"];
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
			x: 'center',
			y: 'bottom',
			data: data.legendData.length === 0 ? defaultLegendData : data.legendData
		},
		series: [
			{
				name: "",
				type: 'pie',
				radius: '60%',
				center: ['50%', '50%'],
				data: data.seriesData.length === 0 ? defaultData : data.seriesData,
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