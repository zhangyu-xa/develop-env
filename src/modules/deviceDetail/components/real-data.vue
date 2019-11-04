<template>
    <section>
        <div class="title">实时数据</div>
        <el-card class="box-card adata" shadow="never">
            <div slot="header" class="clearfix">
                <el-divider content-position="center">电压</el-divider>
            </div>
            <div class="text item">
                <label>A相电压:</label><span>{{data.phAVolt}} V</span>
            </div>
            <div class="text item">
                <label>B相电压:</label><span>{{data.phBVolt}} V</span>
            </div>
            <div class="text item">
                <label>C相电压:</label><span>{{data.phCVolt}} V</span>
            </div>
        </el-card>
        <el-card class="box-card bdata" shadow="never">
            <div slot="header" class="clearfix">
                <el-divider content-position="center">电流</el-divider>
            </div>
            <div class="text item">
                <label>A相电流:</label><span>{{data.phACurr}} A</span>
            </div>
            <div class="text item">
                <label>B相电流:</label><span>{{data.phBCurr}} A</span>
            </div>
            <div class="text item">
                <label>C相电流:</label><span>{{data.phCCurr}} A</span>
            </div>
        </el-card>
        <el-card class="box-card cdata" shadow="never">
            <div slot="header" class="clearfix">
                <el-divider content-position="center">线缆温度</el-divider>
            </div>
            <div class="text item">
                <label>A相线缆温度:</label><span>{{data.phACableTemp}} °C</span>
            </div>
            <div class="text item">
                <label>B相线缆温度:</label><span>{{data.phBCableTemp}} °C</span>
            </div>
            <div class="text item">
                <label>C相线缆温度:</label><span>{{data.phCCableTemp}} °C</span>
            </div>
        </el-card>
        <el-card class="box-card other-data" shadow="never">
            <div slot="header" class="clearfix">
                <el-divider content-position="center">其他数据</el-divider>
            </div>
            <div class="text item">
                <label>剩余电流:</label><span>{{data.leftCurr}} mA</span>
            </div>
            <div class="text item">
                <label>环境温度:</label><span>{{data.envTemp}} °C</span>
            </div>
        </el-card>
    </section>
</template>

<script>
	export default {
		name: "real-data",
        props: ['data']
	}
</script>

<style lang="less">
    .real-data {
        display: grid;
        grid-template-areas: "title title title title" "adata bdata cdata otherdata";
        grid-column-gap: 50px;
        grid-template-rows: 40px 150px;

        .el-card {
            border: none;
            .el-card__header {
                padding: 10px 20px;
                border: none;
            }

            .el-card__body {
                padding: 0 20px;
                font-size: 14px;
                text-align: center;
            }

            .el-divider--horizontal {
                margin: 15px 0;
            }

            .el-card__body .item {
                & + .item {
                    margin-top: 5px;
                }

                label {
                    display: inline-block;
                }

                span {
                    display: inline-block;
                    width: 70px;
                    text-align: left;
                    text-indent: 10px;
                }
            }
        }

        .title {
            grid-area: title;

            margin-bottom: 15px;
            font-size: 16px;
        }

        .adata {
            grid-area: adata;
        }

        .bdata {
            grid-area: bdata;
        }

        .cdata {
            grid-area: cdata;
        }

        .other-data {
            grid-area: otherdata;
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