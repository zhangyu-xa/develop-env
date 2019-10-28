export default {
	createInfoWindow(opts = {}) {
		return new AMap.InfoWindow({ //创建信息窗体
			isCustom: false,  //使用自定义窗体
			content: opts.content, //this.generateInfoWindow(title, content, opts), //信息窗体的内容可以是任意html片段
			offset: opts.offset || new AMap.Pixel(0, -35)
		});
	},
	//构建自定义信息窗体
	generateInfoWindow(title, content, opts) {
		var info = document.createElement("div");
		info.className = "custom-info input-card content-window-card";

		//可以通过下面的方式修改自定义窗体的宽高
		info.style.width = opts.width || "300px";
		// 定义顶部标题
		var top = document.createElement("div");
		var titleD = document.createElement("div");
		var closeX = document.createElement("img");
		top.className = "info-top";
		titleD.innerHTML = title;
		closeX.src = "https://webapi.amap.com/images/close2.gif";
		closeX.onclick = function () {
			eleMap.clearInfoWindow();
		}

		top.appendChild(titleD);
		top.appendChild(closeX);
		info.appendChild(top);

		// 定义中部内容
		var middle = document.createElement("div");
		middle.className = "info-middle";
		middle.style.backgroundColor = 'white';
		middle.innerHTML = content;
		info.appendChild(middle);

		// 定义底部内容
		var bottom = document.createElement("div");
		bottom.className = "info-bottom";
		bottom.style.position = 'relative';
		bottom.style.top = '0px';
		bottom.style.margin = '0 auto';
		var sharp = document.createElement("img");
		sharp.src = "https://webapi.amap.com/images/sharp.png";
		bottom.appendChild(sharp);
		info.appendChild(bottom);
		return info;
	}
}