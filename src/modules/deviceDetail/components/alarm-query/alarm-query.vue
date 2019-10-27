<template>
    <alarm-list @select="selectChange" :deviceId="deviceId" @operators="operators" @cellclick="getProcessDetails">
        <template v-slot:toolbar="props">
            <div class="toolbar">
                <div class="tips">报警列表</div>
                <div class="btns">
                    <el-button :disabled="disableBtns" autofocus @click="dealBatchAlarms()">批量处理</el-button>
                </div>
            </div>
            <comps-dialog ref="dialog">
                <span v-if="dialogType === 'process-log'">{{processingDetails}}</span>
                <comps-table v-if="dialogType === 'send-log'" :options="sendLogTableOptions"></comps-table>
                <comps-filter v-if="dialogType === 'process'" :options="processFilterOptions" @trigger="submitProcess"></comps-filter>
            </comps-dialog>
        </template>
    </alarm-list>
</template>

<script>
    import options from "./options";
    import Store from '../../store';
    import alarmList from "src/businessComponents/alarmList/index.vue";
	export default {
		name: "alarm-query",
		props: ["deviceId"],
		components: {
			alarmList
		},
		data() {
			const curOpts = options(this);
			return {
				sendLogTableOptions: curOpts.sendLogTableOptions,
				processFilterOptions: curOpts.processFilterOptions,
				dialogType: "",
				processingDetails: "",
				deviceAlertTrailId: "",
				selectedItems: []
			};
		},
		computed: {
			disableBtns() {
				return this.selectedItems.length <= 0;
			}
		},
		methods: {
			getSendlogs(params, callback) {
				Store.getAlertPushHistory({
					limit: params.pageSize,
					pageNum: params.currentPage,
					alertTrailId: this.deviceAlertTrailId
				}).then(data => {
					this.total = data.totalCount;
					callback({
						data: data.dataResultList,
						total: data.totalCount
					});
				});
			},
			submitProcess(params) {
				params.deviceAlertTrailIds = this.deviceAlertTrailId;
				params.alertTrailId = this.deviceAlertTrailId;
				Store.updateAlertTrail(params).then(res => {
					this.$message.success("报警处理成功");
					this.$refs.dialog.close();
				});
			},
			getProcessDetails({data, column}) {
				if (column.property === "processingDetails") {
					this.dialogType = "process-log";
					this.processingDetails = data.processingDetails;
					this.$refs.dialog.open({
						showFooter: false,
						title: "处理日志查看"
					});
				}
			},
			dealBatchAlarms() {
				this.dialogType = "process";
				this.$refs.dialog.open({
					showFooter: false,
					"custom-class": "process",
					title: "批量报警处理",
					width: '30%'
				});
			},
			operators({type, data}) {
				this.dialogType = type;
				this.deviceAlertTrailId = data.deviceAlertTrailId;
				switch (type) {
					case "send-log":
						this.$refs.dialog.open({
							showFooter: false,
							title: "推送记录查看",
							width: '80%'
						});
						break;
					case "process":
						this.$refs.dialog.open({
							showFooter: false,
							"custom-class": "process",
							title: "报警处理",
							width: '30%'
						});
						break;
				}
			},
			selectChange(items) {
				this.selectedItems = items;
				this.deviceAlertTrailId = items.map(i => {
					return i.deviceAlertTrailId;
				});
			}
		}
	}
</script>

<style lang="less">

</style>