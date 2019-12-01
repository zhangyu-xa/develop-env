<template>
    <div class="device-list">
        <comps-filter :options="filterOptions" class="filter" @trigger="filterChange"></comps-filter>
        <slot name="toolbar" :total="total" />
        <slot></slot>
        <comps-table ref="table" :options="tableOptions" :displayMode="displayMode" class="data-content" @select="selectChange">
            <template v-slot:elemap="props">
                <comps-map ref="map" v-show="displayMode==='map'" :container="'alarm'" :class="props.slotClass"></comps-map>
            </template>
        </comps-table>
    </div>
</template>

<script>
    import Store from './store';
	export default {
		props: ['options', 'displayMode'],
		data() {
			const curOpts = this.options(this);
			return {
				tableOptions: curOpts.tableOptions,
                filterOptions: curOpts.filterOptions,
                total: ''
			}
		},
		methods: {
			getGeneralInfoList(params, callback) {
				const type = this.$route.params.type || this.$route.name === 'realAlarm' && 'alarm';

				Store.getGeneralInfoListByParam({
					limit: params.pageSize,
					pageNum: params.currentPage,
					...(type === "all" || !type ? this.filterOptions.params
                        : type === "offline" ? Object.assign({}, this.filterOptions.params, {netSts: type})
                            : Object.assign({}, this.filterOptions.params, {currentSts: type}))
				}).then(data => {
					this.total = data.totalCount;
					callback({
						data: data.dataResultList,
						total: data.totalCount
					});
					// 初始化地图上的点
					this.initMarkers(data.dataResultList);
				});
			},
			filterChange() {
				this.tableOptions.async.fresh = Date.now();
			},
			selectChange(items) {
				this.$emit("select", items);
			},
			updateFieldsStatus(fieldProp, isShow) {
				this.filterOptions.fields.forEach((field, pos) => {
					if (field.prop === fieldProp) this.filterOptions.fields[pos].isShow = isShow;
				});
			},
			operators(type, data) {
				this.$emit("operator", {
					type,
                    data
                })
			},
			initMarkers(data) {
				data.forEach(dev => {
					const devPointInfo = JSON.parse(dev.coordinateAxis);
					if (devPointInfo.point) {
						this.$refs.map.addMarker({
							data: dev,
							contentFormat: (data) => {
                                const content = ["<div class='device-info'>"];
                                content.push(`<div>设备名称：${data.deviceName}</div>`);
								content.push(`<div>设备状态：${Dict.currentStatus[data.currentStatus]}</div>`);
								content.push(`<div>设备地址：${data.deviceAddress}</div>`);
								content.push(`<div>安装位置：${data.deviceLocation}</div>`);
								content.push(`<div>所属公司：${data.belongedCorporation}</div>`);
								content.push("</div>")
                                return content.join("");
                            },
							position: devPointInfo.point.split("|").map(coord => coord - 0)
						});
					}
				});
			}
		}
	}
</script>

<style lang="less">
    .device-list {
        display: flex;
        flex-direction: column;

        .filter {
            flex: 0 0 60px;
            display: flex;
        }

        .toolbar {
            flex: 0 0 50px;
            display: flex;
            justify-content: flex-end;
            align-items: center;

            .tips {
                flex: 0 0 250px;

                font-size: 14px;
                color: darkgrey;
            }

            .btns {
                flex: 1 1 auto;
                text-align: right;
            }
        }

        .data-content {
            flex: 1 1 auto;

            .el-table {
                position: absolute;
                height: calc(100% - 50px);
            }
            .pagination{
                position: absolute;
                bottom: 0;
            }
        }

        .device-info {
            width: 300px;
            padding: 10px;

            div + div {
                margin-top: 10px;
            }
        }
    }
</style>