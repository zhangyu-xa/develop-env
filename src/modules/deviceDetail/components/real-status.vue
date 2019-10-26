<template>
    <section>
        <div class="title">实时状态</div>
        <el-card class="box-card astatus" shadow="hover">
            <div slot="header" class="clearfix">
                <el-divider content-position="center">A相状态</el-divider>
            </div>
            <div v-for="o in abcStatusConf" :key="o" class="text item">
                <label>{{`A相${o.label}`}}</label><span :class="data[o.prop[0]]">{{data[o.prop[0]] | deviceStatus}}</span>
            </div>
        </el-card>
        <el-card class="box-card bstatus" shadow="hover">
            <div slot="header" class="clearfix">
                <el-divider content-position="center">B相状态</el-divider>
            </div>
            <div v-for="o in abcStatusConf" :key="o" class="text item">
                <label>{{`B相${o.label}`}}</label><span :class="data[o.prop[1]]">{{data[o.prop[1]] | deviceStatus}}</span>
            </div>
        </el-card>
        <el-card class="box-card cstatus" shadow="hover">
            <div slot="header" class="clearfix">
                <el-divider content-position="center">C相状态</el-divider>
            </div>
            <div v-for="o in abcStatusConf" :key="o" class="text item">
                <label>{{`C相${o.label}`}}</label><span :class="data[o.prop[2]]">{{data[o.prop[2]] | deviceStatus}}</span>
            </div>
        </el-card>
        <div class="other-status">
            <el-divider content-position="center">其他实时状态</el-divider>
            <el-row>
                <el-col :span="6"><label>环境温度状态:</label><span :class="data.envTempSts">{{data.envTempSts | deviceStatus}}</span></el-col>
                <el-col :span="6"><label>剩余电流状态:</label><span :class="data.leftCurrSts">{{data.leftCurrSts | deviceStatus}}</span></el-col>
                <el-col :span="6"><label>缺相状态:</label><span :class="data.phLossAlarmSts">{{data.phLossAlarmSts | deviceStatus}}</span></el-col>
                <el-col :span="6"><label>消防信号报警:</label><span :class="data.fireSignalAlarmSts">{{data.fireSignalAlarmSts | deviceStatus}}</span></el-col>
            </el-row>
            <el-row>
                <el-col :span="6"><label>环境温度传感器故障:</label><span :class="data.envTempSensorSts">{{data.envTempSensorSts | deviceStatus}}</span></el-col>
                <el-col :span="6"><label>剩余电流互感器故障:</label><span :class="data.leftCurrSensorSts">{{data.leftCurrSensorSts | deviceStatus}}</span></el-col>
                <el-col :span="6"><label>供电状态:</label><span :class="data.powerSupplySts">{{data.powerSupplySts | deviceStatus}}</span></el-col>
            </el-row>
        </div>
    </section>
</template>

<script>
	export default {
		name: "real-status",
        props: ['data'],
        data() {
            return {
	            abcStatusConf: [{
		            label: "电压状态：",
		            prop: ['phAVoltSts', 'phBVoltSts', 'phCVoltSts']
	            }, {
		            label: "电流状态：",
		            prop: ['phACurrSts', 'phBCurrSts', 'phCCurrSts']
	            }, {
		            label: "线缆温度状态：",
		            prop: ['phACableTempSts', 'phBCableTempSts', 'phCCableTempSts']
	            }, {
		            label: "线缆温度传感器故障：",
		            prop: ['phACableTempSensorSts', 'phBCableTempSensorSts', 'phCCableTempSensorSts']
	            }]
            };
        }
	}
</script>

<style lang="less">
    .real-status {
        display: grid;
        grid-template-areas: "title title title" "astatus bstatus cstatus" "otherstatus otherstatus otherstatus";
        grid-template-rows: 40px 180px 150px;
        grid-column-gap: 50px;

        .el-card {
            .el-card__header {
                padding: 10px 20px;
                border: none;
            }
            .el-card__body {
                padding: 0 20px;
                font-size: 14px;
            }
            .el-divider--horizontal {
                margin: 15px 0;
            }
            .el-card__body .item {
                &+.item {
                    margin-top: 5px;
                }
                label {
                    display: inline-block;
                    width: 180px;
                    text-align: right;
                }
                span.normal {
                    color: @normalColor;
                }
                span:not(.normal) {
                    color: @faultColor;
                }
            }
        }

        .title {
            grid-area: title;

            margin-bottom: 15px;
            font-size: 16px;
        }
        .astatus {
            grid-area: astatus;
        }
        .bstatus {
            grid-area: bstatus;
        }
        .cstatus {
            grid-area: cstatus;
        }
        .other-status {
            padding: 30px 20px 0;
            grid-area: otherstatus;

            .el-divider--horizontal {
                margin-top: 15px;
                margin-bottom: 30px;
            }

            .el-row {
                margin-bottom: 10px;
                &:last-child {
                    margin-bottom: 0;
                }
            }
            .el-col {
                min-height: 25px;
                font-size: 14px;

                label {
                    margin-right: 10px;
                }
                span.normal {
                    color: @normalColor;
                }
                span:not(.normal) {
                    color: @faultColor;
                }
            }
            .row-bg {
                padding: 10px 0;
            }
        }

        .clearfix:before,
        .clearfix:after {
            display: table;
            content: "";
        }
        .clearfix:after {
            clear: both
        }
    }
</style>