<template>
    <section>
        <div class="title">阈值设置</div>
        <el-form class="rate-form" label-position="right" label-width="250px" :model="params">
            <el-divider content-position="left">电压 (<span class="atention">三相电压过压报警阀值最大值为1000V, 三相电压欠压报警阀值最大值为220V, 精度为0.1</span>)</el-divider>
            <div style="display: flex; flex-direction: row; align-items: center;">
                <el-form-item label="三相电压过压报警阀值(V)" style="flex: 1 1 auto">
                    <el-input-number v-model="params.num" :disabled="inputDisabled" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
                </el-form-item>
                <el-form-item label="三相电压欠压报警阀值(V)" style="flex: 1 1 auto">
                    <el-input-number v-model="params.num" :disabled="inputDisabled" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
                </el-form-item>
            </div>
            <el-divider content-position="left">电流 (<span class="atention">三相电流过流报警阀值最大值为2000A, 精度为0.1</span>)</el-divider>
            <el-form-item label="三相电流过流报警阀值(A)">
                <el-input-number v-model="params.num" :disabled="inputDisabled" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
            </el-form-item>
            <el-divider content-position="left">线缆温度 (<span class="atention">三相线缆温度超温报警阀值最大值为200°C, 精度为0.1</span>)</el-divider>
            <el-form-item label="三相线缆温度超温报警阀值(°C)">
                <el-input-number v-model="params.num" :disabled="inputDisabled" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
            </el-form-item>
            <el-divider content-position="left">其他 (<span class="atention">剩余电流过流报警阀值最大值为2000mA, 环境温度超温报警阀值最大值为200°C, 精度为0.1</span>)</el-divider>
            <div style="display: flex; flex-direction: row; align-items: center;">
                <el-form-item label="剩余电流过流报警阀值(mA)" style="flex: 1 1 auto">
                    <el-input-number v-model="params.num" :disabled="inputDisabled" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
                </el-form-item>
                <el-form-item label="环境温度超温报警阀值(°C)" style="flex: 1 1 auto">
                    <el-input-number v-model="params.num" :disabled="inputDisabled" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
                </el-form-item>
            </div>
            <el-form-item label="" class="btns">
                <el-button v-if="inputDisabled" type="primary" @click="onSet">设置</el-button>
                <el-button v-if="!inputDisabled" type="info" plain @click="onCancel">取消</el-button>
                <el-button v-if="!inputDisabled" type="success" @click="onSubmit">保存</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
	export default {
		name: "rate-set",
        data() {
	        return {
	        	inputDisabled: true,
		        params: {
			        num: 1
                }
            };
        },
		methods: {
			handleChange(value) {
				console.log(value);
			},
			onSubmit() {
				this.inputDisabled = true;
			},
            onSet() {
                this.inputDisabled = false;
            },
			onCancel() {
				this.inputDisabled = true;
			}
		}
	}
</script>

<style lang="less">
    .rate-set {
        .el-input-number.is-controls-right {
            line-height: 35px;
        }
        .el-divider--horizontal {
            margin: 40px 0 20px 0;
        }
        .atention {
            color: @alarmColor;
        }
        .title {
            margin-bottom: 15px;
            font-size: 16px;
        }
        .btns .el-form-item__content {
            margin-left: 20px !important;
        }
    }
</style>