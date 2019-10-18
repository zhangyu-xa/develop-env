<template>
    <div class="ele-table">
        <el-table
                v-show="!displayMode || displayMode==='list'"
                :data="data"
                height="1"
                stripe="true"
                @selection-change="handleSelectionChange"
                style="width: 100%">
            <el-table-column
                    v-if="options.hasSelect"
                    align="center"
                    type="selection">
            </el-table-column>
            <el-table-column
                    v-for="(column, index) in options.columns"
                    :key="index"
                    :prop="column.prop"
                    :label="column.label"
                    :width="column.width"
                    :align="column.align"
                    :show-overflow-tooltip="column.tips">
                <template slot-scope="scope">
                    <div v-html="$options.filters.tableFilter(scope.row[column.prop], column.prop)"></div>
                </template>
            </el-table-column>
            <el-table-column
                    v-if="options.operators"
                    :label="options.operators.label"
                    :width="options.operators.width"
                    :prop="options.operators.prop"
                    align="center">
                <template slot-scope="scope">
                    <i v-for="(opera, index) in options.operators.operas" :key="index"
                       @click="opera.operator(opera.operaType, scope.row)"
                       :class="opera.icon"
                       :title="opera.title"></i>
                </template>
            </el-table-column>
        </el-table>
        <slot name="elemap" :slotClass="'ele-map'"></slot>
        <el-pagination
                v-if="showPagination"
                class="pagination"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="options.async.pageSize"
                layout="prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
	export default {
		name: "table",
		props: ['options', 'displayMode'],
		data() {
			return {
				currentPage: 1,
                total: 0,
				data: []
			};
		},
		watch: {
			// 监听是否触发了数据刷新
			"options.async.fresh": function () {
				this.freshData();
			}
		},
        computed: {
			showPagination() {
				return this.options.async.pagination &&
					this.total > this.options.async.pageSize;
			}
        },
		mounted() {
			// 默认读取
			this.freshData();
		},
		methods: {
			// 刷新数据
			freshData() {
				this.options.async.getData({
                    pageSize: this.options.async.pageSize,
                    currentPage: this.currentPage
                }, res => {
					this.data = res.data;
					this.total = res.total;
				});
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.freshData();
			},
			handleSelectionChange(val) {
                this.$emit("select", val);
			}
		}
	}
</script>

<style lang="less">
    .ele-table {
        display: flex;
        flex-direction: column;

        .el-table, .ele-map {
            flex: 1 1 auto;
        }

        .el-table {
            .normal, .alarm, .fault, .offline, .online {
                padding: 1px 4px;
                border-radius: 2px;
                border-style: solid;
                border-width: 1px;
                font-size: 12px;
            }
            .normal {
                background-color: #e9f8f2;
                border-color: #d2f1e6;
                color: #67c23a;
            }

            .alarm {
                background-color: #fbf6ec;
                border-color: #f7e7ca;
                color: #edb247;
            }

            .fault {
                background-color: #ffeded;
                border-color: #ffdada;
                color: #ff5656;
            }

            .offline {
                background-color: #e2e4e8;
                border-color: #d3d4d4;
                color: #909399;
            }

            .online {
                background-color: #e9f8f2;
                border-color: #d2f1e6;
                color: #67c23a;
            }
        }

        .pagination {
            flex: 0 0 30px;
            display: flex;
            align-items: center;
        }
    }
</style>