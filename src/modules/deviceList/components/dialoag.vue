<template>
    <el-dialog
            title="提示"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <span>{{contentType}}</span>
            <span slot="footer" class="dialog-footer">
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
				contentType: ""
			};
		},
        mounted() {
        },
        methods: {
	        open(type) {
	        	this.contentType = type;
		        this.centerDialogVisible = true;
	        }
        }
	}
</script>

<style scoped>

</style>