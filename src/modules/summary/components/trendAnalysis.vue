<template>
    <section class="alarm-line">
        <!--<el-date-picker
                v-model="timeRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>-->
        <div class="chart" :id="`${category}TrendChart`"></div>
    </section>
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
        data() {
	        return {
	        	timeRange: [],
		        pickerOptions: {
		        }
            };
        },
        watch: {
	        timeRange(val) {
                console.log(val);
	        }
        },
		mounted() {
			const myChart = echarts.init(document.getElementById(`${this.category}TrendChart`));

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
    .alarm-line {
        padding:20px;

        .el-date-editor {
            float: right;
            z-index: 10;
        }

        .chart {
            width: 100%;
            height: 100%;
        }
    }
</style>