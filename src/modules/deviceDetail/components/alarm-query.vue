<template>
    <alarm-list @select="selectChange">
        <template v-slot:toolbar="props">
            <div class="toolbar">
                <div class="tips">报警列表</div>
                <div class="btns">
                    <el-button :disabled="disableBtns" autofocus @click="dealBatchAlarms()">批量处理</el-button>
                </div>
            </div>
        </template>
    </alarm-list>
</template>

<script>
    import alarmList from "src/businessComponents/alarmList/index.vue"
	export default {
		name: "alarm-query",
        components: {
	        alarmList
        },
        data(){
			return {
				selectedItems: []
            };
        },
		computed: {
			disableBtns() {
				return this.selectedItems.length <= 0;
			}
		},
        methods: {
	        dealBatchAlarms() {

	        },
	        selectChange(items) {
		        this.selectedItems = items;
	        },
        }
	}
</script>

<style lang="less">

</style>