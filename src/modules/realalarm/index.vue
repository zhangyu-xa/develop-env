<template>
    <device-list ref="deviceList" :options="options" :displayMode="curDisplayMode">
        <template v-slot:toolbar="props">
            <div class="toolbar">
                <div class="tips">共有&nbsp;&nbsp;{{props.total}}&nbsp;&nbsp;个处于告警状态的设备</div>
                <div class="btns">
                    <el-button-group>
                        <el-button autofocus @click="changeDisplay('list')">列表模式</el-button>
                        <el-button @click="changeDisplay('map')">地图模式</el-button>
                    </el-button-group>
                </div>
            </div>
        </template>
    </device-list>
</template>

<script>
	import deviceList from 'src/businessComponents/deviceList/index.vue';
	import options from './options';

	export default {
		components: {
			deviceList
		},
		data() {
			return {
				options: options,
                curDisplayMode: "list"
			};
		},
		computed: {
		},
		watch: {
		},
		methods: {
			changeDisplay(mode) {
				this.curDisplayMode = mode;
			}
		}
	}
</script>

<style lang="less">
</style>