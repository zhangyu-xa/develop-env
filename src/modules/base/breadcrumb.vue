<template>
    <el-breadcrumb v-if="isShowBread" class="bread-crumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(crumb, index) in breadCrumb" :to="{name: `${crumb.name}`}">{{crumb.label}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
	import {$tools} from "../../utils";

	export default {
		name: "breadcrumb",
		data() {
			return {
				breadCrumb: [{
					name: "summary",
					label: "智慧用电"
				}]
			};
		},
        computed: {
	        isShowBread() {
		        return this.breadCrumb.length > 1;
	        }
        },
		watch: {
			$route(to, from) {
				console.log(to, from);
				this.breadCrumb = this.breadCrumb.slice(0, 1);
				this.breadCrumb.push(...$tools.getBreadCrumb(to, from));
			}
		}
	}
</script>

<style lang="less">
    .bread-crumb {
    }
</style>