<template>
    <div class="summary">
        <device-count class="device-count-all" :dev-type="'all'" @click="clickHandler"></device-count>
        <device-count class="device-count-normal" :dev-type="'normal'" @click="clickHandler"></device-count>
        <device-count class="device-count-alarm" :dev-type="'alarm'" @click="clickHandler"></device-count>
        <device-count class="device-count-fault" :dev-type="'fault'" @click="clickHandler"></device-count>
        <device-count class="device-count-offline" :dev-type="'offline'" @click="clickHandler"></device-count>
        <comps-map ref="map" class="device-map" :container="'summary'"></comps-map>
        <alarm-list class="alarm-list"></alarm-list>
        <trend-analysis :category="'alarm'" class="analysis-alarm"></trend-analysis>
        <trend-analysis :category="'fault'" class="analysis-fault"></trend-analysis>
    </div>
</template>

<script>
    import deviceCount from "./components/deviceCount.vue";
    import alarmList from "./components/alarmList.vue";
    import trendAnalysis from "./components/trendAnalysis.vue";

    import Store from './store';

	export default {
		name: "summary",
        components: {
			deviceCount,
	        alarmList,
	        trendAnalysis
        },
        mounted() {
	        Store.getCoordinate().then(res => {
		        res.forEach(dev => {
		        	if(dev.point) {
				        this.$refs.map.addMarker({
					        position: dev.point.split("|"),
					        deviceId: dev.title - 0,
					        async: {
						        getContentData(deviceId, callback) {
							        Store.getGeneralDeviceInfo({deviceId}).then(data => {
								        callback && callback(data);
							        });
						        }
					        },
					        contentFormat(data) {
						        let content = ["<div class='device-info'>"];
						        content.push(`<div>设备名称：${data.deviceName}</div>`);
						        content.push(`<div>设备状态：${Dict.currentStatus[data.currentStatus]}</div>`);
						        content.push(`<div>设备地址：${data.deviceAddress}</div>`);
						        content.push(`<div>安装位置：${data.deviceLocation}</div>`);
						        content.push(`<div>所属公司：${data.belongedCorporation}</div>`);
						        content.push("</div>")
						        return content.join("");
					        }
				        });
			        }
                });
	        });
        },
        methods: {
	        clickHandler(type) {
		        this.$router.push({name: 'deviceList', params: {type: type}});
	        }
        }
	}
</script>

<style lang="less">
    .summary {
        padding: 30px 40px !important;
        overflow-y: auto;

        display: grid;
        grid-column-gap: 20px;
        grid-row-gap: 25px;
        grid-template-rows: 180px 180px 600px 430px 400px 400px;
        grid-template-areas: "all all all normal normal normal"
                             "alarm alarm fault fault offline offline"
                             "map map map map map map"
                             "alarmlist alarmlist alarmlist alarmlist alarmlist alarmlist"
                             "analysisalarm analysisalarm analysisalarm analysisalarm analysisalarm analysisalarm"
                             "analysisfault analysisfault analysisfault analysisfault analysisfault analysisfault";

        section {
            cursor: pointer;
            .shadow();

            &:last-child {
                margin-bottom: 50px;
            }
        }

        .device-count-all {
            grid-area: all;
            background-color: rgb(35, 160, 212);
        }
        .device-count-normal {
            grid-area: normal;
            background-color: #67c23a;
        }
        .device-count-alarm {
            grid-area: alarm;
            background-color: #edb247;
        }
        .device-count-fault {
            grid-area: fault;
            background-color: #ff5656;
        }
        .device-count-offline {
            grid-area: offline;
            background-color: #909399;
        }
        .device-map {
            grid-area: map;
        }
        .alarm-list {
            grid-area: alarmlist;
        }
        .analysis-alarm {
            grid-area: analysisalarm;
        }
        .analysis-fault {
            grid-area: analysisfault;
        }
        .device-info {
            width: 300px;
            padding: 10px;

            div + div {
                margin-top: 10px;
            }
        }
    }
</style>