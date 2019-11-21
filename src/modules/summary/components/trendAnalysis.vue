<template>
    <section class="alarm-line">
        <!--<el-date-picker
                v-model="timeRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd">
        </el-date-picker>-->
        <div class="chart" :id="`${category}TrendChart`"></div>
    </section>
</template>

<script>
    const categoryInfo = {
	    alarm: {
		    keys: [],
		    values: [],
		    title: '告警总数趋势',
		    color: '#edb247'
	    },
	    fault: {
		    keys: [],
		    values: [],
		    title: '故障总数趋势',
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
	        timeRange() {
                this.updateChart();
	        }
        },
		mounted() {
			this.updateChart();
		},
        methods: {
	        updateChart() {
		        const myChart = echarts.init(document.getElementById(`${this.category}TrendChart`));
		        const [start, end] = this.timeRange.length === 0 ? $tools.getLastSeveralDateRange() : this.timeRange;
		        categoryInfo[this.category].keys = [];
		        categoryInfo[this.category].values = [];
		        Store.getGeneralTrailTrend({
			        currentSts: this.category,
			        start,
			        end
		        }).then(res => {
			        res.map(item => {
				        categoryInfo[this.category].keys.push(item.occurredDate.substr(0, 10));
				        categoryInfo[this.category].values.push(item.totalCount);
			        });

			        myChart.setOption(options(categoryInfo[this.category]));
		        });
	        }
        }
	}
</script>

<style lang="less">
    .alarm-line {
        padding: 20px;
        position: relative;

        .el-date-editor {
            position: absolute;
            right: 20px;
            z-index: 10;
        }

        .chart {
            width: 100%;
            height: 100%;
        }
    }
</style>