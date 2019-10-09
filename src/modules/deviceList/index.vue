<template>
    <div class="device-list">
        <el-form :inline="true" :model="filter" class="demo-form-inline">
            <el-form-item label="">
                <el-input v-model="filter.deviceId" placeholder="设备ID"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input v-model="filter.account" placeholder="所属公司及账户"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-select v-model="filter.bind" placeholder="绑定状态">
                    <el-option label="绑定" value="true"></el-option>
                    <el-option label="未绑定" value="false"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-select v-model="filter.status" placeholder="设备状态">
                    <el-option label="正常" value="normal"></el-option>
                    <el-option label="告警" value="alarm"></el-option>
                    <el-option label="故障" value="error"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="toolbar">
            <el-button>阀值设置</el-button>
            <el-button>绑定用户</el-button>
            <el-button>批量解除</el-button>
            <el-button>导出报表</el-button>
        </div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="设备ID"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="设备名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="networkStatus"
                    label="设备类型">
            </el-table-column>
            <el-table-column
                    prop="networkStatus"
                    label="所属公司">
            </el-table-column>
            <el-table-column
                    prop="networkStatus"
                    label="联网状态">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="设备状态">
            </el-table-column>
            <el-table-column
                    label="操作">
                <i class="el-icon-s-custom" title="报警推送 "></i>
                <i class="el-icon-tickets" title="设备详情"></i>
                <i class="el-icon-document" title="报警日志"></i>
                <i class="el-icon-setting" title="设备操作"></i>
                <i class="el-icon-edit" title="编辑"></i>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="100"
                layout="prev, pager, next, jumper"
                :total="1000">
        </el-pagination>
    </div>
</template>

<script>
	export default {
		data() {
			return {
				currentPage: 1,
				filter: {
					deviceId: '',
					account: '',
                    bind: '',
                    status: ''
				},
				tableData: [{
					id: '2016',
					name: '阿新伟1号',
					type: '智能用电',
                    owner: '大道科技',
                    networkStatus: '在线',
                    status: '正常'
				}, {
					id: '2016',
					name: '阿新伟1号',
					type: '智能用电',
					owner: '大道科技',
					networkStatus: '在线',
					status: '正常'
				}, {
					id: '2016',
					name: '阿新伟1号',
					type: '智能用电',
					owner: '大道科技',
					networkStatus: '在线',
					status: '正常'
				}, {
					id: '2016',
					name: '阿新伟1号',
					type: '智能用电',
					owner: '大道科技',
					networkStatus: '在线',
					status: '正常'
				}, {
					id: '2016',
					name: '阿新伟1号',
					type: '智能用电',
					owner: '大道科技',
					networkStatus: '在线',
					status: '正常'
				}, {
					id: '2016',
					name: '阿新伟1号',
					type: '智能用电',
					owner: '大道科技',
					networkStatus: '在线',
					status: '正常'
				}, {
					id: '2016',
					name: '阿新伟1号',
					type: '智能用电',
					owner: '大道科技',
					networkStatus: '在线',
					status: '正常'
				}, {
					id: '2016',
					name: '阿新伟1号',
					type: '智能用电',
					owner: '大道科技',
					networkStatus: '在线',
					status: '正常'
				}]
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		}
	}
</script>

<style lang="less" scoped>
    .device-list {
        .toolbar {
            text-align: right;
        }
    }
</style>