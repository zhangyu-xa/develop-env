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
                <dialoag ref="dialog" :isVisible="dialoagVisible"></dialoag>
            </div>
        </template>
    </device-list>
</template>

<script>
    import deviceList from 'src/businessComponents/deviceList/index.vue';
    import dialoag from "./components/dialoag.vue";
    import options from './options';

	export default {
		components: {
			deviceList,
			dialoag
		},
		data() {
			return {
				options: options,
				dialoagVisible: false,
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
				this.selectedItems = items;
			},
			toobarHandle(type) {
				switch (type) {
					case "rateset":
					case "binduser":
                    case "batchunbind":
						this.$refs.dialog.open(type);
						break;
					default:
						console.log("export");
				}
			},
			operator({type, data}) {
				switch (type) {
					case "edit":
					case "alarmsend":
						this.$refs.dialog.open(type);
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