<template>
    <header>
        <h1>智慧用电安全隐患监管平台</h1>
        <div class="middle-menu">
            <i class="fa fa-bell alarm-icon"></i>
        </div>
        <el-dropdown class="right-header" @command="commandHandler">
            <span class="el-dropdown-link">
                 <i class="fa fa-user user-icon"></i>{{this.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><i class="fa fa-cog"></i>修改密码</el-dropdown-item>
                <el-dropdown-item command="logout"><i class="fa fa-sign-out"></i>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </header>
</template>

<script>
	export default {
		name: "nav",
		props: ['user'],
		data() {
			return {
				userName: this.user.userName
			};
		},
        mounted() {
	        let user = JSON.parse(window.sessionStorage.getItem("user"));

	        this.userName = user.userName;
        },
        methods: {
	        commandHandler(command) {
	        	if(command === "logout") {
			        window.sessionStorage.clear();
			        this.$router.push({name: "login"});
		        }
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
            text-indent: 20px;
            font-size: 22px;
            color: gainsboro;
            line-height: 60px;

            flex: 0 0 350px;
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