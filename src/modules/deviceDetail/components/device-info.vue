<template>
    <section>
        <el-row>
            <el-col class="title" :span="24">
                <div class="dev-icon fa fa-photo fa-4x"></div>
                <div class="dev-id">
                    设备ID：gzab49fA
                    <span>在线</span>
                    <span>告警</span>
                </div>
                <div class="dev-name">设备名称：二楼配电房</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6"><label>设备编号:</label> 123467</el-col>
            <el-col :span="6"><label>设备注册码:</label>55cd52393b0240139ee17fdb2ef9939f</el-col>
            <el-col :span="6"><label>SIM卡串码:</label>-</el-col>
            <el-col :span="6"><label>模组串码:</label>-</el-col>
        </el-row>
        <el-row>
            <el-col :span="6"><label>信号强度:</label>-</el-col>
            <el-col :span="6"><label>所属单位:</label>工厂测试</el-col>
            <el-col :span="6"><label>所属账号:</label>13971220066</el-col>
            <el-col :span="6"><label>安装位置:</label>9魅二楼配电房</el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><label>安装地址:</label>湖北省武汉市东西湖区将军路街道双福大楼</el-col>
        </el-row>
    </section>
</template>

<script>
	export default {
		name: "device-info"
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
                &:first-child {
                    .online-status();
                }
                &:last-child {
                    .alarm-status();
                }
            }
        }
        .row-bg {
            padding: 10px 0;
        }
    }
</style>