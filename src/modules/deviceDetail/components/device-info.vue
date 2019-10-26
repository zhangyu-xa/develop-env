<template>
    <section>
        <el-row>
            <el-col class="title" :span="24">
                <div class="dev-icon fa fa-photo fa-4x"></div>
                <div class="dev-id">
                    设备ID：{{deviceInfo.deviceId}}
                    <span :class="deviceInfo.netStatus">{{deviceInfo.netStatus | netStatus}}</span>
                    <span :class="deviceInfo.currentStatus">{{deviceInfo.currentStatus | currentSts}}</span>
                </div>
                <div class="dev-name">设备名称：{{deviceInfo.deviceName}}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6"><label>设备编号:</label> {{deviceInfo.deviceSerialId}}</el-col>
            <el-col :span="6"><label>设备注册码:</label>{{deviceInfo.deviceRegNo}}</el-col>
            <el-col :span="6"><label>SIM卡串码:</label>-</el-col>
            <el-col :span="6"><label>模组串码:</label>-</el-col>
        </el-row>
        <el-row>
            <el-col :span="6"><label>信号强度:</label>-</el-col>
            <el-col :span="6"><label>所属单位:</label>{{deviceInfo.belongedCorporation}}</el-col>
            <el-col :span="6"><label>所属账号:</label>{{deviceInfo.responsibleAcct}}</el-col>
            <el-col :span="6"><label>安装位置:</label>{{deviceInfo.deviceLocation}}</el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><label>安装地址:</label>{{deviceInfo.deviceAddress}}</el-col>
        </el-row>
    </section>
</template>

<script>
    import Store from "../store";
	export default {
		name: "device-info",
        props: ['deviceId'],
        data() {
	        return {
	        	deviceInfo: {
			        belongedCorporation: "大道科技公司",
			        bindStatus: "1",
			        corporationId: 1,
			        createdTime: "2019-08-31 22:09:54",
			        currentStatus: "normal",
			        deviceAddress: "科技路",
			        deviceDesc: "航天设备",
			        deviceDetail: "用来探测宇宙",
			        deviceId: 1,
			        deviceLocation: "西三环西安软件园二期 阿里巴巴 百度",
			        deviceName: "神州六号",
			        devicePhoto: "devicePhoto1",
			        deviceRegNo: "N/A",
			        deviceSerialId: "F528455A0062F3",
			        deviceType: "eleDevice",
			        isObsolete: "0",
			        modRegNo: "N/A",
			        netStatus: "online",
			        responsibleAcct: 1,
			        simCode: "N/A",
			        singalStrength: "N/A",
			        updatedTime: "2019-09-07 15:09:02"
		        }
            };
        },
        mounted() {
	        Store.getGeneralInfoByDeviceId({
		        deviceId: this.deviceId
            }).then(res => {
                this.deviceInfo = res;
                this.$emit("discription", this.deviceInfo);
            });
        }
	}
</script>

<style lang="less">
    .device-info {
        .el-row {
            margin-bottom: 10px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .el-col {
            min-height: 25px;
            font-size: 14px;

            label {
                color: gray;
                margin-right: 10px;
            }
        }
        .el-col.title {
            height: 60px;
            display: grid;
            grid-template-columns: 60px 1fr;
            grid-template-rows: 25px 35px;
            grid-template-areas: "devicon devid" "devicon devname";

            .dev-icon {grid-area: devicon; color: gray; }
            .dev-id {
                grid-area: devid;
                text-indent: 15px;
                font-size: 18px;
            }
            .dev-name {
                grid-area: devname;
                text-indent: 15px;
                font-size: 16px;
            }
            .dev-id span {
                margin-left: 20px;
                font-size: 14px;
                .status-style();
                &+span {margin-left: 5px;}
                &.offline {
                    .offline-status();
                }
                &.online, &.normal {
                    .normal-status();
                }
                &.alarm {
                    .alarm-status();
                }
                &.fault {
                    .fault-status();
                }
            }
        }
        .row-bg {
            padding: 10px 0;
        }
    }
</style>