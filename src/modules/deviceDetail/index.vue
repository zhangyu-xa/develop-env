<template>
    <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
                v-for="(tab, index) in tabs"
                v-if="tab.isShow"
                :key="index"
                :label="tab.label"
                :name="tab.name">
            <details-panel :type="tab.type"></details-panel>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import tabOptions from "./tabOptions";
    import detailsPanel from "./components/details.vue";

	export default {
		components: {
			detailsPanel
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
    margin-top: 10px;
    display: flex;
    flex-direction: column;

    .el-tabs__header {
        padding: 0;
        margin: 0;
        flex: 0 0 30px;

        .el-tabs__item {
            height: 30px;
            line-height: 30px;
        }
    }
    .el-tabs__content {
        position: relative;
        flex: 1 1 100px;
        overflow-y: auto;
    }
}
</style>