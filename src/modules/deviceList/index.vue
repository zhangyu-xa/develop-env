<template>
    <div class="device-list">
        <comps-filter :options="filterOptions" class="filter" @trigger="filterChange"></comps-filter>
        <div class="toolbar">
            <el-button :disabled="disableBtns">阀值设置</el-button>
            <el-button :disabled="disableBtns">绑定用户</el-button>
            <el-button :disabled="disableBtns">批量解除</el-button>
            <el-button :disabled="disableBtns">导出报表</el-button>
        </div>
        <comps-table :options="tableOptions" class="data-content" @select="selectChange"></comps-table>
    </div>
</template>

<script>
    import Store from './store';
    import options from './options';
	export default {
		data() {
			let curOpts = options(this);
			return {
				tableOptions: curOpts.tableOptions,
                filterOptions: curOpts.filterOptions,
                selectedItems: []
			}
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
		        this.updateFieldsStatus('currentSts', ['normal', 'alarm', 'fault'].indexOf(type) < 0);
                this.tableOptions.async.fresh = Date.now();
	        }
        },
		methods: {
			getGeneralInfoList(params, callback) {
				let type = this.$route.params.type;
				Store.getGeneralInfoListByParam({
					limit: params.pageSize,
					pageNum: params.currentPage,
					...(type === "all" ? this.filterOptions.params :
						type === "offline" ? Object.assign({}, this.filterOptions.params, {netSts: type}) :
							Object.assign({}, this.filterOptions.params, {currentSts: type}))
				}).then(data => {
					callback({
						data: data.dataResultList,
						total: data.totalCount
					});
				});
			},
			filterChange(params) {
				this.tableOptions.async.fresh = Date.now();
			},
			selectChange(items) {
				this.selectedItems = items;
			},
            updateFieldsStatus(fieldProp, isShow) {
	            this.filterOptions.fields.forEach((field, pos) => {
		            if (field.prop === fieldProp) this.filterOptions.fields[pos].isShow = isShow;
	            });
            }
		}
	}
</script>

<style lang="less">
    .device-list {
        display: flex;
        flex-direction: column;

        .filter {
            flex: 0 0 50px;
        }

        .toolbar {
            flex: 0 0 50px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }

        .data-content {
            flex: 1 1 auto;
        }
    }
</style>