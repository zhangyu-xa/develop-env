<template>
    <section>
        <div class="title">告警故障类别统计图</div>
        <div class="data-content">
            <div id="alarm-chart"></div>
            <div id="fault-chart"></div>
        </div>
    </section>
</template>

<script>
	import Store from '../../store';
    import options from "./chartsOptions";
    const dataList = {
    	alarm: {
    		title: "报警统计",
		    legendData: [],
		    seriesData: []
        },
	    fault: {
		    title: "故障统计",
		    legendData: [],
		    seriesData: []
	    }
    };
	export default {
		name: "category-statistic",
        props: ['deviceId', 'time'],
        data() {
	        return {
		        alarmChart: null,
		        faultChart: null
            };
        },
		watch: {
			time: {
				handler(val) {
					console.log(val);
					this.updateAlarmChart();
					this.updateFaultChart();
				},
				deep: true
			}
		},
        mounted() {
            this.alarmChart = echarts.init(document.getElementById("alarm-chart"));
	        this.faultChart = echarts.init(document.getElementById("fault-chart"));
        },
        methods: {
	        updateAlarmChart() {
		        Store.getAlarmPie({
			        deviceId: this.deviceId,
			        start: this.time[0],
			        end: this.time[1]
		        }).then(res => {
			        dataList.alarm.seriesData = res.map(item => {
				        dataList.alarm.legendData.push(Dict.faultDetails[item.alarmDescription] || "");
				        return {
					        name: Dict.faultDetails[item.alarmDescription] || "",
					        value: item.percentage
				        };
			        });

			        this.alarmChart.setOption(options(dataList.alarm));
		        });
	        },
	        updateFaultChart() {
		        Store.getFaultPie({
			        deviceId: this.deviceId,
			        start: this.time[0],
			        end: this.time[1]
		        }).then(res => {
			        dataList.fault.seriesData = res.map(item => {
				        dataList.fault.legendData.push(Dict.faultDetails[item.alarmDescription] || "");
				        return {
					        name: Dict.faultDetails[item.alarmDescription] || "",
					        value: item.percentage
				        };
			        });

			        this.faultChart.setOption(options(dataList.fault));
		        });
	        }
        }
	}
</script>

<style lang="less">
    .category-statistic {
        display: flex;
        flex-direction: column;

        .title {
            flex: 0 0 20px;

            font-size: 16px;
        }

        .data-content {
            flex: 1 1 auto;

            display: flex;
            flex-direction: row;

            #alarm-chart, #fault-chart {
                flex: 1 1 50%;
            }
        }
    }
</style>