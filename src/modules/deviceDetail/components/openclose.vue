<template>
    <section>
        <div class="title">开合闸</div>
        <div class="operator">
            <i class="fa fa-play fa-5x" @click="remoteCtrlHandle('reset')"></i>
            <i class="fa fa-play fa-5x" @click="remoteCtrlHandle('mute')"></i>
            <i class="fa fa-play fa-5x" @click="remoteCtrlHandle('switchOn')"></i>
            <i class="fa fa-play fa-5x" @click="remoteCtrlHandle('switchOff')"></i>
        </div>
        <div class="tips">
            <span>复位</span>
            <span>消音</span>
            <span>开闸</span>
            <span>合闸</span>
        </div>
    </section>
</template>

<script>
    import Store from "../store";
    const Tips = {
	    "reset": "复位",
	    "mute": "消音",
	    "switchOn": "开闸",
	    "switchOff": "合闸"
    };
	export default {
		name: "openclose",
        props: ['deviceId'],
		methods: {
			remoteCtrlHandle(evtype) {
				Store.remoteControl({
					deviceId: this.deviceId
				}, evtype).then(res => {
					this.$message({
						type: "success",
						message: `${Tips[evtype]}成功`
					});
				});
			}
		}
	}
</script>

<style lang="less">
    .open-close {
        display: flex;
        flex-direction: column;

        .title {
            flex: 0 0 40px;
            margin-bottom: 15px;
            font-size: 16px;
        }
        .operator {
            flex: 0 0 80px;

            display: flex;
            align-items: flex-start;
            justify-content: space-around;

            i {
                width: 80px;
                height: 80px;
                padding: 10px;
                display: flex;
                align-items: center;
                justify-content: center;

                border-radius: 50%;
                border: solid 1px #8c939d;
                color: #8c939d;
                cursor: pointer;
                background-color: #ffffff;

                &.fa-play {
                    color: @offlineColor;
                }
                &.fa-stop {
                    color: @faultColor;
                }

                position: relative;
            }
            i:hover {
                background-color: #efecec;
                &.fa-play {
                    color: @normalColor;
                }
            }
            .tips {
                position: relative;
            }
            .fa-play {
                text-indent: 12px;
            }
        }
        .tips {
            flex: 1 1 auto;

            display: flex;
            align-items: center;
            justify-content: space-around;

            font-size: 18px;
        }
    }
</style>