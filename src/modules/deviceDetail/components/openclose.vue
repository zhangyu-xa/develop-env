<template>
    <section>
        <div class="title">开合闸</div>
        <div class="operator">
            <i class="fa fa-play fa-5x"></i>
        </div>
        <div class="tips">开闸</div>
    </section>
</template>

<script>
	export default {
		name: "openclose"
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
            justify-content: center;

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

                &.fa-play {
                    color: @normalColor;
                }
                &.fa-stop {
                    color: @faultColor;
                }

                position: relative;
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
            justify-content: center;

            font-size: 18px;
        }
    }
</style>