export default function (data) {
	const defaultData = [{
		name: "无异常",
		value: 1
	}];
	const defaultLegendData = [""];
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
					},
					normal:{
						color:function(params) {
							if(params.name === "无异常") return "#67c23a";
							//自定义颜色
							var colorList = [
								'#edb247',
								'#ff5656',
								'#909399',
								'#FF8C00',
								'#FF0000',
								'#FE8463'
							];
							return colorList[params.dataIndex]
						}
					}
				}
			}
		]
	};
}