<template>
    <section>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(tab, index) in tabsConfs" lazy="true" :key="index" :label="tab.label" :name="tab.name">
                <staistic-charts :category="tab.type" :deviceId="deviceId" :time="time"></staistic-charts>
            </el-tab-pane>
        </el-tabs>
    </section>
</template>

<script>
    import staisticCharts from "./charts.vue";
    import tabs from "./tabsConf";
	export default {
		name: "info-satistic",
        props: ['deviceId', 'time'],
        components: {
	        staisticCharts
        },
		data() {
			return {
				activeName: "voltage",
                tabsConfs: tabs
			};
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			}
		}
	}
</script>

<style lang="less">
    .info-satistic {
        padding:0 20px 20px 20px !important;

        display: flex;

        .el-tabs {
            flex: 1 1 auto;

            .el-tabs__content {
                display: flex;
                width: 100%;
            }
        }
        .el-tab-pane {
            flex: 1 1 auto;
            display: flex;
            width: 100%;
        }
    }
</style>