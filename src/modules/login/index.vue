<template>
    <section class="login">
        <div class="masker"></div>
        <el-card class="box-card">
            <div slot="header" style="font-size: 24px; font-weight: bold">
               大道智联
            </div>
            <div class="text item">
                <el-input v-model="params.userName" placeholder="请输入用户名">
                    <i slot="prefix" class="fa fa-user"></i>
                </el-input>
            </div>
            <div class="text item">
                <el-input v-model="params.password" placeholder="请输入密码" type="password">
                    <i slot="prefix" class="fa fa-lock"></i>
                </el-input>
            </div>
            <div class="text item">
                <el-button type="primary" @click="login">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
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
				Store.login({...this.params}).then(data => {
					this.$router.push({name: "index"});
					this.$emit("login-success", this.params);
					window.sessionStorage.setItem("user", JSON.stringify(data));
                });
			}
		}
	}
</script>

<style lang="less">
    .login {
        background-color: #c3c2c2 !important;
        background: url("../../assets/login/bg2.jpeg") no-repeat;
        background-size: 100% 100%;

        .masker {
            position: fixed;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            background-color: #000;
            opacity: 0.5;
        }
        .box-card {
            width: 400px;
            padding: 20px 0 0;
            position: relative;
            z-index: 10;
            top: -10%;

            .item {
                margin-bottom: 25px;
            }

            .el-card__body {
                padding: 40px 20px 20px;
            }

            .el-input {
                i {
                    margin-left: 5px;
                    font-size: 20px;
                    margin-top: 12px;
                    color: #767474;
                }
                .el-input__inner {
                    height: 45px;
                    line-height: 45px;
                    text-indent: 10px;
                }
            }

            .el-button {
                width: 100%;

                span {
                    font-size: 16px;
                }
            }
        }
    }
</style>