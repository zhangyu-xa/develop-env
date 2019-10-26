export * from "./http";

export const $tools = {
	getCurDate() {
		//获取格林时间
		const date1 = new Date(new Date(new Date().toLocaleDateString()).getTime());
		const date2 = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);

		//格式化时间  2018-06-06 00:00:00
		//如果只是简单的格式化只变成2018-6-6 0:0:0，需要运用三目运算判断并在适当的地方加上0，完成所需要的格式。
		const startTime = date1.getFullYear() + "-" + ((date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + "-" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate()) + " " + (date1.getHours() < 10 ? "0" + date1.getHours() : date1.getHours()) + ":" + (date1.getMinutes() < 10 ? "0" + date1.getMinutes() : date1.getMinutes()) + ":" + (date1.getSeconds() < 10 ? "0" + date1.getSeconds() : date1.getSeconds());
		//格式化时间  2018-06-06 23:59:59
		const endTime = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate() + ' ' + date2.getHours() + ':' + date2.getMinutes() + ':' + date2.getSeconds()

		return {
			startTime,
			endTime
		};
	}
};