<template>
    <section class="login">
        <el-card class="box-card">
            <div slot="header" style="font-size: 16px; font-weight: bold">
               登录
            </div>
            <div class="text item">
                <label>用户名:</label><el-input v-model="params.userName" placeholder="请输入用户名"></el-input>
            </div>
            <div class="text item">
                <label>密&nbsp;&nbsp;&nbsp;码:</label><el-input v-model="params.password" placeholder="请输入密码" type="password"></el-input>
            </div>
            <div class="text item">
                <el-button type="primary" @click="login">登录</el-button>
            </div>
        </el-card>
    </section>
</template>

<script>
    import Store from "./store";
	export default {
		name: "index",
		data() {
			return {
				params: {
					userName: "",
					password: ""
				}
            }
		},
		methods: {
			login() {
				if(this.params.userName === "" || this.params.password === "") {
					this.$message({
                        type: "warning",
                        message: "用户名或密码不能为空"
                    })
					return;
                }
				Store.login(this.params).then(data => {

                });
				this.$router.push({name: "index"});
				this.$emit("login-success", this.params);
				window.sessionStorage.setItem("user", JSON.stringify(this.params));
			}
		}
	}
</script>

<style lang="less">
    .login {
        background-color: #c3c2c2 !important;
        .box-card {
            width: 300px;
            position: relative;
            top: -10%;

            .item {
                margin-bottom: 20px;
            }

            .el-input {
                width: 210px;
                margin-left: 10px;

                font-size: 12px;
            }

            .el-button {
                width: 100%;
            }
        }
    }
</style>