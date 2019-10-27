<template>
    <el-dialog
            :title="options.title"
            :visible.sync="centerDialogVisible"
            :custom-class="options['custom-class']"
            :width="options.width">
        <slot></slot>
        <span slot="footer" class="dialog-footer" v-if="options.showFooter">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
	export default {
		name: "dialoag",
        props: [],
		data() {
			return {
				centerDialogVisible: false,
                options: {
					title: "提示",
	                showFooter: true,
                    width: '50%'
                }
			};
		},
        mounted() {
        },
        methods: {
	        open(options) {
	        	this.options = options;
		        this.centerDialogVisible = true;
	        },
	        close() {
		        this.centerDialogVisible = false;
	        }
        }
	}
</script>

<style lang="less">
    .el-dialog {
        .ele-table {
            min-height: 400px;
        }
    }
</style>