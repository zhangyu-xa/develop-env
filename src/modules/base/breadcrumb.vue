<template>
    <el-breadcrumb v-if="isShowBread" class="bread-crumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(crumb, index) in breadCrumb" :key="index" @click="clickBreadCrumb" :to="getRouterByName(crumb.name)">{{crumb.label}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
	import { routes } from "../../router/router";

	const routeParams = {
		"alarm-statistics": "报警统计",
		"detail-statistics": "明细统计",
		"device-details": "设备详情",
		"device-contrl": "远程设置",
		"alarm-logs": "告警处理",
		all: "设备总数",
		normal: "正常设备",
		alarm: "告警设备",
		fault: "故障设备",
		offline: "断网设备"
	};

	const rootCrumb = {
		name: "summary",
		label: "智慧用电"
	};

	const getBreadCrumb = function(to) {
		const toPathArr = [];
		const curPathArr = to.path.split("/").filter(v => v);

		curPathArr.reduce((res, v) => {
			const temp = res.filter(r => r.name === v)[0];
			if (!temp) {
				if (v === "deviceDetail") {
					toPathArr.push({
						name: "deviceDetail",
						label: routeParams[to.params.operatype]
					});
					return [{}];
				}
				if (to.path.indexOf(`/deviceList/${v}/`) >= 0) {
					toPathArr.push({
						name: "deviceList",
						label: routeParams[to.params.type]
					});
				}
				return [{}];
			}
			if (temp.name === "deviceDetail") {
				toPathArr.push({
					name: "deviceDetail",
					label: routeParams[to.params.operatype]
				});
			} else if (temp.name !== "main") {
				temp.name && toPathArr.push({
					name: temp.name,
					label: temp.label
				});
			}
			return temp.children || [{}];
		}, routes);
		return toPathArr;
	};

	export default {
		name: "breadcrumb",
		data() {
			return {
				breadCrumb: []
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
				this.breadCrumb = [];
				if (to.name !== "summary") {
					this.breadCrumb.push(rootCrumb, ...getBreadCrumb(to));
				}
			}
		},
        methods: {
	        getRouterByName(name) {
		        const routerName = this.getRouterName(name);
		        return {
			        name: this.getRouterName(name),
			        ...(routerName === "" ? {query: this.getQueryParams()} : {})
		        }
	        },
	        getRouterName(name) {
		        if (name === "deviceDetail") return "";
		        return name;
	        },
	        getQueryParams() {
                const querys = window.location.hash.split("?")[1];
                const queryParams = {};
                if(querys) {
	                querys.split("&").forEach(item => {
	                	const [key, value] = item.split("=");
		                queryParams[key] = value;
                    });
                }
                return queryParams;
	        },
	        clickBreadCrumb(e) {
		        e.preventDefault();
		        return false;
	        }
        }
	}
</script>

<style lang="less">
    .bread-crumb {
        .el-breadcrumb__inner {
            font-size: 14px;
        }
    }
</style>