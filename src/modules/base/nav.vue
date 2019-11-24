<template>
    <header>
        <h1><i class="fa fa-gg logo-icon"></i>大道智联</h1>
        <div class="middle-menu">
            <i class="fa fa-bell alarm-icon" :class="{'doudong': isRing}" @click="ringHandle"></i>
        </div>
        <el-dropdown class="right-header" @command="commandHandler">
            <span class="el-dropdown-link">
                 <i class="fa fa-user user-icon"></i>{{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><i class="fa fa-cog"></i>修改密码</el-dropdown-item>
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
				changePwdOptions: curOpts,
				isRing: false
			};
		},
		mounted() {
			const user = JSON.parse(window.sessionStorage.getItem("user"));

			this.userName = user.userName;

			this.updateRecords();
			setInterval(() => {
				this.updateRecords();
			}, 1000 * 60);
		},
		methods: {
			updateRecords() {
				Store.getGeneralInfo({currentSts: 'alarm'}).then(res => {
					this.isRing = res.totalCount > 0;
					if (!this.isRing) {
						Store.getGeneralInfo({currentSts: 'fault'}).then(res => {
							this.isRing = res.totalCount > 0;
						});
					}
				});
			},
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
				if (params.newPwd === "" || params.oldPwd === "" || params.comfirmNewPwd === "") {
					this.$message({
						type: "error",
						message: "请重新输入新旧密码"
					});
					return;
				}
				if (params.newPwd !== params.comfirmNewPwd) {
					this.$message({
						type: "error",
						message: "新密码和确认新密码输入的密码不相同，请重新输入"
					});
					return;
				}
				if (params.newPwd === params.oldPwd) {
					this.$message({
						type: "error",
						message: "新密码和旧密码一样，请重新输入"
					});
					return;
				}
				Store.changePwd(Object.assign({
					...JSON.parse(window.sessionStorage.getItem("user"))
				}, {
					passWord: params.newPwd
				})).then(res => {
					this.$message({
						type: res ? "success" : "error",
						message: `密码修改${res ? "成功" : "失败"}`
					});
					res && this.$refs.dialog.close();
					// 跳转到登录页面
					this.$router.push({name: "login"});
				});
			},
			ringHandle() {
				this.$router.push({
					name: "realAlarm"
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
        .el-dialog__body {
            padding: 0 30px 20px;
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
        .doudong {
            color: red !important;
            animation: uk-text-shadow-glitch .65s cubic-bezier(1, -1.91, 0, 2.79) 0s infinite normal both running;
        }
        @keyframes uk-text-shadow-glitch {
            0% {
                text-shadow: none
            }
            25% {
                text-shadow: -2px -2px 0 #ff0048, 2px 2px 0 #3234ff
            }
            50% {
                text-shadow: 2px -2px 0 #ff0048, -2px 2px 0 #3234ff
            }
            75% {
                text-shadow: -2px 2px 0 #ff0048,2px -2px 0 #3234ff
            }
            100% {
                text-shadow: 2px 2px 0 #ff0048,-2px -2px 0 #3234ff
            }
        }
        @keyframes uk-flicker {
            0% {
                opacity: 0
            }
            10% {
                opacity: .6;
                transform: scale(.8)
            }
            20% {
                opacity: 0
            }
            40% {
                opacity: 1
            }
            50% {
                opacity: .2;
                transform: scale(1.1)
            }
            100% {
                opacity: 1;
                transform: scale(1)
            }
        }
    }
</style>