<template>
    <section :id="`${category}TrendChart`" class="alarm-line"></section>
</template>

<script>
    const categoryInfo = {
	    alarm: {
		    keys: [],
		    values: [],
		    title: '告警设备趋势',
		    color: '#edb247'
	    },
	    fault: {
		    keys: [],
		    values: [],
		    title: '故障设备趋势',
		    color: '#ff5656'
	    }
    };

    import Store from '../store';
    import options from './chartOptions';
	export default {
		name: "alarmAnalysis",
		props: ['category'],
		mounted() {
			const myChart = echarts.init(document.getElementById(`${this.category}TrendChart`));

			Store.getGeneralTrailTrend({currentSts: this.category}).then(res => {
				res.map(item => {
					categoryInfo[this.category].keys.push(item.occurredDate.substr(0, 10));
					categoryInfo[this.category].values.push(item.totalCount);
				});

				myChart.setOption(options(categoryInfo[this.category]));
			}, () => {
				myChart.setOption(options(categoryInfo[this.category]));
            });
		}
	}
</script>

<style scoped>
    .alarm-line {
        padding:20px;
    }
</style>