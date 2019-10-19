<template>
    <article class="device-details">
        <device-info v-if="isShow('info')" class="device-info"></device-info>
        <real-status v-if="isShow('status')" class="real-status"></real-status>
        <real-data v-if="isShow('data')" class="real-data"></real-data>
        <discriptions v-if="isShow('discrip')" class="discriptions"></discriptions>
        <alarms-query v-if="isShow('alarmlist')" class="alarm-list">报警列表</alarms-query>
        <rate-set v-if="isShow('rateset')" class="rate-set"></rate-set>
        <open-close v-if="isShow('openclose')" class="open-close"></open-close>
        <section v-if="isShow('infosta')" class="info-satistic">信息图表统计</section>
        <section v-if="isShow('reportsta')" class="report-statistic">报表统计</section>
        <section v-if="isShow('alarmsta')" class="alarm-satistic">报警统计分析图表</section>
        <section v-if="isShow('faultsta')" class="fault-statistic">故障统计分析图表</section>
    </article>
</template>

<script>
    import sectionsConf from "./sectionOptions";
    import deviceInfo from "./device-info.vue";
    import realStatus from "./real-status.vue";
    import realData from "./real-data.vue";
    import discriptions from "./dicriptions.vue";
    import openClose from "./openclose.vue";
    import rateSet from "./rate-set.vue";
    import alarmsQuery from "./alarm-query.vue";

	export default {
		name: "details",
        props: ['type'],
        components: {
	        deviceInfo,
	        realStatus,
	        realData,
	        discriptions,
	        openClose,
            rateSet,
	        alarmsQuery
        },
        methods: {
	        isShow(section) {
                return sectionsConf[section].includes(this.type);
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
            flex: 0 0 500px;
        }

        .alarm-satistic {
            flex: 0 0 400px;
        }

        .fault-statistic {
            flex: 0 0 400px;
        }
    }
</style>