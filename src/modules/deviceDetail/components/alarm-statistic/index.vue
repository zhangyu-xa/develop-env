<template>
    <section class="statistics">
        <div class="title">{{title}}</div>
        <div :id="`${category}StatisticChart`" class="data-content"></div>
    </section>
</template>

<script>
    const categoryInfo = {
	    alarm: {
		    keys: [],
		    values: [],
		    title: '报警统计分析图表',
		    color: '#edb247'
	    },
	    fault: {
		    keys: [],
		    values: [],
		    title: '故障统计分析图表',
		    color: '#ff5656'
	    }
    };

    import Store from '../../store';
    import options from './chartOptions';
	export default {
		name: "alarm-statistic",
		props: ['category'],
        data() {
	        return {
	        	title: categoryInfo[this.category].title
            };
        },
		mounted() {
			const myChart = echarts.init(document.getElementById(`${this.category}StatisticChart`));

			Store.getGeneralTrailTrend({currentSts: this.category}).then(res => {
				res.map(item => {
					categoryInfo[this.category].keys.push(item.occurredDate.substr(0, 10));
					categoryInfo[this.category].values.push(item.totalCount);
				});

				myChart.setOption(options(categoryInfo[this.category]));
			});
		}
	}
</script>

<style lang="less">
    .statistics {
        padding:10px 20px !important;

        display: flex;
        flex-direction: column;

        .title {
            flex: 0 0 20px;
            display: flex;
            justify-content: flex-start;
            align-items: center;

            font-size: 16px;
        }

        .data-content {
            flex: 1 1 auto;
        }
    }
</style>