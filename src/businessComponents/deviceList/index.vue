<template>
    <div class="device-list">
        <comps-filter :options="filterOptions" class="filter" @trigger="filterChange"></comps-filter>
        <slot name="toolbar" :total="total"/>
        <comps-table ref="table" :options="tableOptions" :displayMode="displayMode" class="data-content" @select="selectChange">
            <template v-slot:elemap="props">
                <div v-show="displayMode==='map'" :class="props.slotClass" style="background-color: #5daf34">高德地图{{props.slotClass}}</div>
            </template>
        </comps-table>
    </div>
</template>

<script>
    import Store from './store';
	export default {
		props: ['options', 'displayMode'],
		data() {
			const curOpts = this.options(this);
			return {
				tableOptions: curOpts.tableOptions,
                filterOptions: curOpts.filterOptions,
                total: ''
			}
		},
		methods: {
			getGeneralInfoList(params, callback) {
				const type = this.$route.params.type || this.$route.name === 'realAlarm' && 'alarm';

				Store.getGeneralInfoListByParam({
					limit: params.pageSize,
					pageNum: params.currentPage,
					...(type === "all" || !type ? this.filterOptions.params
                        : type === "offline" ? Object.assign({}, this.filterOptions.params, {netSts: type})
                            : Object.assign({}, this.filterOptions.params, {currentSts: type}))
				}).then(data => {
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
			updateFieldsStatus(fieldProp, isShow) {
				this.filterOptions.fields.forEach((field, pos) => {
					if (field.prop === fieldProp) this.filterOptions.fields[pos].isShow = isShow;
				});
			},
			getTotal() {
				return this.$refs.table.total;
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

            .tips {
                flex: 0 0 200px;

                font-size: 14px;
                color: darkgrey;
            }
            .btns {
                flex: 1 1 auto;
                text-align: right;
            }
        }

        .data-content {
            flex: 1 1 auto;
        }
    }
</style>