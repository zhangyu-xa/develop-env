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
    import options from "./chartsOptions";
    const dataList = {
    	alarm: {
    		title: "报警统计",
		    legendData: ["漏电流报警", "设备离线警告", "缺相报警"],
            selected: ["漏电流报警", "设备离线警告", "缺相报警"],
		    seriesData: [{
		    	name: "漏电流报警",
                value: 1000
            }, {
			    name: "设备离线警告",
			    value: 2000
		    }, {
			    name: "缺相报警",
			    value: 3000
		    }]
        },
	    fault: {
		    title: "故障统计",
		    legendData: ["漏电流报警", "设备离线警告", "缺相报警"],
		    selected: ["漏电流报警", "设备离线警告", "缺相报警"],
		    seriesData: [{
			    name: "漏电流报警",
			    value: 3000
		    }, {
			    name: "设备离线警告",
			    value: 2000
		    }, {
			    name: "缺相报警",
			    value: 1000
		    }]
	    }
    }
	export default {
		name: "category-statistic",
        mounted() {
            let alarmChart = echarts.init(document.getElementById("alarm-chart"));
	        let faultChart = echarts.init(document.getElementById("fault-chart"));

	        alarmChart.setOption(options(dataList.alarm));
	        faultChart.setOption(options(dataList.fault));
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