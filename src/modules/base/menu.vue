<template>
    <el-menu default-active="activeIndex">
        <router-link index="1" tag="el-menu-item" :to="{name: 'summary'}"><i class="el-icon-message"></i>运营总览</router-link>
        <el-submenu index="2">
            <template slot="title"><i class="el-icon-message"></i>设备列表</template>
            <router-link index="2-1" tag="el-menu-item" :to="{name: 'deviceList', params: {type: 'all'}}"><i class="el-icon-message"></i>设备总数</router-link>
            <router-link index="2-2" tag="el-menu-item" :to="{name: 'deviceList', params: {type: 'normal'}}"><i class="el-icon-message"></i>正常设备</router-link>
            <router-link index="2-3" tag="el-menu-item" :to="{name: 'deviceList', params: {type: 'alarm'}}"><i class="el-icon-message"></i>告警设备</router-link>
            <router-link index="2-4" tag="el-menu-item" :to="{name: 'deviceList', params: {type: 'fault'}}"><i class="el-icon-message"></i>故障设备</router-link>
            <router-link index="2-5" tag="el-menu-item" :to="{name: 'deviceList', params: {type: 'offline'}}"><i class="el-icon-message"></i>断网设置</router-link>
        </el-submenu>
        <router-link index="3" tag="el-menu-item" :to="{name: 'realAlarm'}"><i class="el-icon-message"></i>实时告警</router-link>
        <router-link index="4" tag="el-menu-item" :to="{name: 'statistis'}"><i class="el-icon-message"></i>统计分析</router-link>
    </el-menu>
</template>

<script>
	export default {
		name: "menu",
		data() {
			return {
				activeIndex: '1'
			}
		}
	}
</script>

<style lang="less">
    .menu {
        background-color: #d8e0ef;

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
        .el-menu-item.router-link-active {
            background-color: #3d78d2;
            color: #efefef;

            i {
                color: #efefef;
            }
        }
    }
</style>