<template>
    <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
                v-for="(tab, index) in tabs"
                v-if="tab.isShow"
                :key="index"
                :label="tab.label"
                :name="tab.name">
            <component :is="tab.component"></component>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import tabOptions from "./tabOptions";
    import alarmLogs from "./components/alarm-logs.vue";
    import deviceDetails from "./components/device-details.vue";
    import remoteContrl from "./components/remote-contrl.vue";
    import detailStatistics from "./components/detail-statistics.vue";
    import alarmStatistics from "./components/alarm-statistics.vue";

	export default {
		components: {
			alarmLogs,
			deviceDetails,
			remoteContrl,
			detailStatistics,
			alarmStatistics
		},
		data() {
			return {
				tabs: [],
				activeName: '',
                deviceId: ""
			};
		},
		mounted() {
			this.tabs = tabOptions(this.$route.path);
			this.activeName = this.$route.params.operatype;
			this.deviceId = this.$route.query.id;
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			}
		}
	}
</script>

<style lang="less">
.el-tabs {
    display: flex;
    flex-direction: column;

    .el-tabs__header {
        padding: 0;
        margin: 0;
        flex: 0 0 40px;
    }
    .el-tabs__content {
        position: relative;
        flex: 1 1 100px;
        overflow-y: auto;
    }
}
</style>