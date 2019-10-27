<template>
    <section class="alarm-send-conf">
        <el-row>
            <el-col class="title" :span="10">联系人</el-col>
            <el-col class="title" :span="10">联系方式</el-col>
            <el-col class="title" :span="4"></el-col>
        </el-row>
        <el-row v-for="(item, index) in configs" :key="index">
            <el-form class="send-form" :model="item">
                <el-col :span="10">
                    <el-form-item label="">
                        <el-input v-model="item.contactCorporate" placeholder="请输入联系人姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="">
                        <el-input v-model="item.contactNumber" placeholder="请输入联系方式"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="2" style="text-align: left;">
                    <el-button v-if="item.alertPushConfigId !== undefined" type="info" @click="onUpdate(index)">更新</el-button>
                    <el-button v-if="item.alertPushConfigId === undefined" type="primary" @click="onSubmit(index)">保存</el-button>
                </el-col>
                <el-col :span="2" style="text-align: left;">
                    <el-button type="danger" @click="onDelete(index)">删除</el-button>
                </el-col>
            </el-form>
        </el-row>
        <el-button class="add-new-send" @click="addNew">添加</el-button>
    </section>
</template>

<script>
    import Store from '../store';
	export default {
		name: "sendConfig",
		props: ['deviceId'],
        data() {
	        return {
	        	configs: []
            };
        },
		mounted() {
			Store.getDevicePushInfo({
				deviceId: this.deviceId
			}).then(data => {
				this.configs = data;
			});
		},
        methods: {
	        onUpdate(index) {
		        Store.updateDevicePushInfo({
			        alertPushCfgId: this.configs[index].alertPushConfigId,
			        alertPushConfigVO: this.configs[index]
		        }).then(res => {
			        if(res) {
				        this.$message.success("更新成功");
			        } else {
				        this.$message.error("更新失败");
			        }
                })
	        },
	        onSubmit(index) {
		        Store.addDevicePushInfo({
			        alertPushConfigVO: {
				        deviceId: this.deviceId,
				        ...this.configs[index]
			        }
		        }).then(res => {
			        if(res) {
				        this.$message.success("添加成功");
			        } else {
				        this.$message.error("添加失败");
			        }
		        })
	        },
	        onDelete(index) {
		        let confId = this.configs[index].alertPushConfigId;
		        if (confId) {
			        Store.delDevicePushInfo({
				        alertPushCfgId: confId
			        }).then(res => {
				        if(res) {
					        this.$message.success("删除成功");
				        } else {
					        this.$message.error("删除失败");
				        }
			        })
		        } else {
			        this.configs.splice(index, 1);
		        }
	        },
            addNew() {
	        	this.configs.push({
			        contactCorporate: "",
			        contactNumber: ""
                })
            }
        }
	}
</script>

<style lang="less">
    .alarm-send-conf {

        .add-new-send {
            border: dashed 1px #DCDFE6;
            margin-left: 25px;
        }

        .el-row+.el-row {
            border-top: solid 1px #DCDFE6;
            padding: 15px;
        }
        .el-col {
            padding: 0 10px;
            text-align: center;
        }
        .el-button {
            padding: 6px 20px;
        }

        .el-form-item__content {
            line-height: 30px;
        }
        .el-input .el-input__inner {
            height: 30px;
            line-height: 35px;
        }
    }
</style>