<template>
    <div :id="category" class="charts-content"></div>
</template>

<script>
    import categoryInfo from "./categoryConfs";
    import Store from '../../store';
    import options from './chartOptions';

	export default {
		name: "info-charts",
		props: ['category', 'deviceId', 'time'],
        data() {
	        return {
		        myChart: null
            };
        },
        watch: {
	        time: {
		        handler(val) {
			        this.updateChart(val);
		        },
                deep: true
	        }
        },
		mounted() {
			if(this.time.length === 0) return;
			this.updateChart(this.time);
		},
        methods: {
	        updateChart(time) {
		        const myChart = echarts.init(document.getElementById(this.category));
		        let url = "";
                let prop = "";
		        switch (this.category) {
			        case "voltage":
			        case "current":
			        case "line-temperature":
				        url = this.category === "voltage" ? "phaseVoltage" : this.category === "current" ? "phaseCurrents" : "phaseCableTemperature";
				        prop = this.category === "voltage" ? "Voltage" : this.category === "current" ? "Currents" : "CableTemperature";
				        Store.getStatistics({
                            deviceId: this.deviceId,
                            start: time[0],
                            end: time[1]
                        }, url).then(res => {
					        categoryInfo[this.category].keys = [];
					        categoryInfo[this.category].values[0] = [];
					        categoryInfo[this.category].values[1] = [];
					        categoryInfo[this.category].values[2] = [];
					        res.map(item => {
						        categoryInfo[this.category].keys.push(item.occurredDate);
						        categoryInfo[this.category].values[0].push(item[`phaseA${prop}`]);
						        categoryInfo[this.category].values[1].push(item[`phaseB${prop}`]);
						        categoryInfo[this.category].values[2].push(item[`phaseC${prop}`]);
					        });
					        myChart.setOption(options(categoryInfo[this.category]));
				        });
				        break;
			        case "remain-current":
			        case "env-temperature":
			        case "total-quantity":
			        case "device-alarms":
			        case "device-faults":
				        url = this.category === "remain-current" ? "leftCurrents"
					        : this.category === "env-temperature" ? "envTemperature"
						        : this.category === "total-quantity" ? "totalPower"
							        : this.category === "device-alarms" ? "envTemperature" : "totalPower";
				        prop = url;
				        Store.getStatistics({
                            deviceId: this.deviceId,
					        start: time[0],
					        end: time[1]
                        }, url).then(res => {
					        categoryInfo[this.category].keys = [];
					        categoryInfo[this.category].values[0] = [];
					        res.map(item => {
						        categoryInfo[this.category].keys.push(item.occurredDate);
						        categoryInfo[this.category].values[0].push(item[prop]);
					        });
					        myChart.setOption(options(categoryInfo[this.category]));
				        });
				        break;
		        }
	        }
        }
	}
</script>

<style lang="less">
    .charts-content {
        flex: 1 1 auto;
    }
</style>