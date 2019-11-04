<template>
    <section class="real-alarm">
        <div class="title">故障报警信息</div>
        <div class="alarm-count"><span><i class="fa fa-bell"></i>&nbsp;&nbsp;最新告警记录</span></div>
        <div class="fault-count"><span><i class="fa fa-warning"></i>&nbsp;&nbsp;最新故障记录</span></div>
        <ul class="alarm-new" v-if="alarmLists[0].length !== 0">
            <li v-for="(alarm, index) in alarmLists[0]" :key="index">
                <i></i>
                <div class="discription">{{alarm.deviceName}},&nbsp;{{alarm.deviceAddress}}</div>
                <div class="time">{{alarm.createdTime}}</div>
            </li>
        </ul>
        <div class="alarm-new" v-else>暂无故障记录</div>
        <ul class="fault-new" v-if="alarmLists[1].length !== 0">
            <li v-for="(alarm, index) in alarmLists[1]" :key="index">
                <i></i>
                <div class="discription">{{alarm.deviceName}},&nbsp;{{alarm.deviceAddress}}</div>
                <div class="time">{{alarm.createdTime}}</div>
            </li>
        </ul>
        <div class="fault-new" v-else>暂无故障记录</div>
    </section>
</template>

<script>
	export default {
		name: "alarmList",
		props: ['alarmLists'],
		data() {
			return {};
		},
		mounted() {},
		methods: {}
	}
</script>

<style lang="less" scoped>
    .real-alarm {
        padding:0 20px 20px 20px;

        display: grid;
        grid-template-rows: 40px 60px 1fr;
        grid-template-areas: "title title"
                             "alarmcount faultcount"
                             "newalarms newfaults";

        .title {
            grid-area: title;

            display: flex;
            align-items: center;

            font-size: 16px;
        }
        .alarm-count, .fault-count {
            display: flex;
            align-items: center;
            justify-content: space-between;

            padding: 0 20px 0 10px;

            font-size: 16px;
            color: #ffffff;
        }
        .alarm-count {
            grid-area: alarmcount;

            background-color: rgb(237, 178, 71);
        }
        .fault-count {
            grid-area: faultcount;

            background-color: rgb(255, 86, 86);
        }
        .alarm-new, .fault-new {
            padding: 0 5px;

            li {
                position: relative;
                height: 40px;
                padding: 10px 0 10px 30px;

                &:hover {
                    background-color: #F5F7FA;
                }
            }
            li+li {
                border-top: solid 1px #f6f6f6;
            }
            i {
                position: absolute;
                left: 6px;
                top: 20px;

                display: inline-block;
                width: 12px;
                height: 12px;
                border-radius: 50%;
            }
            .time {
                color: gray;
            }
        }
        .alarm-new {
            grid-area: newalarms;

            border: solid 1px #e4e4e4;
            border-top: none;

            i {
                background-color: rgb(237, 178, 71);
            }
        }
        .fault-new {
            grid-area: newfaults;

            border: solid 1px #e4e4e4;
            border-left: none;
            border-top: none;

            i {
                background-color: rgb(255, 86, 86);
            }
        }
    }
</style>