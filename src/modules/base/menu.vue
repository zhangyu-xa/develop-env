<template>
    <el-menu :default-openeds="[]">
        <el-menu-item index="1">运营总览</el-menu-item>
        <el-submenu index="2">
            <template slot="title"><i class="el-icon-message"></i>设备列表</template>
            <el-menu-item index="2-1">设备总数</el-menu-item>
            <el-menu-item index="2-2">正常设备</el-menu-item>
            <el-menu-item index="2-3">告警设备</el-menu-item>
            <el-menu-item index="2-4">故障设备</el-menu-item>
            <el-menu-item index="2-5">断网设置</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">实时告警</el-menu-item>
        <el-menu-item index="4">统计分析</el-menu-item>
    </el-menu>
</template>

<script>
	export default {
		name: "menu"
	}
</script>

<style lang="less">
    .menu {
        background-color: #d8e0ef;
        font-size: 16px;

        .el-menu-item, .el-submenu__title {
            height: 46px;
            line-height: 46px;
            margin-bottom: 10px;
            border-radius: 10px;
            color: #000000;

            &:hover {
                background-color: #a0b9df;
            }
        }
        .el-menu {
            background-color: #d8e0ef;
        }
        .el-menu-item.is-active {
            background-color: #3d78d2;
            color: #efefef;
        }
    }
</style>