<template>
    <section class="alarms-list-query">
        <comps-filter :options="filterOptions" class="filter" @trigger="filterChange"></comps-filter>
        <slot name="toolbar" :total="total"/>
        <comps-table :options="tableOptions" class="data-content" @select="selectChange"></comps-table>
    </section>
</template>

<script>
    import Store from './store';
    import options from './options';
    //import data from './deviceAlertTrail_mock.json';
	export default {
		props: ["deviceId"],
        components: {},
		data() {
			const curOpts = options(this);
			return {
				tableOptions: curOpts.tableOptions,
                filterOptions: curOpts.filterOptions,
                total: ''
			}
		},
		methods: {
			getGeneralInfoList(params, callback) {
				Store.getDeviceAlertTrailByParam(Object.assign({
					limit: params.pageSize,
					pageNum: params.currentPage,
					deviceId: this.deviceId
				}, this.filterOptions.params, this.getQueryParamTimeRange())).then(data => {
					this.total = data.totalCount;
					callback({
						data: data.dataResultList,
						total: data.totalCount
					});
				});
			},
			filterChange() {
				this.tableOptions.async.fresh = Date.now();
			},
			selectChange(items) {
                this.$emit("select", items);
			},
			operators(type, data) {
				this.$emit("operators", {type, data});
			},
			getProcessDetails(data, column) {
				this.$emit("cellclick", {data, column})
			},
            getQueryParamTimeRange () {
	            return {
		            start: this.filterOptions.params.timeRange ? this.filterOptions.params.timeRange[0] : undefined,
		            end: this.filterOptions.params.timeRange ? this.filterOptions.params.timeRange[1] : undefined,
		            timeRange: undefined
	            }
            }
		}
	}
</script>

<style lang="less">
    .alarms-list-query {
        display: flex;
        flex-direction: column;

        .filter {
            flex: 0 0 60px;
        }

        .toolbar {
            flex: 0 0 50px;
            display: flex;
            justify-content: flex-end;
            align-items: center;

            .tips {
                flex: 0 0 250px;

                font-size: 14px;
            }
            .btns {
                flex: 1 1 auto;
                text-align: right;
            }
        }

        .data-content {
            flex: 1 1 auto;

            .el-table {
                position: inherit;
            }
        }

        .process {
            .el-form-item__content {
                display: inline-block;
            }
            .el-input__inner, .el-textarea__inner {
                width: 300px;
            }
            .el-form {
                display: flex;
                align-items: center;
                flex-direction: column;
            }
        }
    }
</style>