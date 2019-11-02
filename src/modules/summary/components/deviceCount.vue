<template>
    <section class="device-count" @click.stop="clickEvent">
        <div class="title">{{sectionTitle}}</div>
        <div class="dev-icon"><i class="fa" :class="devIcon"></i></div>
        <div class="dev-num">{{count}}<span>台</span></div>
    </section>
</template>

<script>
    import Store from "../store";
	export default {
		name: "deviceCount",
		props: ['devType'],
		data() {
			return {
				count: 0
			};
		},
		computed: {
			sectionTitle() {
				return `${this.devType === "all" ? "全部设备"
					: this.devType === "normal" ? "正常设备"
						: this.devType === "alarm" ? "告警设备"
							: this.devType === "fault" ? "故障设备"
								: this.devType === "offline" ? "断网设备" : "未知设备"}数量`;
			},
			devIcon() {
				return `${this.devType === "all" ? "fa-database"
					: this.devType === "normal" ? "fa-check-circle"
						: this.devType === "alarm" ? "fa-bell"
							: this.devType === "fault" ? "fa-warning"
								: this.devType === "offline" ? "fa-wifi" : ""}`;
			}
		},
		mounted() {
			Store.getDeviceCount({
				...(this.devType === "all" ? {}
					: this.devType === "normal" || this.devType === "alarm" || this.devType === "fault") ? {currentSts: this.devType}
					: {netSts: this.devType}
			}).then(res => {
				this.count = res.filter(r => {
					if (this.devType === "all") return r.name === 'others';
					else return r.name === this.devType;
				})[0].data;
			});
		},
		methods: {
			clickEvent() {
				this.$emit("click", this.devType);
			}
		}
	}
</script>

<style lang="less" scoped>
    .device-count {
        padding:0 20px;

        display: grid;
        grid-template-rows: 60px 1fr;
        grid-template-areas: "title title"
                             "devicon num";

        .title {
            grid-area: title;

            display: flex;
            align-items: center;
            font-size: 16px;
            color: #FFFFFF;
            border-bottom: solid 1px white;
        }

        .dev-icon {
            grid-area: devicon;

            display: flex;
            justify-content: center;
            align-items: center;

            padding: 14px;
            margin: 15px 0;
            width: 35px;
            height: 35px;
            border: solid 1px #ffffff;
            border-radius: 50%;

            font-size: 36px;
            color: #ffffff;
        }

        .dev-num {
            grid-area: num;

            display: flex;
            justify-content: flex-end;
            align-items: center;

            color: #ffffff;
            font-size: 36px;

            span {
                position: relative;
                margin: 10px 0 0 5px;
                font-size: 14px;
            }
        }
    }
</style>