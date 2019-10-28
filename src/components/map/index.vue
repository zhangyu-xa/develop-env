<template>
    <section :id="`${container}-map`"></section>
</template>

<script>
    import Infowindow from "./infowindow.js";
    import Marker from "./marker.js";
	export default {
		name: "map",
		props: ['container'],
		mounted() {
			window.eleMap = new AMap.Map(`${this.container}-map`, {
				center: mapConfig.center,
				layers: [
					...(mapConfig.showSatellite ? [new AMap.TileLayer.Satellite()] : []),
					...(mapConfig.showRoadNet ? [new AMap.TileLayer.RoadNet()] : []),
				],
				zooms: mapConfig.zooms,
				zoom: mapConfig.zoom
			});
			this.infoWindow = Infowindow.createInfoWindow();
		},
		methods: {
			addMarker(opts = {}) {
				// 创建marker
				Marker.createMarker({
					data: opts.data || {},
					position: opts.position || [108.953098279, 34.277799897],
					click: (e) => {
						if (opts.async) {
							// 请求数据
							opts.async.getContentData("", () => {
								// 组装信息窗体
								this.infoWindow.setContent(opts.contentFormat(data));
								// 打开信息窗体
								this.infoWindow.open(eleMap, e.target.getPosition());
							});
						} else {
							// 组装信息窗体
							this.infoWindow.setContent(opts.contentFormat(e.target.data));
							// 打开信息窗体
							this.infoWindow.open(eleMap, e.target.getPosition());
						}
					}
				});
			},
			addMarkerEx(opts = {}) {
				eleMap.setCenter(opts.position);
				// 创建marker
				if (!this.marker) {
					this.marker = Marker.createMarker({
						position: opts.position || [108.953098279, 34.277799897]
					});
				} else {
					this.marker.setPosition(opts.position);
				}
			}
		}
	}
</script>

<style lang="less">
    @import "./infoWindow.less";
</style>