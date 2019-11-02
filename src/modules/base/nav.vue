<template>
    <header>
        <h1><i class="fa fa-gg logo-icon"></i>大道智联</h1>
        <div class="middle-menu">
            <i class="fa fa-bell alarm-icon"></i>
        </div>
        <el-dropdown class="right-header" @command="commandHandler">
            <span class="el-dropdown-link">
                 <i class="fa fa-user user-icon"></i>{{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <!--<el-dropdown-item><i class="fa fa-cog"></i>修改密码</el-dropdown-item>-->
                <el-dropdown-item command="logout"><i class="fa fa-sign-out"></i>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <comps-dialog ref="dialog">
            <comps-filter :options="changePwdOptions" @trigger="changePwd"></comps-filter>
        </comps-dialog>
    </header>
</template>

<script>
	import options from "./options";
    import Store from "./store";
	export default {
		name: "nav",
		props: ['user'],
		data() {
			const curOpts = options(this);
			return {
				userName: this.user.userName,
				changePwdOptions: curOpts
			};
		},
        mounted() {
	        const user = JSON.parse(window.sessionStorage.getItem("user"));

	        this.userName = user.userName;
        },
        methods: {
	        commandHandler(command) {
		        if (command === "logout") {
			        Store.loginOut({}).then(res => {
				        if (res) {
					        window.sessionStorage.clear();
					        this.$router.push({name: "login"});
				        }
			        });
		        } else {
			        //修改密码
			        this.$refs.dialog.open({
				        showFooter: false,
				        "custom-class": "process",
				        title: "修改密码",
				        width: '30%'
			        });
		        }
	        },
	        changePwd(params) {
	        	console.log(params);
	        	return;
		        params.deviceAlertTrailIds = this.deviceAlertTrailId;
		        params.alertTrailId = this.deviceAlertTrailId;
		        Store.updateAlertTrail(params).then(res => {
			        this.$message({
				        type: res ? "success" : "error",
				        message: `报警处理${res ? "成功" : "失败"}`
			        });
			        res && this.$refs.dialog.close();
			        this.$refs.alarmList.filterChange();
		        });
	        }
        }
	}
</script>

<style lang="less">
    .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: #3d78d2;
        h1 {
            text-indent: 10px;
            font-size: 22px;
            color: #FFF;
            line-height: 60px;

            flex: 0 0 350px;

            .logo-icon {
                margin-right: 10px;
                font-size: 26px;
                color: #FFF;
            }
        }
        .middle-menu {
            flex: 1 1 auto;
            .alarm-icon {
                float: right;
                cursor: pointer;
                color: white;
                font-size: 26px;
                margin-right: 50px;
            }

        }
        .right-header {
            flex: 0 0 100px;

            .el-dropdown-link {
                cursor: pointer;
                color: white;
                font-size: 14px;
            }
            .user-icon {
                font-size: 18px;
                margin-right: 10px;
            }
        }
    }
</style>