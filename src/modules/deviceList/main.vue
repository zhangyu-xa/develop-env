<template>
    <device-list
            ref="deviceList"
            :options="options"
            @operator="operator"
            @select="selectChange">
        <template v-slot:toolbar="props" >
            <div class="toolbar">
                <div class="tips">共有&nbsp;&nbsp;{{props.total}}&nbsp;&nbsp;个设备</div>
                <div class="btns">
                    <el-button :disabled="disableBtns" @click="toobarHandle('rateset')">阀值设置</el-button>
                    <el-button :disabled="disableBtns" @click="toobarHandle('binduser')">绑定用户</el-button>
                    <el-button :disabled="disableBtns" @click="toobarHandle('batchunbind')">批量解除</el-button>
                    <el-button :disabled="disableBtns" @click="toobarHandle('export')">导出报表</el-button>
                </div>
            </div>
        </template>
        <comps-dialog ref="dialog">
            <rate-set v-if="operatype === 'rateset'" :notShowHeader="true" :data="selectedItems"></rate-set>
            <bind-user v-if="operatype === 'binduser'" :data="selectedItems"></bind-user>
            <send-config v-if="operatype === 'alarmsend'" :deviceId="deviceId"></send-config>
        </comps-dialog>
    </device-list>
</template>

<script>
    import deviceList from 'src/businessComponents/deviceList/index.vue';
    import rateSet from "src/businessComponents/rateSet/index.vue";
    import bindUser from "src/businessComponents/userList/index.vue";
    import sendConfig from "./components/sendConfig.vue";
    import options from './options';
    import Store from './store';

    const DialogTitles = {
	    rateset: "批量阈值设置",
	    binduser: "批量绑定用户",
	    batchunbind: "批量解除绑定",
	    alarmsend: "报警推送设置",
	    edit: "设备编辑",
    }

	export default {
		components: {
			deviceList,
			rateSet,
			bindUser,
			sendConfig
		},
		data() {
			return {
				options: options,
                operatype: "",
				deviceId: "",
				selectedItems: []
			};
		},
		computed: {
			routerParams() {
				return this.$route.params.type;
			},
			disableBtns() {
				return this.selectedItems.length <= 0;
			}
		},
		watch: {
			routerParams: function (type) {
				this.$refs.deviceList.updateFieldsStatus('currentSts', ['normal', 'alarm', 'fault'].indexOf(type) < 0);
				this.$refs.deviceList.tableOptions.async.fresh = Date.now();
			}
		},
		methods: {
			selectChange(items) {
				console.log("this.selectedItems:", this.selectedItems);
				this.selectedItems = items;
			},
			toobarHandle(type) {
				this.operatype = type;
				switch (type) {
					case "rateset":
					case "binduser":
						this.$refs.dialog.open({
							showFooter: false,
							"custom-class": type,
							title: DialogTitles[type],
							width: '70%'
                        });
						break;

					case "batchunbind":
						this.$confirm('此操作将解除绑定, 是否继续?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							Store.batchUnbindUser({
								deviceIds: this.selectedItems.map(i => i.deviceId),
								responsibleAcct: ""// TODO，取消绑定当前用户
                            }).then(res => {
								if(res) {
									this.$message.success("批量解除绑定成功");
								} else {
									this.$message.error("批量解除绑定失败");
								}
                            });
						})
						break;
					default:
						Store.exportDeviceList({
							exportVo: {
								deviceIdList: this.selectedItems.map(i => i.deviceId)
							}
                        }).then(res => {
							if(res) {
								this.$message.success("导出成功");
							} else {
								this.$message.error("导出失败");
							}
						});
				}
			},
			operator({type, data}) {
				this.operatype = type;
				this.deviceId = data.deviceId;
				switch (type) {
					case "edit":
					case "alarmsend":
						this.$refs.dialog.open({
							showFooter: false,
							"custom-class": type,
							title: DialogTitles[type],
							width: '50%'
						});
						break;
					default:
						this.$router.push({
							name: "deviceDetail",
							params: {operatype: type},
							query: {
								id: data.deviceId
							}
						})
				}
			}
		}
	}
</script>

<style lang="less">

</style>