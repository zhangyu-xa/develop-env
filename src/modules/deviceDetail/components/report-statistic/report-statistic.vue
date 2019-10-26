<template>
    <section>
        <div class="title">
            <div class="tips">报表统计</div>
            <div class="btns">
                <el-button :disabled="disableBtns">导出报表</el-button>
            </div>
        </div>
        <comps-table ref="table" :options="tableOptions" class="data-content"></comps-table>
    </section>
</template>

<script>
    import reportOptions from "./reportOptions";
    import Store from "../../store";
	export default {
		name: "report-statistic",
        props: ['deviceId', 'time'],
		data() {
			const optConfs = reportOptions(this);
			return {
				tableOptions: optConfs,
				total: 0
			};
		},
		watch: {
			time: {
				handler(val) {
					console.log(val);
					this.tableOptions.async.fresh = Date.now();
				},
				deep: true
			}
		},
		computed: {
			disableBtns() {
				return this.total === 0;
			}
		},
		methods: {
			getGeneralInfoList(params, callback) {
				Store.getReportStatistics({
					deviceId: this.deviceId,
					start: this.time[0],
					end: this.time[1],
					limit: params.pageSize,
					pageNum: params.currentPage
				}).then(data => {
					this.total = data.totalCount;
					callback({
						data: data.dataResultList,
						total: data.totalCount
					});
				});
			}
		}
	}
</script>

<style lang="less">
    .report-statistic {
        display: flex;
        flex-direction: column;

        .title {
            flex: 0 0 50px;
            display: flex;
            justify-content: flex-end;
            align-items: center;

            .tips {
                flex: 0 0 250px;

                font-size: 16px;
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