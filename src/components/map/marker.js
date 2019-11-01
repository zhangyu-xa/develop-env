export default {
	createMarker({data = {}, position, click = function () {}}) {
		const marker = new AMap.Marker({position});
		marker.data = data;
		eleMap.add(marker);
		//绑定click事件
		marker.on('click', click);
		return marker;
	}
}