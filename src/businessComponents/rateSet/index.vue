<template>
    <section>
        <div class="title" v-if="!notShowHeader">阈值设置</div>
        <el-form class="rate-form" label-position="right" label-width="250px" :model="params">
            <el-divider content-position="left">电压 (<span class="atention">三相电压过压报警阀值最大值为1000V, 三相电压欠压报警阀值最大值为220V, 精度为0.1</span>)</el-divider>
            <div style="display: flex; flex-direction: row; align-items: center;">
                <el-form-item label="三相电压过压报警阀值(V)" style="flex: 1 1 auto">
                    <el-input-number v-model="params.thPhVoltOverThreshhold" :disabled="inputDisabled" controls-position="right" :precision="1" :step="0.1" :min="1" :max="1000"></el-input-number>
                </el-form-item>
                <el-form-item label="三相电压欠压报警阀值(V)" style="flex: 1 1 auto">
                    <el-input-number v-model="params.thPhVoltUnderThreshhold" :disabled="inputDisabled" controls-position="right" :max="220"></el-input-number>
                </el-form-item>
            </div>
            <el-divider content-position="left">电流 (<span class="atention">三相电流过流报警阀值最大值为2000A, 精度为0.1</span>)</el-divider>
            <el-form-item label="三相电流过流报警阀值(A)">
                <el-input-number v-model="params.thPhCurrOverThreshhold" :disabled="inputDisabled" controls-position="right" :min="1" :max="2000"></el-input-number>
            </el-form-item>
            <el-divider content-position="left">线缆温度 (<span class="atention">三相线缆温度超温报警阀值最大值为200°C, 精度为0.1</span>)</el-divider>
            <el-form-item label="三相线缆温度超温报警阀值(°C)">
                <el-input-number v-model="params.thPhCableTempOverThreshhold" :disabled="inputDisabled" controls-position="right" :min="1" :max="200"></el-input-number>
            </el-form-item>
            <el-divider content-position="left">其他 (<span class="atention">剩余电流过流报警阀值最大值为2000mA, 环境温度超温报警阀值最大值为200°C, 精度为0.1</span>)</el-divider>
            <div style="display: flex; flex-direction: row; align-items: center;">
                <el-form-item label="剩余电流过流报警阀值(mA)" style="flex: 1 1 auto">
                    <el-input-number v-model="params.leftCurrOverThreshhold" :disabled="inputDisabled" controls-position="right" :min="1" :max="2000"></el-input-number>
                </el-form-item>
                <el-form-item label="环境温度超温报警阀值(°C)" style="flex: 1 1 auto">
                    <el-input-number v-model="params.envTempOverThreshhold" :disabled="inputDisabled" controls-position="right" :min="1" :max="200"></el-input-number>
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
    import Store from "./store";
	export default {
		name: "rate-set",
        props: ['data', 'notShowHeader'],
        data() {
			const {
				thPhVoltOverThreshhold = 260,
                thPhVoltUnderThreshhold = 170,
                thPhCurrOverThreshhold = 6,
				thPhCableTempOverThreshhold = 100,
				leftCurrOverThreshhold = 500,
				envTempOverThreshhold = 80,
				deviceId
			} = this.data;
	        return {
	        	inputDisabled: true,
                params: {
	                thPhVoltOverThreshhold,
	                thPhVoltUnderThreshhold,
	                thPhCurrOverThreshhold,
	                thPhCableTempOverThreshhold,
	                leftCurrOverThreshhold,
	                envTempOverThreshhold
                },
		        deviceId
            };
        },
		methods: {
			onSubmit() {
				this.inputDisabled = true;
				if(Object.prototype.toString.apply(this.data) === "[object Array]") {
					Store.updateDevicesRate({
						...Object.assign(this.params, {
							deviceIds: this.data.map(d => d.deviceId)
						})
					}).then(res => {
						this.$message({
							type: res ? "success" : "error",
							message: `设置阈值${res ? "成功" : "失败"}`
						});
					});
					return;
				}
                Store.updateDeviceRateById({
	                envTempOverThreshold: this.params.envTempOverThreshhold+"",
	                leftCurrOverThreshold: this.params.leftCurrOverThreshhold+"",
	                thPhCableTempOverThreshold: this.params.thPhCableTempOverThreshhold+"",
	                thPhCurrOverThreshold: this.params.thPhCurrOverThreshhold+"",
	                thPhVoltOverThreshold: this.params.thPhVoltOverThreshhold+"",
	                thPhVoltUnderThreshold: this.params.thPhVoltUnderThreshhold+"",
	                deviceId: this.deviceId
                }).then(res => {
	                this.$message({
		                type: res ? "success" : "error",
		                message: `设置阈值${res ? "成功" : "失败"}`
	                });
                });
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