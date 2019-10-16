<template>
    <el-breadcrumb v-if="isShowBread" class="bread-crumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(crumb, index) in this.$store.state.breadCrumb">{{crumb}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
	export default {
		name: "breadcrumb",
		data() {
			return {};
		},
        computed: {
	        isShowBread() {
	        	return this.$store.state.breadCrumb.length !== 1;
            }
        },
		watch: {
			$route(to) {
				this.$store.dispatch("addCrumb", to.name);
			}
		}
	}
</script>

<style scoped>

</style>