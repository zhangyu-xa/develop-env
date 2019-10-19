<template>
    <section>
        <div class="title">现场图片及设备描述</div>
        <div class="device-img fa fa-image fa-5x"><span>暂无图片</span></div>
        <div class="discription">
            <el-card class="box-card" shadow="never">
                <div slot="header" class="clearfix">
                    <el-divider content-position="left">设备描述</el-divider>
                </div>
                <div class="text item">
                    暂无
                </div>
            </el-card>
        </div>
    </section>
</template>

<script>
	export default {
		name: "device-dicription"
	}
</script>

<style lang="less">
    .discriptions {
        display: grid;
        grid-template-areas: "title title" "deviceimg discription";
        grid-template-rows: 40px 250px;
        grid-template-columns: 300px 1fr;
        grid-column-gap: 20px;

        .title {
            grid-area: title;

            margin-bottom: 15px;
            font-size: 16px;
        }
        .device-img {
            grid-area: deviceimg;
            border: 1px solid #EBEEF5;
            color: #A8AAAF;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;

            span {
                font-size: 12px;
            }
        }
        .discription {
            grid-area: discription;

            .item {
                min-height: 200px;
                padding: 10px;
                border-radius: 5px;
                background-color: #EBEEF5;
            }
        }

        .el-card {
            border: none;
            .el-card__header {
                padding: 10px 20px;
                border: none;
            }

            .el-card__body {
                padding: 0 20px;
                font-size: 14px;
            }

            .el-divider--horizontal {
                margin: 5px 0;
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