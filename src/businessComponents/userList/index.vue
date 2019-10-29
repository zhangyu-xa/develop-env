<template>
    <section class="user-list">
        <comps-filter :options="filterOptions" class="filter" @trigger="filterChange"></comps-filter>
        <comps-table :options="tableOptions" class="data-content"></comps-table>
    </section>
</template>

<script>
	import options from './options';
	import Store from './store';
	export default {
		name: "index",
        props: ['data'],
		data() {
			const curOpts = options(this);
			return {
				tableOptions: curOpts.tableOptions,
				filterOptions: curOpts.filterOptions
			}
		},
        methods: {
	        getUserList(params, callback) {
		        Store.getUserList({
			        limit: params.pageSize,
			        pageNum: params.currentPage,
                    ...this.filterOptions.params
		        }).then(data => {
			        callback({
				        data: data.dataResultList,
				        total: data.totalCount
			        });
		        });
	        },
	        filterChange() {
		        this.tableOptions.async.fresh = Date.now();
	        },
	        selectUserForBind(data, column) {
		        if (column.property === "selectUser") {
			        Store.bindBatchGeneralInfoResponsibleAccts({
				        responsibleAcct: data.userId,
				        deviceIds: this.data.map(d => d.deviceId)
			        }).then(res => {
				        if (res) {
					        this.$message.success("批量绑定用户成功");
					        this.$emit("onBinded");
				        } else {
					        this.$message.error("批量绑定用户失败");
				        }
			        });
		        }
	        }
        }
	}
</script>

<style lang="less">
    .user-list {
    }
    .el-dialog__body {
        padding: 0 20px 20px 20px;
    }
</style>