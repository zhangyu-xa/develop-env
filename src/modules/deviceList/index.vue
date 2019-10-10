<template>
    <device-list
            ref="deviceList"
            :options="options"
            @select="selectChange">
        <template v-slot:toolbar="props" >
            <div class="toolbar">
                <div class="tips">共有&nbsp;&nbsp;{{props.total}}&nbsp;&nbsp;个设备</div>
                <div class="btns">
                    <el-button :disabled="disableBtns">阀值设置</el-button>
                    <el-button :disabled="disableBtns">绑定用户</el-button>
                    <el-button :disabled="disableBtns">批量解除</el-button>
                    <el-button :disabled="disableBtns">导出报表</el-button>
                </div>
            </div>
        </template>
    </device-list>
</template>

<script>
    import deviceList from 'src/businessComponents/deviceList/index.vue';
    import options from './options';

	export default {
		components: {
			deviceList
        },
		data() {
			return {
				options: options,
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
            }
		}
	}
</script>

<style lang="less">

</style>