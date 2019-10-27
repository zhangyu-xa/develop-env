<template>
    <el-form class="edit-device" :model="data">
        <el-form-item label="设备名称">
            <el-input v-model="data.deviceName" placeholder="请输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="安装地址">
            <el-input v-model="data.deviceAddress" placeholder="请输入设备安装地址"></el-input>
        </el-form-item>
        <el-form-item label="安装位置">
            <el-input v-model="data.deviceLocation" placeholder="请输入设备安装位置"></el-input>
            <comps-map :container="'edit-device'" class="map-address"></comps-map>
        </el-form-item>
        <el-form-item label="设备描述">
            <el-input type="textarea" v-model="data.deviceDesc" placeholder="请输入设备描述"></el-input>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import Store from "../store";
	export default {
		name: "editDevice",
		props: ['deviceId'],
		data() {
			return {
				data: {
					deviceName: "",
					deviceAddress: "",
					deviceLocation: "",
					deviceDesc: ""
                }
			};
		},
		mounted() {
			Store.getGeneralInfoByDeviceId({
				deviceId: this.deviceId
			}).then(res => {
                this.data = res;
            });
		},
        methods: {
	        onSubmit() {
	        	Store.updateGeneralInfoByDeviceId({
			        deviceId: this.deviceId,
			        deviceGeneralInfoVO: this.data
                }).then(res => {
			        this.$message({
				        type: res ? "success" : "error",
				        message: res ? "编辑成功" : "编辑失败"
			        });
			        this.$emit("onEdited");
		        });
	        }
        }
	}
</script>

<style lang="less">
    .edit-device {
        .el-form-item__label {
            line-height: 20px;
        }
        .map-address {
            height: 300px;
        }
    }
</style>