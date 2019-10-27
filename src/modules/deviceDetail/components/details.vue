<template>
    <article class="device-details">
        <query-conditions v-if="isShow('conditions')" v-model="timeRange" class="conditions"></query-conditions>
        <device-info v-if="isShow('info')" :deviceId="deviceId" class="device-info" @discription="setDiscription"></device-info>
        <real-status v-if="isShow('status')" :data="realData" class="real-status"></real-status>
        <real-data v-if="isShow('data')" :data="realData" class="real-data"></real-data>
        <discriptions v-if="isShow('discrip')" ref="discrpt" class="discriptions"></discriptions>
        <alarms-query v-if="isShow('alarmlist')" :deviceId="deviceId" class="alarm-list">报警列表</alarms-query>
        <rate-set v-if="isShow('rateset')" :data="realData" class="rate-set"></rate-set>
        <open-close v-if="isShow('openclose')" class="open-close"></open-close>
        <info-statistic v-if="isShow('infosta')" :deviceId="deviceId" :time="timeRange" class="info-satistic">信息图表统计</info-statistic>
        <category-statistic v-if="isShow('categorysta')" :deviceId="deviceId" :time="timeRange" class="category-statistic">告警故障类别统计图</category-statistic>
        <report-statistic v-if="isShow('reportsta')" :deviceId="deviceId" :time="timeRange" class="report-statistic">报表统计</report-statistic>
        <alarm-statistic v-if="isShow('alarmsta')" :category="'alarm'" :deviceId="deviceId" :time="timeRange" class="alarm-satistic">报警统计分析图表</alarm-statistic>
        <alarm-statistic v-if="isShow('faultsta')" :category="'fault'" :deviceId="deviceId" :time="timeRange" class="fault-statistic">故障统计分析图表</alarm-statistic>
    </article>
</template>

<script>
    import sectionsConf from "./sectionOptions";
    import deviceInfo from "./device-info.vue";
    import realStatus from "./real-status.vue";
    import realData from "./real-data.vue";
    import discriptions from "./dicriptions.vue";
    import openClose from "./openclose.vue";
    import rateSet from "src/businessComponents/rateSet/index.vue";
    import alarmsQuery from "./alarm-query/alarm-query.vue";
    import reportStatistic from "./report-statistic/report-statistic.vue";
    import alarmStatistic from "./alarm-statistic/index.vue";
    import infoStatistic from "./info-satistic/index.vue";
    import queryConditions from "./conditions.vue";
    import categoryStatistic from "./category-statistic/category-statistic.vue";

    import Store from "../store";

	export default {
		name: "details",
        props: ['type', 'deviceId'],
        components: {
	        deviceInfo,
	        realStatus,
	        realData,
	        discriptions,
	        openClose,
            rateSet,
	        alarmsQuery,
            reportStatistic,
	        alarmStatistic,
	        infoStatistic,
	        queryConditions,
	        categoryStatistic
        },
        data() {
	        return {
		        timeRange: [],
                realData: {
	                "deviceDetailId": 3,
	                "deviceId": 3,
	                "phAVoltSts": "normal",
	                "phBVoltSts": "normal",
	                "phCVoltSts": "normal",
	                "phACurrSts": "normal",
	                "phBCurrSts": "normal",
	                "phCCurrSts": "normal",
	                "phACableTempSts": "normal",
	                "phBCableTempSts": "normal",
	                "phCCableTempSts": "normal",
	                "envTempSts": "normal",
	                "leftCurrSts": "normal",
	                "phLossAlarmSts": "normal",
	                "fireSignalAlarmSts": "N/A",
	                "phACableTempSensorSts": "normal",
	                "phBCableTempSensorSts": "normal",
	                "phCCableTempSensorSts": "normal",
	                "envTempSensorSts": "normal",
	                "leftCurrSensorSts": "normal",
	                "powerSupplySts": "0",
	                "phAVolt": "225.0",
	                "phBVolt": "225.3",
	                "phCVolt": "225.4",
	                "phACurr": "4.8",
	                "phBCurr": "4.8",
	                "phCCurr": "0.0",
	                "phACableTemp": "0.0",
	                "phBCableTemp": "0.0",
	                "phCCableTemp": "0.0",
	                "envTemp": "0.0",
	                "leftCurr": "253.3",
	                "thPhVoltOverThreshhold": "264",
	                "thPhVoltUnderThreshhold": "176",
	                "thPhCurrOverThreshhold": "6",
	                "thPhCableTempOverThreshhold": "100",
	                "leftCurrOverThreshhold": "500",
	                "envTempOverThreshhold": "80",
	                "createdTime": "2019-10-22 00:51:34",
	                "updatedTime": "2019-10-26 10:25:52",
	                "totalPower": "256"
                }
            };
        },
        mounted() {
            if(this.type === "deviceDetails" || this.type === "remoteContrl") {
                this.getDeviceDataAndStatus();
            }
        },
        methods: {
	        isShow(section) {
		        return sectionsConf[section].includes(this.type);
	        },
	        getDeviceDataAndStatus() {
		        Store.getGeneralInfoByDeviceId({
			        deviceId: this.deviceId
		        }, "/deviceDetail").then(res => {
                    this.realData = res;
		        });
	        },
	        setDiscription(data) {
		        this.$refs.discrpt && this.$refs.discrpt.methods.update(data);
	        }
        }
	}
</script>

<style lang="less">
    .device-details {
        padding: 20px 30px;
        display: flex;
        flex-direction: column;

        section {
            padding: 20px;
            .shadow();

            &+section {
                margin-top: 20px;
            }
        }

        .conditions {
            flex: 0 0 60px;
        }

        .device-info {
            flex: 0 0 170px;
        }

        .real-status {
            flex: 0 0 380px;
        }

        .real-data {
            flex: 0 0 220px;
        }

        .discriptions {
            flex: 0 0 300px;
        }

        .rate-set {
            flex: 0 0 500px;
        }

        .open-close {
            flex: 0 0 200px;
        }

        .alarm-list {
            flex: 0 0 600px;
        }

        .info-satistic {
            flex: 0 0 400px;
        }

        .report-statistic {
            flex: 0 0 600px;
        }

        .alarm-satistic {
            flex: 0 0 400px;
        }

        .fault-statistic {
            flex: 0 0 400px;
        }

        .category-statistic {
            flex: 0 0 400px;
        }
    }
</style>