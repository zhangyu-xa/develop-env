<template>
    <div class="ele-table">
        <el-table
                v-show="!displayMode || displayMode==='list'"
                :data="data"
                stripe="true"
                @cell-click="options.cellClick"
                @selection-change="handleSelectionChange"
                style="width: 100%">
            <el-table-column
                    v-if="options.hasIndex"
                    align="center"
                    type="index">
            </el-table-column>
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
                    fixed="right"
                    :label="options.operators.label"
                    :width="options.operators.width"
                    :prop="options.operators.prop">
                <template slot-scope="scope">
                    <i class="ele-table-icon" v-for="(opera, index) in options.operators.operas" :key="index"
                       @click="opera.operator(opera.operaType, scope.row)"
                       :class="opera.icon"
                       :title="opera.title"></i>
                </template>
            </el-table-column>
        </el-table>
        <slot name="elemap" :slotClass="'ele-map'"></slot>
        <el-pagination
                v-if="showPagination"
                v-show="!displayMode || displayMode==='list'"
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
			if (this.options.async.notAutoAjax) return;
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
        flex-wrap: wrap;
        position: relative;

        .el-table, .ele-map {
            flex: 1 1 auto;
        }

        .ele-map {
            width: 100%;
            height: 100%;
        }

        .el-table {
            .normal, .alarm, .fault, .offline, .online {
                .status-style();
                font-size: 12px;
            }
            .normal {
                .normal-status();
            }

            .alarm {
                .alarm-status();
            }

            .fault {
                .fault-status();
            }

            .offline {
                .offline-status();
            }

            .online {
                .online-status();
            }

            .not-process {
                color: @faultColor;
            }

            .already-process {
                color: @normalColor;
            }

            .click-to-see {
                cursor: pointer;
                color: #409eff;
                &:hover {
                    text-decoration: underline;
                }
            }

            .no-data {
                color: darkgrey;
            }

            .ele-table-icon {
                &:hover {
                    font-size: 20px;
                    color: #409eff;
                }
            }
        }

        .pagination {
            flex: 0 0 30px;
            display: flex;
            align-items: center;
            margin-top: 20px;
        }
    }
</style>