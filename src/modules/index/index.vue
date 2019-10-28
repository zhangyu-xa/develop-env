<template>
    <article class="index-page">
        <el-button type="primary" @click="eletricity">智能用电</el-button>
        <el-button type="warning" @click="smoke">智能烟感</el-button>
    </article>
</template>

<script>
	export default {
		name: "index",
        methods: {
	        eletricity() {
	        	this.$emit("eletricity");
                this.$router.push({
                    name: "summary"
                });
	        },
	        smoke() {
                this.$message({
                    type: "info",
                    message: "正在建设中..."
                })
	        }
        }
	}
</script>

<style lang="less">
    .index-page {
        font-size: 36px;
        background-color: #efefef !important;

        .el-button {
            padding: 50px;
            position: relative;
            top: -10%;

            &+.el-button {
                margin-left: 100px;
            }

            span {
                font-size: 26px;
            }
        }
    }
</style>