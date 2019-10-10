<template>
    <device-list ref="deviceList" :options="options">
        <template v-slot:toolbar="props" >
            <div class="toolbar">
                <div class="tips">共有&nbsp;&nbsp;{{props.total}}&nbsp;&nbsp;个设备</div>
                <div class="btns">
                    <el-button disabled>对比</el-button>
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
				options: options
			};
		},
		computed: {
		},
		watch: {
		},
		methods: {
		}
	}
</script>

<style lang="less">
</style>