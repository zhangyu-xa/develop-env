<template>
    <el-form class="edit-device" :model="data">
        <el-form-item label="设备名称">
            <el-input v-model="data.deviceName" placeholder="请输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="安装地址">
            <el-input v-model="data.deviceAddress" placeholder="请输入设备安装地址"></el-input>
            <comps-map ref="map" :container="'edit-device'" class="map-address"></comps-map>
        </el-form-item>
        <el-form-item label="安装位置">
            <el-input v-model="data.deviceLocation" placeholder="请输入设备安装位置"></el-input>
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
    import _ from "underscore";
    import MapTools from "src/components/map/mapTools";

    let loaded = false;
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
				},
				curCoordinate: []
			};
		},
        watch: {
	        'data.deviceAddress': _.throttle(function (val) {
		        if (loaded) {
			        this.triggerMapService(val);
		        } else {
			        loaded = true;
			        setTimeout(() => {
				        this.triggerMapService(val);
			        }, 1000);
		        }
	        }, 500),
	        'deviceId': function () {
		        this.initForm();
	        }
        },
		mounted() {
			this.initForm();
		},
        methods: {
	        initForm() {
		        Store.getGeneralInfoByDeviceId({
			        deviceId: this.deviceId
		        }).then(res => {
			        this.data = res;
		        });
	        },
	        onSubmit() {
		        Store.updateGeneralInfoByDeviceId({
			        deviceId: this.deviceId,
			        deviceGeneralInfoVO: this.data,
			        coordinateAxis: `{"content":"N/A","icon":{"h":0,"l":0,"lb":0,"t":0,"w":0,"x":0},"isOpen":0,"point":"${this.curCoordinate.join("|")}","title":"${this.deviceId}"}`
		        }).then(res => {
			        this.$message({
				        type: res ? "success" : "error",
				        message: res ? "编辑成功" : "编辑失败"
			        });
			        this.$emit("onEdited");
		        });
	        },
	        triggerMapService(val) {
		        MapTools.getSearchHandler().search(val, (status, result) => {
			        // 搜索成功时，result即是对应的匹配数据
			        if (status === "complete" && result.poiList.pois.length > 0) {
                        this.curCoordinate = [result.poiList.pois[0].location.lng, result.poiList.pois[0].location.lat];
				        this.$refs.map.addMarkerEx({
					        position: this.curCoordinate
				        });
			        } else {
				        console.warn(`没有和“${val}”匹配的地名地址信息`)
			        }
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